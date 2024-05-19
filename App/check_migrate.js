// const fs = require("fs");
// const { constants } = require("fs");
const dialog = require("@electron/remote").dialog;
const currentProgramVersion = require("./currentProgramVersion.js");

module.exports = function () {
  const currentBlogVersion = parseInt(
    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"],
    10,
  );

  if (
    currentBlogVersion === undefined
    || currentBlogVersion === null
    || currentBlogVersion === ""
  ) {
    dialog.showErrorBox(
      "博客数据文件不包含有效的版本号信息（ERR_NO_VERSION）",
      "博客数据文件可能已经损坏。",
    );
    window.location.href = "./start.html";
  } else {
    // 如果数据文件的版本是旧版

    if (currentBlogVersion < currentProgramVersion) {
      const submitDialog = dialog.showMessageBoxSync({
        message:
          "此站点是由旧版的 BBG 所创建的。因此，你必须更新博客数据文件才能继续管理它。所有的文章、页面和设定都将保留。如果你正在使用第三方主题，它仍可以继续使用，但是有可能遇到不兼容，如果遇到不兼容请切换回官方主题或更新第三方主题。",
        type: "question",
        buttons: ["更新博客数据文件", "取消更新进程"],
      });

      if (submitDialog === 0) {
        if(currentBlogVersion <= 20240518){
          if(window.confirm("请注意，本次更新会将博客数据文件文章元信息中的创建日期和修改日期均转换为时间戳形式，由于原先默认存储中的日期信息仅为日期信息而不包含时间信息，即无法获知具体在那一天的几时几分创建/修改的，因此本次转换的逻辑为先使用js的Date对象上的getTime方法将原日期转换为时间戳，然后加上28800000毫秒数的偏移（按照原先默认存储的日期格式的话，这样做会让时间变为原日期的当天上午8:00）。请注意在更新博客后重新调整相关时间（如果你觉得不满意的话）。如果你没有使用默认的日期存储格式，转换有可能失败或不准确，一旦某次转换出现失败，对于该次转换，原有创建日期字段不会被删除，新的时间戳将为0（即显示为1970-01-01 8:00），此种情况下你可以从博客数据文件（data/index.json）中找回你原先填写的内容。是否确认继续更新？一旦你点击继续，则表示你已完全了解此转换过程可能存在的风险。请牢记：本程序不含任何担保，BBG 开发人员不会对包括程序 Bug、逻辑错误在内的任何原因的数据丢失或损坏负责，如果你认为你的数据比较重要，建议你提前备份相关数据。 \n Attention! Please note that this update will convert the creation and modification dates in the blog data file's article metadata into timestamp format. Since the original date information stored by default only includes the date without the time (i.e., it is not possible to know the specific time of creation/modification on that day), the conversion logic is to use the getTime method of JavaScript's Date object to convert the original date to a timestamp, and then add an offset of 28,800,000 milliseconds (this will make the time 8:00 AM on the original date according to the default date format). Please adjust the relevant times after updating the blog if you find them unsatisfactory. If you have not used the default date storage format, the conversion may fail or be inaccurate. If a conversion fails, the original creation date field will not be deleted, and the new timestamp will be 0 (i.e., it will show as 1970-01-01 8:00 AM). In such cases, you can retrieve your original content from the blog data file (data/index.json). Do you confirm to proceed with the update? By clicking continue, you acknowledge that you fully understand the risks of this conversion process. Please remember: this program comes with no guarantees, and BBG developers are not responsible for any data loss or damage, including due to program bugs or logic errors. If you consider your data important, it is recommended that you back it up beforehand.")){
            migrate();
          }
        } else {
          migrate();
        }
        

        window.alert("博客数据更新成功。");
      } else {
        window.alert("你取消了更新进程。");
        window.location.href = "./start.html";
      }
    }
  }

  if (
    blog["博客程序版本（禁止修改此值，否则会导致跨版本升级异常）"]
    > currentProgramVersion
  ) {
    dialog.showErrorBox(
      "不兼容此版本的博客数据文件（ERR_BAD_VERSION）",
      "检测到新版数据文件。请使用新版 BBG 管理站点，以免损坏数据。",
    );
    window.location.href = "./start.html";
  }
};
