
const { writeFileSync } = require("fs");

function install_theme(theme_name){

    fetch("https://gitee.com/api/v5/repos/baiyang-lzy/BBG_Themes/contents/"+theme_name + "/latest.bbgtheme")
    .then(response => response.json())
    .then(function(responseData){
        let data = decodeURIComponent( escape( window.atob(responseData.content) ));
        writeFileSync(`${rootDir}/index.html`, data);
        blog["全局主题设置"]["是否使用第三方主题"] = true;
        BlogInstance.writeBlogData();
        window.alert("已经成功为此站点应用该第三方主题！");
        window.location.reload();
    })
    .catch(function(err){
        window.alert("主题更换失败，可能是网络原因，或者api用量超限。请重试："+err);
    })

}


function render_theme_detail(theme_name){
    fetch("https://gitee.com/api/v5/repos/baiyang-lzy/BBG_Themes/contents/"+theme_name + "/index.json")
    .then(response => response.json())
    .then(function(responseData){
        let data = JSON.parse(decodeURIComponent( escape( window.atob(responseData.content) )));
        document.getElementById("download_online_theme_dialog_content").innerHTML = "";

        document.getElementById("download_online_theme_dialog_content").innerHTML += `
            <h3>${theme_name} 的主题信息</h3>
            <hr />
            <p>主题名：${theme_name}</p>
            <p>主题作者：${data["作者"]}</p>
            <p>主题作者主页：${data["作者主页"]}</p>
            <p>主题介绍：${data["介绍"]}</p>
            <hr />
            <button class="btn btn-primary" onclick="install_theme('${theme_name}')">为此站点安装该主题</button>
            <button class="btn btn-primary" onclick="render_online_theme_list()">返回主题列表</button>

        `;

    })
    .catch(function(err){
        window.alert("主题信息加载失败，可能是网络原因，或者api用量超限。请重试：" + err);
    });
}


function render_online_theme_list() {
    document.getElementById("download_online_theme_dialog_content").innerHTML = "";
    // todo

    window.alert("主题商店功能基于 Gitee API 实现，因此存在用量限制。\n\n请不要频繁地使用主题商店的各个功能，包括查看主题列表、查看主题简介、下载和安装主题等等。\n\n如果弹出访问错误的提示一般都是用量超限，此时需要等候24小时后再试。\n\n感谢你的理解。")

    document.getElementById("download_online_theme_dialog_content").innerHTML += `<h2>主题列表</h2><p>以下列出了主题商店中的主题。</p><hr />`;


    fetch('https://gitee.com/api/v5/repos/baiyang-lzy/BBG_Themes/git/trees/master')
        .then(response => response.json())
        .then(function (data) {
            let theme_list = data["tree"];
            for(let i=0;i<theme_list.length;i++){
                if(theme_list[i]["type"] === "tree"){
                    document.getElementById("download_online_theme_dialog_content").innerHTML += `<h4>${theme_list[i]["path"]}</h4><p><button class="btn btn-link" onclick="render_theme_detail('${theme_list[i]["path"]}')">查看此主题的详情</button><button class="btn btn-link" onclick="install_theme('${theme_list[i]["path"]}')">下载此主题并在本站点应用</button></p><br />`;
                }
            }
        })
        .catch(function (err) {
            window.alert("主题商店加载失败，可能是网络原因，或者api用量超限。请重试：" + err);
        });

    
}

function open_online_theme_dialog() {
    let online_theme_modal = new bootstrap.Modal(document.getElementById('download_online_theme_dialog'));
    online_theme_modal.toggle();
    render_online_theme_list();
}

module.exports.open_online_theme_dialog = open_online_theme_dialog;
module.exports.render_theme_detail = render_theme_detail;
module.exports.render_online_theme_list = render_online_theme_list;
module.exports.install_theme = install_theme;