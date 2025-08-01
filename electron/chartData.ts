import db from './db'

export function getSpendingOverTime(startDate: string, endDate: string):{day: string, total: number}[]{
    const stmt = db.prepare(`
        SELECT Date as day, SUM(Amount) as total
        FROM TRANSACTIONS
        WHERE Date BETWEEN ? AND ?
        GROUP BY Date
        ORDER BY Date ASC
        `)
    const result = stmt.all(startDate, endDate) as { day: string, total: number }[]
    return result;
}
