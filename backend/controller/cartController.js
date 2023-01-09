const cartModel = require("./../models/cartModel");
const authMiddleware = require("./../middleware/authMiddleware");
const productModel = require("./../models/productModel");

exports.getAllCartProducts =  async (req,res,next) => {
    try {
        let cart = await cartModel.find().populate([
            {
                path: "user",
                select: ["name","email","userImage","address","role","pincode"]
            },
            "product",
        ]);
        return res.send(cart)
    } catch (error) {
        return res.send(error.message);
    }
};

exports.getSingleCartItem =  async(req,res,next) => {
    if(req.id !== req.params.id){
        return res.status(401).send(`User with this id doesn't exist`);
    }
    try {
        let cart = await cartModel.findById({user:req.id}).populate("product");
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

exports.createCartProducts = async (req,res,next) => {
    let {product , user , quantity, delivered} = req.body;
    try {
        let cart = await cartModel.create({product,user,quantity,delivered});
        if(!cart){
            return res.send("cart is missing");
        }else{
            return res.status(200).send(cart);
        }
    } catch (error) {
        return res.status(401).send(error.message)
    }
}

exports.updateCartItem = authMiddleware , async(req,res,next) => {
    try {
        let cart = await cartModel.findByIdAndUpdate(req.params.id,{
            ...req.body
        },
        {
            new:true
        }
        );
        return res.status(201).send({error:false,message:"Cart item updated successfully",cart})
    } catch (error) {
        return res.status(401).send(error.message);
    }
}

exports.removeItemFromCart = authMiddleware , async(req,res,next) => {
    try {
        let cart = await cartModel.findByIdAndDelete(req.params.id);
        if(!cart){
            return res.status(400).send("cart is missing");
        }else{
            return res.status(201).send("Cart item deleted successfully");
        }
    } catch (error) {
        return res.status(401).send(error.message);
    }
}

