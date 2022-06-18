
const { readFileSync, writeFileSync } = require('fs');


const open_generate_sitemap_dialog = function(){
    let sitemap_baseurl_modal = new bootstrap.Modal(document.getElementById('sitemap_baseurl_dialog'));
    sitemap_baseurl_modal.toggle();
}

const generate_sitemap = function(){


   sitemap_baseurl = document.getElementById("sitemap_baseurl_input").value;
  
        if(sitemap_baseurl.charAt(sitemap_baseurl.length - 1) === "/"){
            
        }else{
            sitemap_baseurl = sitemap_baseurl +"/";
        }


        let sitemap_content = "";

        for(let i=0;i<blog["文章列表"].length;i++){
            sitemap_content += `${sitemap_baseurl}?type=article&filename=${blog["文章列表"][i]["文件名"]}\n`
        }
        for(let i=0;i<blog["页面列表"].length;i++){
            sitemap_content += `${sitemap_baseurl}?type=page&filename=${blog["页面列表"][i]["文件名"]}\n`
        }
        for(let i=0;i<blog["菜单中的外部链接"].length;i++){
            sitemap_content += `${blog["菜单中的外部链接"][i]["url"]}\n`
        }
        if(blog["启用内建友人帐页面"] === true){
            sitemap_content += `${sitemap_baseurl}?type=internal&function=friendbook\n`
        }
        if(blog["在菜单中添加归档和标签的入口"] === true){
            sitemap_content += `${sitemap_baseurl}?type=internal&function=archive_and_tags\n`
        }

        writeFileSync(`${rootDir}/sitemap.txt`, sitemap_content);
        window.alert("站点地图已生成！");
        BlogInstance.writeBlogData();
        window.location.reload();

}

module.exports = {
    open_generate_sitemap_dialog:open_generate_sitemap_dialog,
    generate_sitemap:generate_sitemap
}