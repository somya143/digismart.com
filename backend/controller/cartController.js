const cartModel = require("./../models/cartModel");
const authMiddleware = require("./../middleware/authMiddleware");
const productModel = require("./../models/productModel");

exports.getAllCartProducts = authMiddleware, async (req,res,next) => {
    try {
        let cart = await cartModel.find({user: req.userId}).populate([
            {
                path: "user",
                select: ["name","email","user_image","address","role","pincode"]
            },
            "product",
        ]);
        return res.send(cart)
    } catch (error) {
        return res.send(error.message);
    }
}