module.exports = pathRegexp;
function pathRegexp (path){
    path = path.replace(/\?(.*)$/,"")
               .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g,"(.*)")
               .replace(/((:(.*(?=\/)))|(:(.*(?=$))))/g,"(.*)")
               .replace(/\//g,"\\\/")
              
    return new RegExp(path+"$");
}

var path_regexp = pathRegexp("/article/:id/*/:name");
console.log(path_regexp)
console.log(path_regexp.test("/article/324234/dsd/ccc"));

