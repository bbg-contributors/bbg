const { readFileSync } = require("fs");
const path = require("path");

module.exports = function () {
  return JSON.parse(readFileSync(path.join(__dirname, "/App.json"), "utf8"));
};
