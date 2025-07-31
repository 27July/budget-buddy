import * as React from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from "sonner"

//Call back to refresh transaction list after adding a new transaction
interface AddTransactionDialogProps {
  onSuccess?: () => void;
}

export default function AddTransactionDialog({ onSuccess }: AddTransactionDialogProps) {
    //Variable to keep track of today's date
    const todayDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    //React hooks
    const [name, setName] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [date, setDate] = React.useState(todayDate);
    const [categoryId, setCategoryId] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const [categories, setCategories] = React.useState<{ id: number; name: string }[]>([]);

    //Hidden button reference for closing the dialog
    const closeRef = React.useRef<HTMLButtonElement>(null);

    //Fetch categories from the database when component mounts
    React.useEffect(() =>{
        const fetchCategories = async()=>{
            const res = await window.databaseAPI.getAllCategories();
            if (res.success) {
                setCategories(res.data);
            } else {
                console.error("Error fetching categories:", res.error);
            }
        };
        fetchCategories();
    }, []);


    //Function to handle form submission
    const handleSubmit = async(event: React.FormEvent) => {
        //Prevent default form refresh
        event.preventDefault();
        setError(null); //Reset error state

        //Validate inputs
        if (!name.trim()) {
        setError("Transaction name is required.");
        return;
        }
        const parsedAmount = parseFloat(amount);
        if (!amount || isNaN(parsedAmount)) {
        setError("A valid numeric amount is required.");
        return;
        }
        if (!date) {
        setError("Date is required.");
        return;
        }
        if (date > todayDate) {
        setError("Transaction date cannot be in the future.");
        return;
    }

        const NewTransaction: NewTransaction = {
            name, 
            amount: parseFloat(amount),
            date,
            categoryId: categoryId ? parseInt(categoryId) : undefined, //Parse it into integer or undefined
            description: description || undefined, //Default undefined
        }
        //Calling the database function
        const res = await window.databaseAPI.addTransaction(NewTransaction);
        //Successful database operation
        if (res.success){
            toast.success("Transaction added successfully!");
            console.log("Transaction added successfully, TransactionId: ", res.result);
            if (onSuccess){
                //Decoupling for parent component to handle the success case
                onSuccess(); //Call the callback function to refresh the transaction list

                //Clear form
                setName('');
                setAmount('');
                setDate(todayDate);
                setCategoryId('');
                setDescription('');
                setError(null); //Reset error state
            }
            if (closeRef.current) {
                closeRef.current.click();
            }
        }//Unsuccessful database operation
        else{
            console.log("Error adding transaction:", res.error);
            setError(res.error);
        }
    };

    return(
        <Dialog>
                <DialogTrigger asChild>
                <Button variant="outline" >Add Transaction</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                    <DialogDescription>
                    Record transactions here. Click save when you&apos;re
                    done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4, mt-4">
                    <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <div className="grid gap-3">
                    <Label htmlFor="amount-1">Amount</Label>
                    <div className='relative'>
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="amount-1" name="amount" value={amount} onChange={(event) => setAmount(event.target.value)} className='pl-5'/>
                    </div>
                    </div>
                    <div className="grid gap-3">
                    <Label htmlFor="date-1">Date</Label>
                    <Input id="date-1" name="date" type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
                    </div>
                    <div className="grid gap-3">
                    <Label htmlFor="category-1">Category</Label>
                    <select id="category-1" name="category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select a Category (Optional)</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    </div>
                    <div className="grid gap-3">
                    <Label htmlFor="description-1">Description</Label>
                    <Input id="description-1" name="description" value={description} onChange={(event) => setDescription(event.target.value)}/>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <DialogFooter className='mt-4'>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="outline" type="submit">Save transaction</Button>
                    <DialogClose asChild>
                    <button ref={closeRef} className="hidden" />
                    </DialogClose>
                </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
    );
}