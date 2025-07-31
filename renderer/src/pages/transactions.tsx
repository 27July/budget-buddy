
import * as React from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, SearchIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import AddTransactionDialog from '@/components/custom/addTransactionDialog';
import { format as dfFormat } from 'date-fns';

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
  const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await window.databaseAPI.getAllCategories();
      if (res.success) {
        setCategories(res.data);
      }
    };
    fetchCategories();
    fetchTransactions(); // default unfiltered load
    }, []);


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
          <AddTransactionDialog/>
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
          {categories.map((categories) => (
            <option key={categories.id} value={String(categories.id)}>
              {categories.name}
            </option>
          ))}
        </select>

        {/* Button to Search */}
        <Button variant="outline"
        onClick={() => fetchTransactions(buildFilters())}>
          <SearchIcon className="mr-2 h-4 w-4" />
          Search
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div >


      {/* Transactions List */}
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
                  <Badge variant="outline" className="text-xs">{txn.categoryId ?? "Uncategorised"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{txn.description}</p>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-semibold text-lg">
                  {txn.amount != null
                    ? `$${txn.amount.toFixed(2)}`
                    : '—'}
                </div>
                <div className="text-sm text-muted-foreground">{txn.date}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
