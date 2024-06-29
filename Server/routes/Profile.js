const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/Auth");

const {updateProfile , deleteAccount } =require("../controllers/Profile")

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)

module.exports = router;