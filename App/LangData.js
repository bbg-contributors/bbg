const { readFileSync } = require("fs");
const path = require("path");

module.exports = JSON.parse(readFileSync(path.join(__dirname, "/lang.json"), "utf8"));
