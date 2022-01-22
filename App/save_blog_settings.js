
const dialog = require('@electron/remote').dialog;

module.exports = function () {
    let blog_settings_description = document.getElementById("blog_settings_description").value;
    let blog_settings_title = document.getElementById("blog_settings_title").value;
    let blog_settings_titlebar_bgcolor = document.getElementById("blog_settings_titlebar_bgcolor").value;
    let blog_settings_titlebar_textcolor = document.getElementById("blog_settings_titlebar_textcolor").value;
    try {
         blog_settings_is_valine_enabled = document.getElementById("blog_settings_is_valine_enabled").checked;
         blog_settings_valine_appid = document.getElementById("blog_settings_valine_appid").value;
         blog_settings_valine_appkey = document.getElementById("blog_settings_valine_appkey").value;
    } catch (error) {
        
    }

    let blog_settings_bottom_information = document.getElementById("blog_settings_bottom_information").value;
    let blog_settings_is_using_acg_bg = document.getElementById("blog_settings_is_using_acg_bg").checked;


    blog["博客标题"] = blog_settings_title;
    blog["博客描述（副标题）"] = blog_settings_description;
    blog["全局主题设置"]["标题栏背景颜色"] = blog_settings_titlebar_bgcolor;
    blog["全局主题设置"]["标题栏文字颜色"] = blog_settings_titlebar_textcolor;
    

    
    blog["底部信息（格式为markdown）"] = blog_settings_bottom_information;

    if (blog_settings_is_using_acg_bg === true) {
        blog["全局主题设置"]["是否使用背景图像"] = true;
        blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"] = true;
    } else {
        blog["全局主题设置"]["是否使用背景图像"] = false;
        blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"] = false;

    }
    try{
        if (blog_settings_is_valine_enabled === true) {
            blog["全局评论设置"]["启用valine评论"] = true;
        } else {
            blog["全局评论设置"]["启用valine评论"] = false;
        }
    } catch(error){

    }
    
    try{
        blog["全局评论设置"]["valine设置"]["leancloud_appid"] = blog_settings_valine_appid;
        blog["全局评论设置"]["valine设置"]["leancloud_appkey"] = blog_settings_valine_appkey;
    }catch(error){

    }

    if(document.getElementById("sitelang_simplified_chinese").selected === true){
        blog["网站语言"] = "简体中文";
    }
    if(document.getElementById("sitelang_english").selected === true){
        blog["网站语言"] = "English";
    }


    BlogInstance.writeBlogData();
}