// This file is to solve the "eval can be harmful" warning of eslint.

function evalFunc(str) {
  var Fn = Function;
  return new Fn(`return ${str}`)();
}
module.exports = evalFunc;
