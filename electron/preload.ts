import { contextBridge, ipcRenderer } from 'electron'

const databaseAPI = {
  // Expose the getTransactions function to the renderer process
  getTransactions: (filters:TransactionFilters = {}) => {
    return ipcRenderer.invoke('get-transactions', filters);
  },
  addTransaction: (transaction: NewTransaction) => {
    return ipcRenderer.invoke('add-transaction', transaction);
  }
}


contextBridge.exposeInMainWorld('databaseAPI', databaseAPI);
  // we can also expose variables, not just functions
