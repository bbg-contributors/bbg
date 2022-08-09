// This file is to solve the "Empty block statement" warning of eslint.

function doNothing(...rest) {
  void(0);
}
module.exports = doNothing;
