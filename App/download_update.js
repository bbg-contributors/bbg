const request = require('request');
const fs = require('fs');
const dialog = require('@electron/remote').dialog;
const win = require('@electron/remote').getCurrentWindow();
const path = require("path");
const app = require('@electron/remote').app;
const os = require("os");
const { shell } = require('electron');

module.exports =  function() {

	let targetPath = path.join(app.getPath("downloads"), download_filename);

	progress_modal.show();

	document.getElementById("check_update_btn").setAttribute("onclick","progress_modal.show();");
	document.getElementById("check_update_btn").setAttribute("style","color:red;");
	document.getElementById("check_update_btn").innerHTML = "正在下载更新，点击这里来查看更新下载进度";
	document.getElementById("open_site_btn").setAttribute("onclick","progress_modal.show();alert('请等待更新下载完成后再继续操作')");
	document.getElementById("create_site_btn").setAttribute("onclick","progress_modal.show();alert('请等待更新下载完成后再继续操作')");
	document.getElementById("last_managed_site").setAttribute("onclick", "progress_modal.show();alert('请等待更新下载完成后再继续操作')");


	var rec = 0, tot;
	var req = request({
		method: 'GET', uri: download_url
	});
	var out = fs.createWriteStream(targetPath);
	req.pipe(out);
	req.on('response', function(data) {
		tot = parseInt(data.headers['content-length']);
	});
	req.on('data', function(chunk) {
		rec += chunk.length;
		document.getElementById("download_progress_text").innerHTML = `${(rec/tot)*100}%`;
		document.getElementById("update-progress-bar").setAttribute("style",`width:${(rec/tot)*100}%;`);
		win.setProgressBar(rec / tot);
	});
	req.on('end', function() {

		if(window.confirm("下载结束，是否现在打开安装程序所在的文件夹？")){
				shell.showItemInFolder(targetPath);
				setInterval(()=>{app.exit()},1000);
		}

		win.setProgressBar(-1);
		
	});
	
	
}
