const fs = require("fs");

process.chdir("./App");
const BlogData = require("./BlogData.js");
const migrate = require("./migrate_cli.js");


rootDir = process.env.ROOT_DIR;
const BlogInstance = new BlogData(rootDir);
blog = BlogInstance.getBlogData();
migrate();

const d = new Date();
let date = d.getFullYear() + "-" + ((d.getMonth() + 1).toString().padStart(2, '0')) + "-" + ((d.getDate()).toString().padStart(2, '0'));
let time = (d.getHours().toString().padStart(2, '0')) + ":" + (d.getMinutes().toString().padStart(2, '0')) + ":" + (d.getSeconds().toString().padStart(2, '0'));
let dateTime = date + ' ' + time;

const commitSHAShort = process.env.COMMIT_SHA_SHORT;
const githubRepository = process.env.GITHUB_REPOSITORY;
let blog_settings_bottom_information = `Deployed on ${dateTime} ([${commitSHAShort}](https://github.com/${githubRepository}/commit/${commitSHAShort}))`;
blog["底部信息（格式为markdown）"] = blog_settings_bottom_information;
BlogInstance.writeBlogData();