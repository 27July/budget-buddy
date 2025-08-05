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

export function getSpendingVelocity(startDate: string, endDate: string): {day: string, total: number}[]{
    const overTime = getSpendingOverTime(startDate, endDate);

    const velocityData = [];

    for (let i = 1; i < overTime.length; i++) {
        const prev = overTime[i - 1];
        const curr = overTime[i];

        const velocity = curr.total - prev.total;

        velocityData.push({
            day : curr.day,
            total: velocity
        });
    }
    return velocityData;
}


export function getCategoryTrend(startDate: string, endDate: string): { day: string; category: string; total: number }[] {
  const stmt = db.prepare(`
    SELECT 
    t.Date AS day,
    COALESCE(c.Name, 'Uncategorised') AS categoryName,
    SUM(t.Amount) AS total
    FROM TRANSACTIONS t
    LEFT JOIN CATEGORY c ON t.Category_ID = c.ID
    WHERE t.Date BETWEEN ? AND ?
    GROUP BY t.Date, categoryName
    ORDER BY t.Date ASC;
    `);
    const result = stmt.all(startDate, endDate) as { day: string; category: string; total: number }[];
    return result;
}
