const { readFileSync } = require("fs");
const path = require("path");

module.exports = function (ui_filename) {
  return readFileSync(path.join(__dirname, "/ui/" + ui_filename, "utf8"))
};
