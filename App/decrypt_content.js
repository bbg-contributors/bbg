
const sjcl = require("sjcl");

const content_decrypt = (content, password) => {
  return sjcl.decrypt(password, content);
};

module.exports = content_decrypt;