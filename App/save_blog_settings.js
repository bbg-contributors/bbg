
const dialog = require("@electron/remote").dialog;

module.exports = function () {
  const blog_settings_description = document.getElementById("blog_settings_description").value;
  const blog_settings_title = document.getElementById("blog_settings_title").value;
  const blog_settings_titlebar_bgcolor = document.getElementById("blog_settings_titlebar_bgcolor").value;
  const blog_settings_titlebar_textcolor = document.getElementById("blog_settings_titlebar_textcolor").value;
  const blog_settings_howmany_article_in_a_page = document.getElementById("blog_settings_howmany_article_in_a_page").value;
  let blog_settings_cdn_path;
  let blog_settings_cdn_mode;
  try {
    blog_settings_is_valine_enabled = document.getElementById("blog_settings_is_valine_enabled").checked;
    blog_settings_valine_appid = document.getElementById("blog_settings_valine_appid").value;
    blog_settings_valine_appkey = document.getElementById("blog_settings_valine_appkey").value;
  } catch (e) {
    console.log(e);
  }

  const blog_settings_bottom_information = document.getElementById("blog_settings_bottom_information").value;
  const blog_settings_is_using_acg_bg = document.getElementById("blog_settings_is_using_acg_bg").checked;
  const website_announcement_enabled = document.getElementById("website_announcement_enabled").checked;
  const website_announcement_indexonly = document.getElementById("website_announcement_indexonly").checked;
  const website_announcement_content = document.getElementById("website_announcement_content").value;
  const blog_settings_enable_custom_css = document.getElementById("blog_settings_enable_custom_css").checked;
  const blog_settings_enable_custom_js = document.getElementById("blog_settings_enable_custom_js").checked;
  const blog_settings_custom_css = document.getElementById("blog_settings_custom_css").value;
  const blog_settings_custom_js = document.getElementById("blog_settings_custom_js").value;
  const blog_settings_content_license = document.getElementById("blog_settings_content_license").value;
  const blog_content_license_enabled = document.getElementById("blog_content_license_enabled").checked;

  const enable_article_bottom_nav = document.getElementById("enable_article_bottom_nav").checked;
  const enable_article_file_download = document.getElementById("enable_article_file_download").checked;
  const enable_copy_full_article_to_clipboard = document.getElementById("enable_copy_full_article_to_clipboard").checked;

  if (document.getElementById("cdn_cho_1").checked === true) {
    blog_settings_cdn_path = document.getElementById("blog_setting_cdn_frm_1").value;
    blog_settings_cdn_mode = 1;
  } else {
    blog_settings_cdn_path = document.getElementById("blog_setting_cdn_frm_2").value;
    blog_settings_cdn_mode = 2;
  }

  blog["博客标题"] = blog_settings_title;
  blog["博客描述（副标题）"] = blog_settings_description;
  blog["全局主题设置"]["标题栏背景颜色"] = blog_settings_titlebar_bgcolor;
  blog["全局主题设置"]["标题栏文字颜色"] = blog_settings_titlebar_textcolor;
  blog["文章列表中每页的文章数为"] = blog_settings_howmany_article_in_a_page;
  blog["全站内容授权协议"] = blog_settings_content_license;
  blog["不使用全站内容授权协议"] = blog_content_license_enabled;
  blog["文章页面显示上一篇下一篇文章导航按钮"] = enable_article_bottom_nav;
  blog["提供文章文件下载"] = enable_article_file_download;
  blog["提供复制全文到剪贴板的选项"] = enable_copy_full_article_to_clipboard;

  blog["底部信息（格式为markdown）"] = blog_settings_bottom_information;

  if (blog_settings_is_using_acg_bg === true) {
    blog["全局主题设置"]["是否使用背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"] = true;
  } else {
    blog["全局主题设置"]["是否使用背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"] = false;
  }
  try {
    if (blog_settings_is_valine_enabled === true)
      blog["全局评论设置"]["启用valine评论"] = true;
    else
      blog["全局评论设置"]["启用valine评论"] = false;
  } catch (error) {

  }

  try {
    blog["全局评论设置"]["valine设置"].leancloud_appid = blog_settings_valine_appid;
    blog["全局评论设置"]["valine设置"].leancloud_appkey = blog_settings_valine_appkey;
  } catch (error) {

  }

  if (document.getElementById("sitelang_simplified_chinese").selected === true)
    blog["网站语言"] = "简体中文";

  if (document.getElementById("sitelang_english").selected === true)
    blog["网站语言"] = "English";

  blog["启用网站公告"] = website_announcement_enabled;
  blog["网站公告仅在首页显示"] = website_announcement_indexonly;
  blog["网站公告"] = website_announcement_content;

  blog["CDN选择"] = blog_settings_cdn_mode;
  blog["CDN路径"] = blog_settings_cdn_path;

  blog["启用自定义CSS"] = blog_settings_enable_custom_css;
  blog["启用自定义JS"] = blog_settings_enable_custom_js;
  blog["自定义CSS"] = blog_settings_custom_css;
  blog["自定义JS"] = blog_settings_custom_js;

  BlogInstance.writeBlogData();
};
