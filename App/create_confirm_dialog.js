module.exports=function(dialog_content,js_to_reload,do_what_if_sure){
  let dialog_id = randomString(6);
  document.getElementById("root").innerHTML+=`
    <div class="modal" id="${dialog_id}" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>${dialog_content}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="fluentbtn" data-bs-dismiss="modal"><i class="fa fa-ban"></i> ${langdata["CANCEL"][lang_name]}</button>
        <button type="button" class="fluentbtn fluentbtn-blue" data-bs-dismiss="modal" id="${dialog_id}_sure"><i class="fa fa-check"></i> ${langdata["OK"][lang_name]}</button>
      </div>
    </div>
  </div>
</div>
    `;
  const confirm_dialog = new bootstrap.Modal(document.getElementById(dialog_id));
  confirm_dialog.show();
  eval(js_to_reload);
    

  document.getElementById(`${dialog_id}_sure`).setAttribute("onclick",do_what_if_sure);
};