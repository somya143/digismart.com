const Errorhandler = require("../utils/errorhandler");


module.exports = (err,req,res,next) => {
   err.statuscode = err.statuscode || 500;
   err.message = err.message || "Internal Server error";
 
   // Invalid id error
   if(err.name === "castError"){
     const message = `Resourse not found. Invalid:${err.path}`
     err = new Errorhandler(message,400)
   }
   
res.status(err.statuscode).json({
    success: false, message: err.message
})
}