var fk = require("../..")
   ,App = fk.App
   ,download = fk.download
   ,app = new App
   ,articles = require("./articles")
   ,types = require("./types")
   ,admin = {loginname:"admin",password:"admin"}  

   app.use(fk.static(__dirname+"/static"));
   app.use(fk.post);
   app.use(fk.query);
   app.use(fk.text);
   app.use(fk.download);
   app.use(fk.redirect);
   app.use(fk.session);
   app.use(fk.view(__dirname+"/view"));

   function isLogined(req){
       return req.session.logined;
   }
   
   app.get("/type/manage",function(req,res){
       if(isLogined(req)){
          res.view("type_manage.html",{types:types});
       }else{
          res.redirect("/");
       }       
   })
   
   app.get("/",function(req,res){
        var type = req.query.type,
            arts;
        if(type){
            arts = articles.findByType(type);
        }else{
            arts = articles;
        }
        res.view("index.html", {
                 isLogined:isLogined(req)
                ,title:"my blog"
                ,types:types
                ,articles:arts});
   })
   
   app.get("/login/",function(req,res){
       res.view("login.html",{isLogined:isLogined(req)});
   })
   
   app.post("/login",function(req,res){
       if(req.body.loginname === admin.loginname 
       && req.body.password === admin.password){
            req.session.logined = true; 
            res.redirect("/");
       }else{
            res.view("login.html",{msg:"登录信息有误，请重新输入！"});
       }
   })
   
   app.get("/logout",function(req,res){
        req.session.logined = false;
        res.redirect("/");
   })
    
   app.get("/create",function(req,res){
       if(isLogined(req)){
           res.view("create.html",{types:types})
       }else{
           res.redirect("/");
       }
   })
   
   app.get("/article/:id",function(req,res){
       var art = articles.get(req.params.id);
       if(art){
         res.view("view.html",{article:art});
       }else{
         res.text("no article!");
       }       
   })
   
   app.get("/img/:articleId",function(req,res){
       var art = articles.get(req.params.articleId);
       res.download("img",new Buffer(art.img,"base64"));
   })
   
   app.post("/create",function(req,res){
       if(isLogined(req)){
           req.body.img = req.files.img;
           articles.create(req.body);
       }
       res.redirect("/");
   })
   
   app.get("/del/:id",function(req,res){
      if(isLogined(req)){
         articles.del(req.params.id);
      }
      res.redirect("/");
   })
   
   app.get("/edit/:id",function(req,res){
       var art = articles.get(req.params.id);
       if(art && isLogined(req)){
            res.view("edit.html",{types:types,article:art});
       }else{
            res.redirect("/")
       } 
       
   })
   
   app.post("/update/:id",function(req,res){
      if(isLogined(req)){
         req.body.img = req.files.img;
         articles.update(req.body,req.params.id);
      }
      res.redirect("/");
   })
   
   app.post("/type/create",function(req,res){
      if(isLogined(req)){
         types.create(req.body.title);
      }
      res.redirect("/type/manage");
   })
   
   app.post("/type/del/:id",function(req,res){
      if(isLogined(req)){
         types.del(req.params.id);
      }
      res.redirect("/type/manage");  
   })
   
   app.post("/type/update/:id",function(req,res){
      if(isLogined(req)){
         types.update(req.body.title,req.params.id);
      }
      res.redirect("/type/manage");       
   })
   
   
   app.listen(3000);
   