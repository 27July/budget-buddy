<h1 align="center">Budget-Buddy💸</h1>

## About:
Budget-Buddy is a desktop application designed for local expense tracking. It features interactive charts and visualisations to help users better understand and manage their finances. A full list of features that we provide are avaliable [here](#features).

## Technology and Tools:
[![TypeScript](https://img.shields.io/badge/Typescript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) 
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/) 
[![Electron.js](https://img.shields.io/badge/Electron-191970?logo=Electron&logoColor=white)](https://www.electronjs.org/) 
[![SQLite](https://img.shields.io/badge/SQLite-%2307405e.svg?logo=sqlite&logoColor=white)](https://www.sqlite.org/) 
[![Redux](https://img.shields.io/badge/Redux-%23593d88.svg?logo=redux&logoColor=white)](https://redux.js.org/)


## Gallery:
<h3>Budget, Category and Transactions</h3>
<p align="left">
  <img src="gallery/budgetExample1.png" alt="Budget Example" width="300" style="margin-right: 10px;" />
  <img src="gallery/categoryExample1.png" alt="Category Example" width="300" />
  <img src="gallery/transactionExample1.png" alt="Transaction Example" width="300" />
</p>

<h3>Dashboard</h3>
<p align="left">
  <img src="gallery/dashboardExample1.png" alt="Dashboard 1" width="300" style="margin-right: 10px;" />
  <img src="gallery/dashboardExample2.png" alt="Dashboard 2" width="300" style="margin-right: 10px;" />
  <img src="gallery/dashboardExample3.png" alt="Dashboard 3" width="300" />
</p>

<h3>Export and Linking</h3>
<p align="left">
  <img src="gallery/exportCSVExample1.png" alt="Export CSV" width="300" style="margin-right: 10px;" />
  <img src="gallery/linkBudgetCategoryExample1.png" alt="Link Budget" width="300" style="margin-right: 10px;" />
</p>



## Running the Application:
### Prerequisites:
Make sure you have the following installed:
- Node.js (v18 or newer)
- npm (comes with Node.js)
### Setup Instructions:
```bash
# Clone the repository
git clone https://github.com/27July/budget-buddy.git
cd budget-buddy

# Install all dependencies (main + renderer)
npm install
cd renderer
npm install
cd ..

# Rebuild native modules (e.g. better-sqlite3)
npm run rebuild

# Start the development environment
npm run dev
```

## Features:
- Track total expenses, budgets, and balance
- Visualize spending with interactive charts
- Gain insights from transaction analytics
- Record and manage individual transactions
- Set budgets and organize spending by category
- Export transaction history for backup or analysis

## Made with ❤️ by [Wee Zi Hao](https://github.com/27July)
[![GitHub](https://img.shields.io/badge/GitHub-27July-181717?logo=github&logoColor=white)](https://github.com/27July)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Wee%20Zi%20Hao-%230077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wee-zi-hao)
[![Email](https://img.shields.io/badge/Email-weezihao@gmail.com-D14836?logo=gmail&logoColor=white)](mailto:weezihao@gmail.com)
[![Personal Site](https://img.shields.io/badge/Website-Wee%20Zi%20Hao-1E40AF?logo=aboutdotme&logoColor=white)](https://27july.github.io/)
