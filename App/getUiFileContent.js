const { readFileSync } = require("fs");
const path = require("path");
const evalFunc = require("./evalFunc.js");

module.exports = function (ui_filename) {
  return evalFunc(`\`${readFileSync(path.join(__dirname, "ui", ui_filename), "utf8")}\``);
};
