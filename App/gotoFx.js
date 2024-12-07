
function goto_article_manager () {
  currentPage = "article_manager";
  init_ui();
}

function goto_page_manager () {
  currentPage = "page_manager";
  init_ui();
}

function goto_blog_settings () {
  currentPage = "blog_settings";
  init_ui();
}

module.exports.goto_article_manager = goto_article_manager;

module.exports.goto_blog_settings = goto_blog_settings;

module.exports.goto_page_manager = goto_page_manager;
