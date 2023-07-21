const { session } = require("@electron/remote");

module.exports = async function(url = "https://www.gstatic.com/generate_204") {
  var proxySettings = await session.defaultSession.resolveProxy(url);
  if (proxySettings.startsWith("PROXY"))
    return "http://" + proxySettings.split(" ")[1]; // PROXY IP:Port
  else return undefined; // DIRECT
};
