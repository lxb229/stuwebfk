var url = require("url"),
    qs = require("querystring");
    
function query(req,res,next){
    var querystring = url.parse(req.url).query; // 请求参数部分
    // 判断是否有参数
    if(querystring){
        var queryObj = qs.parse(querystring);  // 转换为json格式
        req.query = queryObj;  // 赋值
    }
    
    next();
}

module.exports = query;