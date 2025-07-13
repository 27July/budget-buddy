export default function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--gray-light)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)] p-4 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <img src="/logo.png" alt="BudgetBuddy logo" className="w-34 aspect-[1/1] object-contain" />
      </div>

      <nav className="flex flex-col gap-2 ">
        <button className="bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] px-4 py-2 rounded">
          🧮 Dashboard
        </button>
        <button className="hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] px-4 py-2 rounded">
          ↔ Transactions
        </button>
        <button className="hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] px-4 py-2 rounded">
          ⚙ Settings
        </button>
        <button className="hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] px-4 py-2 rounded">
          ℹ About
        </button>
      </nav>
    </aside>
  );
}
