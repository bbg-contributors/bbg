const dialog = require("@electron/remote").dialog;
const { rmSync } = require("fs");

module.exports = function (i) {
  const submitDialog = dialog.showMessageBoxSync({
    message: "是否确认删除此文章？*此操作不可逆",

    type: "question",
    buttons: [
      "是的，直接删除吧",
      "不删除，手滑点错了",
    ],

  });

  if (submitDialog === 0) {
    // 用户选择删除

    try {
      rmSync(`${rootDir}/data/articles/${blog["文章列表"][i]["文件名"]}`);
    } catch (error) {

    }

    blog["文章列表"].splice(i, 1);
    BlogInstance.writeBlogData();

    rss_hook();
    sitemap_hook();

    window.location.reload();
  } else {

  }
};
