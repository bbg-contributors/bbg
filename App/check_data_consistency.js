const { existsSync } = require("fs");

module.exports = function(){
    not_consistency = false;
    //检测文章内容文件与博客数据文件的一致性
    for(let i=0;i<blog["文章列表"].length;i++){
        if(existsSync(rootDir+ "/data/articles/"+blog["文章列表"][i]["文件名"])){
            // 文章存在，正常
        }else{
            not_consistency = true;
            // 文章不存在
            if(window.confirm(`
            检测到一处问题：\n
            找不到文章《${blog["文章列表"][i]["文章标题"]}》对应的内容文件（${blog["文章列表"][i]["文件名"]}） \n
            如果点击“确定”按钮，会立即从文章列表中清除该文章。\n
            注意：即使保留，网站用户也不能正常阅读这篇文章，因为该文章对应的内容文件已经丢失。
            `)){
                blog["文章列表"].splice(i, 1);
                BlogInstance.writeBlogData();
            }
        }
    }
    //检测页面内容文件与博客数据文件的一致性
    for(let i=0;i<blog["页面列表"].length;i++){
        if(existsSync(rootDir+ "/data/pages/"+blog["页面列表"][i]["文件名"])){
            // 页面存在，正常
        }else{
            not_consistency = true;
            // 页面不存在
            if(window.confirm(`
            检测到一处问题：\n
            找不到页面《${blog["页面列表"][i]["页面标题"]}》对应的内容文件（${blog["页面列表"][i]["文件名"]}） \n
            如果点击“确定”按钮，会立即从页面列表中清除该页面（它也不会在博客的导航栏中显示了）。\n
            注意：即使保留，网站用户也不能正常进入该页面，因为该页面对应的内容文件已经丢失。
            `)){
                blog["页面列表"].splice(i, 1);
                BlogInstance.writeBlogData();
            }
        }
    }
    if(not_consistency === true){
        window.alert("检查已完成。");
    }else{
        window.alert("检查已结束，没有发现数据一致性问题。")
    }
}