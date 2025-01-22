const AppPath = require("@electron/remote").app.getPath("userData");

const storage = require("electron-json-storage");
storage.setDataPath(AppPath);

const e = require("express");

const langdata = require("./LangData.js");

const getUrlArgs = require("./getUrlArgs.js");
const BlogData = require("./BlogData.js");
const migrate = require("./migrate_core.js");
const check_migrate = require("./check_migrate.js");
const randomString = require("./randomString.js");
const shell = require("@electron/remote").shell;
const { rmSync } = require("fs");
const { ipcRenderer } = require("electron");

// 创建 blog 对象
const rootDir = decodeURIComponent(getUrlArgs("rootdir")).replaceAll("\\", "/");
const BlogInstance = new BlogData(rootDir);

const blog = BlogInstance.getBlogData();

// 界面渲染
const render_nav = require("./render_nav.js");
const render_container = require("./render_container.js");
const render_blog_settings = require("./render_blog_settings.js");
const renderArticleManager = require("./render_article_manager.js");
const render_page_manager = require("./render_page_manager.js");
const render_markdown_editor = require("./render_markdown_editor.js");

const convertTimeStampToLocalTime = require("./timestamp_converter.js");

// 管理功能
const edit_article = require("./edit_article.js");
const edit_page = require("./edit_page.js");
const edit_article_meta = require("./edit_article_meta.js");
const edit_page_meta = require("./edit_page_meta.js");
const save_article_meta = require("./save_article_meta.js");
const save_page_meta = require("./save_page_meta.js");
const save_encrypt = require("./save_encrypt.js");
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
const let_friend_up = require("./change_friend_order.js").let_friend_up;
const let_friend_down = require("./change_friend_order.js").let_friend_down;
const toast_creator = require("./toast_creator.js");
const create_confirm_dialog = require("./create_confirm_dialog");
const save_blog_settings = require("./save_blog_settings.js");
const reset_official_theme = require("./reset_official_theme.js");
const apply_thirdparty_theme = require("./apply_thirdparty_theme.js");
const apply_thirdparty_theme_v2_core = require("./apply_thirdparty_theme_v2_core.js");
const check_thirdparty_theme_update =
  require("./online_theme").check_thirdparty_theme_update;
const apply_thirdparty_theme_v2 = require("./apply_thirdparty_theme_v2.js");
const open_online_theme_dialog =
  require("./online_theme.js").open_online_theme_dialog;
const render_theme_detail = require("./online_theme.js").render_theme_detail;
const render_online_theme_list =
  require("./online_theme.js").render_online_theme_list;
const install_theme = require("./online_theme.js").install_theme;
const {
  view_current_icon,
  delete_current_icon,
  select_a_favicon,
} = require("./favicon.js");
const use_public_comment_service_offered_by_bbg = require("./public_comment_srv.js");
const disable_puclic_comment_service = require("./disable_public_comment_service.js");
const generate_sitemap = require("./generate_sitemap.js");
const check_data_consistency = require("./check_data_consistency.js");
const getUiFileContent = require("./getUiFileContent.js");
const generate_rss = require("./generate_rss.js");
const rss_hook = require("./rss_hook.js");
const sitemap_hook = require("./sitemap_hook.js");
const encrypt_content = require("./encrypt_content.js");
const decrypt_content = require("./decrypt_content.js");
const {
  ui_encrypt_article,
  ui_decrypt_article,
} = require("./encryption_decryption_ui.js");
const enterBlogSettingInterfaceOf = require("./navToSectionOfBlogSetting.js");

const config_third_party_theme =
  require("./config_third_party_theme.js").config_third_party_theme;
const save_config_of_third_party_theme =
  require("./config_third_party_theme.js").save_config_of_third_party_theme;
const backup_themecfg = require("./backup_themecfg.js");

// goto and menu functions
const goto_article_manager = require("./gotoFx.js").goto_article_manager;
const goto_page_manager = require("./gotoFx.js").goto_page_manager;
const goto_blog_settings = require("./gotoFx.js").goto_blog_settings;
const exitThisSite = require("./menuFx.js").exitThisSite;
const preview_site = require("./menuFx.js").preview_site;
const open_blog_dir = require("./menuFx.js").open_blog_dir;
const tooltip_load = require("./tooltip_load.js");

const loadUniStyle = require("./loadUniStyle.js");
const ui_hook_load_finished = require("./ui_hook_load_finished.js");
const render_preview_and_publish_page = require("./render_preview_and_publish_page.js");
const preview_and_publish = require("./preview_and_publish.js");
const enterPreviewAndPublishInterfaceOf = require("./navToSectionOfPreviewAndPublish.js");
const preview_and_publish_dialog = require("./preview_and_publish_dialog.js");
const express = require("express");

const xssStirct = require("xss");

storage.set("last_managed_site", {
  title: xssStirct(blog["博客标题"]),
  rootdir: rootDir,
});

if (currentPage !== "markdown_editor") {
  const server = express();

  server.use(express.static(rootDir));

  server.listen(41701, "localhost", () => {
    // console.log("live server listening at http://localhost:41701");
  });
}
// 初始化界面


window.addEventListener("keyup", () => {
  save_blog_settings();
});

function init_ui() {
  document.querySelector("#root").innerHTML = "";
  check_migrate();
  render_container();
  if (currentPage !== "markdown_editor") {
    render_nav();
  }
  loadUniStyle();
  if (currentPage === "article_manager") {
    renderArticleManager();
  } else {
    if (currentPage === "page_manager") {
      render_page_manager();
    } else {
      if (currentPage === "blog_settings") render_blog_settings();
      else {
        if (currentPage === "markdown_editor") {
          render_markdown_editor();
        } else {
          if (currentPage === "server") {
            render_preview_and_publish_page();
          }
        }
      }
    }
  }

  ui_hook_load_finished();
}

storage.has("language", (error, hasKey) => {
  if (hasKey) {
    storage.get("language", (error, data) => {
      if (error) console.error(error);
      lang_name = data.name;
      init_ui();
    });
  } else {
    lang_name = "English";
    init_ui();
  }
  if (error) console.error(error);
});

ipcRenderer.on("openExistingSite", () => {
  create_confirm_dialog(
    "当前窗口已经打开了一个站点，如果继续，则当前窗口将被关闭，未保存的更改会丢失。是否继续？",
    "ipcRenderer.send('backToStartPageAndOpenExistingSite')"
  );
});

ipcRenderer.on("createNewSite", () => {
  create_confirm_dialog(
    "当前窗口已经打开了一个站点，如果继续，则当前窗口将被关闭，未保存的更改会丢失。是否继续？",
    "ipcRenderer.send('backToStartPageAndCreateNewSite')"
  );
});
