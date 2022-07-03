const { rmSync } = require("fs");
const dialog = require("@electron/remote").dialog;

module.exports = function (i) {
  const submitDialog = dialog.showMessageBoxSync({
    message: "是否确认删除此页面？*此操作不可逆",

    type: "question",
    buttons: [
      "是的，直接删除吧",
      "不删除，手滑点错了",
    ],

  });

  if (submitDialog === 0) {
    // 用户选择删除

    try {
      rmSync(`${rootDir}/data/pages/${blog["页面列表"][i]["文件名"]}`);
    } catch (error) {

    }

    blog["页面列表"].splice(i, 1);
    BlogInstance.writeBlogData();

    sitemap_hook();

    window.location.reload();
  } else {
    ;
  }
};
