const CryptoJS = require("crypto-js");

//TODO: more models like mode/padding/iv can use/choose
//but the password is required.
const vi = CryptoJS.enc.Utf8.parse("bbg-by-bbg-contributors").toString();

function content_decrypt(data, password) {
  const key = CryptoJS.enc.Utf8.parse(password).toString();
  const argument = {
    iv: vi, 
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  return CryptoJS.AES.decrypt(JSON.parse(data).content, key, argument).toString(CryptoJS.enc.Utf8);
}

module.exports = content_decrypt;