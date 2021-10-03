
const getUrlArgs = require("./getUrlArgs.js");
const rootDir = decodeURIComponent(getUrlArgs("rootdir"));
const shell = require("electron").remote.shell;
const express = require('express');
const loadUniStyle = require("./loadUniStyle.js");

loadUniStyle();


const server = express();

server.use(express.static(rootDir));

server.listen(41701, () => {
  console.log(`live server listening at http://localhost:41701`);
});


function exit_preview() {
    window.history.back();
}

function openInBrowser() {
    shell.openExternal(`http://localhost:41701`);
}


function open_blog_dir() {
    shell.openPath(rootDir);
}