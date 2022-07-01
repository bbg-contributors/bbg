const { readFileSync } = require("fs");

module.exports = JSON.parse(readFileSync(`${__dirname}/lang.json`, "utf8"));
