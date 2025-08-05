export {};

declare global {
  interface Window {
    //Proven to work in renderer process
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
    };
    electron: {
      shell: {
        openExternal: (url: string) => void;
      };
    };
    databaseAPI: any; // Optional, refine this if needed
  }

  interface NewTransaction {
    name: string;
    amount: number;
    date: string;
    categoryId?: number;
    description?: string;
  }
  interface Transaction extends NewTransaction {
    id: number;
  }
  interface TransactionFilters{
    name?: string;
    startDate?: string;
    endDate?: string;
    categoryId?: number;
    sortBy?: "Name" | "Date" | "Amount" | "Category";
    sortDir?: "ASC" | "DESC";
    page?: number;
    pageSize?: number;
  }
  interface dashboardStats {
  totalBudget: number;
  totalExpenses: number;
  balance: number;
  numTransactions: number;
  spendingPerCategory: { categoryName: string; total: number }[];
  spendingOverTime: { day: string; total: number }[];
  spendingVelocity: { day: string; total: number }[];
  cumulativeSpending: { day: string; total: number }[];
  top5Transactions: { transactionName: string; total: number }[];
  top5ExpenseDays: { day: string; total: number }[];
  top5FrequentCategories: { categoryName: string; total: number }[];
  averageSpendingPerDayOfWeek: { dayOfWeek: string; average: number }[];
}
interface category{
  id: number;
  name: string;
}
interface budget{
  id: number;
  name: string;
  amount: number;
}


}

