const wishlistModel = require("../models/wishlistModel");
const authMiddleware = require("../middleware/authMiddleware");

exports.getSingleWishlistItem = async (req,res,next) => {
    if(req.id !== req.params.id){
        return res.status(401).send({error:true, message:"Something went wrong"})
    }
    try {
        let wishlist = await wishlistModel.find({user: req.id}).populate("product");
        return res.status(200).send(wishlist);
    } catch (error) {
        return res.status(400).send({error:true,message:error.message});
    }
}

exports.createWishlistItem = async (req,res,next) => {
    let { product , user } = req.body;
    try {
        let wishlist = await wishlistModel.create({product , user , quantity , delivered});
        if(!wishlist){
            return res.status(401).send({error:true , message: "Something went wrong"});
        }else{
            return res.status(201).send({error:false , wishlist});
        }
    } catch (error) {
        return res.status(404).send({error:true , message:error.message});
    }
}

exports.removeWishlistItem = async (req,res,next) => {
   try {
    let wishlist = await wishlistModel.findByIdAndDelete(req.params.id);
    return res.status(201).send("Wishlist Item deleted successfully");
   } catch (error) {
    return res.status(404).send({error: true , message: error.message});
   }
}