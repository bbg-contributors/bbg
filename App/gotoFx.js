
function goto_article_manager() {
    window.location.href = `./article_manager.html?rootdir=${rootDir}`;
  }
  
  function goto_manage_index() {
    window.location.href = `./manage.html?rootdir=${rootDir}`;
  }
  
  function goto_page_manager() {
    window.location.href = `./page_manager.html?rootdir=${rootDir}`;
  }
  
  function goto_blog_settings() {
    window.location.href = `./blog_settings.html?rootdir=${rootDir}`;
  }

  module.exports.goto_article_manager = goto_article_manager;

  module.exports.goto_manage_index = goto_manage_index;

  module.exports.goto_blog_settings = goto_blog_settings;

  module.exports.goto_page_manager = goto_page_manager;