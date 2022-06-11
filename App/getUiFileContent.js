const { readFileSync } = require("fs");

module.exports=function(ui_filename){
    return eval("`"+readFileSync(`${__dirname}/ui/${ui_filename}`, "utf8")+"`");
}