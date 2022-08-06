module.exports = function () {
  const friendModal = new bootstrap.Modal(document.getElementById("edit_friend_book_dialog"));
  friendModal.toggle();

  document.getElementById("friend_book_content").innerHTML = `
  <div class="modal-body">
    <p><i class="fa fa-book"></i> ${langdata.MANAGE_FREIND_BOOK_PAGE_DESCRIPTION[lang_name]}</p>
    <div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="enableFriendBookFunction">
<label class="form-check-label" for="enableFriendBookFunction">
${langdata.ENABLE_INITNAL_FRIEND_BOOK_PAGE[lang_name]}
</label>
</div>

<div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="enableFriendBookComment">
<label class="form-check-label" for="enableFriendBookComment">
${langdata.ALLOW_COMMENTS_IN_FRIEND_BOOK[lang_name]}
</label>
</div>

<br />
<p><i class="fa fa-file-text-o"></i> ${langdata.ADDITIONAL_INFORMATION_DISPLAY_IN_FRIEND_BOOK[lang_name]}</p>
<textarea class="form-control" id="friend_book_additional_info">
${blog["友人帐页面附加信息"]}
</textarea>
    
    <hr />
    <p><i class="fa fa-users"></i> ${langdata.CURRENT_FRIEND_LIST_DESCRIPTION[lang_name]}</p>
    
    
    
    <table class="table">
  <thead>
    <tr>
      <th scope="col">${langdata.SITE_NAME[lang_name]}</th>
      <th scope="col">${langdata.SITE_LINK[lang_name]}</th>
      <th scope="col">${langdata.SITE_INTRODUCTION[lang_name]}</th>
      <th scope="col">${langdata.SITE_AVATAR_URL[lang_name]}</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="friend_book_list">
    
    
   
  </tbody>
</table>

<button class="fluentbtn fluentbtn-blue" onclick="add_new_friend();"><i class="fa fa-plus"></i> ${langdata.ADD_NEW_FRIEND_BOOK_INFO[lang_name]}</button>

    </div>
    <div class="modal-footer" id="edit_friend_book_dialog_footer">
    <button class="fluentbtn fluentbtn-blue" onclick="save_friend_book();" data-bs-dismiss="modal"><i class="fa fa-check"></i> ${langdata.SAVE_CONFIGURATION[lang_name]}</button>
    <button class="fluentbtn" onclick="window.location.reload();" data-bs-dismiss="modal"><i class="fa fa-ban"></i> ${langdata.CANCEL_THIS_TIME_CONFIGURATION[lang_name]}</button>
  </div>
    `;

  render_friend_book_list();

  if (blog["启用内建友人帐页面"] === true)
    document.getElementById("enableFriendBookFunction").checked = true;

  if (blog["友人帐页面允许评论"] === true)
    document.getElementById("enableFriendBookComment").checked = true;
};
