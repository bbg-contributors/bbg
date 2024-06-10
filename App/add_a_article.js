const { existsSync, appendFileSync, mkdirSync } = require("fs");
const doNothing = require("./doNothing.js");

module.exports = function () {
  const tempString = randomString(12);

  if (existsSync(`${rootDir}/data/articles/${tempString}.md`)) {
    doNothing();
  } else {

    if(existsSync(`${rootDir}/data/articles/`) === false){
      mkdirSync(`${rootDir}/data/articles/`);
    }

    const dateobject = new Date();
    const timestampnow = dateobject.getTime();

    blog["文章列表"].unshift({
      文章标题: "",
      文件名: `${tempString}.md`,
      标签: [],
      摘要: "",
      "创建时间（时间戳）": timestampnow,
      "修改时间（时间戳）": timestampnow,
      是否置顶: false,
      是否隐藏: false,
      是否加密: false,
      启用评论: true
    });

    BlogInstance.writeBlogData();
    appendFileSync(`${rootDir}/data/articles/${tempString}.md`, "");

    document.getElementById("root").innerHTML = "";

    render_container();
    render_nav();
    renderArticleManager();

    edit_article_meta(0);
  }
};
