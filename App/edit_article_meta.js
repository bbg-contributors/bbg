const loadIME = require("./loadIME");
const xssStrict = require("xss");

module.exports = function (i) {
  const metaModal = new bootstrap.Modal(document.getElementById("edit_article_meta_dialog"));
  metaModal.toggle();

  document.getElementById("edit_article_meta_dialog_title").innerHTML = langdata.EDIT_ARTICLE_META[lang_name];

  document.getElementById("save_article_meta_btn").setAttribute("onclick", `save_article_meta(${i})`);

  document.getElementById("article_meta_content").innerHTML = "";

  document.getElementById("article_meta_content").insertAdjacentHTML("beforeend", `
  <div class="container-fluid">
    <div class="row">
      <div class="col-7">
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-book"></i> ${langdata.ARTICLE_TITLE[lang_name]}</label>
          <input class="form-control" placeholder="${langdata.PLEASE_INPUT_ARTICLE_TITLE[lang_name]}" id="meta_article_title">
        </div>
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-file-text-o"></i> ${langdata.ARTICLE_ABSTRACT[lang_name]}</label>
          <textarea class="form-control" placeholder="${langdata.PLEASE_INPUT_ARTICLE_ABSTRACT[lang_name]}" id="meta_article_description">${xssStrict(blog["文章列表"][i]["摘要"])}</textarea>
        </div>
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-calendar"></i> ${langdata.CREATEDAT_EDIT_META[lang_name]}</label>
          <input class="form-control" placeholder="${langdata.PLEASE_INPUT_CREATEDAT[lang_name]}" value="${new Date(blog["文章列表"][i]["创建时间（时间戳）"]).toISOString()}" id="meta_article_createdat">
        </div>
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-calendar"></i> ${langdata.MODIFIEDAT_EDIT_META[lang_name]}</label>
          <input class="form-control" placeholder="${langdata.PLEASE_INPUT_UPDATEDDAT[lang_name]}" value="${new Date(blog["文章列表"][i]["修改时间（时间戳）"]).toISOString()}" id="meta_article_updatedat">
        </div>
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-tags"></i> ${langdata.TAGS_EDIT_META[lang_name]}</label>
          <input class="form-control"  placeholder="${langdata.PLEASE_INPUT_TAGS[lang_name]}" id="meta_article_tags">
        </div>
      </div>
      <div class="col-5">
        <div class="mb-3">
          <label class="form-label"><i class="fa fa-file-text-o"></i> ${langdata.FILENAME[lang_name]}</label>
          <input class="form-control"  placeholder=" ${langdata.FILENAME[lang_name]}" id="meta_article_filename">
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="meta_article_is_comment_enabled">
          <label class="form-check-label" for="meta_article_is_comment_enabled">
          ${langdata.ENABLE_COMMENT[lang_name]}
          </label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="meta_article_istop">
          <label class="form-check-label" for="meta_article_istop">
          ${langdata.ARTICLE_IS_TOP[lang_name]}
          </label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="meta_article_ishidden">
          <label class="form-check-label" for="meta_article_ishidden">
          ${langdata.HIDE_ARTICLE_IN_LIST[lang_name]}
          </label>
          
          <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="${langdata["HINT_OF_HIDE_ARTICLE_OPTION"][lang_name]}">
            <i class="fa fa-exclamation-triangle " style="color:grey"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
`);

  document.getElementById("meta_article_title").value = xssStrict(blog["文章列表"][i]["文章标题"]);
  document.getElementById("meta_article_filename").value = xssStrict(blog["文章列表"][i]["文件名"]);

  const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  loadIME("#meta_article_title");
  loadIME("#meta_article_description");
  loadIME("#meta_article_createdat");
  loadIME("#meta_article_updatedat");
  loadIME("#meta_article_tags");
  loadIME("#meta_article_filename");

  if (blog["文章列表"][i]["标签"].length !== 0) {
    let tempTagString = "";
    for (let k = 0; k < blog["文章列表"][i]["标签"].length; k++)
      tempTagString += `${xssStrict(blog["文章列表"][i]["标签"][k])} `;

    tempTagString = tempTagString.slice(0, tempTagString.length - 1);

    document.getElementById("meta_article_tags").value = tempTagString;
  }

  if (blog["文章列表"][i]["是否置顶"] === true)
    document.getElementById("meta_article_istop").checked = true;

  if (blog["文章列表"][i]["是否隐藏"] === true)
    document.getElementById("meta_article_ishidden").checked = true;

  if (blog["文章列表"][i]["启用评论"] === true)
    document.getElementById("meta_article_is_comment_enabled").checked = true;
};
