const {existsSync,rmSync,copyFileSync,constants} = require("fs");
const shell = require("electron").remote.shell;
const dialog = require("electron").remote.dialog;

function view_current_icon() {
	if (existsSync(`${rootDir}/favicon.ico`)) {
		shell.openPath(`${rootDir}/favicon.ico`);
	} else {
		window.alert("当前站点没有使用网页图标。");
	}
}

function delete_current_icon() {
	if (existsSync(`${rootDir}/favicon.ico`)) {
		rmSync(`${rootDir}/favicon.ico`);
		window.alert("当前站点的网页图标已经被成功清除。")
	} else {
		window.alert("当前站点没有使用网页图标。")
	}
}

function select_a_favicon() {
	let iconPath = dialog.showOpenDialogSync();
	if (iconPath !== undefined) {
		if (existsSync(`${rootDir}/favicon.ico`)) {
			rmSync(`${rootDir}/favicon.ico`);
		}

		copyFileSync(`${iconPath}`, `${rootDir}/favicon.ico`, constants.COPYFILE_EXCL);

	} else {
		//用户放鸽子的情况
		window.alert("你没有选择任何网页图标，网页图标将不会变更。")
	}

}

module.exports = {
	select_a_favicon: select_a_favicon,
	delete_current_icon: delete_current_icon,
	view_current_icon: view_current_icon
}