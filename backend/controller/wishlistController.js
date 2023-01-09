const wishlistModel = require("../models/wishlistModel");
const authMiddleware = require("../middleware/authMiddleware");

exports.getSingleWishlistItem = async (req,res,next) => {
    if(req.id !== req.params.id){
        return res.status(401).send({error:true, message:"Something went wrong"})
    }
    try {
        let wishlist = await wishlistModel.find({user: req.id}).populate("product")
    } catch (error) {
        
    }
}