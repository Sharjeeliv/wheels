window.electronAPI.onInstallStatus((_event, message) => {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
  });