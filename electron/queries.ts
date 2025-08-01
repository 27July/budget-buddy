import db from './db';

// Function that uses transaction filters to query the database
export function getTransactions(filters: TransactionFilters = {}){
    // Special WHERE 1=1 trick for easy branching
    try{
        let query = `
            SELECT t.*, c.Name AS CategoryName
            FROM Transactions t
            LEFT JOIN CATEGORY c ON t.Category_ID = c.ID
            WHERE 1=1
            `;

        // Array to hold query parameters
        const params: any[] = [];

        if (filters.name) {
            query += ` AND t.Name LIKE ?`;
            params.push(`%${filters.name}%`);
        }

        if (filters.startDate && filters.endDate) {
            query += ` AND t.Date BETWEEN ? AND ?`;
            params.push(filters.startDate, filters.endDate);
        }
        else if (filters.startDate) {
            query += ` AND t.Date >= ?`;
            params.push(filters.startDate);
        }
        else if (filters.endDate) {
            query += ` AND t.Date <= ?`;
            params.push(filters.endDate);
        }

        if (filters.categoryId) {
            query += ` AND t.Category_ID = ?`;
            params.push(filters.categoryId);
        }
        //Record <string, string> means that the keys are strings and the values are also strings
        const validColumns: Record<string, string> = {
            Name: "t.Name",
            Date: "t.Date",
            Amount: "t.Amount",
            Category: "c.Name",
            };
        if (filters.sortBy && validColumns[filters.sortBy]) {
            const dir = filters.sortDir === "ASC" ? "ASC" : "DESC"; // default DESC
            query += ` ORDER BY ${validColumns[filters.sortBy]} ${dir}`;
            }
        else {
            query += ` ORDER BY t.Date DESC`; // default sort
            }

        const page = filters.page ?? 1;
        const pageSize = filters.pageSize ?? 10;
        const offset = (page - 1) * pageSize;

        query += ` LIMIT ? OFFSET ?`;
        params.push(pageSize, offset);
        // Prepared statement object
        const stmt = db.prepare(query);
        //Returns the matching transactions based on the filters
        const results =  stmt.all(...params);
        return { success: true, data: results };
        }
    catch (error) {
        console.error("Error getting transactions:", error);
        return { success: false, error: String(error) };
    }
}

export function getAllCategories() {
    try {
        const stmt = db.prepare(`SELECT * FROM CATEGORY`);
        const results = stmt.all();
        return { success: true, data: results };
    } catch (error) {
        console.error("Error getting categories:", error);
        return { success: false, error: String(error) };
    }
}

export function getAllRecurringExpenses() {
    try {
        const stmt = db.prepare(`
            SELECT r.*, c.Name AS CategoryName
            FROM RECURRING_EXPENSES r
            LEFT JOIN CATEGORY c ON r.Category_ID = c.ID
            `);
        const results = stmt.all();
        return { success: true, data: results };
    } catch (error) {
        console.error("Error getting recurring expenses:", error);
        return { success: false, error: String(error) };
    }
}

export function getAllBudgets() {
    try {
        const stmt = db.prepare(`SELECT * FROM BUDGETS`);
        const results = stmt.all();
        return { success: true, data: results };
    } catch (error) {
        console.error("Error getting budgets:", error);
        return { success: false, error: String(error) };
    }
}

export function getCategoriesForBudget(budgetId: number) {
    try {
        const stmt = db.prepare(`
            SELECT
            c.*,
            b.Name as BudgetName,
            b.Amount_Allocated as BudgetAmount
            FROM CATEGORY c
            JOIN BUDGET_CATEGORIES bc ON c.ID = bc.Category_ID
            JOIN BUDGETS b ON bc.Budget_ID = b.ID
            WHERE bc.Budget_ID = ?
        `);
        const results = stmt.all(budgetId);
        return { success: true, data: results };
    } catch (error) {
        console.error("Error getting categories for budget:", error);
        return { success: false, error: String(error) };
    }
}

export function getTransactionById(transactionId: number) {
    try {
        const stmt = db.prepare(`
            SELECT t.*, c.Name AS CategoryName
            FROM Transactions t
            LEFT JOIN CATEGORY c ON t.Category_ID = c.ID
            WHERE t.ID = ?
        `);
        const result = stmt.get(transactionId);
        if (result) {
            return { success: true, data: result };
        } else {
            return { success: false, error: "Transaction not found" };
        }
    } catch (error) {
        console.error("Error getting transaction by ID:", error);
        return { success: false, error: String(error) };
    }
}

//Not sure if I will use this
export function getBudgetById(budgetId: number) {
    try {
        const stmt = db.prepare(`SELECT * FROM BUDGETS WHERE ID = ?`);
        const result = stmt.get(budgetId);
        if (result) {
            return { success: true, data: result };
        } else {
            return { success: false, error: "Budget not found" };
        }
    } catch (error) {
        console.error("Error getting budget by ID:", error);
        return { success: false, error: String(error) };
    }
}
