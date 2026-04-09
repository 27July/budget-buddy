import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { registerIpcHandlers } from './ipcHandlers'

if (process.platform === 'win32') {
  app.setAppUserModelId('com.budgetbuddy.app')
}


const createWindow = () => {
  const iconPath = app.isPackaged
    ? path.join(__dirname, '../../renderer/dist/logo.ico')
    : path.join(__dirname, '../../renderer/public/logo.ico')

  const fallbackIconPath = app.isPackaged
    ? path.join(__dirname, '../../renderer/dist/logo.png')
    : path.join(__dirname, '../../renderer/public/logo.png')

  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
    title: 'Budget Buddy',
    icon: process.platform === 'win32' ? iconPath : fallbackIconPath,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.platform === 'win32') {
    win.setAppDetails({
      appId: 'com.budgetbuddy.app',
      appIconPath: iconPath,
    })
  }

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
  registerIpcHandlers();
  
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