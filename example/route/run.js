var App = require("../..").App,
    app = new App;
    
    app.get("/about",function(req,res){
        res.write("my name is leo");
        res.end();
    })
    
    app.get("/contact",function(req,res){
        res.write("contact me use QQ 1405491181");
        res.end();
    })

    app.listen(3000);
    
    
    