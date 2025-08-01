// electron/databaseSQL/export.ts
import db from '../db';
import Papa from 'papaparse';
import { dialog } from 'electron';
import fs from 'fs';

export default async function exportAllTransactions(): Promise<{ success: boolean; filePath?: string; error?: string }> {
  try {
    // Fetch enriched transaction data
    const transactions = db.prepare(`
      SELECT
        T.Name as TransactionName,
        T.Amount,
        T.Date,
        C.Name as Category,
        T.Description
      FROM TRANSACTIONS T
      LEFT JOIN CATEGORY C ON T.Category_ID = C.ID
      ORDER BY T.Date DESC
    `).all();

    const csv = Papa.unparse(transactions);

    const { filePath } = await dialog.showSaveDialog({
      title: 'Save CSV File',
      defaultPath: 'transactions.csv',
      filters: [{ name: 'CSV Files', extensions: ['csv'] }],
    });

    if (!filePath) return { success: false, error: 'User cancelled export' };

    fs.writeFileSync(filePath, csv);
    return { success: true, filePath };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
