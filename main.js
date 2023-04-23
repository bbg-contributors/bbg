const { app, dialog, shell, BrowserWindow, Menu } = require("electron");

const getAppInfo = require("./App/getAppInfo.js");
const appInfo = getAppInfo();

require("@electron/remote/main").initialize();

app.setAboutPanelOptions({
  applicationName: appInfo.AppName,
  applicationVersion: appInfo.baseVersion.toString(),
  version: "Electron " + process.versions.electron,
  website: appInfo.officialWebsite
});

let menuTemplate = [
  {
    label: "文件",
    submenu: [
      {
        label: "打开已有站点",
        click: () => {
        },
        accelerator: "CmdOrCtrl+O"
      },
      {
        label: "创建一个新站点",
        click: () => {
        },
        accelerator: "CmdOrCtrl+N"
      }
    ]
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "撤销",
        role: "undo"
      },
      {
        label: "恢复",
        role: "redo"
      },
      {
        label: "剪切",
        role: "cut"
      },
      {
        label: "拷贝",
        role: "copy"
      },
      {
        label: "粘贴",
        role: "paste"
      },
      {
        label: "全选",
        role: "selectAll"
      }
    ]
  },
  {
    label: "帮助",
    submenu: [
      {
        label: "项目主页",
        click: () => {
          shell.openExternal("https://github.com/bbg-contributors/bbg");
        }
      },
      {
        label: "关于",
        click: () => {
          app.showAboutPanel();
        }
      }
    ]
  }
];

if (process.platform == "darwin") {
  menuTemplate.unshift({
    label: "",
    submenu: [
      {
        label: "退出",
        click: () => {
          app.quit();
        },
        accelerator: "Cmd+Q"
      }
    ]
  });
}

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    minWidth: 800,
    minHeight: 600
  });

  require("@electron/remote/main").enable(win.webContents);
  win.loadFile("./App/start.html");
};

app.whenReady().then(() => createWindow());
