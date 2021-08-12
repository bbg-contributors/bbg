
const {existsSync,appendFileSync} = require("fs");

module.exports = function () {

    let tempString = randomString(12);

    if (existsSync(rootDir + "/data/pages/" + tempString + ".md")) {

    } else {

        blog["页面列表"].unshift({
            "页面标题": "",
            "是否显示在菜单中": true,
            "若显示在菜单中，则在菜单中显示为": "",
            "是否在新标签页打开": false,
            "文件名": tempString + ".md",
            "这是一个完整的html": false,
            "启用评论": false
        });

        BlogInstance.writeBlogData();
        appendFileSync(`${rootDir}/data/pages/${tempString}.md`, "");

        document.getElementById("root").innerHTML = "";
        render_nav();
        render_container();
        render_page_manager();

        edit_page_meta(0);

    }
}