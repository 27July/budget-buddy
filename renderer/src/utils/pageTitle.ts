const pageTitleMap: Record<string, string> = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  settings: "Settings",
  about: "About",
};

export function getPageTitle(page: string): string {
  return pageTitleMap[page] || "";
}
