import db from './db';

// Function that uses transaction filters to query the database
export function getTransactions(filters: TransactionFilters = {}){
    // Special WHERE 1=1 trick for easy branching
    try{
        let query = `SELECT * FROM Transactions WHERE 1=1`;

        // Array to hold query parameters
        const params: any[] = [];

        if (filters.name) {
            query += ` AND Name LIKE ?`;
            params.push(`%${filters.name}%`);
        }

        if (filters.startDate && filters.endDate) {
            query += ` AND Date BETWEEN ? AND ?`;
            params.push(filters.startDate, filters.endDate);
        }
        else if (filters.startDate) {
            query += ` AND Date >= ?`;
            params.push(filters.startDate);
        }
        else if (filters.endDate) {
            query += ` AND Date <= ?`;
            params.push(filters.endDate);
        }

        if (filters.categoryId) {
            query += ` AND Category_ID = ?`;
            params.push(filters.categoryId);
        }
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
