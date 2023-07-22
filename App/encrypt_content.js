const CryptoJS = require("crypto-js");
const fs = require("fs");
//TODO: more models like mode/padding/iv can use/choose
//but the password is required.
const vi = CryptoJS.enc.Utf8.parse("bbg-by-bbg-contributors").toString();

function content_encrypt(data, password) {
  const key = CryptoJS.enc.Utf8.parse(password).toString();
  const argument = {
    iv: vi,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  const result = CryptoJS.AES.encrypt(data, key, argument).toString();
  const output = {
    "type": "AES-256",
    "content": result
  };
  return JSON.stringify(output);
}

module.exports = content_encrypt;