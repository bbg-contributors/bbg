
const { writeFileSync } = require("fs");
module.exports = function () {
  sitemap_baseurl = blog["网站域名（包括https://）"];

  let sitemap_content = "";

  for (let i = 0; i < blog["文章列表"].length; i++)
    sitemap_content += `${sitemap_baseurl}/index.html?type=article&filename=${blog["文章列表"][i]["文件名"]}\n`;

  for (let i = 0; i < blog["页面列表"].length; i++)
    sitemap_content += `${sitemap_baseurl}/index.html?type=page&filename=${blog["页面列表"][i]["文件名"]}\n`;

  for (let i = 0; i < blog["菜单中的外部链接"].length; i++)
    sitemap_content += `${blog["菜单中的外部链接"][i].url}\n`;

  if (blog["启用内建友人帐页面"] === true)
    sitemap_content += `${sitemap_baseurl}/index.html?type=internal&function=friendbook\n`;

  if (blog["在菜单中添加归档和标签的入口"] === true)
    sitemap_content += `${sitemap_baseurl}/index.html?type=internal&function=archive_and_tags\n`;

  writeFileSync(`${rootDir}/sitemap.txt`, sitemap_content);
};
