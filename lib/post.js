module.exports = function post(req,res,next){

    var  body_data
        ,chunk_list = []
        ,contentType = req.headers["content-type"]
        ,contentLength = parseInt(req.headers["content-length"])
        ,isMulti = /(boundary=)/gi.test(contentType)
        ,boundary = RegExp["$'"]
        ,boundaryStandard = "--"+boundary+"\r\n"
        ,boundaryEnd = "--"+boundary+"--\r\n";
        
    req.body = {};
    req.files = {};
    
    req.on("data",function(chunk){
        chunk_list.push(chunk);
    })

    req.on("end",function(){

        body_data = Buffer.concat(chunk_list);
        
        if(isMulti){
        
            var backup = [];
            
            var readState = 0;
            
            var body = []
            
            var position = 0;
            
            function handle(b){
                 switch(readState){
                    case 0:
                        if(body_data.slice(position,position+boundaryStandard.length).toString() === boundaryStandard){
                            if(backup.length > 0){
                                body.push(backup);
                                backup = [];
                            }
                            else{
                                position += boundaryStandard.length;
                                readState = 1;
                            }
                        }else if(body_data.slice(position,position+boundaryEnd.length).toString() === boundaryEnd){
                        
                                if(backup.length > 0){
                                    body.push(backup);
                                }
                                return true;
                        }else{
                            backup.push(b);
                            position += 1;
                        }
                    break;
                    case 1:
                        if(backup.length>=3){
                            var arr3 = backup.slice(backup.length-3,backup.length);
                            arr3.push(b);
                            backup.push(b);
                            if(new Buffer(arr3).toString() === "\r\n\r\n"){
                                body.push(backup);
                                backup = [];
                                readState = 2;
                            }
                        }else{
                            backup.push(b);
                        }
                        position +=1;
                    break;
                    case 2:
                        backup.push(b);
                        position += 1;
                    break;
                }
            }
            
            for(var len = body_data.length;position<len;){
            
                var b = body_data[position];
                
                if(readState === 0 || readState === 2){
                    if(b === 45){
                        readState = 0;
                    }else{
                        readState = 2;
                    }
                }
                
                var end = handle(b);
                
                if(end){ 
                
                    for(var i=0,len=body.length;i<len;){
                        
                        var header = new Buffer(body[i]).toString();
                        
                        var arr = body[i+1];
                        var data = new Buffer(arr.slice(0,arr.length-2)); 
                        
                        /name=\"(.*?)\"/g.test(header);
                        var fieldName = RegExp.$1;

                        var isFile = /filename/g.test(header);
                        if(isFile){
                            req.files[fieldName] = data;
                        }else{
                            req.body[fieldName] = data.toString();
                        }
                                                
                        i+=2;
                    }
                
                    break;
                }
                
            }
        
        }else{
            try{
                var qs = require("querystring");
                req.body = qs.parse(body_data.toString());
            }catch(e){}
        }
        
        next();

    })
}
    
    