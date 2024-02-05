
const dialog = require("@electron/remote").dialog;

function render_comment_related(trigger_by_change = false){
  let current_selection = undefined;
  if (document.getElementById("comment_do_not_use_any_comment_system").selected === true) {
    current_selection = "none";
  } else {
    for (let t of [
      "valine",
      "valine_with_public_apikey",
      "disqus",
      "waline"
    ]) {
      if (document.getElementById(`comment_select_to_use_${t}`).selected === true) {
        current_selection = t;
        break;
      }
    }
  }

  function show_specified_detail(name) {
    const mapping_table = {
      "valine": "leancloud_settings_detail",
      "valine_with_public_apikey": "hint_when_using_valine_with_public_apikey",
      "disqus": "disqus_settings_detail",
      "waline": "waline_settings_detail"
    };
    for (let k in mapping_table) {
      if (k == name) document.getElementById(mapping_table[k]).setAttribute("style", "");
      else document.getElementById(mapping_table[k]).setAttribute("style", "display: none;");
    }
  }

  if(current_selection === "valine"){
    if(trigger_by_change){
      document.getElementById("blog_settings_valine_appid").value = "";
      document.getElementById("blog_settings_valine_appkey").value = "";
      save_blog_settings();
    }
    show_specified_detail("valine");
  } else if(current_selection === "valine_with_public_apikey"){
    let whether_confirm_to_use_valine_with_public_apikey;
    if (trigger_by_change) {
      whether_confirm_to_use_valine_with_public_apikey = dialog.showMessageBoxSync({
        "message": langdata["CONFIRM_TEXT_WHEN_USING_VALINE_WITH_PUBLIC_APIKEY"][lang_name],
        "buttons": [langdata["OK"][lang_name], langdata["CANCEL"][lang_name]]
      });
    } else {
      whether_confirm_to_use_valine_with_public_apikey = 0;
    }
    
    if(whether_confirm_to_use_valine_with_public_apikey === 0){
      show_specified_detail("valine_with_public_apikey");
    }else {
      document.getElementById("comment_select_to_use_valine").selected = true;
      render_comment_related();
    }
    
  } else if(current_selection === "disqus"){
    show_specified_detail("disqus");
  } else if(current_selection === "waline"){
    show_specified_detail("waline");
  } else if(current_selection === "none"){
    show_specified_detail("none");
  }
}

