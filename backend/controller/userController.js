const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUser = async(req,res,next) => {
let users = await userModel.find();
return res.status(201).send(users)
}

exports.createUser = async(req,res,next) => {
    const {name,email,password,age,phoneNumber,pincode,role} = req.body;
    const token = req.headers.token;
    try {
        let user = await userModel.findOne({email});
    if(user){
       return res.status(400).send("User already exists");
    }else{
        let pass = await bcrypt.hash(password,10);
        let user = await userModel.create({
            name,
            email,
            password:pass,
            age,
            phoneNumber,
            pincode,
            role
        })
        return res.send(user)
    }
    } catch (error) {
        return res.status(400).send(error.message);
    }
    
}

exports.authenticate = async(req,res,next) => {
    const {email,password,phoneNumber} = req.body;
try {
    if(phoneNumber){
        let user = await userModel.findOne({phoneNumber});
        if(user){
            const token = jwt.sign({_id:user._id} , "SOMYA@19962601");
           return res.send({token})
        }else{
            let temp = await userModel.create({
                phoneNumber,
                role: "User"
            })
            let token1 = jwt.sign({_id:temp._id} , "SOMYA@19962601");
           return res.send({token1})
        }
    }else if(email){
        let user = await userModel.findOne({email});
        if(!user){
            return res.status(401).send("Please signup first");
        }else{
        let match = await bcrypt.compare(password,user.password);
        if(match){
            let token = jwt.sign({_id:user._id,name:user.name,role:user.role} , "SOMYA@19962601")
            return res.status(200).send({token})
        }else{
           return res.status(404).send("Invalid password");
        }
        }
    }
    
} catch (error) {
    return res.status(404).send(error.message)
}
}