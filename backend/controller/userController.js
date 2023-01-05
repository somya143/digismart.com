const userModel = require("../models/userModel");


exports.getUser = async(req,res,next) => {
let users = await userModel.find();
return res.status(201).send(users)
}