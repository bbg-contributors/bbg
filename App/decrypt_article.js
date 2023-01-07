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
  try {
    var result = CryptoJS.AES.decrypt(content, key, argument).toString();
  } catch (e) {
    toast_creator("error", e.message);
  }
  // var verify = CryptoJS.SHA256(password).toString();
  // return [result, verify];
}

module.exports = content_decrypt;