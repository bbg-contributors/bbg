module.exports = function (i) {

  create_confirm_dialog(`
  
  ${langdata.ARE_YOU_SURE_DELETE_ARTICLE[lang_name]}
  `,"",`
  try {
    rmSync(\`${rootDir}/data/articles/${blog["文章列表"][i]["文件名"]}\`);
  } catch (error) {

  }

  blog["文章列表"].splice(${i}, 1);
  BlogInstance.writeBlogData();

  rss_hook();
  sitemap_hook();

  toast_creator("success","done");

  document.getElementById("container").innerHTML = "";
  renderArticleManager();
  
  `);
};
