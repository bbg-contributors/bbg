module.exports = function (i) {
  const meta_page_title = document.getElementById("meta_page_title").value;
  const meta_page_title_menu = document.getElementById("meta_page_title_menu").value;
  const meta_page_isviewinmenu = document.getElementById("meta_page_isviewinmenu").checked;
  const meta_page_iscommentenabled = document.getElementById("meta_page_iscommentenabled").checked;
  const meta_page_openinnewtab = document.getElementById("meta_page_openinnewtab").checked;

  blog["页面列表"][i]["页面标题"] = meta_page_title;
  blog["页面列表"][i]["是否显示在菜单中"] = meta_page_isviewinmenu;
  blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"] = meta_page_title_menu;
  blog["页面列表"][i]["启用评论"] = meta_page_iscommentenabled;
  blog["页面列表"][i]["是否在新标签页打开"] = meta_page_openinnewtab;

  BlogInstance.writeBlogData();

  sitemap_hook();

  document.getElementById("container").innerHTML="";
  render_page_manager();

  toast_creator("success","changes have been saved!");
};
