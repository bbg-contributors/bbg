
const {rmSync} = require("fs");
const AdmZip = require("adm-zip");

module.exports = function(third_party_theme_path){
    console.log(third_party_theme_path);
    if (third_party_theme_path === undefined) {
        window.alert("你没有选择任何主题文件。博客的主题将不会改变。");
        window.location.reload();
      } else {
        const zip = new AdmZip(third_party_theme_path);
        zip.extractAllTo(rootDir, true);
        const content = zip.getEntries();
        const wcontent = [];
        content.forEach((entry) => {
          wcontent.push(entry.entryName);
        });
        blog["全局主题设置"]["是否使用第三方主题"] = true;
        blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = true;
        blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = "";
        blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] = "";
        blog["全局主题设置"]["第三方主题版本"] = "v2";
        blog["全局主题设置"]["第三方主题文件内容"] = wcontent;
        BlogInstance.writeBlogData();
        window.alert("已经更换为第三方主题。");
        if(third_party_theme_path.indexOf("temp_theme_downloaded_by_bbg_online_theme_store.zip") !== -1){
            rmSync(rootDir+"/temp_theme_downloaded_by_bbg_online_theme_store.zip");
        }
        window.location.reload();
      }
}