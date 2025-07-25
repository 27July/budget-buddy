// Turn the file into a module
export {};

declare global {
  // Typescript interface
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
  interface NewRecurringExpense extends NewTransaction{
    frequency: string;
    last_applied: string;
  }
  interface RecurringExpense extends NewRecurringExpense {
    id: number;
  }
}




