import * as React from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import{ Select } from "../ui/select";


export default function AssignListDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    interface BudgetCategoryPair{
        budgetId: number;
        budgetName: string;
        categoryId: number;
        categoryName: string;
    };

    //Constants used to display choices
    const [categories, setCategories] = React.useState<{ id: number; name: string }[]>([]);
    const [budgets, setBudgets] = React.useState<{ id: number; name: string }[]>([]);
    
    //Constant to display existing pairs
    const [budgetCategoryPair, setBudgetCategoryPair] = React.useState<BudgetCategoryPair[]>([]);

    React.useEffect(() => {
  console.log("Updated budgetCategoryPair:", budgetCategoryPair);
}, [budgetCategoryPair]);

    const fetchBudgetsAndCategories = async () => {
        const budgetRes = await window.databaseAPI.getAllBudgets();
        if (budgetRes.success && Array.isArray(budgetRes.data)) {
            const mappedBudgets = budgetRes.data.map((b: any) => ({
                id: b.ID,
                name: b.Name,
            }));
            setBudgets(mappedBudgets);
        } else {
            console.error("Failed to load budgets:", budgetRes.error);
            setBudgets([]);
        }
        const categoryRes = await window.databaseAPI.getAllCategories();
        if (categoryRes.success && Array.isArray(categoryRes.data)) {
            const mappedCategories = categoryRes.data.map((c: any) => ({
                id: c.ID,
                name: c.Name,
            }));
            setCategories(mappedCategories);
        } else {
            console.error("Failed to load categories:", categoryRes.error);
            setCategories([]);
        }
        const budgetCategoryRes = await window.databaseAPI.getAllBudgetCategoryPair();
        if (budgetCategoryRes.success && Array.isArray(budgetCategoryRes.data)) {
            const mappedPairs = budgetCategoryRes.data.map((pair: any) => ({
                budgetId: pair.Budget_ID,
                budgetName: pair.Budget_Name,
                categoryId: pair.Category_ID,
                categoryName: pair.Category_Name,
            }));
            setBudgetCategoryPair(mappedPairs);
        } else {
            console.error("Failed to load budget-category pairs:", budgetCategoryRes.error);
            setBudgetCategoryPair([]);
        }
    };

    React.useEffect(() => {
        if (open) {
            fetchBudgetsAndCategories();
        }
    }, [open]);

    const handleDelete = async (budgetId: number, categoryId: number) => {
        const deleteRes = await window.databaseAPI.deleteBudgetCategory(budgetId, categoryId);
        if (deleteRes.success) {
            fetchBudgetsAndCategories();
        } else {
            console.error("Delete failed:", deleteRes.error);
        }
    };

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className = "max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className='text-center'>
                            Categories assigned to Budgets 
                        </DialogTitle>
                    </div>
                </DialogHeader>
                <div className='mt-4 space-y-2 max-h-64 overflow-y-auto'>
                    {budgetCategoryPair.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No categories assigned to budgets</p>
                    ) : (
                        budgetCategoryPair.map((pair) => (
                            <Dialog key={`${pair.budgetId}-${pair.categoryId}`}>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                <span>
                                    <span className="font-medium text-foreground">Budget:</span> {pair.budgetName}
                                </span>
                                <span>
                                    &mdash;
                                </span>
                                <span>
                                    <span className="font-medium text-foreground">Category:</span> {pair.categoryName}
                                </span>
                                <DialogTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </DialogTrigger>
                                </div>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Delete Budget-Category Pair
                                        </DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete this pair?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className = 'space-x-2'>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                        <Button variant="destructive" onClick={() => handleDelete(pair.budgetId, pair.categoryId)}>
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
                    <Button className = "mt-4 w-full bg-blue-500 text-white py-1.5 rounded hover:bg-blue-600 transition">
                        Close
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
);
}