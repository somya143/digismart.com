const productModel = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
//Create Product  -admin route
exports.createProduct = catchAsyncErrors(async (req,res,next) => {

  const product = await productModel.create(req.body);
    res.status(201).json({success: true, product});
})


// get all product
exports.getAllProducts = catchAsyncErrors( async (req,res,next) => {
  const product = await productModel.find()
  res.status(200).json({success: true, product});
});

// get single product by id
exports.getProductById =catchAsyncErrors( async(req,res,next) => {
  const id = req.params.id;
  let product = await productModel.findById(id);
  if(!product){
    return next(new Errorhandler("product not found",400))
  }
  return res.status(200).json({success:true , product})
});

//Update Product -admin
exports.findAndUpdate =catchAsyncErrors( async (req,res,next) => {
 let product = await productModel.findById(req.params.id);

 if(!product){
  return next(new Errorhandler("product not found",400))
 }
 product = await productModel.findByIdAndUpdate(req.params.id , req.body,{new:true , 
 runValidators:true, useFindAndModify:false
})
res.status(200).json({success:true,product})
});

//Delete Product -admin
exports.deleteProduct = catchAsyncErrors( async (req,res,next) => {
let product = await productModel.findById(req.params.id);
if(!product){
  return next(new Errorhandler("product not found",400))
}
await product.remove();
res.status(200).json({success:true , message:"Product deleted successfully"});
});
