const { existsSync, appendFileSync } = require("fs");

module.exports = function () {
  const tempString = randomString(12);

  if (existsSync(`${rootDir}/data/articles/${tempString}.md`)) {

  } else {
    const dateobject = new Date();
    const datenow = dateobject.toLocaleDateString();

    blog["文章列表"].unshift({
      文章标题: "",
      文件名: `${tempString}.md`,
      标签: [],
      摘要: "",
      创建日期: datenow,
      修改日期: datenow,
      是否置顶: false,
      是否隐藏: false,
      启用评论: true,
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
