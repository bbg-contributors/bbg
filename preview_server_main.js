const express = require("express");
const net = require("net");
const path = require("path");

const PREVIEW_HOST = "127.0.0.1";
const MIN_PORT = 40000;
const MAX_PORT = 65000;
const MAX_ATTEMPTS = 100;

let previewPort = null;
let staticServer = null;
let currentRootDir = null;

function randomPort() {
  return Math.floor(Math.random() * (MAX_PORT - MIN_PORT + 1)) + MIN_PORT;
}

function canListenOnPort(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();

    tester.once("error", () => {
      resolve(false);
    });

    tester.once("listening", () => {
      tester.close(() => resolve(true));
    });

    tester.listen(port, PREVIEW_HOST);
  });
}

async function initPreviewPort() {
  if (previewPort !== null) {
    return previewPort;
  }

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const candidatePort = randomPort();

    if (await canListenOnPort(candidatePort)) {
      previewPort = candidatePort;
      return previewPort;
    }
  }

  throw new Error("Unable to find an available preview port.");
}

function getPreviewServerInfo() {
  return {
    host: PREVIEW_HOST,
    port: previewPort,
    rootDir: currentRootDir,
    url: previewPort === null ? null : `http://${PREVIEW_HOST}:${previewPort}`,
  };
}

function closeStaticServer() {
  if (staticServer === null) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    staticServer.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      staticServer = null;
      resolve();
    });
  });
}

function listenStaticServer(serverApp, port) {
  return new Promise((resolve, reject) => {
    const server = serverApp.listen(port, PREVIEW_HOST, () => resolve(server));
    server.once("error", reject);
  });
}

async function serveDirectory(rootDir) {
  const resolvedRootDir = path.resolve(rootDir);

  await initPreviewPort();

  if (staticServer !== null && currentRootDir === resolvedRootDir) {
    return getPreviewServerInfo();
  }

  await closeStaticServer();

  const serverApp = express();
  serverApp.use(express.static(resolvedRootDir));

  staticServer = await listenStaticServer(serverApp, previewPort);
  currentRootDir = resolvedRootDir;

  return getPreviewServerInfo();
}

module.exports = {
  getPreviewServerInfo,
  initPreviewPort,
  serveDirectory,
};
