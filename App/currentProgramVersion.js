const { readFileSync } = require("fs");
const path = require("path");

const currentProgramVersion = JSON.parse(readFileSync(path.join(__dirname, "App.json"), "utf8")).VersionNumber;

module.exports = currentProgramVersion;
