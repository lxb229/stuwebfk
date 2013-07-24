var webfk = require("..");
var app = new webfk.App();
app.use(webfk.static(__dirname+"/public"));
app.listen(process.env.PORT);