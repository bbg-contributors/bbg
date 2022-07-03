// 获取get参数，即?var=args中的args。
// 若参数不存在，返回false

module.exports = function (variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === (variable + "")) return pair[1];
  }
  return (false);
};
