import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddBudgetButton({ fetchBudgets }: { fetchBudgets: () => void }) {
  const [open, setOpen] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddBudget = async () => {
    const trimmedName = budgetName.trim();
    const parsedAmount = parseFloat(amount);

    if (!trimmedName || isNaN(parsedAmount) || parsedAmount < 0) {
      setError("Please enter a valid budget name and positive amount.");
      return;
    }

    const res = await window.databaseAPI.addBudget(trimmedName, parsedAmount);
    if (res.success) {
      fetchBudgets();
      setBudgetName("");
      setAmount("");
      setOpen(false);
      setError(null);
    } else {
      setError("Failed to add budget: " + res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <span className="text-sm">Add Budget</span>
          <Plus className="h-4 w-4 text-red-500 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
        </DialogHeader>

        <Input
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          placeholder="Enter budget name"
        />

        <div className="relative mt-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount allocated"
            className="pl-6 "
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddBudget}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
