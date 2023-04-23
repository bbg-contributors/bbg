// TODO: i18n
module.exports = function (i) {
  const metaModal = new bootstrap.Modal(document.querySelector("#encrypt_options_dialog"));
  metaModal.toggle();
  document.querySelector("#encrypt_options_title").innerHTML = "加密选项";
  const encrypt_options_content = document.querySelector("#encrypt_options_content");
  const encrypt_options_dialog_footer = document.querySelector("#encrypt_options_dialog_footer");
  encrypt_options_content.innerHTML = `
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="is_encrypt_enabled">
      <label class="form-check-label" for="is_encrypt_enabled">
        启用加密
      </label>
    </div>
  `;
  if (blog["文章列表"][i]["启用加密"] === true) {
    encrypt_options_content.insertAdjacentHTML("beforeend",`
      <div class="mb-3">
        <label class="form-label"><i class="fa fa-lock"></i> 原加密密码</label>
        <input class="form-control"  placeholder="在这里填写原加密密码(关闭加密和更新加密密码时填写)" id="encrypt_password" value="">
      </div>
      <div class="mb-3">
        <label class="form-label"><i class="fa fa-lock"></i> 新加密密码</label>
        <input class="form-control" placeholder="在这里填写新加密密码(更新加密密码时填写)" id="encrypt_update_password" value="">
      </div>
    `);
  }
  else {
    encrypt_options_content.insertAdjacentHTML("beforeend",`
      <div class="mb-3">
        <label class="form-label"><i class="fa fa-lock"></i> 加密密码</label>
        <input class="form-control"  placeholder="在这里填写加密密码（如果需要加密请打开下面的启用加密按钮）" id="encrypt_password" value="">
      </div>
    `);
  }
  if (blog["文章列表"][i]["启用加密"] === true)
    document.querySelector("is_encrypt_enabled").checked = true;

  encrypt_options_dialog_footer.innerHTML = `
    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
      <i class="fa fa-ban"></i> 取消
    </button>
    <button
      type="button"
      class="btn btn-outline-success"
      id="save_encrypt_btn"
      data-bs-dismiss="modal"
    >
      <i class="fa fa-check"></i> 加密
    </button>
  `;
  document.querySelector("#save_encrypt_btn").onclick = `save_encrypt(${i})`;
};