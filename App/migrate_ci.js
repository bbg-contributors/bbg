const fs = require("fs");

process.chdir("./App");
const BlogData = require("./BlogData.js");
const migrate = require("./migrate_core.js");
const currentProgramVersion = require("./currentProgramVersion.js");

rootDir = process.env.ROOT_DIR;
const BlogInstance = new BlogData(rootDir);
blog = BlogInstance.getBlogData();

let currentBlogVersion = parseInt(
  blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"],
  10
);

if (
  currentBlogVersion === undefined ||
  currentBlogVersion === null ||
  currentBlogVersion === ""
) {
  console.error("博客数据文件不包含有效的版本号信息（ERR_NO_VERSION）");
  console.error("博客数据文件可能已经损坏。");
  process.exit(1);
} else {
  if (
    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"] >
    currentProgramVersion
  ) {
    console.error("不兼容此版本的博客数据文件（ERR_BAD_VERSION）");
    console.error(
      "检测到新版数据文件。请使用新版 BBG 管理站点，以免损坏数据。"
    );
    process.exit(1);
  }

  migrate();
}

const d = new Date();
let date =
  d.getFullYear() +
  "-" +
  (d.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  d.getDate().toString().padStart(2, "0");
let time =
  d.getHours().toString().padStart(2, "0") +
  ":" +
  d.getMinutes().toString().padStart(2, "0") +
  ":" +
  d.getSeconds().toString().padStart(2, "0");
let dateTime = date + " " + time;

const commitSHAShort = process.env.COMMIT_SHA_SHORT;
const githubRepository = process.env.GITHUB_REPOSITORY;
let blog_settings_bottom_information = `Deployed on ${dateTime} ([${commitSHAShort}](https://github.com/${githubRepository}/commit/${commitSHAShort}))`;
blog["底部信息（格式为markdown）"] = blog_settings_bottom_information;
BlogInstance.writeBlogData();
