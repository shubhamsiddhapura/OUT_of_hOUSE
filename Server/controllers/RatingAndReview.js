const RatingAndReview = require("../models/RatingAndReview");
const Addspace = require("../models/addspace");
const {default: mongoose } = require("mongoose");


//createRating
exports.createRating = async (req, res) => {
    try{
        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, AddspaceId} = req.body;
        
        //check if user already reviewed the addspace
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                addspace:AddspaceId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
        };
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        addspace:AddspaceId,
                                        user:userId,
                                    });
       
        //update addspace with this rating/review
        const updatedAddSpaceDetails = await Course.findByIdAndUpdate({_id:AddspaceId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedAddSpaceDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get addspace ID
            const addspaceId = req.body.AddspaceId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        addspace: new mongoose.Types.ObjectId(AddspaceId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


