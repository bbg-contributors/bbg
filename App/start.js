
const fs = require("fs");

const dialog = require('@electron/remote').dialog;
const shell = require('@electron/remote').shell;
const AppPath = require('@electron/remote').app.getPath('userData');
const { copyFileSync, constants, readFileSync } = require('fs');
const storage = require("electron-json-storage");

storage.setDataPath(AppPath);

const getAppInfo = require("./getAppInfo.js");
const AppInfo = getAppInfo();
const currentProgramVersion = require("./currentProgramVersion.js");
const check_update = require("./check_update.js");


document.getElementsByTagName("title")[0].innerHTML = "开始使用 Baiyang-lzy's Blog Generator";

let create_new_site_dialog = new bootstrap.Modal(document.getElementById('create-new-site-dialog'));
let err_dialog = new bootstrap.Modal(document.getElementById('err-dialog'));
let info_dialog = new bootstrap.Modal(document.getElementById('info-dialog'));

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

function createInfoDialog(title, content) {

    info_dialog.show();
    document.getElementById("info-dialog-title").innerHTML = title;
    document.getElementById("info-dialog-content").innerHTML = content;
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

function openStaffDialog(){

    let staff_string = "";
    staff_string+="<h3>图标设计</h3>";
    for(let i=0;i<AppInfo.contributers["图标设计"].length;i++){
        staff_string += `<p><a href="#" onclick="shell.openExternal('${AppInfo.contributers["图标设计"][i][1]}')">${AppInfo.contributers["图标设计"][i][0]}</a></p>`
    }

    staff_string+="<h3>开发</h3>";
    for(let i=0;i<AppInfo.contributers["开发"].length;i++){
        staff_string += `<p><a href="#" onclick="shell.openExternal('${AppInfo.contributers["开发"][i][1]}')">${AppInfo.contributers["开发"][i][0]}</a></p>`
    }

    staff_string+="<h3>打包</h3>";
    for(let i=0;i<AppInfo.contributers["打包"].length;i++){
        staff_string += `<p><a href="#" onclick="shell.openExternal('${AppInfo.contributers["打包"][i][1]}')">${AppInfo.contributers["打包"][i][0]}</a></p>`
    }

    staff_string+="<h3>参与测试人员</h3>";
    for(let i=0;i<AppInfo.contributers["参与测试人员"].length;i++){
        staff_string += `<p><a href="#" onclick="shell.openExternal('${AppInfo.contributers["参与测试人员"][i][1]}')">${AppInfo.contributers["参与测试人员"][i][0]}</a></p>`
    }

    createInfoDialog("Staff 名单",staff_string)
}

function openGroupDialog(){
    createInfoDialog("加入我们的群组",`
    
    <p>QQ 群：983538695</p>
    <p>本群组的讨论范围包括计算机、生活、ACGN文化和体验等等，欢迎感兴趣者加入。有 BBG 使用相关建议和问题亦可在此群组中提出。</p>
    `);
}

function openCopyrightDialog(){
    createInfoDialog("关于应用图标的版权声明",`
    <p>应用图标由 scientificworld 设计，由贴吧的滑稽表情图像和火焰猫燐图像拼合而成。滑稽表情图像版权归百度网讯公司所有、火焰猫燐图像版权归 Pixiv 画师乃菜香【2日目東ヒ-49a】（Pixiv 用户ID：28850）所有。</p><p>本项目是非商业用途的开源项目，无意侵犯任何人的版权。如果你认为相关图像侵犯了你的权益，请投递电子邮件到开发者的邮箱： baiyang-lzy@outlook.com 。我会第一时间做出处理。</p>
    `)
}