const { readFileSync } = require("fs");
const path = require("path");

const currentCommitID = (() => {
  try {
    return readFileSync(path.join(__dirname, "../.git/refs/heads/master")).toString().trim();
  } catch (err) {
    return undefined;
  }
})();

module.exports = currentCommitID;
