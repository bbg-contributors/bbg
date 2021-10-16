module.exports = function () {

    document.getElementById("container").innerHTML += `
    
    <h2 style="display:inline;"><i class="fa fa-files-o"></i> 管理页面</h2>
    <button class="fluentbtn" onclick="add_a_page()"><i class="fa fa-plus"></i>  新建一张页面 </button>
    <hr />
    <div class="alert alert-info" role="alert">
    <i class="fa fa-smile-o"></i> 小提示：使用 Markdown 格式来编写页面内容。
    </div>
    `

    for (let i = 0; i < blog["页面列表"].length; i++) {

        document.getElementById("container").innerHTML += `
      <div class="page-item">
      <h2>${blog["页面列表"][i]["页面标题"]}</h2>
      <p id="if_view_in_menu_${i}"  class="page-item-sub"></p>
      <p>
      <button class="fluentbtn fluentbtn-blue" onclick="edit_page('${blog["页面列表"][i]["文件名"]}')"><i class="fa fa-edit"></i> 使用系统默认编辑器编辑页面内容</button>
      <button class="fluentbtn fluentbtn-blue" onclick="edit_page_meta(${i})"><i class="fa fa-cogs"></i> 页面设置</button>
      <button class="fluentbtn" onclick="delete_page(${i})"><i class="fa fa-trash-o"></i> 删除此页面</button>
      </p>
  
      </div>
      
      `

        if (blog["页面列表"][i]["是否显示在菜单中"] === true) {
            document.getElementById("if_view_in_menu_" + i).innerHTML = `<i class="fa fa-cogs"></i> 此页面在菜单中显示为：<b>${blog["页面列表"][i]["若显示在菜单中，则在菜单中显示为"]}</b>`;
        } else {
            document.getElementById("if_view_in_menu_" + i).innerHTML = `<i class="fa fa-cogs"></i> 此页面不显示在菜单中`;

        }
    }
}