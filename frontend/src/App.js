import './App.css';
import { useState } from 'react';
import LoginView from "./LoginView/login";
import Dashboard from "./BudgetView/dashboard";

function App() {
  const [ currentApp, setCurrentApp ] = useState("login") 
  // use react router in future
  return (
    <div>
      { currentApp === "login" && <LoginView  changeApp={setCurrentApp}/> }
      { currentApp === "budget" && <Dashboard  changeApp={setCurrentApp}/> }
    </div>
  );
}

export default App;
