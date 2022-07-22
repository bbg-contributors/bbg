const { readFileSync, writeFileSync } = require("fs");
const dialog = require("@electron/remote").dialog;

module.exports = function () {
  const third_party_theme_path = dialog.showOpenDialogSync({
    properties: ["openFile"],
    filters: [
      { name: "BBG主题文件 v2（*.bbgtheme2）", extensions: ["bbgtheme2"] },
    ],
  });
  apply_thirdparty_theme_v2_core(third_party_theme_path[0],true);
};
