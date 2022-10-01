"use strict";
const CryptoJS = require("crypto-js");

function content_encrypt(content, password) {
  let key = CryptoJS.enc.Utf8.parse(password).toString();
  let argument = {
    iv: CryptoJS.enc.Utf8.parse("1145141919810").toString(),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  let verify = CryptoJS.SHA256(password).toString();
  let result = CryptoJS.AES.encrypt(content, key, argument).toString();
  return { result: result, verify: verify };
}

module.exports = content_encrypt;
