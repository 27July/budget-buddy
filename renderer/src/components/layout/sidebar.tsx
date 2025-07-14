import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setPage } from "@/store/navSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.nav.currentPage);

  const navItems = [
    { label: "Dashboard", icon: "📊", page: "dashboard" },
    { label: "Transactions", icon: "↔", page: "transactions" },
    { label: "Settings", icon: "⚙", page: "settings" },
    { label: "About", icon: "ℹ", page: "about" },
  ];

  return (
    <aside className="w-64 bg-[var(--gray-light)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)] p-4 flex flex-col gap-6">
        <div className="flex justify-center">
            <img src="/logo.png" alt="Logo" className="w-34 aspect-square object-contain" />
        </div>

        <div className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
            <Button
                key={item.page}
                onClick={() => dispatch(setPage(item.page))}
                variant={currentPage === item.page ? "default" : "ghost"}
                className={cn(
                "justify-start px-4 py-2 text-left w-full",
                currentPage === item.page
                    ? "bg-[var(--blue-gray)] text-[var(--sidebar-primary-foreground)]"
                    : "hover:bg-[var(--blue-gray)] hover:text-[var(--sidebar-accent-foreground)]"
                )}
            >
                {item.icon} {item.label}
            </Button>
            ))}
        </div>
    </aside>

  );
}
