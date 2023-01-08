const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String , required:[true,"Please enter the product name"], trim:true},
    description: {type: String , required:[true, "Please enter the product description"]},
    price: {type: Number, required:[true, "Please enter the product price"],
            maxLength : [8 , "Price cannot exceed 8 digit"] },
    rating: {type: Number, default:0},
    off: {type:Number},
    images: [{
        public_id:{
          type: String,
          
        },
        url:{
            type: String,
            
          }
    }],
    category:{type:String , required:[true , "Please enter the product category"]},
    stock : {type: Number , required:[true, "PLease enter the product stock"],
           maxLength:[4, "Stock cannot exceed 4 digit"], default:1},
    numOfReviews:{type: Number, default:0},
    reviews : [
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type:String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    versionKey : false,
    timestamps: true
});

const productModel = mongoose.model("product" , productSchema);

module.exports = productModel;