const express = require("express")
const router = express.Router()


const{createLisitng,getAllListings,getIndividualListing,destroyListing}=require("../controllers/listing")

const {createRating,getAverageRating,} = require("../controllers/RatingAndReview")

const { auth,isAddspaceowner } = require("../middlewares/Auth")


router.post("/createListing", auth, isAddspaceowner, createLisitng)
router.get("/getAllListing", getAllListings)
router.get("/getIndivualListing/:id", getIndividualListing)
router.delete("/delete/:id", destroyListing)


router.post("/createRating", auth, isAddspaceowner, createRating)
router.get("/getAverageRating", getAverageRating)

module.exports = router