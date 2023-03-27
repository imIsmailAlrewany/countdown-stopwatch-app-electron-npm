const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load the index.html file
  win.loadFile('index.html');

  // Set the window icon
  win.setIcon(path.join(__dirname, '/icons/icons8-24_00-50.png'));
}

// Create the app window when the app is ready
app.whenReady().then(createWindow).catch(err => console.log(err));