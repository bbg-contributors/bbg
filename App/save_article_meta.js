const { renameSync, existsSync, readFileSync, writeFileSync } = require("fs");
const content_encrypt = require("./encrypt_article");
const content_decrypt = require("./decrypt_article");

module.exports = function (i) {

  save_article_meta_operate_success = true;

  const meta_article_title = document.getElementById("meta_article_title").value;
  const meta_article_description = document.getElementById("meta_article_description").value;
  const meta_article_createdat = document.getElementById("meta_article_createdat").value;
  const meta_article_updatedat = document.getElementById("meta_article_updatedat").value;
  const meta_article_tags = document.getElementById("meta_article_tags").value;
  const meta_article_password = document.getElementById("meta_article_password").value;
  const meta_article_password_status = meta_article_password ? true : false;
  const meta_article_istop = document.getElementById("meta_article_istop").checked;
  const meta_article_is_comment_enabled = document.getElementById("meta_article_is_comment_enabled").checked;
  const meta_article_ishidden = document.getElementById("meta_article_ishidden").checked;
  meta_article_filename = document.getElementById("meta_article_filename").value;
  if (meta_article_filename.substring(meta_article_filename.length - 3) !== ".md") {
    meta_article_filename += ".md";
  }

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

  if (meta_article_filename !== blog["文章列表"][i]["文件名"] && existsSync(`${rootDir}/data/articles/${meta_article_filename}`) === false) {
    renameSync(`${rootDir}/data/articles/${blog["文章列表"][i]["文件名"]}`, `${rootDir}/data/articles/${meta_article_filename}`);
    blog["文章列表"][i]["文件名"] = meta_article_filename;
  } else if (meta_article_filename !== blog["文章列表"][i]["文件名"] && existsSync(`${rootDir}/data/articles/${meta_article_filename}`) === true) {
    toast_creator("danger", "the filename you specfied already exists in the folder");
    save_article_meta_operate_success = false;
  }

  if (meta_article_password_status === true && save_article_meta_operate_success === true && blog["文章列表"][i]["已加密"] !== true) {
    let data = readFileSync(`${rootDir}/data/articles/${meta_article_filename}`, "utf8");
    let encrypted_content = content_encrypt(data, meta_article_password).result;
    writeFileSync(`${rootDir}/data/articles/${meta_article_filename}`, encrypted_content);
    blog["文章列表"][i]["启用加密"] = true;
    blog["文章列表"][i]["已加密"] = true;
    // FIXME: should be removed in the final release
    blog["文章列表"][i]["密码"] = meta_article_password;
  } else if (meta_article_password_status !== true && save_article_meta_operate_success === true && blog["文章列表"][i]["启用加密"] === true && blog["文章列表"][i]["已加密"] === true) {
    // Decrypt
    let data = readFileSync(`${rootDir}/data/articles/${meta_article_filename}`, "utf8");
    let decrypted_content = content_decrypt(data, blog["文章列表"][i]["密码"]).status ? content_decrypt(data, meta_article_password).result : "";
    console.log(content_decrypt(data, meta_article_password).status);
    writeFileSync(`${rootDir}/data/articles/${meta_article_filename}`, decrypted_content);
    blog["文章列表"][i]["启用加密"] = false;
    blog["文章列表"][i]["已加密"] = false;
    blog["文章列表"][i]["密码"] = "";
  }

  BlogInstance.writeBlogData();

  rss_hook();
  sitemap_hook();

  document.getElementById("container").innerHTML = "";
  renderArticleManager();
  if (save_article_meta_operate_success === true) {
    toast_creator("success", "changes have been saved!");
  }

};