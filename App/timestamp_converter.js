module.exports = function (timestamp) {
  timestamp = parseInt(timestamp);
  if (blog["网站语言"] === "简体中文") {
    let dateObj = new Date(timestamp);
    return dateObj.getFullYear() + "年" + (dateObj.getMonth() + 1) + "月" + dateObj.getDate() + "日 " + ((dateObj.getHours() <= 12) ? "上午" : "下午") + ((dateObj.getHours() <= 12) ? dateObj.getHours() : (dateObj.getHours() - 12)) + ":" + ((dateObj.getMinutes().toString().length === 1) ? "0" : "") + dateObj.getMinutes();
  } else if (blog["网站语言"] === "English") {
    return new Date(timestamp).toLocaleString("en-US", { hour12: true });
  } else if (blog["网站语言"] === "日本語") {
    return new Date(timestamp).toLocaleString("ja-JP", { hour12: true });
  } else {
    return new Date(timestamp).toISOString();
  }
};