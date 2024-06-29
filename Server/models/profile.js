const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
    paymentpref:{
        type: String,
		enum: ["Debit Card", "Credit Card", "Upi"],
    },
	contactNumber: {
		type: Number,
		trim: true,
	},
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);