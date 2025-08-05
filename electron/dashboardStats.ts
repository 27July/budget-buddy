import { format } from 'date-fns';
import { getTotalBudget, getTotalExpenses, getBalance, getNumTransactions } from './bigNumbers';
import { getSpendingOverTime, getSpendingPerCategory, getSpendingVelocity } from './chartData';
import { top5Transactions, top5ExpenseDays, top5FrequentCategories, averageSpendingPerDayOfWeek } from './informationData';

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
        //spendingHeatMap: getSpendingHeatMap(formattedStartDate, formattedEndDate), //Heatmap
        spendingPerCategory: getSpendingPerCategory(formattedStartDate, formattedEndDate),//Pie Chart
        //spendingPerBudget: //Pie Chart
        spendingOverTime: getSpendingOverTime(formattedStartDate, formattedEndDate),//Area Chart
        //expenseVSBudget: //Bar Chart
        spendingVelocity: getSpendingVelocity(formattedStartDate, formattedEndDate), //Area Chart


        //Insights
        top5Transactions: top5Transactions(formattedStartDate, formattedEndDate), //Bar Chart
        top5ExpenseDays: top5ExpenseDays(formattedStartDate, formattedEndDate), // Bar Chart
        top5FrequentCategories: top5FrequentCategories(formattedStartDate, formattedEndDate), // List
        averageSpendingPerDayOfWeek: averageSpendingPerDayOfWeek(formattedStartDate, formattedEndDate), // List

    }

    return stats;

}