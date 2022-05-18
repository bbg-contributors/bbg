module.exports = function (i) {
  let metaModal = new bootstrap.Modal(document.getElementById('edit_article_meta_dialog'));
  metaModal.toggle();

  document.getElementById("edit_article_meta_dialog_title").innerHTML = langdata["EDIT_ARTICLE_META"][lang_name];


  document.getElementById("save_article_meta_btn").setAttribute("onclick", `save_article_meta(${i})`)

  document.getElementById("article_meta_content").innerHTML = "";

  document.getElementById("article_meta_content").innerHTML += `
    <div class="mb-3">
    <label class="form-label">${langdata["ARTICLE_TITLE"][lang_name]}</label>
    <input class="form-control" placeholder="请输入文章标题" value="${blog["文章列表"][i]["文章标题"]}" id="meta_article_title">
  </div>
  <div class="mb-3">
    <label class="form-label">${langdata["ARTICLE_ABSTRACT"][lang_name]}</label>
    <textarea class="form-control" placeholder="请输入文章摘要" id="meta_article_description">${blog["文章列表"][i]["摘要"]}</textarea>
  </div>
  <div class="mb-3">
    <label class="form-label">${langdata["CREATEDAT_EDIT_META"][lang_name]}</label>
    <input class="form-control" placeholder="请输入创建日期" value="${blog["文章列表"][i]["创建日期"]}" id="meta_article_createdat">
  </div>
  <div class="mb-3">
    <label class="form-label">${langdata["MODIFIEDAT_EDIT_META"][lang_name]}</label>
    <input class="form-control" placeholder="请输入修改日期" value="${blog["文章列表"][i]["修改日期"]}" id="meta_article_updatedat">
  </div>
  <div class="mb-3">
    <label class="form-label">${langdata["TAGS_EDIT_META"][lang_name]}</label>
    <input class="form-control"  placeholder="在这里填入标签（如果有的话）" id="meta_article_tags">
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_article_istop">
    <label class="form-check-label" for="meta_article_istop">
    ${langdata["ARTICLE_IS_TOP"][lang_name]}
    </label>
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_article_is_comment_enabled">
    <label class="form-check-label" for="meta_article_is_comment_enabled">
    ${langdata["ENABLE_COMMENT"][lang_name]}
    </label>
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_article_ishidden">
    <label class="form-check-label" for="meta_article_ishidden">
    ${langdata["HIDE_ARTICLE_IN_LIST"][lang_name]}
    </label>
  </div>
  
  
    
    `
  if (blog["文章列表"][i]["标签"].length !== 0) {

    let tempTagString = "";
    for (let k = 0; k < blog["文章列表"][i]["标签"].length; k++) {
      tempTagString += blog["文章列表"][i]["标签"][k] + " ";
    }

    tempTagString = tempTagString.slice(0, tempTagString.length - 1);

    document.getElementById("meta_article_tags").value = tempTagString;

  }

  if (blog["文章列表"][i]["是否置顶"] === true) {
    document.getElementById("meta_article_istop").checked = true;
  }

  if (blog["文章列表"][i]["是否隐藏"] === true) {
    document.getElementById("meta_article_ishidden").checked = true;
  }
  if (blog["文章列表"][i]["启用评论"] === true) {
    document.getElementById("meta_article_is_comment_enabled").checked = true;
  }

}
