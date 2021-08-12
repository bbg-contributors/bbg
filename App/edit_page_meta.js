module.exports = function (i) {
    let metaModal = new bootstrap.Modal(document.getElementById('edit_page_meta_dialog'));
    metaModal.toggle();

    document.getElementById("save_page_meta_btn").setAttribute("onclick", `save_page_meta(${i})`)

    document.getElementById("page_meta_content").innerHTML = "";

    document.getElementById("page_meta_content").innerHTML += `
    <div class="mb-3">
    <label class="form-label">页面标题</label>
    <input class="form-control" placeholder="请输入页面标题" value="${blog["页面列表"][i]["页面标题"]}" id="meta_page_title">
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_page_isviewinmenu">
    <label class="form-check-label" for="meta_page_isviewinmenu">
      在菜单中显示
    </label>
  </div>
  
  <hr />
  
  <div class="mb-3">
    <label class="form-label">在菜单中显示名称为（不勾选“在菜单中显示”则可不填）</label>
    <input class="form-control" value="${blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"]}" id="meta_page_title_menu">
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_page_openinnewtab">
    <label class="form-check-label" for="meta_page_openinnewtab">
      在新标签页中打开
    </label>
  </div>
  
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="meta_page_iscommentenabled">
    <label class="form-check-label" for="meta_page_iscommentenabled">
      启用评论
    </label>
  </div>
  
  `
    if (blog["页面列表"][i]["是否显示在菜单中"] === true) {
        document.getElementById("meta_page_isviewinmenu").checked = true;
    }
    if (blog["页面列表"][i]["是否在新标签页打开"] === true) {
        document.getElementById("meta_page_openinnewtab").checked = true;
    }

    if (blog["页面列表"][i]["启用评论"] === true) {
        document.getElementById("meta_page_iscommentenabled").checked = true;
    }

}