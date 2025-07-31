//import { useState } from 'react'
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainLayout from "./components/layout/mainLayout";
import Dashboard  from "./pages/dashboard";
import Transactions from "./pages/transactions";
import About from "./pages/about";
import { Toaster } from "./components/ui/sonner";

function App() {
  const currentPage = useSelector((state: RootState) => state.nav.currentPage);
  return (
    <>
    <MainLayout>
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "transactions" && <Transactions />}
      {currentPage === "settings" && <div>Settings</div>}
      {currentPage === "about" && <About />}
    </MainLayout>
    <Toaster/>
    </>
  );
}

export default App;
