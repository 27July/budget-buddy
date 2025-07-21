// Turn the file into a module
export {};

declare global {
  // Typescript interface
  interface TransactionFilters{
    name?: string;
    startDate?: string;
    endDate?: string;
    categoryId?: number;
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
}




