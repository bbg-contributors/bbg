const fs = require("fs");
const { constants } = require("fs");
const dialog = require("electron").remote.dialog;
const currentProgramVersion = require("./currentProgramVersion.js");

function updateBlogIndexHtml() {
  if (
    blog["全局主题设置"]["是否使用第三方主题"] === false
  ) {
    fs.rmSync(`${rootDir}/index.html`);
    fs.copyFileSync(
      __dirname + "/blog_source/index.html",
      rootDir + "/index.html",
      constants.COPYFILE_EXCL
    );
  }
}

function check_third_party_theme_compatiblity() {
  if (
    blog["全局主题设置"]["是否使用第三方主题"] === true &&
    blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === false &&
    blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] !== "" &&
    blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] < 20211002
  ) {
    window.alert("由于你正在使用不受支持的第三方主题，已经重置为官方主题。");
    thirdPartyThemeReset();
  }
}

function cleanStaticRes() {
  delete blog["静态资源"];
  delete blog["全局主题设置"]["若使用背景图像，设置为"][
    "将/static/background.webp作为背景图像"
  ];
  blog["全局主题设置"]["若使用背景图像，设置为"][
    "将网站根目录下的background.webp作为背景图像"
  ] = false;

  if (fs.existsSync(`${rootDir}/static/`)) {
    fs.rmSync(`${rootDir}/static/`, { recursive: true, force: true });
  }
}

function addSupportForPublicCommentService() {
  blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
}

function thirdPartyThemeReset() {
  blog["全局主题设置"]["是否使用第三方主题"] = false;
  blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = false;
  blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = "";
  blog["全局主题设置"][
    "若使用来自主题商店的第三方主题，则主题的更新发布日期为"
  ] = "";
}

module.exports = function () {
  let currentBlogVersion = parseInt(
    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"],
    10
  );

  // 如果不包含有效的博客数据文件

  if (
    currentBlogVersion === undefined ||
    currentBlogVersion === null ||
    currentBlogVersion === ""
  ) {
    dialog.showErrorBox(
      "博客数据文件不包含有效的版本号信息（ERR_NO_VERSION）",
      "博客数据文件可能已经损坏。"
    );
    window.location.href = "./start.html";
  } else {
    // 如果数据文件的版本是旧版

    if (currentBlogVersion < currentProgramVersion) {
      let submitDialog = dialog.showMessageBoxSync({
        message:
          "此站点是由旧版的 BBG 所创建的。因此，你必须更新博客数据文件才能继续管理它。所有的文章、页面和设定都将保留。如果你正在使用第三方主题，它仍可以继续使用，但是有可能遇到不兼容，如果遇到不兼容请切换回官方主题或更新第三方主题。",
        type: "question",
        buttons: ["更新博客数据文件", "取消更新进程"],
      });

      if (submitDialog === 0) {
        blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] =
          currentProgramVersion;

        if (currentBlogVersion <= 20210812) {
          thirdPartyThemeReset();
          updateBlogIndexHtml();
          cleanStaticRes();
          addSupportForPublicCommentService();
        }

        if (currentBlogVersion <= 20210817 && currentBlogVersion >= 20210813) {
          thirdPartyThemeReset();
          updateBlogIndexHtml();

          cleanStaticRes();
          addSupportForPublicCommentService();
        }

        if (
          currentBlogVersion === 20210819 ||
          currentBlogVersion === 20210822 ||
          currentBlogVersion === 20210826 ||
          currentBlogVersion === 20210825 ||
          currentBlogVersion === 20210828
        ) {
          thirdPartyThemeReset();
          updateBlogIndexHtml();
          addSupportForPublicCommentService();
        }

        if (currentBlogVersion === 20210925) {
          thirdPartyThemeReset();
          updateBlogIndexHtml();
        }

        if (currentBlogVersion === 20211002 || currentBlogVersion === 20211003 || currentBlogVersion === 20211016 || currentBlogVersion === 20211022 || currentBlogVersion === 20211106) {
          check_third_party_theme_compatiblity();
          updateBlogIndexHtml();
        }




        fs.writeFileSync(rootDir + "/data/index.json", JSON.stringify(blog));

        window.alert("博客数据更新成功。");
      } else {
        window.alert("你取消了更新进程。");
        window.location.href = "./start.html";
      }
    }
  }

  if (
    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] >
    currentProgramVersion
  ) {
    dialog.showErrorBox(
      "不兼容此版本的博客数据文件（ERR_BAD_VERSION）",
      "检测到新版数据文件。请使用新版 BBG 管理站点，以免损坏数据。"
    );
    window.location.href = "./start.html";
  }
};
