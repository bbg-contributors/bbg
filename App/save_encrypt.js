module.exports = function (i) {
  encrypt_operate_success = true;
  const is_encrypt_enabled = document.querySelector("#is_encrypt_enabled").checked;
  const old_encrypt_data = blog["文章列表"][i]["启用加密"];

  if (is_encrypt_enabled === true)
    blog["文章列表"][i]["启用加密"] = true;
  else
    blog["文章列表"][i]["启用加密"] = false;

  if (old_encrypt_data === false && blog["文章列表"][i]["启用加密"] === true)
    encrypt_article(i, document.querySelector("#encrypt_password").value);

  BlogInstance.writeBlogData();

  if (encrypt_operate_success === true) {
    toast_creator("success", "changes have been saved!");
  }
};