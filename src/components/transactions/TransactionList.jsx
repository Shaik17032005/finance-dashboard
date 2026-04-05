import React, { useContext, useState, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Plus, Search, Trash2, ArrowUpDown, Edit2 } from 'lucide-react';
import TransactionModal from './TransactionModal';
import { format, parseISO } from 'date-fns';

const TransactionList = () => {
  const { transactions, role, addTransaction, editTransaction, deleteTransaction } = useContext(FinanceContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Filter and Sort Logic
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [transactions, searchTerm, filterType, sortOrder]);

  const handleSaveTransaction = (data) => {
    if (editingTransaction) {
      editTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const exportCSV = () => {
    if (filteredTransactions.length === 0) return;
    const headers = ['Date,Description,Category,Type,Amount'];
    const rows = filteredTransactions.map(t => 
      `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
    );
    const csvContent = headers.concat(rows).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  const exportJSON = () => {
    if (filteredTransactions.length === 0) return;
    const jsonContent = JSON.stringify(filteredTransactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.json';
    link.click();
  };

  return (
    <section className="flex-col gap-6" style={{ height: '100%', display: 'flex', flexDirection: 'column' }} aria-label="Transactions">
      <header className="flex justify-between items-center mb-6" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="text-2xl" id="transactions-heading" style={{ margin: 0 }}>Transactions</h1>
          <p>View and manage your financial activity.</p>
        </div>
        <div className="flex gap-2">
          {filteredTransactions.length > 0 && (
            <>
              <button className="btn btn-outline" onClick={exportCSV}>Export CSV</button>
              <button className="btn btn-outline" onClick={exportJSON}>Export JSON</button>
            </>
          )}
          {role === 'admin' && (
            <button className="btn btn-primary" onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }} aria-label="Add new transaction">
              <Plus size={16} aria-hidden="true" /> Add Transaction
            </button>
          )}
        </div>
      </header>

      <div className="card flex-col" style={{ flex: 1, padding: '1.5rem 0' }}>
        <div className="flex gap-4 mb-6" style={{ padding: '0 1.5rem', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, marginBottom: 0, minWidth: '200px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="input-field" 
                style={{ paddingLeft: '2.5rem', width: '100%' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select 
            className="input-field" 
            style={{ width: 'auto', minWidth: '150px' }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button 
            className="btn btn-outline" 
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
          >
            <ArrowUpDown size={16} /> Sort Date {sortOrder === 'desc' ? '▼' : '▲'}
          </button>
        </div>

        <div style={{ overflowX: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>Description</th>
                <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500, textAlign: 'right' }}>Amount</th>
                {role === 'admin' && <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500, textAlign: 'center', width: '60px' }}></th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }} className="hover-row">
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{format(parseISO(t.date), 'MMM dd, yyyy')}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{t.description}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{t.category}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span className={`status-pill ${t.type === 'income' ? 'status-income' : 'status-expense'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right', fontWeight: 600, color: t.type === 'income' ? 'var(--accent-success)' : 'var(--text-primary)' }}>
                      {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
                    </td>
                    {role === 'admin' && (
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <button onClick={() => { setEditingTransaction(t); setIsModalOpen(true); }} style={{ color: 'var(--accent-primary)', padding: '0.25rem', borderRadius: '0.25rem', marginRight: '0.5rem' }} className="btn-outline" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteTransaction(t.id)} style={{ color: 'var(--accent-danger)', padding: '0.25rem', borderRadius: '0.25rem' }} className="btn-outline" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'admin' ? 6 : 5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <TransactionModal 
          onClose={() => { setIsModalOpen(false); setEditingTransaction(null); }} 
          onSave={handleSaveTransaction} 
          initialData={editingTransaction}
        />
      )}

      {/* Inject basic hover styles for rows since we're using vanilla CSS */}
      <style>{`
        .hover-row:hover { background-color: var(--bg-card-hover); }
      `}</style>
    </section>
  );
};

export default TransactionList;
