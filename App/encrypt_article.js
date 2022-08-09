const CryptoJS = require("crypto-js");

function content_encrypt(content, password) {
  var key = CryptoJS.enc.Utf8.parse(password).toString();
  var argument = {
    iv: CryptoJS.enc.Utf8.parse("1145141919810").toString(),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  var verify = CryptoJS.SHA256(password).toString();
  var result = CryptoJS.AES.encrypt(content, key, argument).toString();
  return [result, verify];
}
