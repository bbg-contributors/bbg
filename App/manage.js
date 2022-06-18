const AppPath = require('@electron/remote').app.getPath('userData');

const storage = require("electron-json-storage");
storage.setDataPath(AppPath);

const langdata = require("./LangData.js");

const getUrlArgs = require("./getUrlArgs.js");
const BlogData = require("./BlogData.js");
const check_migrate = require("./check_migrate.js");
const randomString = require("./randomString.js");

// 创建 blog 对象
const rootDir = decodeURIComponent(getUrlArgs("rootdir"));
const BlogInstance = new BlogData(rootDir);

let blog = BlogInstance.getBlogData();

// 界面渲染
let render_nav = require("./render_nav.js");
let render_container = require("./render_container.js");
let render_blog_settings = require("./render_blog_settings.js");
let renderArticleManager = require("./render_article_manager.js");
let render_page_manager = require("./render_page_manager.js");

// 管理功能
let edit_article = require("./edit_article.js");
let edit_page = require("./edit_page.js");
let edit_article_meta = require("./edit_article_meta.js");
let edit_page_meta = require("./edit_page_meta.js");
let save_article_meta = require("./save_article_meta.js");
let save_page_meta = require("./save_page_meta.js");
let add_new_friend = require("./add_new_friend.js");
let render_friend_book_list = require("./render_friend_book_list.js");
let save_friend_book = require("./save_friend_book.js");
let delete_friend = require("./delete_friend.js");
let edit_friend_book = require("./edit_friend_book.js");
let add_a_article = require("./add_a_article.js");
let add_a_page = require("./add_a_page.js");
let delete_article = require("./delete_article.js");
let delete_page = require("./delete_page.js");
let let_article_up = require("./change_article_order.js").let_article_up;
let let_article_down = require("./change_article_order.js").let_article_down;
let save_blog_settings = require("./save_blog_settings.js");
let reset_official_theme = require("./reset_official_theme.js");
let apply_thirdparty_theme = require("./apply_thirdparty_theme.js");
let open_online_theme_dialog = require("./online_theme.js").open_online_theme_dialog;
let render_theme_detail = require("./online_theme.js").render_theme_detail;
let render_online_theme_list = require("./online_theme.js").render_online_theme_list;
let install_theme = require("./online_theme.js").install_theme;
let { view_current_icon, delete_current_icon, select_a_favicon } = require("./favicon.js");
let use_public_comment_service_offered_by_bbg = require("./public_comment_srv.js");
let disable_puclic_comment_service = require("./disable_public_comment_service.js");
let generate_sitemap = require("./generate_sitemap.js").generate_sitemap;
let open_generate_sitemap_dialog = require("./generate_sitemap.js").open_generate_sitemap_dialog;
let check_data_consistency = require("./check_data_consistency.js");
let getUiFileContent = require("./getUiFileContent.js");

// goto and menu functions
let goto_article_manager = require("./gotoFx.js").goto_article_manager;
let goto_page_manager = require("./gotoFx.js").goto_page_manager;
let goto_blog_settings = require("./gotoFx.js").goto_blog_settings;
let goto_manage_index = require("./gotoFx.js").goto_manage_index;
let exitThisSite = require("./menuFx.js").exitThisSite;
let preview_site = require("./menuFx.js").preview_site;
let open_blog_dir = require("./menuFx.js").open_blog_dir;

let loadUniStyle = require("./loadUniStyle.js");
let ui_hook_load_finished = require("./ui_hook_load_finished.js")
const e = require('express');

storage.set("last_managed_site", { title: blog["博客标题"], rootdir: rootDir }, function (err) {

});




// 初始化界面

storage.has("language", function (error, hasKey) {
  if (hasKey) {
    storage.get("language", function (error, data) {
      lang_name = data["name"];
      check_migrate();
      render_container();
      render_nav();
      loadUniStyle();


      if (window.location.href.indexOf("article_manager.html") !== -1) {
        renderArticleManager();
      } else {
        if (window.location.href.indexOf("page_manager.html") !== -1) {
          render_page_manager();
        } else {
          if (window.location.href.indexOf("blog_settings.html") !== -1) {
            render_blog_settings();
          }
        }
      }

      ui_hook_load_finished();

    }
    )
  } else {
    lang_name = "English";
  }
})
