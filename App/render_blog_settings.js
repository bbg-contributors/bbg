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
<input class="form-control"  value="${blog["底部信息（格式为markdown）"]}" id="blog_settings_bottom_information">
</div>

<div class="fluentinterface fluenthint" role="alert">
<i class="fa fa-smile-o"></i> ${langdata["HINT_BTMINFO_MD"][lang_name]}
</div>

<br />

<div class="mb-3">
<label class="form-label">${langdata["BLOG_NAVBAR_BGCOLOR"][lang_name]}</label>
<input class="form-control" value="${blog["全局主题设置"]["标题栏背景颜色"]}"  id="blog_settings_titlebar_bgcolor">
</div>

<div class="mb-3">
<label class="form-label">${langdata["BLOG_NAVBAR_TEXTCOLOR"][lang_name]}</label>
<input class="form-control"  value="${blog["全局主题设置"]["标题栏文字颜色"]}" id="blog_settings_titlebar_textcolor">
</div>

<div class="fluentinterface fluenthint" role="alert">
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
<h2><i class="fa fa-file-image-o"></i> 网页背景图像</h2><br />

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_is_using_acg_bg">
<label class="form-check-label" for="blog_settings_is_using_acg_bg">
  使用随机二次元壁纸作为网页背景（若不勾选此项则为空白背景）
</label>
</div>
</div>
<div class="fluentinterface">
  <h2><i class="fa fa-paint-brush"></i> 为此站点使用第三方主题</h2>
  <br />
  <p id="isUsingThirdPartyTheme"></p>


  <button class="fluentbtn" onclick="reset_official_theme();">将此站点的主题重置为官方主题</button>
  <button class="fluentbtn" onclick="open_online_theme_dialog()">打开主题商店</button>
  <br /><br />
  <button class="btn btn-link" onclick="apply_thirdparty_theme();">为此站点使用来自文件的第三方主题（不建议）</button>
  </div>

<div class="fluentinterface">
<h2><i class="fa fa-comments-o"></i> 评论设置</h2>
<br />

<div id="hint_of_use_public_comment_service">
目前有两种方式来在博客站点中启用评论功能。
<br /><br />
<li>方法一：最简单，你可以<a href="#" onclick="use_public_comment_service_offered_by_bbg();">点击这里直接使用 BBG 提供的免费公共评论服务</a>。<b>此方式不需要你拥有 LeanCloud 账户</b>，但是注意在你站点上的评论数据将由我们统一控制和管理，并且我们不提供任何数据完整性和可靠性的担保。</li>
<br />
<li>方法二：操作复杂，但是你将拥有对评论数据的完整控制权。使用自己的 LeanCloud 账号创建一个新应用，然后将该应用的 AppID、AppKey填入下面的表单中并保存。<b>注意此方式要求你必须拥有已经实名认证过的 LeanCloud 账户。</b></li>
<br />
</div>

<div id="leancloud_settings_detail">

<p>如果你选择方法二，请勾选下方的“启用valine评论”，并在下方的表单填入应用的相关信息，然后点击保存。选择方法一的用户无需操作下方的内容。</p>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_is_valine_enabled">
<label class="form-check-label" for="blog_settings_is_valine_enabled">
  启用valine评论
</label>
</div>
<br />
<div class="mb-3">
<label class="form-label">AppID（不启用valine评论则可不填）</label>
<input class="form-control"  value="${blog["全局评论设置"]["valine设置"]["leancloud_appid"]}"  id="blog_settings_valine_appid">
</div>

<div class="mb-3">
<label class="form-label">AppKey（不启用valine评论则可不填）</label>
<input class="form-control" value="${blog["全局评论设置"]["valine设置"]["leancloud_appkey"]}" id="blog_settings_valine_appkey">
</div>
</div>
</div>

<hr />

<button class="fluentbtn fluentbtn-blue" onclick="save_blog_settings();">保存配置</button>

<br /><br />
  
  
  
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
  
  目前此站点正在使用 <b>官方主题。</b>
  `;
    }

if (blog["全局主题设置"]["是否使用背景图像"] && blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"]) {
        document.getElementById("blog_settings_is_using_acg_bg").checked = true;
    }

    if(blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"]){
      document.getElementById("leancloud_settings_detail").innerHTML= `你正在使用公共评论服务，所以不能手动设置此项。<a href="#" onclick="disable_puclic_comment_service()">如果你不想继续使用公共评论服务了，请点击这里</a>`;
      document.getElementById("hint_of_use_public_comment_service").innerHTML="";
    
    }

}



