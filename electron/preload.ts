import { contextBridge, ipcRenderer, shell } from 'electron'
import { get } from 'http';
console.log("Preload script loaded");

//Currently not working
contextBridge.exposeInMainWorld("electron", {
  shell: {
    openExternal: (url: string) => shell.openExternal(url),
  },
});

//Proven to work in renderer process
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})


const databaseAPI = {
  // Expose the getTransactions function to the renderer process

  //Queries
  getTransactions: (filters:TransactionFilters = {}) => {
    return ipcRenderer.invoke('get-transactions', filters);
  },
  getAllCategories: () => {
    return ipcRenderer.invoke('get-all-categories');
  },
  getAllRecurringExpenses: () => {
    return ipcRenderer.invoke('get-all-recurring-expenses');
  },
  getAllBudgets: () => {
    return ipcRenderer.invoke('get-all-budgets');
  },
  getCategoriesForBudget: (budgetId: number) => {
    return ipcRenderer.invoke('get-categories-for-budget', budgetId);
  },
  getTransactionById: (transactionId: number) => {
    return ipcRenderer.invoke('get-transaction-by-id', transactionId);
  },
  getBudgetById: (budgetId: number) => {
    return ipcRenderer.invoke('get-budget-by-id', budgetId);
  },

  //Mutations
  addTransaction: (transaction: NewTransaction) => {
    return ipcRenderer.invoke('add-transaction', transaction);
  },
  addCategory: (category: string) => {
    return ipcRenderer.invoke('add-category', category);
  },
  addRecurringExpense: (recurringExpense: NewRecurringExpense) => {
    return ipcRenderer.invoke('add-recurring-expense', recurringExpense);
  },
  addBudget: (name: string, amountAllocated: number) => {
    return ipcRenderer.invoke('add-budget', name, amountAllocated);
  },
  addBudgetCategory: (budgetId: number, categoryId: number) => {
    return ipcRenderer.invoke('add-budget-category', budgetId, categoryId);
  },
  clearBudgetCategory: (budgetId: number) => {
    return ipcRenderer.invoke('clear-budget-category', budgetId);
  },
  updateTransaction: (transaction: Transaction) => {
    return ipcRenderer.invoke('update-transaction', transaction);
  },
  updateCategory: (categoryId: number, name: string) => {
    return ipcRenderer.invoke('update-category', categoryId, name);
  },
  updateRecurringExpense: (expense: RecurringExpense) => {
    return ipcRenderer.invoke('update-recurring-expense', expense);
  },
  updateBudget: (budgetId: number, name: string, amountAllocated: number) => {
    return ipcRenderer.invoke('update-budget', budgetId, name, amountAllocated);
  },

  //Deletion
  deleteTransaction: (transactionId: number) => {
    return ipcRenderer.invoke('delete-transaction', transactionId);
  },
  deleteCategory: (categoryId: number) => {
    return ipcRenderer.invoke('delete-category', categoryId);
  },
  deleteRecurringExpense: (expenseId: number) => {
    return ipcRenderer.invoke('delete-recurring-expense', expenseId);
  },
  deleteBudget: (budgetId: number) => {
    return ipcRenderer.invoke('delete-budget', budgetId);
  },
  deleteBudgetCategory: (budgetId: number, categoryId: number) => {
    return ipcRenderer.invoke('delete-budget-category', budgetId, categoryId);
  },

  getDashboardStats: (startDate: Date, endDate: Date) => {
    return ipcRenderer.invoke('get-dashboard-stats', { startDate, endDate });
  }
}


contextBridge.exposeInMainWorld('databaseAPI', databaseAPI);
  // we can also expose variables, not just functions
