module.exports = function () {
  let friendModal = new bootstrap.Modal(document.getElementById('edit_friend_book_dialog'));
  friendModal.toggle();

  document.getElementById("friend_book_content").innerHTML = `
    
    <p>友人帐是一个独立页面，组织和显示了友人帐中的友人信息。</p>
    <div class="form-check">
<input class="form-check-input" type="checkbox" id="enableFriendBookFunction">
<label class="form-check-label" for="enableFriendBookFunction">
启用内建的网站友人帐页面
</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="enableFriendBookComment">
<label class="form-check-label" for="enableFriendBookComment">
允许在友人帐页面下评论
</label>
</div>

<br />
<p>显示在友人帐页面的附加信息（以html格式编写）</p>
<textarea class="form-control" id="friend_book_additional_info">
${blog["友人帐页面附加信息"]}
</textarea>
    
    <hr />
    <p>以下是目前友人帐中的友人列表。</p>
    
    
    
    <table class="table">
  <thead>
    <tr>
      <th scope="col">站点名称</th>
      <th scope="col">链接</th>
      <th scope="col">简介</th>
      <th scope="col">站点图标URL</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="friend_book_list">
    
    
   
  </tbody>
</table>

<button class="fluentbtn fluentbtn-blue" onclick="add_new_friend();">添加新友人信息</button>

    
    `;

  render_friend_book_list();

  if (blog["启用内建友人帐页面"] === true) {
    document.getElementById("enableFriendBookFunction").checked = true;
  }
  if (blog["友人帐页面允许评论"] === true) {
    document.getElementById("enableFriendBookComment").checked = true;

  }
}
