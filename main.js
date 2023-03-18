const { app, dialog, shell, BrowserWindow, Menu } = require("electron");

const getAppInfo = require("./App/getAppInfo.js");
const appInfo = getAppInfo();

require("@electron/remote/main").initialize();

app.setAboutPanelOptions({
  applicationName: appInfo.AppName,
  applicationVersion: appInfo.currentProgramVersion.toString()
});

let menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Open existing site",
        click: () => {

        }
      },
      {
        label: "Create new site",
        click: () => {
        }
      }
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Project homepage",
        click: () => {
          shell.openExternal("https://github.com/bbg-contributors/bbg");
        }
      },
      {
        label: "About",
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
        label: "Quit",
        click: () => {
          app.quit();
        },
        accelerator: "command+q"
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
