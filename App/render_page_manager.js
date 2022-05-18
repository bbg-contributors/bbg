module.exports = function () {

  document.getElementById("container").innerHTML += `
    
    <h2 style="display:inline;"><i class="fa fa-files-o"></i> ${langdata["PAGE_MANAGEMENT"][lang_name]}</h2>
    <button class="fluentbtn" onclick="add_a_page()"><i class="fa fa-plus"></i>  ${langdata["ADD_A_PAGE"][lang_name]} </button>
    <br /><br />
    
    <button class="fluentbtn" onclick="edit_friend_book();" ><i class="fa fa-cogs"></i>  管理网站友人帐页面 </button>
    <hr />
    <div class="alert alert-info" role="alert">
    <i class="fa fa-smile-o"></i> ${langdata["HINT_USING_MD_IN_PAGES"][lang_name]}
    </div>
    `

  document.getElementById("edit_page_meta_dialog_footer").innerHTML = `

    <button type="button" class="fluentbtn" data-bs-dismiss="modal">${langdata["CANCEL"][lang_name]}</button>
    <button type="button" class="fluentbtn fluentbtn-blue" id="save_page_meta_btn">${langdata["SAVE_CONFIGURATION"][lang_name]}</button>

    `;

  for (let i = 0; i < blog["页面列表"].length; i++) {

    document.getElementById("container").innerHTML += `
      <div class="page-item">
      <h2>${blog["页面列表"][i]["页面标题"]}</h2>
      <p id="if_view_in_menu_${i}"  class="page-item-sub"></p>
      <p>
      <button class="fluentbtn fluentbtn-blue" onclick="edit_page('${blog["页面列表"][i]["文件名"]}')"><i class="fa fa-edit"></i> ${langdata["EDIT_PAGE_CONTENT"][lang_name]}</button>
      <button class="fluentbtn fluentbtn-blue" onclick="edit_page_meta(${i})"><i class="fa fa-cogs"></i> ${langdata["EDIT_PAGE_META"][lang_name]}</button>
      <button class="fluentbtn" onclick="delete_page(${i})"><i class="fa fa-trash-o"></i> ${langdata["DELETE_PAGE"][lang_name]}</button>
      </p>
  
      </div>
      
      `

    if (blog["页面列表"][i]["是否显示在菜单中"] === true) {
      document.getElementById("if_view_in_menu_" + i).innerHTML = `<i class="fa fa-cogs"></i> ${langdata["PAGE_VIEWNAME"][lang_name]}<b>${blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"]}</b>`;
    } else {
      document.getElementById("if_view_in_menu_" + i).innerHTML = `<i class="fa fa-cogs"></i> 此页面不显示在菜单中`;

    }
  }
}
