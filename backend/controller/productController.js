const productModel = require("../models/productModel");
  
// admin route
exports.createProduct = async (req,res,next) => {

  const product = await productModel.create(req.body);
    res.status(201).json({success: true, product});
}



exports.getAllProducts = async (req,res,next) => {
  const product = await productModel.find()
  res.status(200).json({success: true, product});
}


