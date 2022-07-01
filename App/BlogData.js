const { readFileSync, writeFileSync } = require("fs");

class BlogData {
  constructor (rootDir) {
    this.rootDir = rootDir;
  }

  getBlogData () {
    return JSON.parse(readFileSync(`${this.rootDir}/data/index.json`, "utf8"));
  }

  writeBlogData () {
    writeFileSync(`${this.rootDir}/data/index.json`, JSON.stringify(blog));
  }
}

module.exports = BlogData;
