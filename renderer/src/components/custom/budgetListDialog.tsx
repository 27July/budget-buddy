import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddBudgetButton } from "./addBudgetDialog";

export default function BudgetListDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const [budgets, setBudgets] = React.useState<
    { id: number; name: string; amountAllocated: number }[]
  >([]);

  const fetchBudgets = async () => {
    const res = await window.databaseAPI.getAllBudgets();
    if (res.success && Array.isArray(res.data)) {
      const mapped = res.data.map((b: any) => ({
        id: b.ID,
        name: b.Name,
        amountAllocated: Number(b.Amount_Allocated) || 0,
      }));
      setBudgets(mapped);
    } else {
      console.error("Failed to load budgets:", res.error);
      setBudgets([]);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchBudgets();
    }
  }, [open]);

  const handleDelete = async (id: number) => {
    const res = await window.databaseAPI.deleteBudget(id);
    if (res.success) {
      fetchBudgets();
    } else {
      console.error("Delete failed:", res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-center">All Budgets</DialogTitle>
            <AddBudgetButton fetchBudgets={fetchBudgets} />
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {budgets.length === 0 ? (
            <p className="text-sm text-muted-foreground">No budgets found</p>
          ) : (
            budgets.map((budget) => (
              <Dialog key={budget.id}>
                <div className="flex justify-between items-center border p-2 rounded-md text-sm bg-muted hover:bg-muted/60 transition">
                  <div>
                    <p className="font-medium">{budget.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Allocated: ${budget.amountAllocated.toFixed(2)}
                    </p>
                  </div>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </DialogTrigger>
                </div>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Budget</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this budget?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(budget.id)}
                      >
                        Confirm Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))
          )}
        </div>

        <DialogClose asChild>
          <button className="mt-4 w-full bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600 transition">
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
