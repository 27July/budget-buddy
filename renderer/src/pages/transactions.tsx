
import * as React from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, SearchIcon, Trash2 } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import AddTransactionDialog from '@/components/custom/addTransactionDialog';
import { format as dfFormat } from 'date-fns';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose} from '@/components/ui/dialog';

export default function Transactions() {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: oneMonthAgo,
    to: today,
  });

  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [categories, setCategories] = React.useState<{ id: number; name: string }[]>([]);
  const [sortBy, setSortBy]     = React.useState<"Name"|"Date"|"Amount"|"Category">("Date");
  const [sortDir, setSortDir]   = React.useState<"ASC"|"DESC">("DESC");
  const [page, setPage]         = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [error, setError] = React.useState<string | null>(null);
  
  //normalization problem
  React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await window.databaseAPI.getAllCategories();
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map((c: { ID: number; Name: string }) => ({
          id: c.ID,
          name: c.Name,
        }));
        setCategories(mapped);
      }
    };

    fetchCategories();
    fetchTransactions(); // default unfiltered load
  }, []);

    //Could probably use useEffect for more stuff but i think this is fine for now
    React.useEffect(() => {
      const filters = buildFilters();
      fetchTransactions(filters);
    }, [sortDir, page, pageSize]);

    //normalization problem
  const fetchTransactions = async(filters?: TransactionFilters) =>{
    setError(null);
    const res = await window.databaseAPI.getTransactions(filters);
    if (res.success) {
      const normalized: Transaction[] = res.data.map((r: any) => ({
      id:          r.ID,
      name:        r.Name,
      amount:      Number(r.Amount),
      date:        r.Date,
      categoryId:  r.Category_ID ?? undefined,
      description: r.Description ?? '',
    }));
      setTransactions(normalized);
      console.log("Fetched transactions successfully")
    } else {
      setError(res.error ?? 'Failed to fetch transactions');
    }
  }

  const buildFilters = (): TransactionFilters => ({
    name: searchText || undefined,
    startDate: dateRange?.from && dfFormat(dateRange.from, 'yyyy-MM-dd'),
    endDate:   dateRange?.to   && dfFormat(dateRange.to, 'yyyy-MM-dd'),
    categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
    sortBy,
    sortDir,
    page,
    pageSize,
  })

  const formatDateRangeLabel = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, 'dd/MM/yyyy')} – ${format(dateRange.to, 'dd/MM/yyyy')}`;
    } else if (dateRange?.from) {
      return format(dateRange.from, 'dd/MM/yyyy');
    } else {
      return 'Default Date Range: All Time';
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Transactions
        </h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4 align-middle" />
                {formatDateRangeLabel()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range ?? { from: undefined, to: undefined })}
                numberOfMonths={2}/>
            </PopoverContent>
          </Popover>
          <AddTransactionDialog onSuccess={fetchTransactions}/>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="w-64 bg-white"
        />
        <select
          className="max-w-xs p-2 border rounded text-sm bg-white"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <label className="p-1 border rounded text-sm bg-white">Sort by:</label>
          <select
              className="p-1 border rounded text-sm bg-white"
              value={sortBy}
              onChange={(event) => {
                const newSortBy = event.target.value as "Name"|"Date"|"Amount"|"Category";
                setSortBy(newSortBy);
                // Reset to first page after sorting
                setPage(1);
                fetchTransactions(buildFilters());
              }}
            >
              <option value="Date">Date</option>
              <option value="Name">Name</option>
              <option value="Amount">Amount</option>
              <option value="Category">Category</option>
            </select>
          <Button
            onClick={() => {
              const next = sortDir === "ASC" ? "DESC" : "ASC";
              setSortDir(next);   // re-fetch with new sortDir
            }} variant="outline">
            {sortDir === "ASC" ? "↑" : "↓"}
          </Button>
        </div>

        {/* Button to Search */}
        <Button variant="outline"
        onClick={() => fetchTransactions(buildFilters())}>
          <SearchIcon className="mr-2 h-4 w-4" />
          Search
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div >


      {/* Transactions List */}
      {/* We fit everything into the map loop here */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactions.map((txn) => (
            <div key={txn.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{txn.name}</h3>
                  {/* We already mapped previously so lets make use of that instead of creating a new query, makes more sense I think*/}
                  <Badge variant="outline" className="text-xs">
                    {
                      txn.categoryId
                        ? (categories.find(cat => cat.id === txn.categoryId)?.name || 'Unknown Category')
                        : 'Uncategorised'
                    }
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{txn.description}</p>
              </div>
              <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-green-600 font-semibold text-lg">
                  {txn.amount != null
                    ? `$${txn.amount.toFixed(2)}`
                    : '—'}
                </div>
                <div className="text-sm text-muted-foreground">{txn.date}</div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Transaction?!</DialogTitle>
                    <DialogDescription>Are you <strong>VERY SURE</strong> you want to delete this transaction</DialogDescription>
                  </DialogHeader>
                  <DialogFooter className = 'space-x-2'>
                    <DialogClose asChild>
                      <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant='destructive' onClick={async () => {
                        const res = await window.databaseAPI.deleteTransaction(txn.id);
                        if (res.success) {
                          fetchTransactions(buildFilters());
                        } else {
                          setError(res.error ?? 'Failed to delete transaction');
                        }
                      }}>
                        Confirm Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            </div>
          ))}
        </CardContent>
      </Card>
      {/*Could have used shad-cn pagination tbh*/}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => {
            setPage((page) => Math.max(1, page-1));
          }}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page}
        </span>
        <Button
          variant="outline"
          disabled={transactions.length < pageSize}
          onClick={() => {
            setPage((page) => page + 1);
          }}
        >
          Next
        </Button>
      </div>

    </div>
  );
}
