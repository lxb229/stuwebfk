var http = require("http");
var server = http.createServer();

server.on("request",handle);

function handle(request,response){
    response.write("Hello world");   //  向浏览器端写入数据
    response.end();   // 结束响应
}

server.listen(3000);