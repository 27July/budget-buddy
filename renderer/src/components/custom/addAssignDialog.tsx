import * as React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react";

export function AddAssignButton({ fetchBudgetsAndCategories, categories, budgets }: { fetchBudgetsAndCategories: () => void; categories: { id: number; name: string }[]; budgets: { id: number; name: string }[] }) {
    const [open, setOpen] = React.useState(false);
    const [selectedBudget, setSelectedBudget] = React.useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);

    const handleAddAssignment = async () => {
        if (selectedBudget !== null && selectedCategory !== null) {
            const res = await window.databaseAPI.addBudgetCategory(selectedBudget, selectedCategory);
            if (res.success) {
                fetchBudgetsAndCategories();
                setSelectedBudget(null);
                setSelectedCategory(null);
                setOpen(false);
            } else {
                alert("Failed to add assignment: " + res.error);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <span className = 'text-sm'>Link Budget and Category</span>
                    <Plus className="h-4 w-4 text-red-500" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Category to Budget</DialogTitle>
                </DialogHeader>
                 <div className="flex space-x-4">
                <Select onValueChange={(val) => setSelectedBudget(Number(val))}>
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Budget" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Budget</SelectLabel>
                        {budgets.map((budget) => (
                        <SelectItem key={budget.id} value={budget.id.toString()}>
                            {budget.name}
                        </SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={(val) => setSelectedCategory(Number(val))}>
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                        </SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
                    <Button onClick={handleAddAssignment}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}