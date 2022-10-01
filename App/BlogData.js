const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

class BlogData {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  getBlogData() {
    return JSON.parse(readFileSync(path.join(this.rootDir, "data/index.json"), "utf8"));
  }

  writeBlogData() {
    if (blog["提高JSON文件的可读性"]) {
      writeFileSync(path.join(this.rootDir, "data/index.json"), JSON.stringify(blog, null, 2));
    }else{
      writeFileSync(path.join(this.rootDir, "data/index.json"), JSON.stringify(blog));
    }
  }
}

module.exports = BlogData;
