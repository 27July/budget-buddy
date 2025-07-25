import { contextBridge, ipcRenderer } from 'electron'


const databaseAPI = {
  // Expose the getTransactions function to the renderer process
  getTransactions: (filters:TransactionFilters = {}) => {
    return ipcRenderer.invoke('get-transactions', filters);
  },
  addTransaction: (transaction: NewTransaction) => {
    return ipcRenderer.invoke('add-transaction', transaction);
  },

  getAllCategories: () => {
    return ipcRenderer.invoke('get-all-categories');
  },

  addCategory: (category: string) => {
    return ipcRenderer.invoke('add-category', category);
  },
  addRecurringExpense: (recurringExpense: NewRecurringExpense) => {
    return ipcRenderer.invoke('add-recurring-expense', recurringExpense);
  },
  deleteTransaction: (transactionId: number) => {
    return ipcRenderer.invoke('delete-transaction', transactionId);
  },
  deleteCategory: (categoryId: number) => {
    return ipcRenderer.invoke('delete-category', categoryId);
  }
}


contextBridge.exposeInMainWorld('databaseAPI', databaseAPI);
  // we can also expose variables, not just functions
