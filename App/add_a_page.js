const { existsSync, appendFileSync, mkdirSync } = require("fs");
const doNothing = require("./doNothing.js");

module.exports = function () {
  edit_page_meta(-1);
};
