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
import { Trash2} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCategoryButton } from "./addCategoryDialog";

//onOpenChange is a radix thing that flips true and false, controlling dialog state
export default function CategoryListDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const [categories, setCategories] = React.useState<category[]>([]);

  //Can remove the any using interface maybe next time
  //Seperated this so we can call setCategories(mapped) below
  const fetchCategories = async () => {
    const res = await window.databaseAPI.getAllCategories();
    if (res.success && Array.isArray(res.data)) {
      const mapped: category[] = res.data.map((c: any) => ({
        id: c.ID,
        name: c.Name,
      }));
      setCategories(mapped);
    } else {
      console.error("Failed to load categories:", res.error);
      setCategories([]);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

const handleDelete = async (id: number) => {
    const res = await window.databaseAPI.deleteCategory(id);
    if (res.success) {
      fetchCategories();
    } else {
      console.error("Delete failed:", res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
           <div className="flex items-center justify-between">
          <DialogTitle className='text-center'>All Categories</DialogTitle>
          <div>
          <AddCategoryButton fetchCategories={fetchCategories} />
          </div>
          </div>
        </DialogHeader>
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">No categories found</p>
          ) : (
            //We did not fit everything into the map loop here
            //We used two different approaches one with selectCategory and the other side no
              categories.map((cat) => (
  <Dialog key={cat.id}>
    <div className="flex justify-between items-center border p-2 rounded-md text-sm bg-muted hover:bg-muted/60 transition">
      {cat.name}
      <DialogTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Trash2 className='w-4 h-4 text-red-500' />
        </Button>
      </DialogTrigger>
    </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this category?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(cat.id)}
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
