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

export function top5ExpenseDays(startDate: string, endDate: string):{day: string, total: number}[]{
    const stmt = db.prepare(`
        SELECT Date as day, SUM(Amount) as total
        FROM TRANSACTIONS
        WHERE Date BETWEEN ? AND ?
        GROUP BY Date
        ORDER BY total DESC
        LIMIT 5`)
    const result = stmt.all(startDate, endDate) as { day: string, total: number }[];
    return result;
}

export function top5FrequentCategories(startDate: string, endDate: string):{categoryName: string, total: number}[]{
    const stmt = db.prepare(`
        SELECT COALESCE (c.Name, 'Uncategorised') as categoryName, COUNT(*) as total
        FROM TRANSACTIONS t
        LEFT JOIN CATEGORY c ON t.Category_ID = c.ID
        WHERE t.Date BETWEEN ? AND ?
        GROUP BY c.Name
        ORDER BY total DESC
        LIMIT 5`)
    const result = stmt.all(startDate, endDate) as { categoryName: string, total: number }[];
    return result;
}

export function averageSpendingPerDayOfWeek(startDate: string, endDate: string):{dayOfWeek: string, average: number}[]{
    const stmt = db.prepare(`
        SELECT 
            CASE strftime('%w', Date)
                WHEN '0' THEN 'Sunday'
                WHEN '1' THEN 'Monday'
                WHEN '2' THEN 'Tuesday'
                WHEN '3' THEN 'Wednesday'
                WHEN '4' THEN 'Thursday'
                WHEN '5' THEN 'Friday'
                WHEN '6' THEN 'Saturday'
            END as dayOfWeek, ROUND(AVG(Amount),2) as average
            FROM TRANSACTIONS
            WHERE Date BETWEEN ? AND ?
            GROUP BY dayOfWeek
            ORDER BY strftime('%w', Date)`)
    const result = stmt.all(startDate, endDate) as { dayOfWeek: string, average: number }[];
    return result;
}