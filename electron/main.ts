import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { getTransactions, getAllCategories } from './queries'
import { addTransaction, addCategory } from './mutation'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
    title: 'Budget Buddy',
    webPreferences: {
      contextIsolation: true,
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
  ipcMain.handle('get-transactions', async (event, args) => {
    return getTransactions(args);
  })
  ipcMain.handle('add-transaction', async (event, args) => {
    return addTransaction(args);
  })
  ipcMain.handle('get-all-categories', async () => {
    return getAllCategories();
  })
  ipcMain.handle('add-category', async (event, args) => {
    return addCategory(args);
  })

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