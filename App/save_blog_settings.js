
const dialog = require("electron").remote.dialog;

module.exports = function () {
    let blog_settings_description = document.getElementById("blog_settings_description").value;
    let blog_settings_title = document.getElementById("blog_settings_title").value;
    let blog_settings_titlebar_bgcolor = document.getElementById("blog_settings_titlebar_bgcolor").value;
    let blog_settings_titlebar_textcolor = document.getElementById("blog_settings_titlebar_textcolor").value;
    let blog_settings_is_valine_enabled = document.getElementById("blog_settings_is_valine_enabled").checked;
    let blog_settings_valine_appid = document.getElementById("blog_settings_valine_appid").value;
    let blog_settings_valine_appkey = document.getElementById("blog_settings_valine_appkey").value;
    let blog_settings_bottom_information = document.getElementById("blog_settings_bottom_information").value;

    blog["博客标题"] = blog_settings_title;
    blog["博客描述（副标题）"] = blog_settings_description;
    blog["全局主题设置"]["标题栏背景颜色"] = blog_settings_titlebar_bgcolor;
    blog["全局主题设置"]["标题栏文字颜色"] = blog_settings_titlebar_textcolor;
    if (blog_settings_is_valine_enabled === true) {
        blog["全局评论设置"]["启用valine评论"] = true;
    } else {
        blog["全局评论设置"]["启用valine评论"] = false;
    }
    blog["全局评论设置"]["valine设置"]["leancloud_appid"] = blog_settings_valine_appid;
    blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = blog_settings_valine_appkey;
    blog["底部信息（格式为markdown）"] = blog_settings_bottom_information;


    BlogInstance.writeBlogData();
    dialog.showMessageBoxSync({ message: "配置已经成功地保存！", type: "info" });
}