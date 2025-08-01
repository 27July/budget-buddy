import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpendingOverTimeChart from "@/components/charts/spendingOverTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";            
             


export default function Dashboard() {
  //Default will be last month to this month
  const [startMonth, setStartMonth] = React.useState<Date>(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));
  
  const defaultEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  defaultEnd.setHours(23, 59, 59, 999);
  const [endMonth, setEndMonth] = React.useState<Date>(defaultEnd);

  //Formatting
  //const formatMonth = (date: Date) => dfFormat(date, "MMM yyyy");

  const [stats, setStats] = React.useState<dashboardStats>({
    //Big Numbers
    totalBudget:0,
    totalExpenses:0,
    balance:0,
    numTransactions:0,
    spendingOverTime: []
  });

  React.useEffect(() => {
    window.databaseAPI.getDashboardStats(startMonth, endMonth).then((data:dashboardStats)=>{
      setStats({
        totalBudget: data.totalBudget,
        totalExpenses: data.totalExpenses,
        balance: data.balance,
        numTransactions: data.numTransactions,
        spendingOverTime: data.spendingOverTime
      });
    });
  },[startMonth, endMonth]);


  
  //Styling for date inputs (popup uses css)
  const dateInputClass =
  "w-[120px] px-3 py-1.5 rounded-md border border-gray-300 shadow-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-2 flex-wrap">
        <label className="text-sm font-medium text-muted-foreground">From:</label>
        <DatePicker
          selected={startMonth}
          onChange={(date) => date && setStartMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className={dateInputClass}
          placeholderText="Select month"
        />
        <label className="text-sm font-medium text-muted-foreground">To:</label>
        <DatePicker
          selected={endMonth}
          //Bug was here need to get the last day of the month properly
          onChange={(date) => {
          if (date) {
            const adjustedEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            adjustedEnd.setHours(23, 59, 59, 999); // end of day
            setEndMonth(adjustedEnd);
          }}}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className={dateInputClass}
          placeholderText="Select month"
        />
      </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Budgets", value: `$${stats.totalBudget.toFixed(2)}` },
          { label: "Expenses", value: `$${stats.totalExpenses.toFixed(2)}` },
          { label: "Balance", value: `$${stats.balance.toFixed(2)}` },
          { label: "Transactions", value: `${stats.numTransactions}` },
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
          <CardTitle className = 'text-center text-2xl'>Charts</CardTitle>
        </CardHeader>
        <CardContent className="relative h-full text-muted-foreground flex gap-1">
          <div className = 'flex-1'><h3 className = 'text-sm text-center'>Spending Over Time</h3><SpendingOverTimeChart data={stats.spendingOverTime}/></div>
          <div className = 'flex-1'><SpendingOverTimeChart data={stats.spendingOverTime}/></div>
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
