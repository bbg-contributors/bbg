
const {rmSync} = require("fs");
const AdmZip = require("adm-zip");
const e = require("express");

module.exports = function(third_party_theme_path,isFromLocalFile,theme_name="",theme_date=""){
  console.log(third_party_theme_path);
  if (third_party_theme_path === undefined) {
    window.alert("你没有选择任何主题文件。博客的主题将不会改变。");
    window.location.reload();
  } else {
    const zip = new AdmZip(third_party_theme_path);

    if (
      blog["全局主题设置"]["第三方主题文件内容"] !== undefined
      && blog["全局主题设置"]["第三方主题文件内容"] !== null
      && blog["全局主题设置"]["第三方主题文件内容"] !== []
      && blog["全局主题设置"]["第三方主题文件内容"] !== ""
    ) {


      try {
        rmSync(`${rootDir}/index.html`);
      } catch (error) {
        
      }

      // 确保有东西可删
      for (i in blog["全局主题设置"]["第三方主题文件内容"]) {
        try {
          rmSync(path.join(rootDir, "/" + blog["全局主题设置"]["第三方主题文件内容"][i]),{recursive: true});
        } catch (error) {

        }
        
      }
      

    }else{
      try {
        rmSync(`${rootDir}/index.html`);
      } catch(error){

      }
    }


    zip.extractAllTo(rootDir, true);
    const content = zip.getEntries();
    const wcontent = [];
    content.forEach((entry) => {
      wcontent.push(entry.entryName);
    });
    blog["全局主题设置"]["是否使用第三方主题"] = true;


    if(isFromLocalFile){
      blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = true;
      blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = "";
      blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] = "";
    }else{
      blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = false;
      blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = theme_name;
      blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] = theme_date;
    }



    blog["全局主题设置"]["第三方主题版本"] = "v2";
    blog["全局主题设置"]["第三方主题文件内容"] = wcontent;
    BlogInstance.writeBlogData();
    window.alert(langdata.OK[lang_name]);
    if(third_party_theme_path.indexOf("temp_theme_downloaded_by_bbg_online_theme_store.zip") !== -1){
      rmSync(rootDir+"/temp_theme_downloaded_by_bbg_online_theme_store.zip");
    }
    window.location.reload();
  }
};