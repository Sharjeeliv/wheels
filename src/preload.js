// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onPlatform: (callback) => ipcRenderer.on('platform', (event, platform) => callback(platform)),
  onDependencyStatus: (callback) => ipcRenderer.on('dependency-status', (event, statuses) => callback(statuses))
});