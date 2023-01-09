const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    product : {
     type: mongoose.Schema.Types.ObjectId,
     ref: "product",
     required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},
{
    versionKey : false,
    timestamps : true
}
);

const wishlist = mongoose.model("wishlist" , wishlistSchema);

module.exports = wishlist;