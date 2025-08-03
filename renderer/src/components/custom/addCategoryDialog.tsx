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

export function AddCategoryButton({ fetchCategories }: { fetchCategories: () => void }) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (categoryName.trim() !== "") {
      const res = await window.databaseAPI.addCategory(categoryName.trim());
      if (res.success) {
        fetchCategories();
        setCategoryName("");
        setOpen(false);
      } else {
        alert("Failed to add category: " + res.error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
            <span className = 'text-sm'>Add Category</span>
            <Plus className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleAddCategory}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
