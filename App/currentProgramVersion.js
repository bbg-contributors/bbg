const { readFileSync } = require("fs");

const currentProgramVersion = JSON.parse(readFileSync(`${__dirname}/App.json`), "utf8").currentProgramVersion;

module.exports = currentProgramVersion;
