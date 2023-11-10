
const dialog = require("@electron/remote").dialog;
const doNothing = require("./doNothing.js");
const toast_creator = require("./toast_creator.js");

module.exports = function () {

  save_blog_settings_operate_success = true;

  const blog_settings_description = document.getElementById("blog_settings_description").value;
  const blog_settings_title = document.getElementById("blog_settings_title").value;
  const blog_settings_titlebar_bgcolor = document.getElementById("blog_settings_titlebar_bgcolor").value;
  const blog_settings_titlebar_textcolor = document.getElementById("blog_settings_titlebar_textcolor").value;
  const blog_settings_linkcolor = document.getElementById("blog_settings_linkcolor").value;
  const blog_settings_howmany_article_in_a_page = document.getElementById("blog_settings_howmany_article_in_a_page").value;
  let blog_settings_cdn_path;
  let blog_settings_cdn_mode;

  const blog_settings_bottom_information = document.getElementById("blog_settings_bottom_information").value.replace(/(^\n*)|(\n*$)/g, "");
  const website_announcement_enabled = document.getElementById("website_announcement_enabled").checked;
  const website_announcement_indexonly = document.getElementById("website_announcement_indexonly").checked;
  const website_announcement_content = document.getElementById("website_announcement_content").value.replace(/(^\n*)|(\n*$)/g, "");
  const blog_settings_enable_custom_css = document.getElementById("blog_settings_enable_custom_css").checked;
  const blog_settings_enable_custom_js = document.getElementById("blog_settings_enable_custom_js").checked;
  const blog_settings_custom_css = document.getElementById("blog_settings_custom_css").value.replace(/(^\n*)|(\n*$)/g, "");
  const blog_settings_custom_js = document.getElementById("blog_settings_custom_js").value.replace(/(^\n*)|(\n*$)/g, "");
  const blog_settings_content_license = document.getElementById("blog_settings_content_license").value;
  const blog_content_license_enabled = document.getElementById("blog_content_license_enabled").checked;

  const enable_article_bottom_nav = document.getElementById("enable_article_bottom_nav").checked;
  const enable_article_file_download = document.getElementById("enable_article_file_download").checked;
  const enable_copy_full_article_to_clipboard = document.getElementById("enable_copy_full_article_to_clipboard").checked;
  const enable_format_json = document.getElementById("format_json_enabled").checked;
  const disable_shadow_effect_of_navbar = document.getElementById("disable_shadow_effect_of_navbar").checked;
  const set_search_button_outline_into_dark_mode = document.getElementById("set_search_button_outline_into_dark_mode").checked;
  const increase_page_margin = document.getElementById("increase_page_margin").checked;
  const use_serif_font = document.getElementById("use_serif_font").checked;

  let auto_rss_enabled = document.getElementById("auto_rss_enabled").checked;
  let auto_sitemap_enabled = document.getElementById("auto_sitemap_enabled").checked;
  const domain_string = document.getElementById("domain_string").value.replaceAll(" ", "");
  const blog_settings_background_setting = document.getElementById("blog_settings_background_setting").value;

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
  blog["全局主题设置"]["链接颜色"] = blog_settings_linkcolor;
  blog["文章列表中每页的文章数为"] = blog_settings_howmany_article_in_a_page;
  blog["全站内容授权协议"] = blog_settings_content_license;
  blog["不使用全站内容授权协议"] = blog_content_license_enabled;
  blog["文章页面显示上一篇下一篇文章导航按钮"] = enable_article_bottom_nav;
  blog["提供文章文件下载"] = enable_article_file_download;
  blog["提供复制全文到剪贴板的选项"] = enable_copy_full_article_to_clipboard;

  blog["网站域名（包括https://）"] = domain_string;

  blog["底部信息（格式为markdown）"] = blog_settings_bottom_information;

  blog["提高JSON文件的可读性"] = enable_format_json;

  if (document.getElementById("sitelang_simplified_chinese").selected === true)
    blog["网站语言"] = "简体中文";

  if (document.getElementById("sitelang_english").selected === true)
    blog["网站语言"] = "English";

  if (document.getElementById("sitelang_japanese").selected === true)
    blog["网站语言"] = "日本語";

  blog["启用网站公告"] = website_announcement_enabled;
  blog["网站公告仅在首页显示"] = website_announcement_indexonly;
  blog["网站公告"] = website_announcement_content;

  blog["CDN选择"] = blog_settings_cdn_mode;
  blog["CDN路径"] = blog_settings_cdn_path;

  blog["启用自定义CSS"] = blog_settings_enable_custom_css;
  blog["启用自定义JS"] = blog_settings_enable_custom_js;
  blog["自定义CSS"] = blog_settings_custom_css;
  blog["自定义JS"] = blog_settings_custom_js;

  if (domain_string !== "" && (domain_string.includes("http") === -1)) toast_creator("danger","尽管设置已经保存，但是你所填写的域名没有包含https://或http://字段，可能无法正常工作。");

  if (domain_string !== "" && domain_string.charAt(domain_string.length - 1) === "/") toast_creator("danger","尽管设置已经保存，但是你所填写的域名末尾包含了斜杠。为了避免生成的 RSS 或站点地图地址添加重复的斜杠，请删除域名字段末尾的斜杠，然后再次保存。");

  if (domain_string === "" && auto_rss_enabled === true) {
    save_blog_settings_operate_success = false;
    auto_rss_enabled = false;
  }

  if (domain_string === "" && auto_sitemap_enabled === true) {
    save_blog_settings_operate_success = false;
    auto_sitemap_enabled = false;
  }

  blog["在对文章列表进行修改后触发rss生成"] = auto_rss_enabled;
  blog["在对文章或页面列表进行修改后触发sitemap.txt生成"] = auto_sitemap_enabled;

  blog["优先使用衬线字体"] = use_serif_font;
  blog["使版心宽度更窄（提高左右页边距）"] = increase_page_margin;
  blog["搜索按钮边框颜色设置为暗色"] = set_search_button_outline_into_dark_mode;
  blog["全局主题设置"]["禁用导航栏的阴影效果"] = disable_shadow_effect_of_navbar;

  blog["Markdown渲染配置"]["使用markdown文件所在目录作为baseurl"] = document.getElementById("rewrite_baseurl").checked;
  blog["Markdown渲染配置"]["在用户点击图片时显示图片查看器"] = document.getElementById("enable_image_viewer").checked;
  blog["Markdown渲染配置"]["根据用户屏幕尺寸渲染图片尺寸"] = document.getElementById("resize_images").checked;

  switch(blog_settings_background_setting){
  case "bgimg_use_blank":
    blog["全局主题设置"]["是否使用纯色背景（优先级高于背景图像）"] = false;
    blog["全局主题设置"]["若使用纯色背景，颜色为"] = "";
    blog["全局主题设置"]["是否使用背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"] = "";
    break;
  case "bgimg_use_pure_color":
    blog["全局主题设置"]["是否使用纯色背景（优先级高于背景图像）"] = true;
    blog["全局主题设置"]["若使用纯色背景，颜色为"] = document.getElementById("blog_settings_color_of_background").value;
    blog["全局主题设置"]["是否使用背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"] = "";
    break;
  case "bgimg_use_url":
    blog["全局主题设置"]["是否使用纯色背景（优先级高于背景图像）"] = false;
    blog["全局主题设置"]["若使用纯色背景，颜色为"] = "";
    blog["全局主题设置"]["是否使用背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"] = document.getElementById("blog_settings_url_of_background").value;
    break;
  case "bgimg_use_background_webp":
    blog["全局主题设置"]["是否使用纯色背景（优先级高于背景图像）"] = false;
    blog["全局主题设置"]["若使用纯色背景，颜色为"] = "";
    blog["全局主题设置"]["是否使用背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"] = true;
    blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"] = false;
    blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"] = "";
    break;
  }

  let current_selection_for_comment_sys = undefined;
  if(document.getElementById("comment_select_to_use_valine").selected === true){
    current_selection_for_comment_sys = "valine";
  } else if(document.getElementById("comment_select_to_use_valine_with_public_apikey").selected === true){
    current_selection_for_comment_sys = "valine_with_public_apikey";
  } else if(document.getElementById("comment_select_to_use_disqus").selected === true){
    current_selection_for_comment_sys = "disqus";
  } else if(document.getElementById("comment_do_not_use_any_comment_system").selected === true){
    current_selection_for_comment_sys = "none";
  }

  if(current_selection_for_comment_sys === "valine") {
    let lc_appid = document.getElementById("blog_settings_valine_appid").value;
    let lc_appkey = document.getElementById("blog_settings_valine_appkey").value;
    blog["全局评论设置"]["启用valine评论"] = true;
    blog["全局评论设置"]["启用disqus评论"] = false;
    blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
    blog["全局评论设置"]["valine设置"]["leancloud_appid"] = lc_appid;
    blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = lc_appkey;
    blog["全局评论设置"]["disqus设置"]["shortname"] = "";
  } else if(current_selection_for_comment_sys === "valine_with_public_apikey") {
    blog["全局评论设置"]["启用valine评论"] = true;
    blog["全局评论设置"]["启用disqus评论"] = false;
    blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = true;
    blog["全局评论设置"]["valine设置"]["leancloud_appid"] = "SykuVs4qcWMkl4RUtKEUlmog-gzGzoHsz";
    blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = "0jowkR4ct0lJbWcvocymEkKw";
    blog["全局评论设置"]["disqus设置"]["shortname"] = "";
  } else if(current_selection_for_comment_sys === "disqus") {
    let disqus_shortname = document.getElementById("blog_settings_disqus_shortname").value;
    blog["全局评论设置"]["启用valine评论"] = false;
    blog["全局评论设置"]["启用disqus评论"] = true;
    blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
    blog["全局评论设置"]["valine设置"]["leancloud_appid"] = "";
    blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = "";
    blog["全局评论设置"]["disqus设置"]["shortname"] = disqus_shortname;
  } else if (current_selection_for_comment_sys === "none") {
    blog["全局评论设置"]["启用valine评论"] = false;
    blog["全局评论设置"]["启用disqus评论"] = false;
    blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"] = false;
    blog["全局评论设置"]["valine设置"]["leancloud_appid"] = "";
    blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = "";
    blog["全局评论设置"]["disqus设置"]["shortname"] = "";
  }


  BlogInstance.writeBlogData();
  if(save_blog_settings_operate_success === true){

  }else{
    toast_creator("danger","you haven't specified a domain for the sitemap or rss function.");
  }
};
