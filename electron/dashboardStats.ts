import { format } from 'date-fns';
import { getTotalBudget, getTotalExpenses, getBalance, getNumTransactions } from './bigNumbers';
import { getSpendingOverTime } from './chartData';

export function getDashboardStats({ startDate, endDate}: {startDate: Date, endDate: Date}){
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    //Get number of months, need year because we may be dealing across multiple years
    const [startYear, startMonth] = formattedStartDate.split("-").map(Number);
    const [endYear, endMonth] = formattedEndDate.split("-").map(Number);
    const numMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

    const stats = {
        //Big numbers (per month)
        totalBudget: getTotalBudget(numMonths),
        totalExpenses: getTotalExpenses(formattedStartDate, formattedEndDate),
        balance: getBalance(formattedStartDate, formattedEndDate, numMonths),
        numTransactions: getNumTransactions(formattedStartDate, formattedEndDate),
        

        //Charts
        //spendingHeatMap: //Heatmap
        //spendingPerCategory: //Pie Chart
        //spendingPerBudget: //Pie Chart
        spendingOverTime: getSpendingOverTime(formattedStartDate, formattedEndDate),//Area Chart
        //expenseVSBudget: //Bar Chart
        //spendingVelocity: //Line Chart


        //Insights
       // top5Transactions: //List
        //top5FrequentCategories: //List
        //top5ExpenseDays: //List
        //commonKeywords: //




    }

    return stats;

}