var http = require("http");

module.exports = App;

function App(){
    // 插件有序列表
    var middleList = this._middleList = [];
    
    // request事件响应函数
    function handle(req,res){
        
    
        if(middleList.length === 0){
            // 如果没有功能插件什么都不做。
        }else{
            
            // 循环执行插件
            var middleIndex = 0; // 插件索引
            
            execMiddle();
            
            // 执行这个函数时，会自动执行下一个middle插件。
            // 至于这个函数的执行，是由插件所控制。
            function next(){
                middleIndex += 1;
                execMiddle();
            }
            
            // 执行插件函数
            function execMiddle(){
                var middle = middleList[middleIndex];
                if(middle){
                    middle(req,res,next);
                }
            }        
            
        }
        
        
    }
    
    this._server = http.createServer(handle);
    
}

// 加入功能栈
App.prototype.use = function(middle){
    this._middleList.push(middle);
}

// 监听端口
App.prototype.listen = function(){
    this._server.listen.apply(this._server,arguments);
}