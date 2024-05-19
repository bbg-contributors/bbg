const fs = require("fs");
const path = require("path");
const { constants, writeFileSync } = require("fs");
const currentProgramVersion = require("./currentProgramVersion.js");

function updateBlogIndexHtml() {
  if (
    blog["全局主题设置"]["是否使用第三方主题"] === false
  ) {
    fs.rmSync(`${rootDir}/index.html`);
    fs.copyFileSync(
      path.join(__dirname, "default_theme_src/index.html"),
      path.join(rootDir, "index.html"),
      constants.COPYFILE_EXCL,
    );
  }
}

function addSupportOfMultiLanguage() {
  blog["网站语言"] = "简体中文";
}

function check_third_party_theme_compatiblity() {
  if (
    blog["全局主题设置"]["是否使用第三方主题"] === true
    && blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === false
    && blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] !== ""
    && blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] < 20211002
  ) {
    console.warn("由于你正在使用不受支持的第三方主题，已经重置为官方主题。");
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

  if (fs.existsSync(`${rootDir}/static/`))
    fs.rmSync(`${rootDir}/static/`, { recursive: true, force: true });
}

function addSupportForPublicCommentService() {
  blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
}

function addSupportForAnnouncementBoard() {
  blog["启用网站公告"] = false;
  blog["网站公告仅在首页显示"] = true;
  blog["网站公告"] = "";
}

function addSupportOfFriendBook() {
  blog["启用内建友人帐页面"] = true;
  blog["友人帐页面附加信息"] = "";
  blog["友人帐"] = [];
  blog["友人帐页面允许评论"] = true;
}

function thirdPartyThemeReset() {
  blog["全局主题设置"]["是否使用第三方主题"] = false;
  blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = false;
  blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = "";
  blog["全局主题设置"][
    "若使用来自主题商店的第三方主题，则主题的更新发布日期为"
  ] = "";
}

function addSupportForCDNSetting() {
  blog["CDN选择"] = 1;
  blog["CDN路径"] = "https://cdn.jsdelivr.net/npm";
}

function addSupportForCustomCJ() {
  blog["启用自定义CSS"] = false;
  blog["启用自定义JS"] = false;
  blog["自定义CSS"] = "";
  blog["自定义JS"] = "";
}

function addSupportOfArticlePageOrder() {
  blog["文章列表中每页的文章数为"] = 10;
}

function addSupportForContentLicense() {
  blog["全站内容授权协议"] = "reserved";
  blog["不使用全站内容授权协议"] = false;
}

function addSupportForArticleBottomExternalOptions() {
  blog["文章页面显示上一篇下一篇文章导航按钮"] = true;
  blog["提供文章文件下载"] = false;
  blog["提供复制全文到剪贴板的选项"] = false;
}

function addSupportForBBGthemev2() {
  if (blog["全局主题设置"]["是否使用第三方主题"] === true && blog["全局主题设置"]["第三方主题版本"] !== "v2") {
    // 在20220702版本发布前使用v1版本主题的用户
    blog["全局主题设置"]["第三方主题版本"] = "v1";
    blog["全局主题设置"]["第三方主题文件内容"] = [];
  }
  if (blog["全局主题设置"]["是否使用第三方主题"] === false) {
    // 在20220702版本发布前使用官方主题的用户
    blog["全局主题设置"]["第三方主题版本"] = "";
    blog["全局主题设置"]["第三方主题文件内容"] = [];
  }
}

function addSupportForDomainRelatedFunctions() {
  blog["网站域名（包括https://）"] = "";
  blog["在对文章列表进行修改后触发rss生成"] = false;
  blog["在对文章或页面列表进行修改后触发sitemap.txt生成"] = false;
}

function addSupportForExternalFriendListJson() {
  blog["友人帐来自json文件"] = false;
  blog["若友人帐来自json文件，则地址为"] = "";
}

function addSupportForFormattedJson() {
  blog["提高JSON文件的可读性"] = true;
}

function addSupportForSomeSmallUserInterfaceImprovement_First() {
  blog["全局主题设置"]["禁用导航栏的阴影效果"] = false;
  blog["搜索按钮边框颜色设置为暗色"] = false;
  blog["使版心宽度更窄（提高左右页边距）"] = true;
  blog["优先使用衬线字体"] = false;
}

function addSupportForOptionsOfMarkdownRendering() {
  blog["Markdown渲染配置"] = new Object();
  blog["Markdown渲染配置"]["使用markdown文件所在目录作为baseurl"] = true;
  blog["Markdown渲染配置"]["在用户点击图片时显示图片查看器"] = true;
  blog["Markdown渲染配置"]["根据用户屏幕尺寸渲染图片尺寸"] = true;
}

function addSupportForWalineAndDisqus() {
  if (blog["全局评论设置"]["启用waline评论"] === undefined || blog["全局评论设置"]["启用waline评论"] === null) {
    blog["全局评论设置"]["启用waline评论"] = false;
    blog["全局评论设置"]["waline设置"] = new Object();
    blog["全局评论设置"]["waline设置"]["serverurl"] = "";
  }
  if (blog["全局评论设置"]["启用disqus评论"] === undefined || blog["全局评论设置"]["启用disqus评论"] === null) {
    blog["全局评论设置"]["启用disqus评论"] = false;
    blog["全局评论设置"]["disqus设置"] = new Object();
    blog["全局评论设置"]["disqus设置"]["shortname"] = "";
  }
}

