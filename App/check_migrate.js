const fs = require("fs");
const {constants} = require("fs");
const dialog = require("electron").remote.dialog;
const currentProgramVersion = require("./currentProgramVersion.js");


module.exports =  function () {


    let currentBlogVersion = blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] ;

    if (currentBlogVersion === undefined ||currentBlogVersion === null ||currentBlogVersion === "") {
        dialog.showErrorBox("博客数据文件不包含有效的版本号信息（ERR_NO_VERSION）", "博客数据文件可能已经损坏。");
        window.location.href = "./start.html";

    }

    


    

    if (currentBlogVersion === 20210720 || currentBlogVersion === "20210715" || currentBlogVersion === 20210727) {
        let submitDialog = dialog.showMessageBoxSync({
            message: "此站点是由旧版的 BBG 所创建的。因此，你必须更新博客数据文件才能继续管理它。所有的文章、页面和设定都将保留。",
            type: "question",
            buttons: [
                "更新博客数据文件",
                "取消更新进程"
            ]



        });


        if (submitDialog === 0) {
            blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] = currentProgramVersion;
            fs.writeFileSync(rootDir + "/data/index.json", JSON.stringify(blog));
            fs.rmSync(`${rootDir}/index.html`);
            fs.copyFileSync(__dirname + "/blog_source/index.html", rootDir + "/index.html", constants.COPYFILE_EXCL);


            window.alert("博客数据更新成功。");

        } else {
            window.alert("你取消了更新进程。");
            window.location.href = "./start.html";
        }
    }


    if (blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] > currentProgramVersion) {
        dialog.showErrorBox("不兼容此版本的博客数据文件（ERR_BAD_VERSION）", "检测到新版数据文件。请使用新版 BBG 管理站点，以免损坏数据。");
        window.location.href = "./start.html";
    }

}