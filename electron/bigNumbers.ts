import db from './db';
//TBH all these functions should have try catch error blocks but this should work for now
export function getTotalBudget():number{
    const stmt = db.prepare(`SELECT SUM(Amount_Allocated) AS TOTAL FROM BUDGETS`);
    const result = stmt.get() as  { TOTAL: number } | null;
    return result?.TOTAL ?? 0;
}

export function getTotalExpenses(startDate: string, endDate: string):number{
    const stmt = db.prepare(`SELECT SUM(Amount) AS TOTAL FROM TRANSACTIONS WHERE Date BETWEEN ? and ?`);
    const result = stmt.get(startDate, endDate) as { TOTAL: number } | null;
    return result?.TOTAL ?? 0;
}

export function getBalance(startDate: string, endDate: string):number{
    const totalBudget = getTotalBudget();
    const totalExpenses = getTotalExpenses(startDate, endDate);
    const result = totalBudget - totalExpenses;
    return result ?? 0;
}

export function getNumTransactions(startDate: string, endDate: string):number{
    const stmt = db.prepare(`SELECT COUNT(*) AS TOTAL FROM TRANSACTIONS WHERE Date BETWEEN ? and ?`);
    const result = stmt.get(startDate, endDate) as { TOTAL: number } | null;
    return result?.TOTAL ?? 0;
}