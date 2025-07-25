import db from './db';

// Function to add transaction to the database
export function addTransaction(transaction: NewTransaction) {
    try{
        const stmt = db.prepare(`
        INSERT INTO Transactions (Name, Amount, Date, Category_ID, Description)
        VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
        transaction.name,
        transaction.amount,
        transaction.date,
        transaction.categoryId ?? null, // Placeholder for optional category ID
        transaction.description ?? null // Placeholder for optional description
    );

    return { success: true, insertedId: result.lastInsertRowid };
    }
    catch (error) {
        console.error("Error adding transaction:", error);
        return { success: false, error: String(error) };
    }
}

export function addCategory(category: string) {
    try {
        const stmt = db.prepare(`
            INSERT INTO CATEGORY (Name)
            VALUES (?)
        `);

        const result = stmt.run(
            category
        );

        return { success: true, insertedId: result.lastInsertRowid };
    } catch (error) {
        console.error("Error adding category:", error);
        return { success: false, error: String(error) };
    }
}

export function addRecurringExpense(recurringExpense: NewRecurringExpense) {
    try {
        const stmt = db.prepare(`
            INSERT INTO RECURRING_EXPENSES (Name, Amount, Date, Category_ID, Description, Frequency, Last_Applied)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            recurringExpense.name,
            recurringExpense.amount,
            recurringExpense.date,
            recurringExpense.categoryId ?? null,
            recurringExpense.description ?? null,
            recurringExpense.frequency,
            recurringExpense.date //Last applied will be set to the date of creation initially
        );

        return { success: true, insertedId: result.lastInsertRowid };
    } catch (error) {
        console.error("Error adding recurring expense:", error);
        return { success: false, error: String(error) };
    }
}

export function addBudget(name: string, amountAllocated: number){
    try{
        const stmt = db.prepare(`
            INSERT INTO BUDGETS (Name, Amount_Allocated)
            VALUES (?, ?)
        `);

        const result = stmt.run(
            name,
            amountAllocated
        );

        return { success: true, insertedId: result.lastInsertRowid };
    }
    catch (error) {
        console.error("Error adding budget:", error);
        return { success: false, error: String(error) };
    }

}

export function addBudgetCategory(budgetId: number, categoryId: number) {
    try {
        const stmt = db.prepare(`
            INSERT INTO BUDGET_CATEGORIES (Budget_ID, Category_ID)
            VALUES (?, ?)
        `);

        const result = stmt.run(
            budgetId,
            categoryId
        );

        return { success: true, insertedId: result.lastInsertRowid };
    } catch (error) {
        console.error("Error adding budget category:", error);
        return { success: false, error: String(error) };
    }
}

export function clearBudgetCategories(budgetId: number) {
    try {
        const stmt = db.prepare(`
            DELETE FROM BUDGET_CATEGORIES WHERE Budget_ID = ?
        `);

        const result = stmt.run(budgetId);
        
        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "No categories found for this budget" };
        }
    } catch (error) {
        console.error("Error clearing budget categories:", error);
        return { success: false, error: String(error) };
    }
}

export function updateTransaction(transaction: Transaction) {
    try {
        const stmt = db.prepare(`
            UPDATE Transactions
            SET Name = ?, Amount = ?, Date = ?, Category_ID = ?, Description = ?
            WHERE ID = ?
        `);

        const result = stmt.run(
            transaction.name,
            transaction.amount,
            transaction.date,
            transaction.categoryId ?? null,
            transaction.description ?? null,
            transaction.id
        );

        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Transaction not found" };
        }
    } catch (error) {
        console.error("Error updating transaction:", error);
        return { success: false, error: String(error) };
    }
}   

export function updateCategory(categoryId: number, name: string) {
    try {
        const stmt = db.prepare(`
            UPDATE CATEGORY
            SET Name = ?
            WHERE ID = ?
        `);

        const result = stmt.run(
            name,
            categoryId
        );

        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Category not found" };
        }
    } catch (error) {
        console.error("Error updating category:", error);
        return { success: false, error: String(error) };
    }
}

export function updateRecurringExpense(expense: RecurringExpense) {
    try {
        const stmt = db.prepare(`
            UPDATE RECURRING_EXPENSES
            SET Name = ?, Amount = ?, Date = ?, Category_ID = ?, Description = ?, Frequency = ?, Last_Applied = ?
            WHERE ID = ?
        `);

        const result = stmt.run(
            expense.name,
            expense.amount,
            expense.date,
            expense.categoryId ?? null,
            expense.description ?? null,
            expense.frequency,
            expense.last_applied,
            expense.id
        );

        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Recurring expense not found" };
        }
    } catch (error) {
        console.error("Error updating recurring expense:", error);
        return { success: false, error: String(error) };
    }
}

export function updateBudget(budgetId: number, name: string, amountAllocated: number) {
    try {
        const stmt = db.prepare(`
            UPDATE BUDGETS
            SET Name = ?, Amount_Allocated = ?
            WHERE ID = ?
        `);

        const result = stmt.run(
            name,
            amountAllocated,
            budgetId
        );

        // Check if any rows were affected for update and delete operations
        if (result.changes > 0) {
            return { success: true };
        } else {
            return { success: false, error: "Budget not found" };
        }
    } catch (error) {
        console.error("Error updating budget:", error);
        return { success: false, error: String(error) };
    }
}

