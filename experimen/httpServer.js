var http = require("http");   // 获得http模块对象

var server = http.createServer();    // 创建一个http.Server对象实例

server.on("request",handle);

var fs = require("fs");   // 得到File System模块对象

/*
同步方式
function handle(request,response){
       var data = fs.readFileSync(__dirname+"/public/index.html");  // 读完文档数据并返回后，程序才能继续。
       response.write(data);
       response.end();
}*/



// 异步方式
function handle(request,response){
    
       var path = url2path(request.url); // 得到path
       
       // 回调函数，当底层得到文档后，会调用该函数。
       function callback(err,data){
             if(err){
                 response.statusCode = 404;
             }
             else
                response.write(data);
             response.end();       
       }
       var data = fs.readFile(__dirname+"/public"+path,callback);  
       // 异步方式不会阻塞主程序进程
}

var url = require("url");

// 把URL转换成资源路径
function url2path(url_str){
    var urlObj = url.parse(url_str);  // 把url信息封装成JSON对象
    var path = urlObj.path;  // 得到路径信息
    return path;
}


server.listen(process.env.PORT,process.env.IP)    // 让服务器监听80端口