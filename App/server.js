
const getUrlArgs = require("./getUrlArgs.js");
const rootDir = decodeURIComponent(getUrlArgs("rootdir"));
const shell = require('@electron/remote').shell;
const express = require('express');
const loadUniStyle = require("./loadUniStyle.js");
const AppPath = require('@electron/remote').app.getPath('userData');

const storage = require("electron-json-storage");

const langdata = require("./LangData.js");

storage.setDataPath(AppPath);

storage.get("language", function (error, data) {
    lang_name = data["name"];
    
    document.getElementById("preview_site_content").innerHTML = `
    <h2>${langdata["PREVIEW_YOUR_SITE"][lang_name]}</h2>
    <hr />
    <p>${langdata["PREVIEW_SITE_CONTENT"][0][lang_name]}</p>
    <p>${langdata["PREVIEW_SITE_CONTENT"][1][lang_name]}<a class="btn btn-sm btn-link" onclick="shell.openExternal('http://localhost:41701')">http://localhost:41701</a>${langdata["PREVIEW_SITE_CONTENT"][2][lang_name]}</p>
    
    <button class="fluentbtn fluentbtn-blue" onclick="openInBrowser()">${langdata["PREVIEW_SITE_IN_BROWSER"][lang_name]}</button>
    <button class="fluentbtn" onclick="exit_preview()">${langdata["EXIT_PREVIEW"][lang_name]}</button>
    
    
    <br /><br /><br />
    <h2>${langdata["PUBLISH_YOUR_SITE"][lang_name]}</h2>
    <hr />

    <h4>${langdata["MANUALLY_UPLOAD_AND_PUBLISH"][lang_name]}</h4>
    <hr />
    <p>${langdata["PUBLISH_SITE_CONTENT"][0][lang_name]}</p>
    <p>${langdata["PUBLISH_SITE_CONTENT"][1][lang_name]}</p>
    <p>${langdata["PUBLISH_SITE_CONTENT"][2][lang_name]}</p>
    <p>${langdata["PUBLISH_SITE_CONTENT"][3][lang_name]}</p>
    <button class="fluentbtn" onclick="open_blog_dir()">${langdata["OPEN_SITE_ROOTDIR"][lang_name]}</button>

    <br /><br />
    `



}

    
    )


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