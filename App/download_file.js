const request = require('request');
const fs = require('fs');
const dialog = require('electron').remote.dialog;
const remote = require('electron').remote;

const win = remote.getCurrentWindow();
var download_file = function(url, path) {
	var rec = 0, tot;
	var req = request({
		method: 'GET', uri: url
	});
	var out = fs.createWriteStream(path);
	req.pipe(out);
	req.on('response', function(data) {
		tot = parseInt(data.headers['content-length']);
	});
	req.on('data', function(chunk) {
		rec += chunk.length;
		win.setProgressBar(rec / tot);
	});
	req.on('end', function() {
		dialog.showMessageBox({
			type: 'info',
			title: '下载完成',
			message: `文件已保存到 ${path}`,
			buttons: ['OK']
		});
	});
	win.setProgressBar(-1);
}

module.exports = download_file;
