import React, { useState, useContext } from 'react';
import Sidebar from './components/layout/Sidebar';
import Overview from './components/dashboard/Overview';
import TransactionList from './components/transactions/TransactionList';
import InsightsPanel from './components/insights/InsightsPanel';
import { useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import { FinanceContext } from './context/FinanceContext';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();
  const { isDarkMode, setIsDarkMode } = useContext(FinanceContext);

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '100%' }}>
          <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            <button 
              className="btn btn-outline" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </header>
          {activeTab === 'dashboard' && <Overview />}
          {activeTab === 'transactions' && <TransactionList />}
          {activeTab === 'insights' && <InsightsPanel />}
        </div>
      </main>
    </div>
  );
}

export default App;
