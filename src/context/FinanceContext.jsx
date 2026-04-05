import React, { createContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // Try to load from localStorage first
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing transactions', e);
      }
    }
    return initialTransactions;
  });

  const [role, setRole] = useState('admin'); // 'viewer' | 'admin'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('finance_theme');
    return saved === 'dark' ? true : false;
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addTransaction = (transaction) => {
    if (role !== 'admin') return;
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: uuidv4() }
    ]);
  };

  const editTransaction = (id, updatedData) => {
    if (role !== 'admin') return;
    setTransactions((prev) => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTransaction = (id) => {
    if (role !== 'admin') return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        role,
        setRole,
        isDarkMode,
        setIsDarkMode
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
