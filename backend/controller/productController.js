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
  const {limit,page,category,q,sort,arr,off,offSet,firstletter} = req.query
  if(category && q){
    let temp = new RegExp(q,"i")
  let product = await productModel.find({
    category : category,
    name: temp
  }).limit(limit)
  return res.send(product)
}
 else if(category && sort){
  if(sort === "asc"){
    let temp = await productModel.find({category:category}).sort({price:1}).limit(limit)
    return res.send(temp);
  }else if(sort === "desc"){
    let temp = await productModel.find({category:category}).sort({price:-1}).limit(limit)
    return res.send(temp)
  }
 }
 else if(category && firstletter){
  let temp = firstletter;
  let product = await productModel.find({category:category,name:{$regex: "^"+ temp, $options:"i"}}).limit(limit)
  return res.send(product);
 } 
 else if(category && arr){
  const [min,max]= arr.split(",").map(Number);
  let temp = await productModel.find({
    category:category,
    $and : [{price: {$gte:min}},{price: {$lte:max}}]
  }).limit(limit).sort({price:1});
  return res.send(temp)
 }
 else if(category && off){
  const [min,max] = off.split(",").map(Number);
  let temp = await productModel.find({
    category: category,
    $and:[{off:{$gte:min}},{off:{$lte:max}}]
  }).sort({off:1}).limit(limit)
  return res.send(temp);
 }
 else if(category && offSet){
  if(offSet === "asc"){
    let temp = await productModel.find({category:category}).sort({off:1}).limit(limit);
    return res.send(temp)
  }else if(offSet === "desc"){
    let temp = await productModel.find({category:category}).sort({off:-1}).limit(limit);
    return res.send(temp);
  }

 }
 else if(category){
  let temp = await productModel.find({category:category}).skip((page-1) *limit).limit(21);
  return res.send(temp)
 }
 else if(input){
  let temp = new RegExp(input,"i");
  let product = await productModel.find({name:temp}).skip((page-1)*limit).limit(21);
  return res.send(product);
 }
 let product = await productModel.find().skip((page-1)*limit).limit(limit);
 return res.send(product);
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
