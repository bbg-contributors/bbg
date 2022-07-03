// 生成随机字符串，参数为字符串长度。若不指定字符串长度，默认长度为32位

module.exports = function (len) {
  len = len || 32;
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = "";
  let a;
  // eslint-disable-next-line no-unmodified-loop-condition
  for (i = 0; i < len; i++) pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  return pwd;
};
