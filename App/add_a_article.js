const { existsSync, appendFileSync, mkdirSync } = require("fs");
const doNothing = require("./doNothing.js");

module.exports = function () {
  edit_article_meta(-1);
};
