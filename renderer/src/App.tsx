//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button";

// src/App.tsx
// src/App.tsx
function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-10 bg-[var(--soft-pink)]">
      <div className="text-2xl font-bold text-[var(--blue-gray)]">
        🎨 Testing Custom Colors
      </div>

      <div className="w-64 h-16 rounded-md bg-[var(--mauve)] flex items-center justify-center text-[var(--blue-gray)] font-medium shadow">
        Mauve Box
      </div>

      <div className="w-64 h-16 rounded-md bg-[var(--gray-light)] flex items-center justify-center text-black font-medium shadow">
        Gray Light Box
      </div>

      <div className="w-64 h-16 rounded-md bg-[var(--blue-gray)] text-white flex items-center justify-center font-medium shadow">
        Blue Gray Box
      </div>
    </div>
  );
}

export default App;