function improveBackgroundImageSettings() {
  if(blog["全局主题设置"]["是否使用背景图像"] && blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"]) {
    // 如果之前版本中启用了“将网站背景设置为随机二次元图片”则将背景图片配置转换为“将某个url作为背景图像”，url自动填入之前所使用的默认二次元图片api地址
    delete blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"];
    blog["全局主题设置"]["是否使用纯色背景（优先级高于背景图像）"] = false;
    blog["全局主题设置"]["若使用纯色背景，颜色为"] = "";
    blog["全局主题设置"]["是否使用背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"] = "https://api.paugram.com/wallpaper/";
  } else {
    delete blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"];
    blog["全局主题设置"]["是否使用纯色背景（优先级高于背景图像）"] = false;
    blog["全局主题设置"]["若使用纯色背景，颜色为"] = "";
    blog["全局主题设置"]["是否使用背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"] = "";
  }
}

function fixBackgroundImageSettings() {
  if (blog["全局主题设置"]["是否使用背景图像"] === true && blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] === false && blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"] === false && blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"] === ""){
    blog["全局主题设置"]["是否使用背景图像"] = false;
  }
}

function addSupportToCustomizeI18nText(){
  blog["自定义界面文本"] = {
    "启用": false,
    "列表": []
  };
}

function addSupportForAdjustingLinkColor() {
  blog["全局主题设置"]["链接颜色"] = "#0d6efd";
}

function addTimestampPropertyToEveryArticle() {
  for (let i = 0; i < blog["文章列表"].length; i++) {
    try {
      blog["文章列表"][i]["创建时间（时间戳）"] = new Date(blog["文章列表"][i]["创建日期"]).getTime() + 28800000;
      delete blog["文章列表"][i]["创建日期"];
    } catch (e) {
      blog["文章列表"][i]["创建时间（时间戳）"] = 0;
    }

    try {
      blog["文章列表"][i]["修改时间（时间戳）"] = new Date(blog["文章列表"][i]["修改日期"]).getTime() + 28800000;
      delete blog["文章列表"][i]["修改日期"];
    } catch (e) {
      blog["文章列表"][i]["修改时间（时间戳）"] = 0;
    }
  }
}
    
function addLive2DWidgetSupport() {
  blog["全局主题设置"]["是否启用live2d-widget"] = false;
  blog["全局主题设置"]["live2d-widget设置"] = {
    "widget路径": "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/",
    "tips路径": "",
    "api路径": "",
    "功能设置": {
      "hitokoto": true,
      "asteroids": false,
      "switch-model": false,
      "switch-texture": false,
      "photo": false,
      "info": true,
      "quit": true
    }};
}

module.exports = function () {
  const currentBlogVersion = parseInt(
    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"],
    10,
  );

  // 如果不包含有效的博客数据文件

  blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] = currentProgramVersion;

  if (currentBlogVersion <= 20210817) {
    cleanStaticRes();
  }

  if (currentBlogVersion <= 20210828) {
    addSupportForPublicCommentService();
  }

  if (currentBlogVersion <= 20210925) {
    thirdPartyThemeReset();
  }

  if (currentBlogVersion <= 20211205) {
    addSupportOfMultiLanguage();
  }

  if (currentBlogVersion <= 20220119) {
    addSupportForAnnouncementBoard();
  }

  if (currentBlogVersion <= 20220123) {
    addSupportOfFriendBook();
  }

  if (currentBlogVersion <= 20220202) {
    addSupportForCDNSetting();
  }

  if (currentBlogVersion <= 20220210) {
    addSupportForCustomCJ();
  }

  if (currentBlogVersion <= 20220213) {
    addSupportOfArticlePageOrder();
  }

  if (currentBlogVersion <= 20220304) {
    addSupportForContentLicense();
  }

  if (currentBlogVersion <= 20220604) {
    addSupportForArticleBottomExternalOptions();
  }

  if (currentBlogVersion <= 20220624) {
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
  }

  if (currentBlogVersion <= 20220807) {
    addSupportForExternalFriendListJson();
  }

  if (currentBlogVersion <= 20220930) {
    addSupportForFormattedJson();
  }

  if (currentBlogVersion <= 20221029) {
    addSupportForSomeSmallUserInterfaceImprovement_First();
  }

  if (currentBlogVersion <= 20221031) {
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion <= 20230526) {
    improveBackgroundImageSettings();
  }

  if (currentBlogVersion <= 20230703) {
    fixBackgroundImageSettings();
    addSupportToCustomizeI18nText();
  }

  if (currentBlogVersion <= 20231015) {
    addSupportForAdjustingLinkColor();
  }

  if (currentBlogVersion <= 20240103) {
    addSupportForWalineAndDisqus();
  }

  if (currentBlogVersion <= 20240518) {
    addTimestampPropertyToEveryArticle();
    addLive2DWidgetSupport();
  }

  check_third_party_theme_compatiblity();
  updateBlogIndexHtml();

  if (blog["提高JSON文件的可读性"]) {
    writeFileSync(path.join(rootDir, "data/index.json"), JSON.stringify(blog, null, 2));
  }else{
    writeFileSync(path.join(rootDir, "data/index.json"), JSON.stringify(blog));
  }

  // console.log("博客数据更新成功。");
};
