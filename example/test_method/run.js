var fk = require("../.."),
    App = fk.App,
    app = new App(),
    static_middle = fk.static;
    
    // 加载static中间件
    app.use(static_middle(__dirname+"/public"));
    
    app.get(function(req,res){
        res.write("I am GET method result!");
        res.end();
    })
    
    app.post(function(req,res){
        res.write("I am POST method result!");
        res.end();
    })

    app.listen(process.env.PORT);