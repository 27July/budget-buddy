//import { useState } from 'react'
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainLayout from "./components/layout/mainlayout";
import Dashboard  from "./pages/dashboard";

function App() {
  const currentPage = useSelector((state: RootState) => state.nav.currentPage);
  return (
    <MainLayout>
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "transactions" && <div>Transactions</div>}
      {currentPage === "settings" && <div>Settings</div>}
      {currentPage === "about" && <div>About</div>}
    </MainLayout>
  );
}

export default App;
