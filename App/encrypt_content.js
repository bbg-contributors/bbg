
const sjcl = require("sjcl");

const content_encrypt = (content, password) => {
  return sjcl.encrypt(password, content);
};

module.exports = content_encrypt;