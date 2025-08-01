import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface category {
  id: number;
  name: string;
}

export default function CategoryListDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const [categories, setCategories] = React.useState<category[]>([]);

  React.useEffect(() => {
  if (open) {
    window.databaseAPI.getAllCategories().then((res: any) => {
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
    });
  }
}, [open]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className='text-center'>All Categories</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">No categories found</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="border p-2 rounded-md text-sm bg-muted hover:bg-muted/60 transition"
              >
                {cat.name}
              </div>
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
