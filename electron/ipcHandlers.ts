import { getTransactions, getAllCategories } from './queries'
import { addTransaction, addCategory, addRecurringExpense } from './mutation'
import { deleteTransaction, deleteCategory } from './deletion';
import { ipcMain } from 'electron';


export function registerIpcHandlers() {
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
    ipcMain.handle('add-recurring-expense', async (event, args) => {
        return addRecurringExpense(args);
      })
    ipcMain.handle('delete-transaction', async (event, transactionId) => {
        return deleteTransaction(transactionId);
      })
    ipcMain.handle('delete-category', async (event, categoryId) => {
        return deleteCategory(categoryId);
      })
}