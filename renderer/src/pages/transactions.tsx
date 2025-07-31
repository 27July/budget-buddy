
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

export default function Transactions() {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: oneMonthAgo,
    to: today,
  });

  const [searchText, setSearchText] = React.useState('');
  const [transactions] = React.useState([
    {
      id: 1,
      name: 'Groceries',
      category: 'Food',
      description: 'NTUC FairPrice',
      amount: 120.0,
      date: '2025-07-16',
    },
    {
      id: 2,
      name: 'Bus Pass',
      category: 'Transport',
      description: 'Monthly Pass',
      amount: 45.0,
      date: '2025-07-14',
    },
    {
      id: 3,
      name: 'Netflix',
      category: 'Entertainment',
      description: 'Subscription',
      amount: 17.99,
      date: '2025-07-10',
    },
  ]);

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
              <Button
                variant="outline"
              >
                <CalendarIcon className="mr-2 h-4 w-4 align-middle" />
                {formatDateRangeLabel()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range ?? { from: undefined, to: undefined })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <AddTransactionDialog/>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name or category..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-64"
        />
        <Button variant="secondary">
          <SearchIcon className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

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
                  <Badge variant="outline" className="text-xs">{txn.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{txn.description}</p>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-semibold text-md">
                  ${txn.amount.toFixed(2)}
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
