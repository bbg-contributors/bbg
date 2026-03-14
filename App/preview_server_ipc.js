const { ipcRenderer } = require("electron");

let cachedPreviewServerInfo = null;

async function getPreviewServerInfo() {
  cachedPreviewServerInfo = await ipcRenderer.invoke("preview-server:get-info");
  return cachedPreviewServerInfo;
}

async function servePreviewDirectory(rootDir) {
  cachedPreviewServerInfo = await ipcRenderer.invoke(
    "preview-server:serve-directory",
    rootDir
  );
  return cachedPreviewServerInfo;
}

async function getPreviewUrl(rootDir) {
  if (rootDir) {
    return (await servePreviewDirectory(rootDir)).url;
  }

  return (await getPreviewServerInfo()).url;
}

module.exports = {
  getPreviewServerInfo,
  getPreviewUrl,
  servePreviewDirectory,
};
