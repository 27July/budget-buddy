import Database from "better-sqlite3";

import path from "path";
import fs from "fs";

const dbDir = path.join(__dirname, "appData");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, "data.db");
const db = new Database(dbPath);
//Default is OFF
db.pragma("foreign_keys = ON");


db.exec(`
    CREATE TABLE IF NOT EXISTS CATEGORY(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS TRANSACTIONS(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Amount REAL NOT NULL,
    Date TEXT NOT NULL,
    Category_ID INTEGER,
    Description TEXT,
    FOREIGN KEY(Category_ID) REFERENCES CATEGORY(ID) ON DELETE SET NULL
    );
    
    CREATE TABLE IF NOT EXISTS RECURRING_EXPENSES(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Amount REAL NOT NULL,
    Date TEXT NOT NULL,
    Category_ID INTEGER,
    Description TEXT,
    Frequency TEXT NOT NULL,
    Last_Applied TEXT,
    FOREIGN KEY(Category_ID) REFERENCES CATEGORY(ID) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS BUDGETS(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Amount_Allocated REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS BUDGET_CATEGORIES(
    Budget_ID INTEGER,
    Category_ID INTEGER,
    Primary Key (Budget_ID, Category_ID),
    FOREIGN KEY(Budget_ID) REFERENCES BUDGETS(ID) ON DELETE CASCADE,
    FOREIGN KEY(Category_ID) REFERENCES CATEGORY(ID) ON DELETE CASCADE
    );

    `);

export default db;

