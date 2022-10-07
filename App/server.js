const execSync = require("child_process").execSync;
const shell = require("@electron/remote").shell;
const express = require("express");
const storage = require("electron-json-storage");
const AppPath = require("@electron/remote").app.getPath("userData");
const Prompt = require("native-prompt");

const langdata = require("./LangData.js");
const getUrlArgs = require("./getUrlArgs.js");
const doNothing = require("./doNothing.js");
const rootDir = decodeURIComponent(getUrlArgs("rootdir")).replaceAll("\\", "/");

const loadUniStyle = require("./loadUniStyle.js");

storage.setDataPath(AppPath);

storage.get("language", (error, data) => {
  if (error) console.error(error);
  lang_name = data.name;

  document.getElementById("preview_site_content").innerHTML = `
    <h2>${langdata.PREVIEW_YOUR_SITE[lang_name]}</h2>
    <hr />
    <p>${langdata.PREVIEW_SITE_CONTENT[0][lang_name]}</p>
    <p>${langdata.PREVIEW_SITE_CONTENT[1][lang_name]}<a class="btn btn-sm btn-link" onclick="shell.openExternal('http://localhost:41701')">http://localhost:41701</a>${langdata.PREVIEW_SITE_CONTENT[2][lang_name]}</p>
    
    <button class="fluentbtn fluentbtn-blue" onclick="openInBrowser()">${langdata.PREVIEW_SITE_IN_BROWSER[lang_name]}</button>
    <button class="fluentbtn" onclick="exit_preview()">${langdata.EXIT_PREVIEW[lang_name]}</button>
    
    
    <br /><br /><br />
    <h2>${langdata.PUBLISH_YOUR_SITE[lang_name]}</h2>
    <hr />
    <h4>${langdata.PUSH_TO_REMOTE_TITLE[lang_name]} <span class="badge bg-info">Beta</span></h4>
    <p>${langdata.PUSH_TO_REMOTE_DESCRIPTION[lang_name]}</p>
    <button class="fluentbtn fluentbtn-blue" onclick="commit_and_push();">${langdata.PUSH_TO_REMOTE[lang_name]}</button>
    <button class="fluentbtn" onclick="commit_only()">${langdata.PUSH_TO_REMOTE_WITHOUT_PUSH[lang_name]}</button>
    <br /><br />
    <hr />
    <h4>${langdata.COPY_TO_REMOTE_TITLE[lang_name]} <span class="badge bg-info">Beta</span></h4>
    <p>${langdata.COPY_TO_REMOTE_DESCRIPTION[lang_name]}</p>
    <button class="fluentbtn fluentbtn-blue" onclick="secure_copy_pass();">${langdata.COPY_TO_REMOTE_WITH_PASSWD[lang_name]}</button>
    <button class="fluentbtn" onclick="secure_copy_key()">${langdata.COPY_TO_REMOTE_WITH_KEY[lang_name]}</button>
    <hr />
    <h4>${langdata.MANUALLY_UPLOAD_AND_PUBLISH[lang_name]}</h4>
    <p>${langdata.PUBLISH_SITE_CONTENT[0][lang_name]}</p>
    <p>${langdata.PUBLISH_SITE_CONTENT[1][lang_name]}</p>
    <p>${langdata.PUBLISH_SITE_CONTENT[2][lang_name]}</p>
    <p>${langdata.PUBLISH_SITE_CONTENT[3][lang_name]}</p>
    <button class="fluentbtn" onclick="open_blog_dir()">${langdata.OPEN_SITE_ROOTDIR[lang_name]}</button>

    <br /><br />
    `;
},

);

loadUniStyle();

const server = express();

server.use(express.static(rootDir));

server.listen(41701, () => {
  // console.log("live server listening at http://localhost:41701");
});

function exit_preview () {
  window.history.back();
}

function openInBrowser () {
  shell.openExternal("http://localhost:41701");
}

function open_blog_dir () {
  shell.openPath(rootDir);
}

function commit_and_push () {
  if (window.confirm("你选择了提交更改并推送到远程仓库，将要执行的指令如下，请确认：\n git add . \n git commit -m \"site_update\" \n git push ")) {
    try {
      execSync(`cd ${rootDir} && git add . `);
      execSync(`cd ${rootDir} && git commit -m "site_update" `);
    } catch (error) {
      doNothing();
    }

    try {
      window.alert(`操作完成。\n${execSync(`cd ${rootDir} && git push`)}`);
    } catch (error) {
      window.alert(`操作失败。输出如下：\n${error}`);
    }
  }
}

function commit_only () {
  if (window.confirm("你选择了仅提交更改但不推送，将要执行的指令如下，请确认：\n git add . \n git commit -m \"site_update\"")) {
    try {
      execSync(`cd ${rootDir} && git add . `);
      execSync(`cd ${rootDir} && git commit -m "site_update" `);
    } catch (error) {
      doNothing();
    }
    window.alert("操作完成。");
  }
}

async function secure_copy_pass() {
  var dest = (await Prompt("", "请输入服务器IP地址/SSH端口/用户名/要提交到的目录/密码（用空格隔开，例如 127.0.0.1 22 root /root/ password）")).split(" ");
  if (dest.length < 5) window.alert("错误：给定的参数不足。");
  else {
    var cmd = `expect <<- EOF
spawn sh -c "scp -P ${dest[1]} -r ${rootDir}/* ${dest[2]}@${dest[0]}:${dest[3]}"
expect {
"yes/no" { send "yes\\r"; exp_continue }
"password:" { send "${dest[4]}\\r" }
}
expect eof
EOF`;
    if (window.confirm(`你选择了使用密码验证，将要执行的指令如下，请确认：\n${cmd}`)) {
      try {
        execSync(cmd);
      } catch(error) {
        doNothing();
      }
    }
  }
  // TODO: Check if arg is valid
}

async function secure_copy_key() {
  var dest = (await Prompt("", "请输入服务器IP地址/SSH端口/用户名/要提交到的目录/密钥位置（用空格隔开，例如 127.0.0.1 22 root /root/ ~/.ssh/id_rsa）")).split(" ");
  if (dest.length < 5) window.alert("错误：给定的参数不足。");
  else {
    var cmd = `expect <<- EOF
spawn sh -c "scp -P ${dest[1]} -i ${dest[4]} -r ${rootDir}/* ${dest[2]}@${dest[0]}:${dest[3]}"
expect {
"yes/no" { send "yes\\r" }
}
expect eof
EOF`;
    if (window.confirm(`你选择了使用密钥验证，将要执行的指令如下，请确认：${cmd}`)) {
      try {
        execSync(cmd);
      } catch(error) {
        doNothing();
      }
    }
  }
}
