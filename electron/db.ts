import Database from "better-sqlite3";

import path from "path";
import fs from "fs";

const dbDir = path.join(__dirname, "appData");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, "data.db");
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS Category(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS Transactions(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Amount REAL NOT NULL,
    Date TEXT NOT NULL,
    Category_ID INTEGER,
    Description TEXT,
    FOREIGN KEY(Category_ID) REFERENCES Category(ID)
    );
    
    CREATE TABLE IF NOT EXISTS Recurring_Expenses(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Amount REAL NOT NULL,
    Date TEXT NOT NULL,
    Category_ID INTEGER,
    Description TEXT,
    Frequency TEXT NOT NULL,
    Last_Applied TEXT,
    FOREIGN KEY(Category_ID) REFERENCES Category(ID)
    );

    CREATE TABLE IF NOT EXISTS Budgets(
    ID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Amount_Allocated REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Budget_Categories(
    Budget_ID INTEGER,
    Category_ID INTEGER,
    Primary Key (Budget_ID, Category_ID),
    FOREIGN KEY(Budget_ID) REFERENCES Budgets(ID),
    FOREIGN KEY(Category_ID) REFERENCES Category(ID)
    );

    `);

export default db;

