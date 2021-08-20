const fs = require("fs");
const { constants } = require("fs");
const dialog = require("electron").remote.dialog;
const currentProgramVersion = require("./currentProgramVersion.js");


module.exports = function () {


    let currentBlogVersion = blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"];

    // 如果不包含有效的博客数据文件

    if (currentBlogVersion === undefined || currentBlogVersion === null || currentBlogVersion === "") {
        dialog.showErrorBox("博客数据文件不包含有效的版本号信息（ERR_NO_VERSION）", "博客数据文件可能已经损坏。");
        window.location.href = "./start.html";

    } else {

        // 如果数据文件的版本是旧版

        if (parseInt(currentBlogVersion, 10) < currentProgramVersion) {
            let submitDialog = dialog.showMessageBoxSync({
                message: "此站点是由旧版的 BBG 所创建的。因此，你必须更新博客数据文件才能继续管理它。所有的文章、页面和设定都将保留。如果你正在使用第三方主题，它仍可以继续使用，但是有可能遇到不兼容，如果遇到不兼容请切换回官方主题或更新第三方主题。",
                type: "question",
                buttons: ["更新博客数据文件", "取消更新进程"]
            });

            if (submitDialog === 0) {
                blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] = currentProgramVersion;

                if (parseInt(currentBlogVersion, 10) <= 20210812) {
                    blog["全局主题设置"]["是否使用第三方主题"] = false;
                    fs.rmSync(`${rootDir}/index.html`);
                    fs.copyFileSync(__dirname + "/blog_source/index.html", rootDir + "/index.html", constants.COPYFILE_EXCL);
               
                    delete blog["静态资源"];
                    delete blog["全局主题设置"]["若使用背景图像，设置为"]["将/static/background.webp作为背景图像"];
                    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = false;

                    if(fs.existsSync(`${rootDir}/static/`)){
                        fs.rmSync(`${rootDir}/static/`,{ recursive: true, force: true });
                    }
                }

                if (parseInt(currentBlogVersion, 10) <= 20210817 && parseInt(currentBlogVersion, 10) >= 20210813) {
                    if (blog["全局主题设置"]["是否使用第三方主题"] === false) {
                        fs.rmSync(`${rootDir}/index.html`);
                        fs.copyFileSync(__dirname + "/blog_source/index.html", rootDir + "/index.html", constants.COPYFILE_EXCL);
                    } else {

                    }

                    delete blog["静态资源"];
                    delete blog["全局主题设置"]["若使用背景图像，设置为"]["将/static/background.webp作为背景图像"];
                    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = false;
                
                    if(fs.existsSync(`${rootDir}/static/`)){
                        fs.rmSync(`${rootDir}/static/`,{ recursive: true, force: true });
                    }
                }

                


                fs.writeFileSync(rootDir + "/data/index.json", JSON.stringify(blog));

                window.alert("博客数据更新成功。");

            } else {
                window.alert("你取消了更新进程。");
                window.location.href = "./start.html";
            }
        }
    }


    if (blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] > currentProgramVersion) {
        dialog.showErrorBox("不兼容此版本的博客数据文件（ERR_BAD_VERSION）", "检测到新版数据文件。请使用新版 BBG 管理站点，以免损坏数据。");
        window.location.href = "./start.html";
    }

}