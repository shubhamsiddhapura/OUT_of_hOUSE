const User = require("../models/User")
const Addspace = require("../models/addspace")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
//create listing

exports.createLisitng = async (req, res) => {
    try {
      // Get user ID from request object
      const userId = req.user.id
  
      // Get all required fields from request body
      let {
        SpaceName,
        SpaceDescription,
        location,
        height,
        width,
        price,
        country,
        soldout,
        category,
      } = req.body
      // Get thumbnail image from request files
      const thumbnail = req.files.thumbnailImage

      if (!SpaceName || !SpaceDescription || !location || !height || !width || !price || !country || !soldout || !category) {
        return res.status(400).json({
          success: false,
          message: "All Fields are Mandatory",
        })
      }
      // if (!status || status === undefined) {
      //   status = "Draft"
      // }
      // Check if the user is an instructor
      const userDetails = await User.findById(userId, {
        accountType: "Addspaceowner",
      })
  
      if (!userDetails) {
        return res.status(404).json({
          success: false,
          message: "owner Details Not Found",
        })
      }
  
      
      // Upload the Thumbnail to Cloudinary
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      console.log(thumbnailImage)


      


      // Create a new listing with the given details
      const listing = await Addspace.create({
        SpaceName,
        SpaceDescription,
        Owner: userDetails._id,
        height,
        width,
        price,
        country,
        soldout,
        category,
        location,
        thumbnail: thumbnailImage.secure_url,
        
        
      })
  
      // Add the new course to the User Schema of the Instructor
      await User.findByIdAndUpdate(
        {
          _id: userDetails._id,
        },
        {
          $push: {
            addspaces: listing._id,
          },
        },
        { new: true }
      )

      // Return success message
      res.status(200).json({
        success: true,
        data: listing,
        message: "listing Created Successfully",
      })
    } catch (error) {
      // Handle any errors that occur during the creation of the course
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to create listing",
        error: error.message,
      })
    }
}

// Get listings List
exports.getAllListings = async (req, res) => {
    try {
      const allListings = await Addspace.find({})
  
      return res.status(200).json({
        success: true,
        data: allListings,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch listing Data`,
        error: error.message,
      })
    }
}

//individual listing
exports.getIndividualListing= async(req,res)=>{
    let {id}=req.params;
    
    const listing=await Addspace.findById(id).populate({path:"reviews",populate:{path:"user"}}).populate("Owner");
    if(!listing){
        return res.status(404).json({
            success: false,
            message: `Can't find listing `,
            error: error.message,})
    }
}   

exports.destroyListing=async(req,res)=>{
    let {id}= req.params;
    const userId = req.user.id

    try{
      let listing = await Addspace.findById(id);

        // Check if the listing exists
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        // Check if the user is the owner of the listing
        if (listing.Owner.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this listing"
            });
        }
      let deletedListing= await Addspace.findByIdAndDelete(id);
      console.log(deletedListing);
      res.status(200).json({
        success: true,
        message:"listing deleted",
      })
    }catch(error){
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `couldnt delete listing Data`,
        error: error.message,
      })
    }
    
};