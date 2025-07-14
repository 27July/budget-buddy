//import { useState } from 'react'
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainLayout from "./components/layout/mainlayout";
import { getPageTitle } from "./utils/pageTitle";

function App() {
  const currentPage = useSelector((state: RootState) => state.nav.currentPage);
  return (
    <MainLayout>
      <h2 className = "text-1xl font-semibold mb-4">{ getPageTitle(currentPage) }</h2>
    </MainLayout>
  );
}

export default App;
