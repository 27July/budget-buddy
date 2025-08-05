import db from './db';

export function top5Transactions(startDate: string, endDate: string):{transactionName: string, total: number}[]{
    const stmt = db.prepare(`
        SELECT t.Name as transactionName, t.Amount as total
        FROM TRANSACTIONS t
        WHERE t.Date BETWEEN ? AND ?
        ORDER BY total DESC
        LIMIT 5`)
    const result = stmt.all(startDate, endDate) as { transactionName: string, total: number }[];
    return result;
}