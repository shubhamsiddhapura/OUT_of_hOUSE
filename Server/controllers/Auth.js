const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const Profile = require("../models/profile")
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator")

require("dotenv").config()

exports.sendOTP=async (req,res)=>{
  try{//fetch email
  const {email}=req.body;

  //check if user exists

  const checkUserPresent= await User.findOne({email});

  if(checkUserPresent){
      return res.status(401).json({
          success:false,
          message:"User already registerd"
      })
  }

  //otp generation
  var otp=otpGenerator.generate(6,{
      upperCaseAlphabets:false,
      lowerCaseAlphabets:false,
      specialChars:false,
  });

  //printing
  console.log("otp generated",otp);

  //check for unique otp

  const result =await OTP.findOne({otp:otp});
  
  
  //if true means we need to generate another otp
  while(result){
      otp=otpGenerator.generate(6,{
          upperCaseAlphabets:false,
          lowerCaseAlphabets:false,
          specialChars:false,
      });    
      
  }

  const otpPayload={email,otp};

  //insert the entry in the OTP schema

  const otpBody= await OTP.create(otpPayload);
  console.log(otpBody);

  res.status(200).json({
      success:true,
      message:"Otp sent successfuly",
      otp,
  })

  }
  catch(err){
      console.log(err.message);
      res.status(500).json({
          success:false,
          message:"some error in otp generation and verification"
      })
  }
};


exports.signUp=async(req,res)=>{
    try{
        //fetch data from form
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;
        
        
        //validate data
        if ( !firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).send({
              success: false,
              message: "All Fields are required",
            });
        };

        //check both pass are same or not
        if (password !== confirmPassword) {
            return res.status(400).json({
              success: false,
              message:
                "Password and Confirm Password do not match. Please try again.",
            }); 
        };

        //check if user already exist or not
        const existingUser=await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
              success: false,
              message: "User already exists. Please sign in to continue.",
            });
        }

        //find most recent otp
        
        const recentOtp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        

        //validate otp
        if(recentOtp.length==0){
            //otp not found
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }else if (otp !== recentOtp.otp) {
            // Invalid OTP
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            })
        }
        

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
        paymentpref:null,
        });

        //create entry in db

        
        const user= await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            // approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    }
    
    catch(err){
        console.error(err.message)
        return res.status(500).json({
          success: false,
          message: "User cannot be registered. Please try again.",
        });
    };
};

exports.login = async (req, res) => {
    try{
        //get data from req body
        const {email,password}=req.body;
        //validation if email or password does not exists
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
              success: false,
              message: `Please Fill up All the Required Fields`,
            })
        }

        //check if user exists 
        const user=await User.findOne({email}).populate("additionalDetails");

        // If user not found with provided email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
            success: false,
            message: `User is not Registered with Us Please SignUp to Continue`,
            });
        };


        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            const payload={ email: user.email, id: user._id, accountType: user.accountType };
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "24h"});

            user.token=token;
            user.password=undefined;

            //create cookies and send res

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token",token,options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        }else {
            return res.status(401).json({
              success: false,
              message: `Password is incorrect`,
            });
        };




    }
    catch(err){
        console.log(err);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      });
    }
}

exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)
  
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
        
      
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
}