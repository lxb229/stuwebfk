module.exports = function(req,res,next){
    
    res.download = function(fileName,buf){
    
        if(Buffer.isBuffer(buf)){
            res.writeHead(200, {
                'Content-disposition': 'attachment; filename=' + fileName,
                'Content-Type': 'application/octet-stream',
                'Content-Length': buf.length
            });
            res.write(buf);
            res.end();
        }else{
            res.end();
        }
        
    }
    
    next();
    
}