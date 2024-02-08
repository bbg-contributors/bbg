
/*

Notice:

This script is designed to be run in CI environment. Please do not run it yourself unless you know what you are doing.

*/


const { readFileSync } = require("fs");

const AppJson = readFileSync(`${__dirname}/../App/App.json`, { encoding: "utf-8" });

const Content = JSON.parse(AppJson);

const Version = Content["VersionNumber"];

console.log(Version);
