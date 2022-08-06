function let_article_up (article_id) {
  if (article_id !== 0) {
    const articleObj = blog["文章列表"][article_id];
    blog["文章列表"].splice(article_id - 1, 0, articleObj);
    blog["文章列表"].splice(article_id + 1, 1);
    BlogInstance.writeBlogData();
    toast_creator("success","done");
    document.getElementById("container").innerHTML = "";
    renderArticleManager();
  }
}

function let_article_down (article_id) {
  if (article_id !== blog["文章列表"].length - 1) {
    const articleObj = blog["文章列表"][article_id];
    blog["文章列表"].splice(article_id + 2, 0, articleObj);
    blog["文章列表"].splice(article_id, 1);
    BlogInstance.writeBlogData();
    toast_creator("success","done");
    document.getElementById("container").innerHTML = "";
    renderArticleManager();
  }
}

module.exports = {
  let_article_up,
  let_article_down,
};
