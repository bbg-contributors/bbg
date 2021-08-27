const os = require("os");
const https = require("https");
const currentProgramVersion = require("./currentProgramVersion.js").toString();
// 我本来是想实现一个latestProgramVersion.js的，不过似乎没必要？

var raw_data = "", download_link, promiseTask = [];
let p = new Promise((resolve, reject) => {
	https.get('https://gitee.com/api/v5/repos/baiyang-lzy/bbg/releases/latest', (res) => {
		res.on("data", (data) => {
			raw_data += data;
		});
		res.on("end", () => {
			raw_data = JSON.parse(raw_data);
		});
	}).on("error", (e) => {
		window.alert(`获取数据失败: ${e.message}`);
	});
});
promiseTask.push(p);

Promise.all(promiseTask).then(() => {
	if (os.platform() === 'darwin') {
		window.alert([`https://gh.api.99988866.xyz/https://github.com/scientificworld/bbg_mac_build/releases/download/${raw_data["tag_name"]}/bbg-darwin-x64.zip`, "bbg-darwin-x64.zip"]);
		download_link = [`https://gh.api.99988866.xyz/https://github.com/scientificworld/bbg_mac_build/releases/download/${raw_data["tag_name"]}/bbg-darwin-x64.zip`, "bbg-darwin-x64.zip"];
	} else if (os.platform() === 'win32') {
		download_link = [`${raw_data["assets"][0]["browser_download_url"]}`, `${raw_data["assets"][0]["name"]}`];
	} else {
		download_link = [`${raw_data["assets"][1]["browser_download_url"]}`, `${raw_data["assets"][1]["name"]}`];
	}
	module.exports = download_link;
});
