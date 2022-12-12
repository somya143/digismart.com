
module.exports = catchFunc => (req,res,next) => {
  Promise.resolve(catchFunc(req,res,next)).catch(next)
}