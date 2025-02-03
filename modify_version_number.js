
const { readFileSync, writeFileSync } = require("fs");

function getyyyymmdd() {
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth() + 1;
  var curr_year = d.getFullYear();
  String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
  String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
  var yyyyMMdd = curr_year + "" + curr_month + "" + curr_date;
  return yyyyMMdd;
}

let appjson = JSON.parse(readFileSync(`${__dirname}/App/App.json`), "utf8");
let packagejson = JSON.parse(readFileSync(`${__dirname}/package.json`), "utf8");

let newversion = parseInt(getyyyymmdd(), 10);

appjson["VersionNumber"] = newversion;
packagejson["version"] = `${getyyyymmdd()}.0.0`;

writeFileSync(`${__dirname}/App/App.json`, JSON.stringify(appjson, null, 2), "utf8");
writeFileSync(`${__dirname}/package.json`, JSON.stringify(packagejson, null, 2), "utf8");