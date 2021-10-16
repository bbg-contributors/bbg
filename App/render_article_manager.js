module.exports = function(){
    document.getElementById("container").innerHTML += `<h2 style="display:inline"><i class="fa fa-file-text"></i> 文章管理</h2>
     <button onclick="add_a_article();" class="fluentbtn"><i class="fa fa-plus"></i> 添加一篇文章</button>
     <hr />
  <div class="alert alert-info" role="alert">
  <i class="fa fa-smile-o"></i> 小提示：使用 Markdown 格式来书写文章。
</div>
  
  `;
  for (let i = 0; i < blog["文章列表"].length; i++) {
    if (blog["文章列表"][i]["是否置顶"]) {
      document.querySelector("#container").innerHTML += `
        <div class="article-item" id="article-item-${i}">
            <div class="article-item-sub"><i class="fa fa-thumb-tack"></i> 置顶文章</div>
            <h2>${blog["文章列表"][i]["文章标题"]}</h2>
           
            
        </div>
            `

    }


  }


  for (let i = 0; i < blog["文章列表"].length; i++) {
    if (blog["文章列表"][i]["是否置顶"]) {

    } else {



      document.querySelector("#container").innerHTML += `
        <div class="article-item" id="article-item-${i}">
            <h2>${blog["文章列表"][i]["文章标题"]}</h2>
           
            
        </div>
            `

      document.querySelector("#article-item-" + i).innerHTML += `
                <div class="article-item-sub" id="article-item-sub-${i}"></div>
                `;


      document.querySelector("#article-item-sub-" + i).innerHTML += `
      <i class="fa fa-calendar"></i> 此文章编写于${blog["文章列表"][i]["创建日期"]}，最近修改于${blog["文章列表"][i]["修改日期"]}<br />
            `;

      if (blog["文章列表"][i]["标签"].length === 0) {

      } else {
        document.querySelector("#article-item-sub-" + i).innerHTML += `
        <i class="fa fa-tags"></i> 标签：
                `;

        for (let k = 0; k < blog["文章列表"][i]["标签"].length; k++) {
          document.querySelector("#article-item-sub-" + i).innerHTML += `
                    <button class="btn btn-light btn-sm">${blog["文章列表"][i]["标签"][k]}</button>
                    `
        }
      }



      document.querySelector("#article-item-" + i).innerHTML += `
            <br /><p>${blog["文章列表"][i]["摘要"]}</p>
                `;
    }

    document.querySelector("#article-item-" + i).innerHTML += `
    
    <button class="fluentbtn fluentbtn-blue" onclick="edit_article('${blog["文章列表"][i]["文件名"]}')"><i class="fa fa-edit"></i> 使用系统默认编辑器编辑文章内容</button>
    <button class="fluentbtn fluentbtn-blue" onclick="edit_article_meta(${i})"><i class="fa fa-info-circle"></i> 修改文章元信息</button>
    <button class="fluentbtn" onclick="delete_article(${i})"><i class="fa fa-trash-o"></i> 删除此文章</button>

    `

  }
}

