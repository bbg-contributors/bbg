
const getUrlArgs = require("./getUrlArgs.js");
const rootDir = decodeURIComponent(getUrlArgs("rootdir")).replaceAll("\\", "/");
const shell = require('@electron/remote').shell;
const express = require('express');
const loadUniStyle = require("./loadUniStyle.js");
const AppPath = require('@electron/remote').app.getPath('userData');
const execSync = require("child_process").execSync;

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
    <h4>提交更改并推送到远程 Git 仓库 <span class="badge bg-info">Beta</span></h4>
    <p>此操作会使用操作系统提供的 Git 命令提交本地的站点更改，并推送到远程 Git 仓库。此操作要求当前站点根目录是有效的 Git 仓库，操作系统内已安装 Git，且已配置为 Git Push 保留凭据（“保留凭据”可通过在终端中执行 git config --global credential.helper store 设置，首次设置后可能仍需手动 Push 一次）。</p>
    <button class="fluentbtn fluentbtn-blue" onclick="commit_and_push();">提交当前更改并推送到远程仓库</button>
    <button class="fluentbtn" onclick="commit_only()">仅提交更改但不推送</button>
    <br /><br />
    <hr />
    <h4>${langdata["MANUALLY_UPLOAD_AND_PUBLISH"][lang_name]}</h4>
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

function commit_and_push() {
  if (window.confirm(`你选择了提交更改并推送到远程仓库，将要执行的指令如下，请确认：\n git add . \n git commit -m "site_update" \n git push `)) {
    try {
      execSync(`cd ${rootDir} && git add . `);
      execSync(`cd ${rootDir} && git commit -m "site_update" `);
    } catch (error) {

    }

    try {
      window.alert("操作完成。\n" + execSync(`cd ${rootDir} && git push`));
    } catch (error) {
      window.alert("操作失败。输出如下：\n" + error);
    }

  }
}

function commit_only() {
  if (window.confirm(`你选择了仅提交更改但不推送，将要执行的指令如下，请确认：\n git add . \n git commit -m "site_update"`)) {
    try {
      execSync(`cd ${rootDir} && git add . `);
      execSync(`cd ${rootDir} && git commit -m "site_update" `);

    } catch (error) {

    }
    window.alert("操作完成。");
  }
}
