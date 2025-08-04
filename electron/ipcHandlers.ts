import { getTransactions, getAllCategories, getAllRecurringExpenses, getAllBudgets, getCategoriesForBudget, getTransactionById, getBudgetById, getAllBudgetCategoryPair, getCategoryName } from './queries'
import { addTransaction, addCategory, addRecurringExpense, addBudget, addBudgetCategory, clearBudgetCategory, updateTransaction, updateCategory, updateRecurringExpense, updateBudget } from './mutation'
import { deleteTransaction, deleteCategory, deleteRecurringExpense, deleteBudget, deleteBudgetCategory } from './deletion';
import { getDashboardStats } from './dashboardStats';
import exportAllTransactions from './settingFunctions/exportData';
import { ipcMain } from 'electron';



export function registerIpcHandlers() {
    //Queries
    ipcMain.handle('get-transactions', async (event, filters) => {
        return getTransactions(filters);
      })
    ipcMain.handle('get-all-categories', async () => {
    return getAllCategories();
      })
    ipcMain.handle('get-all-recurring-expenses', async () => {
        return getAllRecurringExpenses();
      })
    ipcMain.handle('get-all-budgets', async () => {
        return getAllBudgets();
      })
    ipcMain.handle('get-categories-for-budget', async (event, budgetId) => {
        return getCategoriesForBudget(budgetId);
      })
    ipcMain.handle('get-transaction-by-id', async (event, transactionId) => {
        return getTransactionById(transactionId);
      })
    ipcMain.handle('get-budget-by-id', async (event, budgetId) => {
        return getBudgetById(budgetId);
      })
      ipcMain.handle('get-all-budget-category-pair', async() => {
        return getAllBudgetCategoryPair();
      })
      ipcMain.handle('get-category-name', async (event, categoryId) => {
        return getCategoryName(categoryId);
      })
    
    //Mutations
    ipcMain.handle('add-transaction', async (event, transaction) => {
        return addTransaction(transaction);
      })
    
    ipcMain.handle('add-category', async (event, category) => {
        return addCategory(category);
      })
    ipcMain.handle('add-recurring-expense', async (event, recurringExpense) => {
        return addRecurringExpense(recurringExpense);
      })
    ipcMain.handle('add-budget', async (event, name, amountAllocated) => {
        return addBudget(name, amountAllocated);
      })
    ipcMain.handle('add-budget-category', async (event, budgetId, categoryId) => {
        return addBudgetCategory(budgetId, categoryId);
      })
    ipcMain.handle('clear-budget-category', async (event, budgetId) => {
        return clearBudgetCategory(budgetId);
      })
    ipcMain.handle('update-transaction', async (event, transaction) => {
        return updateTransaction(transaction);
      })
    ipcMain.handle('update-category', async (event, categoryId, name) => {
        return updateCategory(categoryId, name);
      })
    ipcMain.handle('update-recurring-expense', async (event, expense) => {
        return updateRecurringExpense(expense);
      })
    ipcMain.handle('update-budget', async (event, budgetId, name, amountAllocated) => {
        return updateBudget(budgetId, name, amountAllocated);
      })
    
    //Deletion
    ipcMain.handle('delete-transaction', async (event, transactionId) => {
        return deleteTransaction(transactionId);
      })
    ipcMain.handle('delete-category', async (event, categoryId) => {
        return deleteCategory(categoryId);
      })
    ipcMain.handle('delete-recurring-expense', async (event, expenseId) => {
        return deleteRecurringExpense(expenseId);
      })
    ipcMain.handle('delete-budget', async (event, budgetId) => {
        return deleteBudget(budgetId);
      })
    ipcMain.handle('delete-budget-category', async (event, budgetId, categoryId) => {
        return deleteBudgetCategory(budgetId, categoryId);
      })
    
    //Dashboard Stats
    ipcMain.handle('get-dashboard-stats', async (event, { startDate, endDate }) => {
        return getDashboardStats({ startDate: new Date(startDate), endDate: new Date(endDate) });
      }) 
    
    //Settings
    ipcMain.handle('export-all-transactions', async () => {
        return await exportAllTransactions(); // from export.ts
      });

    
}