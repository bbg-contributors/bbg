
const fs = require("fs");

const dialog = require("electron").remote.dialog;
const shell = require("electron").remote.shell;
const { copyFileSync, constants, readFileSync } = require('fs');
const storage = require("electron-json-storage");
const getAppInfo = require("./getAppInfo.js");
const AppInfo = getAppInfo();
const currentProgramVersion = require("./currentProgramVersion.js");
const check_update = require("./check_update.js");

document.getElementsByTagName("title")[0].innerHTML = "开始使用 Baiyang-lzy's Blog Generator";

let create_new_site_dialog = new bootstrap.Modal(document.getElementById('create-new-site-dialog'));
let err_dialog = new bootstrap.Modal(document.getElementById('err-dialog'));

function create_new_site_dialog_show() {

    create_new_site_dialog.show();
}

function create_new_site_dialog_hide() {
    create_new_site_dialog.hide();
}

function createErrDialog(title, content) {

    err_dialog.show();
    document.getElementById("err-dialog-title").innerHTML = title;
    document.getElementById("err-dialog-content").innerHTML = content;
}

function create_new_site_choose_root_dir() {
    let rootDir = dialog.showOpenDialogSync({
        properties: ["openDirectory"],
    });
    if (rootDir !== undefined) {
        generateNewBlog(rootDir);

    } else {
        //用户放鸽子的情况
    }
}


function open_site() {
    let rootDir = dialog.showOpenDialogSync({
        properties: ["openDirectory"],
    });
    if (rootDir !== undefined) {

        manageSiteByRootDir(rootDir);


    }
}


function generateNewBlog(rootDir) {

    try {

        fs.mkdirSync(rootDir + "/data");
        fs.mkdirSync(rootDir + "/static");
        fs.mkdirSync(rootDir + "/data/articles");
        fs.mkdirSync(rootDir + "/data/pages");

        copyFileSync(__dirname + "/blog_source/data/articles/first.md", rootDir + "/data/articles/first.md", constants.COPYFILE_EXCL);
        copyFileSync(__dirname + "/blog_source/index.html", rootDir + "/index.html", constants.COPYFILE_EXCL);
        copyFileSync(__dirname + "/blog_source/data/index.json", rootDir + "/data/index.json", constants.COPYFILE_EXCL);
        copyFileSync(__dirname + "/blog_source/data/pages/about.md", rootDir + "/data/pages/about.md", constants.COPYFILE_EXCL);
        copyFileSync(__dirname + "/blog_source/data/pages/friends.md", rootDir + "/data/pages/friends.md", constants.COPYFILE_EXCL);



        window.alert("博客站点初始化成功！接下来将进入博客设置页。");

        window.location.href = "./blog_settings.html?rootdir=" + rootDir;



    } catch (error) {
        create_new_site_dialog_hide();
        createErrDialog("博客站点初始化错误（ERR_CANNOT_INIT）", "未能正确的初始化博客站点。<br />请确保你选择的文件夹是一个空目录，并且你有足够的访问权限，否则可能无法正常初始化。<br />已中止初始化操作，没有任何已有文件被覆盖。<br />以下是错误日志，请将此信息报告给开发者：<br /><br />" + error);
    }


}

function manageSiteByRootDir(rootDir) {
    try {
        JSON.parse(readFileSync(rootDir + "/data/index.json", "utf8"));
        window.location.href = "./article_manager.html?rootdir=" + rootDir;
    } catch (error) {
        createErrDialog("此站点不是有效的博客站点（ERR_CANNOT_PARSE_DATA）", "博客数据文件解析失败。<br />请确保你打开了正确的博客根目录，并且博客数据文件没有损坏。<br />以下是错误日志，请将此信息报告给开发者：<br /><br />" + error);
    }
}

// 渲染标题和诗歌

document.getElementById("interface_title").innerHTML = `<h1>${AppInfo.StartPageInterface.title}</h1><br />`

for(let i=0;i<AppInfo.StartPageInterface.poem.length;i++){
    document.getElementById("poem").innerHTML += `<p>${AppInfo.StartPageInterface.poem[i]}</p>`;
}

// 渲染贡献者列表

document.getElementById("staff_list").innerHTML += `<h3>开发</h3>`

for(let i=0;i< AppInfo["contributers"]["开发"].length;i++){
    document.getElementById("staff_list").innerHTML += `<p><a href="#staff_list" onclick="shell.openExternal('${AppInfo["contributers"]["开发"][i][1]}')">${AppInfo["contributers"]["开发"][i][0]}</a></p>`;
}


document.getElementById("staff_list").innerHTML += `<h3>图标设计</h3>`

for(let i=0;i< AppInfo["contributers"]["图标设计"].length;i++){
    document.getElementById("staff_list").innerHTML += `<p><a href="#staff_list" onclick="shell.openExternal('${AppInfo["contributers"]["图标设计"][i][1]}')">${AppInfo["contributers"]["图标设计"][i][0]}</a></p>`;
}

document.getElementById("staff_list").innerHTML += `<h3>macOS 打包</h3>`

for(let i=0;i< AppInfo["contributers"]["macOS 打包"].length;i++){
    document.getElementById("staff_list").innerHTML += `<p><a href="#staff_list" onclick="shell.openExternal('${AppInfo["contributers"]["macOS 打包"][i][1]}')">${AppInfo["contributers"]["macOS 打包"][i][0]}</a></p>`;
}

document.getElementById("staff_list").innerHTML += `<h3>参与测试人员</h3>`

for(let i=0;i< AppInfo["contributers"]["参与测试人员"].length;i++){
    document.getElementById("staff_list").innerHTML += `<p><a href="#staff_list" onclick="shell.openExternal('${AppInfo["contributers"]["参与测试人员"][i][1]}')">${AppInfo["contributers"]["参与测试人员"][i][0]}</a></p>`;
}




storage.has("last_managed_site", function (error, hasKey) {
    if (hasKey) {
        storage.get("last_managed_site", function (error, data) {
            document.getElementById("last_managed_site").setAttribute("style", "display:block");
            document.getElementById("last_managed_site_title").innerHTML = data["title"];
            document.getElementById("last_managed_site").setAttribute("onclick", `manageSiteByRootDir('${data["rootdir"].replace(/\\/g, "/")}')`);
        });

    } else {

    }
});


document.getElementById("current_program_version").innerHTML = `${currentProgramVersion}`;