module.exports = function(){
    document.getElementById("container").innerHTML += `<h2>文章管理</h2><button onclick="add_a_article();" class="btn btn-primary">添加一篇文章</button>
  <br /> <br />
  <p style="color:grey">小提示：你可以使用 Markdown 书写文章。</p>
  
  `;
  for (let i = 0; i < blog["文章列表"].length; i++) {
    if (blog["文章列表"][i]["是否置顶"]) {
      document.querySelector("#container").innerHTML += `
        <div class="article-item" id="article-item-${i}">
            <div class="article-item-sub">置顶文章</div>
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
                此文章编写于${blog["文章列表"][i]["创建日期"]}，最近修改于${blog["文章列表"][i]["修改日期"]}<br />
            `;

      if (blog["文章列表"][i]["标签"].length === 0) {

      } else {
        document.querySelector("#article-item-sub-" + i).innerHTML += `
                标签：
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
    
    <button class="btn btn-sm btn-primary" onclick="edit_article('${blog["文章列表"][i]["文件名"]}')">使用系统默认编辑器编辑文章内容</button>
    <button class="btn btn-sm btn-primary" onclick="edit_article_meta(${i})">修改文章元信息</button>
    <button class="btn btn-sm btn-danger" onclick="delete_article(${i})">删除此文章</button>

    `

  }
}

