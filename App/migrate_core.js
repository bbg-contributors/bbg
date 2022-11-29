const fs = require("fs");
const path = require("path");
const { constants } = require("fs");
const currentProgramVersion = require("./currentProgramVersion.js");

function updateBlogIndexHtml () {
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

function addSupportOfMultiLanguage () {
  blog["网站语言"] = "简体中文";
}

function check_third_party_theme_compatiblity () {
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

function cleanStaticRes () {
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

function addSupportForPublicCommentService () {
  blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
}

function addSupportForAnnouncementBoard () {
  blog["启用网站公告"] = false;
  blog["网站公告仅在首页显示"] = true;
  blog["网站公告"] = "";
}

function addSupportOfFriendBook () {
  blog["启用内建友人帐页面"] = true;
  blog["友人帐页面附加信息"] = "";
  blog["友人帐"] = [];
  blog["友人帐页面允许评论"] = true;
}

function thirdPartyThemeReset () {
  blog["全局主题设置"]["是否使用第三方主题"] = false;
  blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = false;
  blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = "";
  blog["全局主题设置"][
    "若使用来自主题商店的第三方主题，则主题的更新发布日期为"
  ] = "";
}

function addSupportForCDNSetting () {
  blog["CDN选择"] = 1;
  blog["CDN路径"] = "https://cdn.jsdelivr.net/npm";
}

function addSupportForCustomCJ () {
  blog["启用自定义CSS"] = false;
  blog["启用自定义JS"] = false;
  blog["自定义CSS"] = "";
  blog["自定义JS"] = "";
}

function addSupportOfArticlePageOrder () {
  blog["文章列表中每页的文章数为"] = 10;
}

function addSupportForContentLicense () {
  blog["全站内容授权协议"] = "reserved";
  blog["不使用全站内容授权协议"] = false;
}

function addSupportForArticleBottomExternalOptions () {
  blog["文章页面显示上一篇下一篇文章导航按钮"] = true;
  blog["提供文章文件下载"] = false;
  blog["提供复制全文到剪贴板的选项"] = false;
}

function addSupportForBBGthemev2 () {
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

function addSupportForDomainRelatedFunctions () {
  blog["网站域名（包括https://）"] = "";
  blog["在对文章列表进行修改后触发rss生成"] = false;
  blog["在对文章或页面列表进行修改后触发sitemap.txt生成"] = false;
}

function addSupportForExternalFriendListJson(){
  blog["友人帐来自json文件"] = false;
  blog["若友人帐来自json文件，则地址为"] = "";
}

function addSupportForFormattedJson(){
  blog["提高JSON文件的可读性"] = true;
}

function addSupportForSomeSmallUserInterfaceImprovement_First(){
  blog["全局主题设置"]["禁用导航栏的阴影效果"] = false;
  blog["搜索按钮边框颜色设置为暗色"] = false;
  blog["使版心宽度更窄（提高左右页边距）"] = true;
  blog["优先使用衬线字体"] = false;
}

function addSupportForOptionsOfMarkdownRendering(){
  blog["Markdown渲染配置"] = new Object();
  blog["Markdown渲染配置"]["使用markdown文件所在目录作为baseurl"] = true;
  blog["Markdown渲染配置"]["在用户点击图片时显示图片查看器"] = true;
  blog["Markdown渲染配置"]["根据用户屏幕尺寸渲染图片尺寸"] = true;
}

module.exports = function () {
  const currentBlogVersion = parseInt(
    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"],
    10,
  );

  // 如果不包含有效的博客数据文件

  blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] = currentProgramVersion;

  if (currentBlogVersion <= 20210812) {
    thirdPartyThemeReset();
    cleanStaticRes();
    addSupportForPublicCommentService();
    addSupportOfMultiLanguage();
    addSupportForAnnouncementBoard();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion <= 20210817 && currentBlogVersion >= 20210813) {
    thirdPartyThemeReset();

    cleanStaticRes();
    addSupportForPublicCommentService();
    addSupportOfMultiLanguage();
    addSupportForAnnouncementBoard();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (
    currentBlogVersion === 20210819
      || currentBlogVersion === 20210822
      || currentBlogVersion === 20210826
      || currentBlogVersion === 20210825
      || currentBlogVersion === 20210828
  ) {
    thirdPartyThemeReset();
    addSupportForPublicCommentService();
    addSupportOfMultiLanguage();
    addSupportForAnnouncementBoard();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20210925) {
    thirdPartyThemeReset();
    addSupportOfMultiLanguage();
    addSupportForAnnouncementBoard();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20211002 || currentBlogVersion === 20211003 || currentBlogVersion === 20211016 || currentBlogVersion === 20211022 || currentBlogVersion === 20211106) {
    check_third_party_theme_compatiblity();
    addSupportOfMultiLanguage();
    addSupportForAnnouncementBoard();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20211205) {
    check_third_party_theme_compatiblity();
    addSupportOfMultiLanguage();
    addSupportForAnnouncementBoard();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20220119) {
    check_third_party_theme_compatiblity();
    addSupportForAnnouncementBoard();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }
  if (currentBlogVersion === 20220123) {
    check_third_party_theme_compatiblity();
    addSupportOfFriendBook();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20220202) {
    check_third_party_theme_compatiblity();
    addSupportForCDNSetting();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }
  if (currentBlogVersion === 20220210) {
    check_third_party_theme_compatiblity();
    addSupportForCustomCJ();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }
  if (currentBlogVersion === 20220211 || currentBlogVersion === 20220212) {
    check_third_party_theme_compatiblity();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20220213) {
    check_third_party_theme_compatiblity();
    addSupportOfArticlePageOrder();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20220304) {
    check_third_party_theme_compatiblity();
    addSupportForContentLicense();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion >= 20220314 && currentBlogVersion <= 20220604) {
    check_third_party_theme_compatiblity();
    addSupportForArticleBottomExternalOptions();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if (currentBlogVersion === 20220611 || currentBlogVersion === 20220624) {
    check_third_party_theme_compatiblity();
    addSupportForBBGthemev2();
    addSupportForDomainRelatedFunctions();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if(currentBlogVersion > 20220624 && currentBlogVersion <= 20220807){
    check_third_party_theme_compatiblity();
    addSupportForExternalFriendListJson();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if(currentBlogVersion >= 20220808 && currentBlogVersion <= 20220930){
    check_third_party_theme_compatiblity();
    addSupportForFormattedJson();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if(currentBlogVersion >= 20220931 && currentBlogVersion <= 20221029){
    check_third_party_theme_compatiblity();
    addSupportForSomeSmallUserInterfaceImprovement_First();
    addSupportForOptionsOfMarkdownRendering();
  }

  if(currentBlogVersion === 20221030){
    check_third_party_theme_compatiblity();
    addSupportForOptionsOfMarkdownRendering();
  }

  if(currentBlogVersion === 20221031){
    check_third_party_theme_compatiblity();
    addSupportForOptionsOfMarkdownRendering();
  }

  check_third_party_theme_compatiblity();
  updateBlogIndexHtml();

  fs.writeFileSync(`${rootDir}/data/index.json`, JSON.stringify(blog));

  // console.log("博客数据更新成功。");
};
