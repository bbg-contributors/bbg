const dialog = require("electron").remote.dialog;
const { readFileSync, writeFileSync } = require("fs");

module.exports= function() {
    let third_party_theme_path = dialog.showOpenDialogSync({ properties: ["openFile"],filters:[
        { name: 'BBG主题文件（*.bbgtheme）', extensions: ['bbgtheme'] }
      ] });
    if (third_party_theme_path === undefined) {
        window.alert("你没有选择任何主题文件。博客的主题将不会改变。");
        window.location.reload();
    } else {
        let themeContent = readFileSync(third_party_theme_path[0], "utf8");
        writeFileSync(`${rootDir}/index.html`, themeContent);
        blog["全局主题设置"]["是否使用第三方主题"] = true;
        BlogInstance.writeBlogData();
        window.alert("已经更换为第三方主题。");
        window.location.reload();
    }
}