const { app, dialog, shell, BrowserWindow, Menu, ipcMain } = require("electron");

const getAppInfo = require("./App/getAppInfo.js");
const appInfo = getAppInfo();
const langdata = require("./App/LangData.js");
const AppPath = require("electron").app.getPath("userData");
const storage = require("electron-json-storage");
storage.setDataPath(AppPath);

require("@electron/remote/main").initialize();

app.setAboutPanelOptions({
  applicationName: appInfo.AppName,
  applicationVersion: appInfo.VersionNumber.toString(),
  version: "Electron " + process.versions.electron,
  website: appInfo.officialWebsite
});

app.commandLine.appendSwitch("gtk-version", "3");


function openExistingSite() {
  win.webContents.send("openExistingSite");
}

function createNewSite() {
  win.webContents.send("createNewSite");
}

function render_menu(){
  storage.has("language", (error, hasKey) => {
    if (hasKey) {
      const lang_name = storage.getSync("language").name;
      let menuTemplate = [
        {
          label: langdata.FILE[lang_name],
          submenu: [
            {
              label: langdata.OPEN_EXISTING_SITE[lang_name],
              click: openExistingSite,
              accelerator: "CmdOrCtrl+O"
            },
            {
              label: langdata.CREATE_NEW_SITE[lang_name],
              click: createNewSite,
              accelerator: "CmdOrCtrl+N"
            }
          ]
        },
        {
          label: langdata.EDIT[lang_name],
          submenu: [
            {
              label: langdata.UNDO[lang_name],
              role: "undo"
            },
            {
              label: langdata.REDO[lang_name],
              role: "redo"
            },
            {
              label: langdata.CUT[lang_name],
              role: "cut"
            },
            {
              label: langdata.CUT[lang_name],
              role: "copy"
            },
            {
              label: langdata.PASTE[lang_name],
              role: "paste"
            },
            {
              label: langdata.SELECT_ALL[lang_name],
              role: "selectAll"
            }
          ]
        },
        {
          label: langdata.HELP[lang_name],
          submenu: [
            {
              label: langdata.PROJECT_WEBSITE[lang_name],
              click: () => {
                shell.openExternal("https://github.com/bbg-contributors/bbg");
              }
            },
            {
              label: langdata.ABOUT[lang_name],
              click: app.showAboutPanel
            }
          ]
        }
      ];
      
      if (process.platform == "darwin") {
        menuTemplate.unshift({
          label: "",
          submenu: [
            {
              label: langdata.EXIT[lang_name],
              click: () => {
                app.quit();
              },
              accelerator: "Cmd+Q"
            }
          ]
        });
      }
      
      Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    }
  });
}

render_menu();

var win;

const createWindow = () => {
  win = new BrowserWindow({
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
  win.webContents.setWindowOpenHandler(({ url }) => {
    let new_win = new BrowserWindow({
      width: 1200,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      minWidth: 800,
      minHeight: 600
    });
    require("@electron/remote/main").enable(new_win.webContents);
    new_win.loadURL(url);
  });
  win.loadFile("./App/start.html");
};

app.whenReady().then(() => createWindow());

ipcMain.on("backToStartPageAndOpenExistingSite", () => {
  win.loadFile("./App/start.html");
  win.webContents.once("dom-ready", () => {
    win.webContents.send("openExistingSite");
  });
});

ipcMain.on("backToStartPageAndCreateNewSite", () => {
  win.loadFile("./App/start.html");
  win.webContents.once("dom-ready", () => {
    win.webContents.send("createNewSite");
  });
});

ipcMain.on("render_menu_again", () => {
  render_menu();
});
