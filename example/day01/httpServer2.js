var http = require("http");
var server = http.createServer();

server.on("request",handle);

var url = require("url");


function url2path(url_str){
    var urlObj = url.parse(url_str);
    var path = urlObj.path;
    return path;
}

var fs = require("fs");

function handle(request,response){

    function callback(err,data){
        if(err){
            response.statusCode = 404;
        }else{
            response.write(data);
        }
        response.end();
    }

    var path = url2path(request.url);
    var data = fs.readFile(__dirname+"/public"+path,callback);
}


server.listen(3000);