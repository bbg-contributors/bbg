"use strict";
const CryptoJS = require("crypto-js");

function content_decrypt(content, password, verify = null) {
  if (verify !== null)
    if (CryptoJS.SHA256(password).toString() != verify)
      return { status: false };
  let key = CryptoJS.enc.Utf8.parse(password).toString();
  let argument = {
    iv: CryptoJS.enc.Utf8.parse("1145141919810").toString(),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  let result = CryptoJS.AES.decrypt(content, key, argument).toString(CryptoJS.enc.Utf8);
  if (result == "") return { status: false };
  else return { result: result, status: true };
}

module.exports = content_decrypt;
