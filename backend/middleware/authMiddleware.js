const userModel = require("./../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req,res,next) => {
    const token = req.headers.token;
    console.log(token);
    try {
        if(!token){
            return res.send("Token is missing");
         }else{
            let decode = jwt.decode(token , 'SOMYA@19962601');
            if(!decode){
             return res.send("Invalid token");
            }else{
             let user = await userModel.findOne({_id:decode._id});
             if(!user){
                 return res.send("User doesnt exist with this email id");
             }else{
                 req.userId = user._id;
                 next();
             }
            }
         } 
    } catch (error) {
        return res.send(error.message);
    }
    
}

module.exports = authMiddleware;