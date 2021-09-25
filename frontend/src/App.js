import './App.css';
import { useState, useEffect } from 'react';
import LoginView from "./LoginView/login";
import Dashboard from "./BudgetView/dashboard";
import axiosRequests from './axiosShortcuts';

function App() {
  const [ currentApp, setCurrentApp ] = useState("login") 
  // use react router in future

  useEffect(() => {
    if (axiosRequests.checkForToken())
      setCurrentApp("budget");
      
  }, []);

  return (
    <div>
      { currentApp === "login" && <LoginView  changeApp={setCurrentApp}/> }
      { currentApp === "budget" && <Dashboard  changeApp={setCurrentApp}/> }
    </div>
  );
}

export default App;
