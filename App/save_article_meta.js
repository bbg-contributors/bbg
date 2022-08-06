module.exports = function (i) {
  const meta_article_title = document.getElementById("meta_article_title").value;
  const meta_article_description = document.getElementById("meta_article_description").value;
  const meta_article_createdat = document.getElementById("meta_article_createdat").value;
  const meta_article_updatedat = document.getElementById("meta_article_updatedat").value;
  const meta_article_tags = document.getElementById("meta_article_tags").value;
  const meta_article_istop = document.getElementById("meta_article_istop").checked;
  const meta_article_is_comment_enabled = document.getElementById("meta_article_is_comment_enabled").checked;
  const meta_article_ishidden = document.getElementById("meta_article_ishidden").checked;

  blog["文章列表"][i]["文章标题"] = meta_article_title;
  blog["文章列表"][i]["摘要"] = meta_article_description;
  blog["文章列表"][i]["创建日期"] = meta_article_createdat;
  blog["文章列表"][i]["修改日期"] = meta_article_updatedat;

  const tempTagArray = meta_article_tags.split(" ").filter(x => x !== "");

  blog["文章列表"][i]["标签"] = tempTagArray;

  if (meta_article_istop === true)
    blog["文章列表"][i]["是否置顶"] = true;
  else
    blog["文章列表"][i]["是否置顶"] = false;

  if (meta_article_ishidden === true)
    blog["文章列表"][i]["是否隐藏"] = true;
  else
    blog["文章列表"][i]["是否隐藏"] = false;

  if (meta_article_is_comment_enabled === true)
    blog["文章列表"][i]["启用评论"] = true;
  else
    blog["文章列表"][i]["启用评论"] = false;

  BlogInstance.writeBlogData();

  rss_hook();
  sitemap_hook();

  document.getElementById("container").innerHTML="";
  renderArticleManager();

  toast_creator("success","changes have been saved!");
};
