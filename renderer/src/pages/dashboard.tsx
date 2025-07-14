import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

export default function Dashboard() {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: oneMonthAgo,
        to: today,
    });

    const formatLabel = () => {
        if (dateRange?.from && dateRange?.to) {
            return `${format(dateRange.from, "dd/MM/yyyy")} – ${format(dateRange.to, "dd/MM/yyyy")}`;
        } else if (dateRange?.from) {
            return format(dateRange.from, "dd/MM/yyyy");
        } else {
            return "No date-range selected";
        }};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className="text-sm font-normal bg-card text-card-foreground"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatLabel()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              autoFocus
              mode="range"
              selected={dateRange}
              onSelect={(range) => setDateRange(range ?? { from: undefined, to: undefined })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Income", value: "$2,000" },
          { label: "Expenses", value: "$1,250" },
          { label: "Balance", value: "$750" },
          { label: "Transactions", value: "23" },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-base text-center">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-2xl font-bold">
              {item.value}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="h-64">
        <CardHeader>
          <CardTitle>📊 Statistics</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full text-muted-foreground">
          Chart will go here...
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>💡 Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-1">
          <p>• Set a monthly budget</p>
          <p>• Track spending categories</p>
          <p>• Reduce unnecessary subscriptions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📈 Trends</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          Weekly and monthly trends will appear here.
        </CardContent>
      </Card>
    </div>
  );
}
