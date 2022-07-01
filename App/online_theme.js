
const { writeFileSync } = require("fs");

function install_theme (theme_name, theme_updateDate) {
  fetch(`https://api.github.com/repos/baiyang-lzy/bbg-theme-collection/contents/${theme_name}/index.html`)
    .then(response => response.json())
    .then((responseData) => {
      save_blog_settings();
      const data = decodeURIComponent(escape(window.atob(responseData.content.replaceAll("\n", ""))));
      writeFileSync(`${rootDir}/index.html`, data);
      blog["全局主题设置"]["是否使用第三方主题"] = true;
      blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = false;
      blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = theme_name;
      blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] = theme_updateDate;

      BlogInstance.writeBlogData();
      window.alert("已经成功为此站点应用该第三方主题！");
      window.location.reload();
    })
    .catch((err) => {
      window.alert(`主题更换失败，可能是网络原因，或者api用量超限。请重试：${err}`);
    });
}

function render_theme_detail (theme_name) {
  fetch(`https://api.github.com/repos/baiyang-lzy/bbg-theme-collection/contents/${theme_name}/index.json`)
    .then((response) => { return response.json(); })
    .then((responseData) => {
      const data = JSON.parse(decodeURIComponent(escape(window.atob(responseData.content.replaceAll("\n", "")))));
      document.getElementById("download_online_theme_dialog_content").innerHTML = "";

      document.getElementById("download_online_theme_dialog_content").innerHTML += `
            <h3>${theme_name} 的主题信息</h3>
            <hr />
            <p>主题名：${theme_name}</p>
            <p>主题作者：${data["作者"]}</p>
            <p>主题作者主页：${data["作者主页"]}</p>
            <p>主题介绍：${data["介绍"]}</p>
            <p>主题更新日期：${data["更新日期"]}</p>
            <p id="is_compatible_with_bbg"></p>
            <hr />
            <button id="install_theme_btn_detail" class="fluentbtn fluentbtn-blue" onclick="install_theme('${theme_name}',${data["更新日期"]})">为此站点安装该主题</button>
            <button class="fluentbtn" onclick="render_online_theme_list()">返回主题列表</button>

        `;
      if (data["功能兼容性"]["文章列表与阅读"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持文章列表与阅读功能。<br />";

      if (data["功能兼容性"]["导航栏"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持导航栏。<br />";

      if (data["功能兼容性"]["页面导航与阅读"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持页面导航与阅读。<br />";

      if (data["功能兼容性"]["网站标题简介和底部信息显示"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持网站标题简介和底部信息显示。<br />";

      if (data["功能兼容性"]["置顶文章和隐藏文章的处理"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持置顶文章和隐藏文章的处理。<br />";

      if (data["功能兼容性"]["友人帐"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持友人帐。<br />";

      if (data["功能兼容性"]["网站公告板"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持网站公告板。<br />";

      if (data["功能兼容性"]["文章和页面评论"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持文章和页面评论。<br />";

      if (data["功能兼容性"]["BBG公共评论服务"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持BBG公共评论服务。<br />";

      if (data["功能兼容性"]["按标签显示文章"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持按标签显示文章。<br />";

      if (data["功能兼容性"]["Unpkg源设置"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持Unpkg源设置。<br />";

      if (data["功能兼容性"]["自定义CSS"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持自定义CSS。<br />";

      if (data["功能兼容性"]["自定义JS"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持自定义JS。<br />";

      if (data["功能兼容性"]["显示全站内容授权协议"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持显示全站内容授权协议。<br />";

      if (data["功能兼容性"]["文章列表分页"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持文章列表分页。<br />";

      if (data["功能兼容性"]["永久链接"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持永久链接。<br />";

      if (data["功能兼容性"]["多语言支持"]["简体中文"] !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持简体中文。<br />";

      if (data["功能兼容性"]["多语言支持"].English !== true)
        document.getElementById("is_compatible_with_bbg").innerHTML += "此主题不支持English。<br />";
    })
    .catch((err) => {
      window.alert(`主题信息加载失败，可能是网络原因，或者api用量超限。请重试：${err}`);
    });
}

function render_online_theme_list () {
  document.getElementById("download_online_theme_dialog_content").innerHTML = "";
  // todo

  document.getElementById("download_online_theme_dialog_content").innerHTML += "<h2>主题列表</h2><p>以下列出了主题商店中的主题。</p><hr />";

  fetch("https://api.github.com/repos/baiyang-lzy/bbg-theme-collection/git/trees/main")
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const theme_list = data.tree;
      for (let i = 0; i < theme_list.length; i++) {
        if (theme_list[i].type === "tree")
          document.getElementById("download_online_theme_dialog_content").innerHTML += `<h4>${theme_list[i].path}</h4><p style="color:grey;">${theme_list[i].sha}</p><p><button class="fluentbtn fluentbtn-blue" onclick="render_theme_detail('${theme_list[i].path}')">查看此主题的详情</button></p><br />`;
      }
    })
    .catch((err) => {
      window.alert(`主题商店加载失败，可能是网络原因，或者api用量超限。请重试：${err}`);
    });
}

function open_online_theme_dialog () {
  window.alert("主题商店功能基于 GitHub API 实现，因此存在用量限制。\n\n请不要频繁地使用主题商店的各个功能，包括查看主题列表、查看主题简介、下载和安装主题等等。\n\n如果弹出访问错误的提示一般都是用量超限，此时需要等候24小时后再试。\n\n感谢你的理解。");
  const online_theme_modal = new bootstrap.Modal(document.getElementById("download_online_theme_dialog"));
  online_theme_modal.toggle();
  render_online_theme_list();
}

module.exports.open_online_theme_dialog = open_online_theme_dialog;
module.exports.render_theme_detail = render_theme_detail;
module.exports.render_online_theme_list = render_online_theme_list;
module.exports.install_theme = install_theme;
