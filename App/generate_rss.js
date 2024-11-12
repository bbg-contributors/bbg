const { writeFileSync, readFileSync } = require("fs");
const xss_filter = require("xss");
const { marked } = require("marked");

module.exports = function () {
  let rss_content = "";
  const currentDate = new Date();

  rss_content += `<feed xmlns="http://www.w3.org/2005/Atom">
    <title>${blog["博客标题"]}</title>
    <subtitle>${blog["博客描述（副标题）"]}</subtitle>
    <link href="${blog["网站域名（包括https://）"]}/atom.xml" rel="self"/>
    <link href="${blog["网站域名（包括https://）"]}"/>
    <updated>${currentDate.toISOString()}</updated>
    <id>${blog["网站域名（包括https://）"]}</id>
    <author>
        <name>${blog["博客标题"]}</name>
    </author>
    <generator uri="https://bbg.nekomoe.xyz">Baiyuanneko's Blog Generator</generator>
    `;

  for (let i = 0; i < blog["文章列表"].length; i++) {
    rss_content += `<entry>
      <title>${blog["文章列表"][i]["文章标题"]}</title>
      <link href="${blog["网站域名（包括https://）"]}/index.html?type=article&filename=${blog["文章列表"][i]["文件名"]}"/>
      <id>${blog["网站域名（包括https://）"]}/index.html?type=article&filename=${blog["文章列表"][i]["文件名"]}</id>
      <content type="html">
        <![CDATA[
          ${blog["文章列表"][i]["是否加密"]===true?blog["文章列表"][i]["摘要"]:xss_filter(marked(readFileSync(rootDir+"/data/articles/"+blog["文章列表"][i]["文件名"],"utf-8")))}

        ]]>
      </content>
      <summary type="html">${blog["文章列表"][i]["摘要"]}</summary>
      <updated>${new Date(blog["文章列表"][i]["修改时间（时间戳）"]).toISOString()}</updated>
      <published>${new Date(blog["文章列表"][i]["创建时间（时间戳）"]).toISOString()}</published>
      </entry>`;
  }

  rss_content += "</feed>";

  // rss_content;

  writeFileSync(`${rootDir}/atom.xml`, rss_content.replaceAll("&", "&amp;"));
};
