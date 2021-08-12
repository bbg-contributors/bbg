const storage = require("electron-json-storage");

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
let add_a_article = require("./add_a_article.js");
let add_a_page = require("./add_a_page.js");
let delete_article = require("./delete_article.js");
let delete_page = require("./delete_page.js");
let save_blog_settings = require("./save_blog_settings.js");


// goto and menu functions
let goto_article_manager = require("./gotoFx.js").goto_article_manager;
let goto_page_manager = require("./gotoFx.js").goto_page_manager;
let goto_blog_settings = require("./gotoFx.js").goto_blog_settings;
let goto_manage_index = require("./gotoFx.js").goto_manage_index;
let exitThisSite = require("./menuFx.js").exitThisSite;
let preview_site = require("./menuFx.js").preview_site;
let open_blog_dir = require("./menuFx.js").open_blog_dir;

let loadUniStyle = require("./loadUniStyle.js");

storage.set("last_managed_site", { title: blog["博客标题"], rootdir: rootDir }, function (err) {

});

// 初始化界面

check_migrate();
render_nav();
render_container();
loadUniStyle();