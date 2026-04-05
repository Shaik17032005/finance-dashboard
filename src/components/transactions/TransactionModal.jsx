import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { categories } from '../../data/mockData';

const TransactionModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    amount: initialData ? initialData.amount : '',
    date: initialData ? initialData.date : new Date().toISOString().split('T')[0],
    category: initialData ? initialData.category : categories[0],
    type: initialData ? initialData.type : 'expense',
    description: initialData ? initialData.description : ''
  });

  const [isMounting, setIsMounting] = useState(true);

  // Simple animation entry
  useEffect(() => {
    setIsMounting(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.date || !formData.description) return;
    
    onSave({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ opacity: isMounting ? 0 : 1 }}>
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ margin: 0 }}>{initialData ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }} type="button">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="input-field">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Amount ($)</label>
              <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                className="input-field"
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="input-field"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="input-group mb-6">
            <label className="input-label">Description</label>
            <input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="input-field"
              placeholder="What was this for?"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
