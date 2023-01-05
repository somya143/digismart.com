const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type:String,required:[true,"Please provide the name of user"]},
    email: {type:String,required:[true,"Please provide unique email-id"],unique:true},
    pincode: {type:String},
    role: {type:String,
          enum:["Admin","HR","User","ProductManager"] 
          },
    address: [],
    phoneNumber: {type: Number},
    age: {type:Number},
    gender: {type:String, enum:["Male","Female","Others"]},
    userImage: {type:String}      
},
{timestamps: true,
versionKey: false
}
);

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;