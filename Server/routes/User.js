// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {login, signUp, sendOTP,changePassword} = require("../controllers/Auth")
const {
    resetPasswordToken,
    resetPassword,
  } = require("../controllers/ResetPassword")
const { auth } = require("../middlewares/Auth")

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)


// reset routes

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


module.exports = router;