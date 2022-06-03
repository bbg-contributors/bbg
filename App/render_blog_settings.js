module.exports = function () {

  document.getElementById("container").innerHTML += `
  <nav class="navbar navbar-toggler bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><i class="fa fa-cogs"></i> ${langdata["BLOG_SETTINGS"][lang_name]}</a>
    </div>
  </nav>
<br />
<div class="row">

<div class="col-3">

<ul class="list-group" id="blog_settings_list">
<h5>目录</h5>
<li class="list-group-item">
<a href="#basic_info_theme_config_navhash">${langdata["BASIC_INFO_THEME_CONFIG"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#announcement_board_navhash">网站公告板</a>
</li>
<li class="list-group-item">
<a href="#favicon_navhash">${langdata["FAVICON"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#bgimage_navhash">${langdata["SITE_BGIMAGE"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#thirdpartytheme_navhash">${langdata["USE_3RD_THEME"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#comment_settings_navhash">${langdata["COMMENT_SETTINGS"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#cdn_settings_navhash">${langdata["CDN_SETTINGS"][lang_name]}</a>
</li>
<li class="list-group-item">
<a href="#advanced_navhash">高级自定义</a>
</li>
</ul>


</div>
<div class="col-9">

<div class="fluentinterface" id="basic_info_theme_config_navhash">
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



<div class="mb-3">
<label class="form-label">全站内容授权协议</label>
<input class="form-control" value="${blog["全站内容授权协议"]}"  id="blog_settings_content_license">
</div>

<div class="alert alert-primary" role="alert">
全站内容授权协议的可填项为 reserved，unlicensed，cc-by-nc-sa-4.0 这三项中的任意一项，默认为reserved。reserved 表示博主保留所有权利；cc-by-nc-sa-4.0 表示博客内容使用 CC BY-NC-SA 4.0 作为授权协议；unlicensed 表示博客内容属于公有领域。如果填写其它内容，会将你所填写的内容作为博客的版权声明。
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_content_license_enabled">
<label class="form-check-label" for="blog_content_license_enabled">
关闭“全站内容授权协议”功能
</label>
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
<label class="form-label">文章列表每页文章数（此项必须是一个大于等于5的整数）</label>
<input class="form-control" value="${blog["文章列表中每页的文章数为"]}" type="number" min="5" id="blog_settings_howmany_article_in_a_page">
<br />
<div class="alert alert-primary" role="alert">
置顶文章的显示不受“文章列表每页文章数”约束。实际的每页文章数不会少于你设置的这个数字，也不会超过“置顶文章数”和“你设置的每页文章数”数量的总和。无论如何，最终的文章列表中不会有文章被遗漏。
</div>
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
<br />
<h3>手动生成站点地图（sitemap.txt）</h3>
<p>站点地图对于搜索引擎优化来说很有用，可以帮助搜索引擎索引站点上的内容。</p>
<p>目前此功能是试验性的，请在需要进行的时候手动点击下方的生成按钮。</p>
<p>站点地图会生成在网站根目录下的sitemap.txt中（如果已有会覆盖文件内容）。点击后，你需要在弹出的对话框中输入网站的域名（或者从互联网上访问时的站点目录地址）。</p>
<button class="fluentbtn fluentbtn-blue" onclick="open_generate_sitemap_dialog()">手动生成一次当前的站点地图</button>

</div>

<div class="fluentinterface" id="announcement_board_navhash">

<h3>网站公告板</h3>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="website_announcement_enabled">
<label class="form-check-label" for="website_announcement_enabled">
启用网站公告板功能
</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="website_announcement_indexonly">
<label class="form-check-label" for="website_announcement_indexonly">
若启用网站公告板，公告板内容仅在网站首页显示
</label>
</div>


<div class="mb-3">
<label class="form-label">如果启用了网站公告板，其内容是：（内容将按照html格式解析）</label>
<br />
<textarea class="form-control" id="website_announcement_content">
${blog["网站公告"]}

</textarea>
<br />


</div>

</div>

<div class="fluentinterface" id="favicon_navhash">
<h2><i class="fa fa-smile-o"></i> ${langdata["FAVICON"][lang_name]}</h2>
<br />
<p>${langdata["FAVICON_DESCRIPTION"][0][lang_name]}</p>
<p>${langdata["FAVICON_DESCRIPTION"][1][lang_name]}</p>
<p>${langdata["FAVICON_DESCRIPTION"][2][lang_name]}</p>
<button class="fluentbtn fluentbtn-blue" onclick="select_a_favicon()">${langdata["SELECT_FAVICON"][lang_name]}</button>
<button class="fluentbtn fluentbtn-blue" onclick="view_current_icon()">${langdata["VIEW_FAVICON"][lang_name]}</button>
<button class="fluentbtn" onclick="delete_current_icon()">${langdata["DELETE_FAVICON"][lang_name]}</button>
</div>
<div class="fluentinterface" id="bgimage_navhash">
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
<div class="fluentinterface" id="thirdpartytheme_navhash">
<h2><i class="fa fa-paint-brush"></i> ${langdata["USE_3RD_THEME"][lang_name]}</h2>
<br />
<p id="isUsingThirdPartyTheme"></p>


<button class="fluentbtn" onclick="reset_official_theme();">${langdata["RESET_TO_OFFICIAL_THEME"][lang_name]}</button>
<button class="fluentbtn" onclick="open_online_theme_dialog()">${langdata["OPEN_THEME_STORE"][lang_name]}</button>
<br /><br />
<button class="btn btn-link" onclick="apply_thirdparty_theme();">${langdata["USE_3RD_THEME_FROM_FILE"][lang_name]}</button>
</div>

<div class="fluentinterface" id="comment_settings_navhash">
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

<div class="fluentinterface" id="cdn_settings_navhash">
<h2><i class="fa fa-bolt"></i>  ${langdata["CDN_SETTINGS"][lang_name]}</h2>
<br/>
<div id="cdn_settings_desc"> ${langdata["CDN_SETTINGS_SIMPLE_DESCRIPTION"][lang_name]}</div>
<div class="mb-3">
<br />
  <label class="form-label"> ${langdata["CDN_SETTINGS_METHOD"][lang_name]} </label>
  <br/>
  <input type="radio" id="cdn_cho_1" name="cdn_choose">&nbsp;&nbsp;${langdata["CDN_SETTINGS_LIST"][lang_name]}<br/>
  <input type="radio" id="cdn_cho_2" name="cdn_choose">&nbsp;&nbsp;${langdata["CDN_SETTINGS_MANUAL"][lang_name]}
  <div id="cdn_cho" style="display:none">
    <select name="cdn_path" class="form-control" id="blog_setting_cdn_frm_1">
      <option value="https://unpkg.com">${langdata["CDN_SETTINGS_OFFICAL"][lang_name]} </option>
      <option value="https://cdn.jsdelivr.net/npm" selected>${langdata["CDN_SETTINGS_JSD"][lang_name]}</option>
      <option value="https://unpkg.zhimg.com">${langdata["CDN_SETTINGS_ZHIMG"][lang_name]} </option>
      <option value="https://unpkg.chicdn.cn">${langdata["CDN_SETTINGS_CHICDN"][lang_name]} </option>
    </select>      
  </div>
  <div id="cdn_manual" style="display:none">
  <br>
  <label class="form-label" for="cdn_path"> ${langdata["CDN_SETTINGS_MANUAL_SET"][lang_name]} </label><br>
  <input name="cdn_path" class="form-control" type="text" id="blog_setting_cdn_frm_2">
  </div>
</div>
</div>

<div class="fluentinterface" id="advanced_navhash">
<h3>高级自定义</h3>
<p>以下选项仅供有能力的用户使用。</p>
<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_enable_custom_css">
<label class="form-check-label" for="blog_settings_enable_custom_css">
启用网站的自定义CSS支持
</label>
</div>

<p>你可以为网站编写自定义 CSS 来改变其样式。如果这一项不打勾，自定义 CSS 样式将不会被解析。</p>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="blog_settings_enable_custom_js">
<label class="form-check-label" for="blog_settings_enable_custom_js">
启用网站的自定义JavaScript支持
</label>
</div>

<p>你可以为网站编写自定义 JavaScript 代码。这些 JavaScript 代码将在整个博客被渲染完成之后执行，所以你有很大的自主权。如果这一项不打勾，自定义 JavaScript 代码将不会被解析。</p>

<div class="mb-3">
<label class="form-label">自定义 CSS 代码</label>
<br />
<textarea class="form-control" id="blog_settings_custom_css">
${blog["自定义CSS"]}

</textarea>
<br />


</div>

<div class="mb-3">
<label class="form-label">自定义 JavaScript 代码</label>
<br />
<textarea class="form-control" id="blog_settings_custom_js">
${blog["自定义JS"]}

</textarea>
<br />


</div>



</div>
<div class="fluentinterface" style="position:fixed;bottom:4px;width:80%;box-shadow: 4px 3px 1px -2px rgb(0 0 0 / 20%),0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);">
<button class="fluentbtn fluentbtn-blue" onclick="save_blog_settings();">保存本次配置</button>
<button class="fluentbtn" onclick="window.location.reload()">放弃本次对网站设置所作的更改</button>
<button class="fluentbtn fluentbtn-blue" onclick="document.documentElement.scrollTop = 0;">返回顶部</button>
</div>

</div>

</div>

<br />
 

<hr />

  `


  if (blog["全局评论设置"]["启用valine评论"] === true) {
    document.getElementById("blog_settings_is_valine_enabled").checked = true;
  }

  if (blog["不使用全站内容授权协议"] === true) {
    document.getElementById("blog_content_license_enabled").checked = true;

  }

  if (blog["全局主题设置"]["是否使用第三方主题"] === true) {

    if (blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === true) {
      document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  目前此站点正在使用<b>从文件安装的第三方主题</b>，如果可能的话建议你从主题商店安装，因为主题商店的主题通常都有更好的支持。
  
  `;
    }

    if (blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] === false) {
      document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  目前此站点正在使用 <b>来自主题商店的第三方主题。</b>该主题的相关信息如下：<br /><br />主题名称：<b>${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"]}</b><br />
  主题版本：<b>${blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"]}</b>
  
  `;
    }


  } else {
    document.getElementById("isUsingThirdPartyTheme").innerHTML = `
  ${langdata["STATUS_USING_OFFICIAL_THEME"][lang_name]}
  
  `;
  }

  if (blog["全局主题设置"]["是否使用背景图像"] && blog["全局主题设置"]["若使用背景图像，设置为"]["使用随机二次元图片作为背景图像（浅色背景）"]) {
    document.getElementById("blog_settings_is_using_acg_bg").checked = true;
  }

  if (blog["全局评论设置"]["valine设置"]["是否使用bbg公共评论服务"]) {
    document.getElementById("leancloud_settings_detail").innerHTML = `你正在使用公共评论服务，所以不能手动设置此项。<a href="#" onclick="disable_puclic_comment_service()">如果你不想继续使用公共评论服务了，请点击这里</a>`;
    document.getElementById("hint_of_use_public_comment_service").innerHTML = "";

  }

  if (blog["网站语言"] === "简体中文") {
    document.getElementById("sitelang_simplified_chinese").selected = true;
  }

  if (blog["网站语言"] === "English") {
    document.getElementById("sitelang_english").selected = true;
  }

  if (blog["启用网站公告"] === true) {
    document.getElementById("website_announcement_enabled").checked = true;
  }

  if (blog["网站公告仅在首页显示"] === true) {
    document.getElementById("website_announcement_indexonly").checked = true;

  }

  if (blog["启用自定义CSS"] === true) {
    document.getElementById("blog_settings_enable_custom_css").checked = true;
  }

  if (blog["启用自定义JS"] === true) {
    document.getElementById("blog_settings_enable_custom_js").checked = true;
  }

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
  }

  document.getElementById("cdn_cho_2").onchange = function () {
    if (document.getElementById("cdn_cho_1").checked === true) {
      document.getElementById("cdn_cho").style.display = "block";
      document.getElementById("cdn_manual").style.display = "none";
    } else {
      document.getElementById("cdn_cho").style.display = "none";
      document.getElementById("cdn_manual").style.display = "block";
    }
  }

  document.getElementById("nav_to_blog_settings").classList.add("active");
}



