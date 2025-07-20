import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    title: 'Budget Buddy',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const isDev = !app.isPackaged
  if (isDev) {
    win.loadURL('http://localhost:5173/');
  }
  else{
    win.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  }
}

app.whenReady().then(() => {
  //Just setting up a function in memory, will not affect speed
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})