const AppPath = require("@electron/remote").app.getPath("userData");

const storage = require("electron-json-storage");
storage.setDataPath(AppPath);

const langdata = require("./LangData.js");

const getUrlArgs = require("./getUrlArgs.js");
const BlogData = require("./BlogData.js");
const migrate = require("./migrate_core.js");
const check_migrate = require("./check_migrate.js");
const randomString = require("./randomString.js");

// 创建 blog 对象
const rootDir = decodeURIComponent(getUrlArgs("rootdir"));
const BlogInstance = new BlogData(rootDir);

const blog = BlogInstance.getBlogData();

// 界面渲染
const render_nav = require("./render_nav.js");
const render_container = require("./render_container.js");
const render_blog_settings = require("./render_blog_settings.js");
const renderArticleManager = require("./render_article_manager.js");
const render_page_manager = require("./render_page_manager.js");

// 管理功能
const edit_article = require("./edit_article.js");
const edit_page = require("./edit_page.js");
const edit_article_meta = require("./edit_article_meta.js");
const edit_page_meta = require("./edit_page_meta.js");
const save_article_meta = require("./save_article_meta.js");
const save_page_meta = require("./save_page_meta.js");
const add_new_friend = require("./add_new_friend.js");
const render_friend_book_list = require("./render_friend_book_list.js");
const save_friend_book = require("./save_friend_book.js");
const delete_friend = require("./delete_friend.js");
const edit_friend_book = require("./edit_friend_book.js");
const add_a_article = require("./add_a_article.js");
const add_a_page = require("./add_a_page.js");
const delete_article = require("./delete_article.js");
const delete_page = require("./delete_page.js");
const let_article_up = require("./change_article_order.js").let_article_up;
const let_article_down = require("./change_article_order.js").let_article_down;
const save_blog_settings = require("./save_blog_settings.js");
const reset_official_theme = require("./reset_official_theme.js");
const apply_thirdparty_theme = require("./apply_thirdparty_theme.js");
const apply_thirdparty_theme_v2 = require("./apply_thirdparty_theme_v2.js");
const open_online_theme_dialog = require("./online_theme.js").open_online_theme_dialog;
const render_theme_detail = require("./online_theme.js").render_theme_detail;
const render_online_theme_list = require("./online_theme.js").render_online_theme_list;
const install_theme = require("./online_theme.js").install_theme;
const { view_current_icon, delete_current_icon, select_a_favicon } = require("./favicon.js");
const use_public_comment_service_offered_by_bbg = require("./public_comment_srv.js");
const disable_puclic_comment_service = require("./disable_public_comment_service.js");
const generate_sitemap = require("./generate_sitemap.js").generate_sitemap;
const open_generate_sitemap_dialog = require("./generate_sitemap.js").open_generate_sitemap_dialog;
const check_data_consistency = require("./check_data_consistency.js");
const getUiFileContent = require("./getUiFileContent.js");

// goto and menu functions
const goto_article_manager = require("./gotoFx.js").goto_article_manager;
const goto_page_manager = require("./gotoFx.js").goto_page_manager;
const goto_blog_settings = require("./gotoFx.js").goto_blog_settings;
const goto_manage_index = require("./gotoFx.js").goto_manage_index;
const exitThisSite = require("./menuFx.js").exitThisSite;
const preview_site = require("./menuFx.js").preview_site;
const open_blog_dir = require("./menuFx.js").open_blog_dir;

const loadUniStyle = require("./loadUniStyle.js");
const ui_hook_load_finished = require("./ui_hook_load_finished.js");
const e = require("express");

storage.set("last_managed_site", { title: blog["博客标题"], rootdir: rootDir }, (err) => {

});

// 初始化界面

storage.has("language", (error, hasKey) => {
  if (hasKey) {
    storage.get("language", (error, data) => {
      lang_name = data.name;
      check_migrate();
      render_container();
      render_nav();
      loadUniStyle();

      if (window.location.href.includes("article_manager.html")) {
        renderArticleManager();
      } else {
        if (window.location.href.includes("page_manager.html")) {
          render_page_manager();
        } else {
          if (window.location.href.includes("blog_settings.html"))
            render_blog_settings();
        }
      }

      ui_hook_load_finished();
    },
    );
  } else {
    lang_name = "English";
  }
});
