const {readFileSync} = require("fs");

module.exports = function(){
    return JSON.parse(readFileSync(`${__dirname}/App.json`, "utf8"));
}