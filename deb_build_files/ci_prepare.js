
/*

Notice:

This script is designed to be run in CI environment. Please do not run it yourself unless you know what you are doing.

*/


const { readFileSync, writeFileSync } = require("fs");

const AppJson = readFileSync(`${__dirname}/../App/App.json`, {encoding: "utf-8"});

const Content = JSON.parse(AppJson);

const Version = Content["VersionNumber"];

let sources = new Object();

sources["amd64"] = readFileSync(`${__dirname}/amd64/control`, {encoding: "utf-8"});

sources["arm64"] = readFileSync(`${__dirname}/arm64/control`, {encoding: "utf-8"});

// fill in version number

sources["amd64"] = sources["amd64"].replaceAll("modify_this_value_to_actual_bbg_version", Version);
sources["arm64"] = sources["arm64"].replaceAll("modify_this_value_to_actual_bbg_version", Version);

// save

writeFileSync(`${__dirname}/amd64/control`, sources["amd64"]);
writeFileSync(`${__dirname}/arm64/control`, sources["arm64"]);