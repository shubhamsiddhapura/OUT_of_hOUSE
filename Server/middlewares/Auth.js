const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const OTP = require("../models/otp");

const otpGenerator = require("otp-generator")
const mailSender = require("../utils/mailSender")

dotenv.config();



//otp
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


//auth
exports.auth=async(req,res,next)=>{
    try{
        //extract token
        const token =  req.cookies.token ||req.body.token ||req.header("Authorization").replace("Bearer ", "");

        //if token not found 
        if (!token) {
			return res.status(401).json({ 
                success: false, 
                message: `Token Missing` 
            });
		}

        try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode =jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
        next();

    }
    catch(err){
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }


}

//is student
exports.isAdvertiser = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Advertiser") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Advertiser",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAddspaceowner = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Addspaceowner") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Addspaceowner",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};