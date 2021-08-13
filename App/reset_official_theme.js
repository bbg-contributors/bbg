const {copyFileSync,rmSync,constants} =require("fs");

module.exports = function(){
    rmSync(`${rootDir}/index.html`);
    copyFileSync(__dirname + "/blog_source/index.html", rootDir + "/index.html", constants.COPYFILE_EXCL);
    blog["全局主题设置"]["是否使用第三方主题"] = false;
    BlogInstance.writeBlogData();
    window.alert("已经将此站点的主题重置为默认的官方主题");
    window.location.reload();
}