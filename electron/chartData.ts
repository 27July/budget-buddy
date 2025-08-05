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

export function getSpendingPerCategory(startDate: string, endDate: string):{categoryName: string, total: number}[]{
    const stmt = db.prepare(`
        SELECT COALESCE (c.Name, 'Uncategorised') as categoryName, SUM(t.Amount) as total
        FROM TRANSACTIONS t
        LEFT JOIN CATEGORY c ON t.Category_ID = c.ID
        WHERE t.Date BETWEEN ? AND ?
        GROUP BY categoryName
        ORDER BY total DESC`)
    const result = stmt.all(startDate, endDate) as { categoryName: string, total: number }[];
    return result;
}
