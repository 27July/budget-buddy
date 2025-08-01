import db from './db';
import { format } from 'date-fns';
import { getTotalBudget, getTotalExpenses } from './bigNumbers';
import { get } from 'http';

export function getDashboardStats({ startDate, endDate}: {startDate: Date, endDate: Date}){
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const stats = {
        //Big numbers (per month)
        totalBudget: getTotalBudget(),
        totalExpenses: getTotalExpenses(formattedStartDate, formattedEndDate),
        //balanceLeft:
        //numTransactions:
        

        //Charts
        //spendingHeatMap: //Heatmap
        //spendingPerCategory: //Pie Chart
        //spendingPerBudget: //Pie Chart
        //spendingOverTime: //Area Chart
        //expenseVSBudget: //Bar Chart
        //spendingVelocity:


        //Insights
       // top5Transactions: //List
        //top5FrequentCategories: //List
        //top5ExpenseDays: //List
        //commonKeywords: //




    }

    return stats;

}