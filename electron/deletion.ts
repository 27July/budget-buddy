import db from './db';

export function deleteTransaction(transactionId: number) {
    try {
        const stmt = db.prepare(`
            DELETE FROM Transactions WHERE ID = ?
        `);

        const result = stmt.run(transactionId);
        
        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Transaction not found" };
        }
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return { success: false, error: String(error) };
    }
}

export function deleteCategory(categoryId: number) {
    try {
        const stmt = db.prepare(`
            DELETE FROM CATEGORY WHERE ID = ?
        `);

        const result = stmt.run(categoryId);
        
        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Category not found" };
        }
    } catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, error: String(error) };
    }
}

export function deleteRecurringExpense(expenseId: number) {
    try {
        const stmt = db.prepare(`
            DELETE FROM RECURRING_EXPENSES WHERE ID = ?
        `);

        const result = stmt.run(expenseId);
        
        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Recurring expense not found" };
        }
    } catch (error) {
        console.error("Error deleting recurring expense:", error);
        return { success: false, error: String(error) };
    }
}

export function deleteBudget(budgetId: number) {
    try {
        const stmt = db.prepare(`
            DELETE FROM BUDGETS WHERE ID = ?
        `);

        const result = stmt.run(budgetId);
        
        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Budget not found" };
        }
    } catch (error) {
        console.error("Error deleting budget:", error);
        return { success: false, error: String(error) };
    }
}

export function deleteBudgetCategory(budgetId: number, categoryId: number){
    try {
        const stmt = db.prepare(`
            DELETE FROM BUDGET_CATEGORIES WHERE Budget_ID = ? AND Category_ID = ?
        `);

        const result = stmt.run(budgetId, categoryId);
        
        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Budget category not found" };
        }
    } catch (error) {
        console.error("Error deleting budget category:", error);
        return { success: false, error: String(error) };
    }
}