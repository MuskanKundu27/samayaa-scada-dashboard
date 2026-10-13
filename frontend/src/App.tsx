import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";

function Overview() {

  return (
    <div className="page">
      <h1>Overview</h1>
      <p>Monitor your industrial water cooling system.</p>
    </div>
  );
}

function WaterBalance() {
  return <div className="page"><h1>Water Balance</h1></div>;
}

function CoolingPerformance() {
  return <div className="page"><h1>Cooling Performance</h1></div>;
}

function CocBlowdown() {
  return <div className="page"><h1>COC & Blowdown</h1></div>;
}

function FilterIntelligence() {
  return <div className="page"><h1>Filter Intelligence</h1></div>;
}

function Chemicals() {
  return <div className="page"><h1>Chemicals</h1></div>;
}

function PredictiveMaintenance() {
  return <div className="page"><h1>Predictive Maintenance</h1></div>;
}

function Reports() {
  return <div className="page"><h1>Reports</h1></div>;
}

function Settings() {
  return <div className="page"><h1>Settings</h1></div>;
}

function App() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark((currentTheme) => !currentTheme);
  }

  return (
    <BrowserRouter>
      <div className={`app-layout ${isDark ? "dark-theme" : "light-theme"}`}>
        <Sidebar
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/water-balance" element={<WaterBalance />} />
            <Route path="/cooling-performance" element={<CoolingPerformance />} />
            <Route path="/coc-blowdown" element={<CocBlowdown />} />
            <Route path="/filter-intelligence" element={<FilterIntelligence />} />
            <Route path="/chemicals" element={<Chemicals />} />
            <Route path="/predictive-maintenance" element={<PredictiveMaintenance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
