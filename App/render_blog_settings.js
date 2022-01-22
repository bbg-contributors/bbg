module.exports = function(){

  document.getElementById("container").innerHTML += `
  
  <h1><i class="fa fa-cogs"></i> ${langdata["BLOG_SETTINGS"][lang_name]}</h1>
  <br />
  <div class="fluentinterface">
  <h2><i class="fa fa-paint-brush"></i> ${langdata["BASIC_INFO_THEME_CONFIG"][lang_name]}</h2><br />
  <div class="mb-3">
<label class="form-label">${langdata["BLOG_TITLE"][lang_name]}</label>
<input class="form-control" value="${blog["博客标题"]}" id="blog_settings_title">
</div>

<div class="mb-3">
<label class="form-label">${langdata["BLOG_DESCRIPTION"][lang_name]}</label>
<input class="form-control" value="${blog["博客描述（副标题）"]}"  id="blog_settings_description">
</div>

<div class="mb-3">
<label class="form-label">${langdata["BOTTOM_INFORMATION"][lang_name]}</label>
<textarea class="form-control" id="blog_settings_bottom_information">
${blog["底部信息（格式为markdown）"]}
</textarea>
</div>

<br />

<div class="mb-3">
<label class="form-label">${langdata["SITE_LANG"][lang_name]}</label>
<br />
<select class="form-select">
  <option value="simplified_chinese" id="sitelang_simplified_chinese">简体中文</option>
  <option value="english" id="sitelang_english">English</option>
</select>

</div>

<div class="mb-3">
<label class="form-label">${langdata["BLOG_NAVBAR_BGCOLOR"][lang_name]}</label>
<input class="form-control" value="${blog["全局主题设置"]["标题栏背景颜色"]}"  id="blog_settings_titlebar_bgcolor">
</div>

<div class="mb-3">
<label class="form-label">${langdata["BLOG_NAVBAR_TEXTCOLOR"][lang_name]}</label>
<input class="form-control"  value="${blog["全局主题设置"]["标题栏文字颜色"]}" id="blog_settings_titlebar_textcolor">
</div>

<div class="alert alert-primary" role="alert">
<i class="fa fa-smile-o"></i> ${langdata["HINT_NAVBAR_COLOR"][lang_name]}
</div>
</div>

<div class="fluentinterface">
<h2><i class="fa fa-smile-o"></i> ${langdata["FAVICON"][lang_name]}</h2>
<br />
<p>${langdata["FAVICON_DESCRIPTION"][0][lang_name]}</p>
<p>${langdata["FAVICON_DESCRIPTION"][1][lang_name]}</p>
<p>${langdata["FAVICON_DESCRIPTION"][2][lang_name]}</p>
<button class="fluentbtn fluentbtn-blue" onclick="select_a_favicon()">${langdata["SELECT_FAVICON"][lang_name]}</button>
<button class="fluentbtn fluentbtn-blue" onclick="view_current_icon()">${langdata["VIEW_FAVICON"][lang_name]}</button>
<button class="fluentbtn" onclick="delete_current_icon()">${langdata["DELETE_FAVICON"][lang_name]}</button>
</div>
<div class="fluentinterface">
<h2><i class="fa fa-file-image-o"></i> ${langdata["SITE_BGIMAGE"][lang_name]}</h2><br />

<select class="form-select" style="display:none">
  <option value="bgimg_use_random_acgnpic">使用随机的 ACGN 插画作为网页背景</option>
  <option value="bgimg_use_blank">空白背景</option>
  <option value="bgimg_use_url">将某个URL作为网页背景图像</option>
  <option value="bgimg_use_file">选择一个图片文件作为网页背景图像</option>
</select>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_is_using_acg_bg">
<label class="form-check-label" for="blog_settings_is_using_acg_bg">
${langdata["USE_RANDOM_ACG_PIC_AS_BGIMG"][lang_name]}
</label>
</div>
</div>
<div class="fluentinterface">
  <h2><i class="fa fa-paint-brush"></i> ${langdata["USE_3RD_THEME"][lang_name]}</h2>
  <br />
  <p id="isUsingThirdPartyTheme"></p>


  <button class="fluentbtn" onclick="reset_official_theme();">${langdata["RESET_TO_OFFICIAL_THEME"][lang_name]}</button>
  <button class="fluentbtn" onclick="open_online_theme_dialog()">${langdata["OPEN_THEME_STORE"][lang_name]}</button>
  <br /><br />
  <button class="btn btn-link" onclick="apply_thirdparty_theme();">${langdata["USE_3RD_THEME_FROM_FILE"][lang_name]}</button>
  </div>

<div class="fluentinterface">
<h2><i class="fa fa-comments-o"></i>  ${langdata["COMMENT_SETTINGS"][lang_name]}</h2>
<br />

<div id="hint_of_use_public_comment_service">
${langdata["COMMENT_SETTINGS_SIMPLE_DESCRIPTION"][lang_name]}
<br /><br />
<li> ${langdata["COMMENT_SETTINGS_WAY1_PART1"][lang_name]}<a href="#" onclick="use_public_comment_service_offered_by_bbg();"> ${langdata["COMMENT_SETTINGS_WAY1_PART2"][lang_name]}</a>${langdata["COMMENT_SETTINGS_WAY1_PART3"][lang_name]}</li>
<br />
<li>${langdata["COMMENT_SETTINGS_WAY2"][lang_name]}</li>
<br />
</div>

<div id="leancloud_settings_detail">

<p>${langdata["COMMENT_SETTINGS_FORM_HINT"][lang_name]}</p>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_is_valine_enabled">
<label class="form-check-label" for="blog_settings_is_valine_enabled">
${langdata["ENABLE_VALINE"][lang_name]}
</label>
</div>
<br />
<div class="mb-3">
<label class="form-label">${langdata["VALINE_APPID"][lang_name]}</label>
<input class="form-control"  value="${blog["全局评论设置"]["valine设置"]["leancloud_appid"]}"  id="blog_settings_valine_appid">
</div>

<div class="mb-3">
<label class="form-label">${langdata["VALINE_APPKEY"][lang_name]}</label>
<input class="form-control" value="${blog["全局评论设置"]["valine设置"]["leancloud_appkey"]}" id="blog_settings_valine_appkey">
</div>
</div>
</div>

<hr />
<div class="fluentinterface" style="position:fixed;bottom:4px;width:80%;box-shadow: 4px 3px 1px -2px rgb(0 0 0 / 20%),0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);">
<button class="fluentbtn fluentbtn-blue" onclick="save_blog_settings();">保存本次配置</button>
<button class="fluentbtn" onclick="window.location.reload()">放弃本次对网站设置所作的更改</button>
</div>
<br /><br /><br /><br /><br />
  
  
  
  `

if (blog["全局评论设置"]["启用valine评论"] === true) {
  document.getElementById("blog_settings_is_valine_enabled").checked = true;
}

if(blog["全局主题设置"]["是否使用第三方主题"] === true){

  if(blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === true){
    document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  目前此站点正在使用<b>从文件安装的第三方主题</b>，如果可能的话建议你从主题商店安装，因为主题商店的主题通常都有更好的支持。
  
  `;
  }

  if(blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === false){
    document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  目前此站点正在使用 <b>来自主题商店的第三方主题。</b>该主题的相关信息如下：<br /><br />主题名称：<b>${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"]}</b><br />
  主题版本：<b>${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"]}</b>
  
  `;
  }

  
}else{
  document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  ${langdata["STATUS_USING_OFFICIAL_THEME"][lang_name]}
  
  `;
    }

if (blog["全局主题设置"]["是否使用背景图像"] && blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"]) {
        document.getElementById("blog_settings_is_using_acg_bg").checked = true;
    }

    if(blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"]){
      document.getElementById("leancloud_settings_detail").innerHTML= `你正在使用公共评论服务，所以不能手动设置此项。<a href="#" onclick="disable_puclic_comment_service()">如果你不想继续使用公共评论服务了，请点击这里</a>`;
      document.getElementById("hint_of_use_public_comment_service").innerHTML="";
    
    }

    if(blog["网站语言"] === "简体中文"){
      document.getElementById("sitelang_simplified_chinese").selected = true;
    }
    
    if(blog["网站语言"] === "English"){
      document.getElementById("sitelang_english").selected = true;
    }

}



