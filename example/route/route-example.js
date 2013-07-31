var App = require("../..").App,
    query = require("../..").query,
    app = new App;
    
    
    app.get("/about/:name/:age",function(req,res){
        res.write("my name is "+req.params.name+"\n");
        res.write("my age is "+req.params.age)
        res.end();
    })

    app.listen(3000);
    
    
    