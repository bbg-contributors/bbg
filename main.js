const { app, BrowserWindow, Menu, shell } = require("electron");

require("@electron/remote/main").initialize();

Menu.setApplicationMenu(Menu.buildFromTemplate([
	// FIXME: Menu display is inconsistent on macOS
	{
		label: "File",
		submenu: [
			{
				label: "Open existing site"
			},
			{
				label: "Create new site"
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
				label: "About"
			}
		]
	}
]));

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
