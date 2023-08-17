
/*

Notice:

This script is designed to be run in CI environment. Please do not run it yourself unless you know what you are doing.

*/

const { execSync } = require("child_process");
const { mkdirSync, copyFileSync, rmSync } = require("fs");

// mkdir

mkdirSync(`${__dirname}/temp_folder_for_deb_build/`);

mkdirSync(`${__dirname}/temp_folder_for_deb_build/bbg/`);

mkdirSync(`${__dirname}/temp_folder_for_deb_build/bbg/DEBIAN/`);

mkdirSync(`${__dirname}/temp_folder_for_deb_build/bbg/opt/`);

mkdirSync(`${__dirname}/temp_folder_for_deb_build/bbg/usr/`);

mkdirSync(`${__dirname}/temp_folder_for_deb_build/bbg/usr/share/`);

mkdirSync(`${__dirname}/temp_folder_for_deb_build/bbg/usr/share/applications/`);

mkdirSync(`${__dirname}/temp_folder_for_deb_build/bbg/usr/share/icons/`);

// build amd64 deb package

copyFileSync(`${__dirname}/amd64/control`,`${__dirname}/temp_folder_for_deb_build/bbg/DEBIAN/control`);

copyFileSync(`${__dirname}/universal/bbg.desktop`, `${__dirname}/temp_folder_for_deb_build/bbg/usr/share/applications/bbg.desktop`);

copyFileSync(`${__dirname}/../resources/icon.png`, `${__dirname}/temp_folder_for_deb_build/bbg/usr/share/icons/bbg.png`);

copyFileSync(`${__dirname}/../dist/bbg-x86_64.AppImage`, `${__dirname}/temp_folder_for_deb_build/bbg/opt/bbg/bbg.AppImage`);

execSync("dpkg -b . ../../../dist/bbg-amd64.deb", {cwd: `${__dirname}/temp_folder_for_deb_build/bbg/`});

// build arm64 deb package

rmSync(`${__dirname}/temp_folder_for_deb_build/bbg/DEBIAN/control`);

copyFileSync(`${__dirname}/arm64/control`,`${__dirname}/temp_folder_for_deb_build/bbg/DEBIAN/control`);

rmSync(`${__dirname}/temp_folder_for_deb_build/bbg/opt/bbg.AppImage`);

copyFileSync(`${__dirname}/../dist/bbg-arm64.AppImage`, `${__dirname}/temp_folder_for_deb_build/bbg/opt/bbg/bbg.AppImage`);

execSync("dpkg -b . ../../../dist/bbg-arm64.deb", {cwd: `${__dirname}/temp_folder_for_deb_build/bbg/`});