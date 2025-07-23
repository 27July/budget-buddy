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
            INSERT INTO Categories (Name)
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