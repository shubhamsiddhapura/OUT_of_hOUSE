const mongoose = require("mongoose");

// Define the Courses schema
const addspacesSchema = new mongoose.Schema({
	SpaceName: { type: String },
	SpaceDescription: { type: String },
	Owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	location:{
        type:String,
    },
	height:{
		type:String
	},
	width:{
		type:String
	},
    country: { type:String},
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
		type: Number,
        require: true
	},
	thumbnail: {
		type: String,
	},
	
	category: {
		type: String,
			enum: ["billboards", "digital screens","transit ads"],
		    required: true,
	},
	soldout:{
		type:Boolean,
		default:false
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("Addspace", addspacesSchema);