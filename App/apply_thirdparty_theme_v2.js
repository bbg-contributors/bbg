const { readFileSync, writeFileSync } = require("fs");
const dialog = require("@electron/remote").dialog;
const AdmZip = require("adm-zip");

module.exports = function () {
  const third_party_theme_path = dialog.showOpenDialogSync({
    properties: ["openFile"],
    filters: [
      { name: "BBG主题文件 v2（*.bbgtheme2）", extensions: ["bbgtheme2"] },
    ],
  });
  if (third_party_theme_path === undefined) {
    window.alert("你没有选择任何主题文件。博客的主题将不会改变。");
    window.location.reload();
  } else {
    const zip = new AdmZip(third_party_theme_path[0]);
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
    window.location.reload();
  }
};
