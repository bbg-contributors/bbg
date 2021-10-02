
const { writeFileSync } = require("fs");

function install_theme(theme_name,theme_updateDate){

    fetch("https://gitee.com/api/v5/repos/baiyang-lzy/BBG_Themes/contents/"+theme_name + "/latest.bbgtheme")
    .then(response => response.json())
    .then(function(responseData){
        let data = decodeURIComponent( escape( window.atob(responseData.content) ));
        writeFileSync(`${rootDir}/index.html`, data);
        blog["全局主题设置"]["是否使用第三方主题"] = true;
        blog["全局主题设置"]["若使用第三方主题，是否来自本地文件"] = false;
        blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题名为"] = theme_name;
        blog["全局主题设置"]["若使用来自主题商店的第三方主题，则主题的更新发布日期为"] = theme_updateDate;
        

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
            <p>主题更新日期：${data["更新日期"]}</p>
            <p id="is_compatible_with_bbg"></p>
            <hr />
            <button id="install_theme_btn_detail" class="btn btn-primary" onclick="install_theme('${theme_name}',${data["更新日期"]})">为此站点安装该主题</button>
            <button class="btn btn-primary" onclick="render_online_theme_list()">返回主题列表</button>

        `;
        if(data["更新日期"] < 20211002){
            document.getElementById("install_theme_btn_detail").setAttribute("style","display:none");
            document.getElementById("is_compatible_with_bbg").innerHTML="<b><span style='color:red;'>此主题版本过旧，不再支持安装。请等待主题作者更新！</span></b>"
            window.alert("此主题版本过旧，不再支持安装。请等待主题作者更新！");
        }
    })
    .catch(function(err){
        window.alert("主题信息加载失败，可能是网络原因，或者api用量超限。请重试：" + err);
    });
}


function render_online_theme_list() {
    document.getElementById("download_online_theme_dialog_content").innerHTML = "";
    // todo


    document.getElementById("download_online_theme_dialog_content").innerHTML += `<h2>主题列表</h2><p>以下列出了主题商店中的主题。</p><hr />`;


    fetch('https://gitee.com/api/v5/repos/baiyang-lzy/BBG_Themes/git/trees/master')
        .then(response => response.json())
        .then(function (data) {
            let theme_list = data["tree"];
            for(let i=0;i<theme_list.length;i++){
                if(theme_list[i]["type"] === "tree"){
                    document.getElementById("download_online_theme_dialog_content").innerHTML += `<h4>${theme_list[i]["path"]}</h4><p style="color:grey;">${theme_list[i]["sha"]}</p><p><button class="btn btn-primary btn-sm" onclick="render_theme_detail('${theme_list[i]["path"]}')">查看此主题的详情</button></p><br />`;
                }
            }
        })
        .catch(function (err) {
            window.alert("主题商店加载失败，可能是网络原因，或者api用量超限。请重试：" + err);
        });

    
}

function open_online_theme_dialog() {
    window.alert("主题商店功能基于 Gitee API 实现，因此存在用量限制。\n\n请不要频繁地使用主题商店的各个功能，包括查看主题列表、查看主题简介、下载和安装主题等等。\n\n如果弹出访问错误的提示一般都是用量超限，此时需要等候24小时后再试。\n\n感谢你的理解。")
    let online_theme_modal = new bootstrap.Modal(document.getElementById('download_online_theme_dialog'));
    online_theme_modal.toggle();
    render_online_theme_list();
}

module.exports.open_online_theme_dialog = open_online_theme_dialog;
module.exports.render_theme_detail = render_theme_detail;
module.exports.render_online_theme_list = render_online_theme_list;
module.exports.install_theme = install_theme;