module.exports = function () {
  document.getElementById("container").insertAdjacentHTML("beforeend", getUiFileContent("blog_settings_ui.html"));

  if (blog["不使用全站内容授权协议"] === true)
    document.getElementById("blog_content_license_enabled").checked = true;

  if (blog["全局主题设置"]["是否使用第三方主题"] === true) {
    if (blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === true) {
      document.getElementById("isUsingThirdPartyTheme").innerHTML = `
    ${langdata.USING_3RD_PARTY_THEME_FROM_LOCAL_FILE_DESCRIPTION[lang_name]}
  
  `;
    }

    if (blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === false) {
      document.getElementById("isUsingThirdPartyTheme").innerHTML = `
      ${langdata.CURRENTLY_USING_3RD_PARTY_THEME[lang_name]}${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"]} (${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"]})。<br /><br />
      <button class="btn btn-outline-primary" onclick="check_thirdparty_theme_update();"><i class="fa fa-refresh"></i> ${langdata["CHECK_UPDATE"][lang_name]}: ${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"]}</button>
    </b>
  
  `;
    }

    document.getElementById("isUsingThirdPartyTheme").insertAdjacentHTML("beforeend", `
    <button class="btn btn-outline-primary" onclick="config_third_party_theme();"><i class="fa fa-cogs"></i> 编辑主题配置文件</button>
    `);

  } else {
    document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  ${langdata.STATUS_USING_OFFICIAL_THEME[lang_name]}
  
  `;
  }

  if (blog["全局主题设置"]["是否使用背景图像"] && blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"])
    document.getElementById("blog_settings_is_using_acg_bg").checked = true;

  if (blog["网站语言"] === "简体中文")
    document.getElementById("sitelang_simplified_chinese").selected = true;

  if (blog["网站语言"] === "English")
    document.getElementById("sitelang_english").selected = true;

  if (blog["网站语言"] === "日本語")
    document.getElementById("sitelang_japanese").selected = true;

  if (blog["启用网站公告"] === true)
    document.getElementById("website_announcement_enabled").checked = true;

  if (blog["网站公告仅在首页显示"] === true)
    document.getElementById("website_announcement_indexonly").checked = true;

  if (blog["启用自定义CSS"] === true)
    document.getElementById("blog_settings_enable_custom_css").checked = true;

  if (blog["启用自定义JS"] === true)
    document.getElementById("blog_settings_enable_custom_js").checked = true;

  if (blog["文章页面显示上一篇下一篇文章导航按钮"] === true)
    document.getElementById("enable_article_bottom_nav").checked = true;

  if (blog["提供文章文件下载"] === true)
    document.getElementById("enable_article_file_download").checked = true;

  if (blog["提供复制全文到剪贴板的选项"] === true)
    document.getElementById("enable_copy_full_article_to_clipboard").checked = true;

  if (blog["提高JSON文件的可读性"] === true)
    document.getElementById("format_json_enabled").checked = true;

  if(blog["全局主题设置"]["禁用导航栏的阴影效果"]){
    document.getElementById("disable_shadow_effect_of_navbar").checked = true;
  }

  if(blog["搜索按钮边框颜色设置为暗色"]){
    document.getElementById("set_search_button_outline_into_dark_mode").checked = true;
  }

  if(blog["使版心宽度更窄（提高左右页边距）"]){
    document.getElementById("increase_page_margin").checked = true;
  }

  if(blog["优先使用衬线字体"]){
    document.getElementById("use_serif_font").checked = true;
  }

  if(blog["全局主题设置"]["是否启用live2d-widget"]){
    document.getElementById("live2d_widget_enabled").checked = true;
  }

  if(blog["全局主题设置"]["live2d-widget设置"]["功能设置"]["hitokoto"]){
    document.getElementById("live2d_widget_hitokoto_enabled").checked = true;
  }

  if(blog["全局主题设置"]["live2d-widget设置"]["功能设置"]["asteroids"]){
    document.getElementById("live2d_widget_asteroids_enabled").checked = true;
  }

  if(blog["全局主题设置"]["live2d-widget设置"]["功能设置"]["switch-model"]){
    document.getElementById("live2d_widget_switch_model_enabled").checked = true;
  }
  if(blog["全局主题设置"]["live2d-widget设置"]["功能设置"]["switch-texture"]){
    document.getElementById("live2d_widget_switch_texture_enabled").checked = true;
  }
  if(blog["全局主题设置"]["live2d-widget设置"]["功能设置"]["photo"]){
    document.getElementById("live2d_widget_photo_enabled").checked = true;
  }
  if(blog["全局主题设置"]["live2d-widget设置"]["功能设置"]["info"]){
    document.getElementById("live2d_widget_info_enabled").checked = true;
  }
  if(blog["全局主题设置"]["live2d-widget设置"]["功能设置"]["quit"]){
    document.getElementById("live2d_widget_quit_enabled").checked = true;
  }

  document.getElementById("auto_rss_enabled").checked = blog["在对文章列表进行修改后触发rss生成"];
  document.getElementById("auto_sitemap_enabled").checked = blog["在对文章或页面列表进行修改后触发sitemap.txt生成"];

  document.getElementById("rewrite_baseurl").checked = blog["Markdown渲染配置"]["使用markdown文件所在目录作为baseurl"];
  document.getElementById("enable_image_viewer").checked = blog["Markdown渲染配置"]["在用户点击图片时显示图片查看器"];
  document.getElementById("resize_images").checked = blog["Markdown渲染配置"]["根据用户屏幕尺寸渲染图片尺寸"];

  function render_input_of_background(){
    switch(document.getElementById("blog_settings_background_setting").value){
    case "bgimg_use_pure_color":
      document.getElementById("blog_settings_color_of_background").setAttribute("style", "");
      document.getElementById("blog_settings_url_of_background").setAttribute("style", "display: none;");
      document.getElementById("blog_settings_color_of_background").value = blog["全局主题设置"]["若使用纯色背景，颜色为"];
      break;
    case "bgimg_use_background_webp":
      document.getElementById("blog_settings_color_of_background").setAttribute("style", "display: none;");
      document.getElementById("blog_settings_url_of_background").setAttribute("style", "display: none;");
      break;
    case "bgimg_use_blank":
      document.getElementById("blog_settings_color_of_background").setAttribute("style", "display: none;");
      document.getElementById("blog_settings_url_of_background").setAttribute("style", "display: none;");
      break;
    case "bgimg_use_url":
      document.getElementById("blog_settings_color_of_background").setAttribute("style", "display: none;");
      document.getElementById("blog_settings_url_of_background").setAttribute("style", "");
      document.getElementById("blog_settings_url_of_background").value = blog["全局主题设置"]["若使用背景图像，设置为"]["若将某个url作为背景图像，这个url是"];
      break;
    }
  }

  if (blog["全局主题设置"]["是否使用纯色背景（优先级高于背景图像）"]){
    document.getElementById("blog_settings_background_setting").value = "bgimg_use_pure_color";
  } else if (blog["全局主题设置"]["是否使用背景图像"]){
    if(blog["全局主题设置"]["若使用背景图像，设置为"]["将网站根目录下的background.webp作为背景图像"]){
      document.getElementById("blog_settings_background_setting").value = "bgimg_use_background_webp";
    } else if(blog["全局主题设置"]["若使用背景图像，设置为"]["将某个url作为背景图像"]){
      document.getElementById("blog_settings_background_setting").value = "bgimg_use_url";
    }
  }

  render_input_of_background();

  document.getElementById("blog_settings_background_setting").onchange = function(){
    render_input_of_background();
  };

  // 不可以调换下面两个if条件的顺序 因为后面那个（valine+bbg公共评论服务）的这个需要覆盖前面那个（valine）

  if(blog["全局评论设置"]["启用valine评论"]){
    document.getElementById("comment_select_to_use_valine").selected = true;

    if(blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"])
      document.getElementById("comment_select_to_use_valine_with_public_apikey").selected = true;
  }

  else if(blog["全局评论设置"]["启用disqus评论"]){
    document.getElementById("comment_select_to_use_disqus").selected = true;
  }

  else if(blog["全局评论设置"]["启用waline评论"]){
    document.getElementById("comment_select_to_use_waline").selected = true;
  }

  else {
    document.getElementById("comment_do_not_use_any_comment_system").selected = true;
  }

  render_comment_related();

  document.getElementById("blog_settings_comment_system_setting").onchange = function(){
    render_comment_related(true);
  };

  if (blog["CDN选择"] === 1) {
    // 从列表中选择cdn地址
    document.getElementById("cdn_cho_1").checked = true;
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
      document.getElementById("blog_setting_cdn_frm_1").value = blog["CDN路径"];
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  } else {
    // 手动输入cdn路径
    document.getElementById("cdn_cho_2").checked = true;
    document.getElementById("blog_setting_cdn_frm_2").value = blog["CDN路径"];
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  }

  document.getElementById("cdn_cho_1").onchange = function () {
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  };

  document.getElementById("cdn_cho_2").onchange = function () {
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  };

  document.getElementById("nav_to_blog_settings").classList.add("active");

  window.addEventListener("keyup", ()=>{
    save_blog_settings();
  });
  const selectElements = document.querySelectorAll("select");
  selectElements.forEach(function(select) {
    select.addEventListener("change", function() {
      save_blog_settings();
    });
  });

  const checkboxElements = document.querySelectorAll(".form-check");
  checkboxElements.forEach(function(select) {
    select.addEventListener("change", function() {
      save_blog_settings();
    });
  });

  var radioElements = document.querySelectorAll("input[type=\"radio\"]");

  radioElements.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      save_blog_settings();
    });
  });


  const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  enterBlogSettingInterfaceOf("basic_info_theme_config");
};
