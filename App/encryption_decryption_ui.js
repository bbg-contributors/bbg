
const {readFileSync, writeFileSync} = require("fs");

const ui_encrypt_article = (article_id) => {
  const encryptionOptionsModal = new bootstrap.Modal(document.getElementById("encryptionOptionsModal"));
  encryptionOptionsModal.show();
  let bodyContentOfModal = document.getElementById("encryptionOptionsModalBody");
  bodyContentOfModal.innerHTML = `
    <div class="mb-3">
    <label class="form-label"><i class="fa fa-password"></i> ${langdata.INPUT_A_PASSWORD[lang_name]}</label>
    <input class="form-control" placeholder="${langdata.INPUT_A_PASSWORD[lang_name]}" value="" id="article_password_modal_value">
  </div>
  <fluent-button appearance="accent" id="encryptionOptionsModalEncryptBtn">${langdata.ENCRYPT_ARTICLE[lang_name]}</fluent-button>
    `;
  document.getElementById("encryptionOptionsModalEncryptBtn").addEventListener("click", () => {
    let password = document.getElementById("article_password_modal_value").value;
    let original_content = readFileSync(`${rootDir}/data/articles/${blog["文章列表"][article_id]["文件名"]}`, "utf-8");
    let encrypted_content = encrypt_content(original_content, password);
    writeFileSync(`${rootDir}/data/articles/${blog["文章列表"][article_id]["文件名"]}`, encrypted_content);
    blog["文章列表"][article_id]["是否加密"] = true;
    BlogInstance.writeBlogData();
    document.getElementById("container").innerHTML="";
    renderArticleManager();
    encryptionOptionsModal.hide();
  });
};

const ui_decrypt_article = (article_id) => {

  const encryptionOptionsModal = new bootstrap.Modal(document.getElementById("encryptionOptionsModal"));
  encryptionOptionsModal.show();
  let bodyContentOfModal = document.getElementById("encryptionOptionsModalBody");
  bodyContentOfModal.innerHTML = `
    <div class="mb-3">
    <label class="form-label"><i class="fa fa-password"></i> ${langdata.INPUT_A_PASSWORD[lang_name]}</label>
    <input class="form-control" placeholder="${langdata.INPUT_A_PASSWORD[lang_name]}" value="" id="article_password_modal_value">
  </div>
  <fluent-button appearance="accent" id="encryptionOptionsModalDecryptBtn">${langdata.DECRYPT_ARTICLE[lang_name]}</fluent-button>
    `;
  document.getElementById("encryptionOptionsModalDecryptBtn").addEventListener("click", () => {
    let password = document.getElementById("article_password_modal_value").value;
    let original_content = readFileSync(`${rootDir}/data/articles/${blog["文章列表"][article_id]["文件名"]}`, "utf-8");
    let decrypted_content;
    try{
      decrypted_content = decrypt_content(original_content, password);
      writeFileSync(`${rootDir}/data/articles/${blog["文章列表"][article_id]["文件名"]}`, decrypted_content);
      blog["文章列表"][article_id]["是否加密"] = false;
      BlogInstance.writeBlogData();
      window.location.reload();
    }catch(e){
      alert(langdata.WRONG_PASSWORD[lang_name]);
    }
    document.getElementById("container").innerHTML="";
    renderArticleManager();
    encryptionOptionsModal.hide();
        
  });

};

module.exports = {
  ui_encrypt_article: ui_encrypt_article,
  ui_decrypt_article: ui_decrypt_article
};