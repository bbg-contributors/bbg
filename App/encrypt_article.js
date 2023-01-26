const CryptoJS = require("crypto-js");
const fs = require("fs");
//TODO: more models like mode/padding/iv can use/choose
//but the password is required.
const vi = CryptoJS.enc.Utf8.parse("bbg-by-bbg-contributors").toString();

function content_encrypt(i, password) {
  var key = CryptoJS.enc.Utf8.parse(password).toString();
  var argument = {
    iv: vi,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  // var verify = CryptoJS.SHA256(password).toString();
  // 读数据
  const data = fs.readFileSync(`${rootDir}/data/articles/${blog["文章列表"][i]["文件名"]}`);
  const content = CryptoJS.enc.Utf8.parse(data).toString();
  var result = CryptoJS.AES.encrypt(content, key, argument).toString();
  // return [result, verify];
  const output = {
    "type": "AES-256",
    "content": result
  };
  fs.writeFileSync(`${rootDir}/data/articles/${blog["文章列表"][i]["文件名"]}`, JSON.stringify(output));
}

module.exports = content_encrypt;