module.exports = function(req,res,next){
    console.log(req.method)
    console.log("my name is middle02\n");
    next();
}