module.exports = function (i) {

  create_confirm_dialog(`
  
  是否确认删除此文章？<b>此操作不可逆</b>
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
