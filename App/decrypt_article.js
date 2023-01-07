const CryptoJS = require("crypto-js");

//TODO: more models like mode/padding/iv can use/choose
//but the password is required.
const vi = CryptoJS.enc.Utf8.parse("bbg-by-bbg-contributors").toString();

function content_decrypt(i, password) {
  var key = CryptoJS.enc.Utf8.parse(password).toString();
  var argument = {
    iv: vi, 
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  const data = fs.readFileSync(`${rootDir}/data/articles/${blog["文章列表"][i]["文件名"]}`);
  const content = CryptoJS.enc.Utf8.parse(JSON.stringify(data).content).toString();
  var result = CryptoJS.AES.encrypt(content, key, argument).toString();
  // var verify = CryptoJS.SHA256(password).toString();
  var result = CryptoJS.AES.decrypt(content, key, argument).toString();
  // return [result, verify];
  return result;
};

module.exports = content_decrypt