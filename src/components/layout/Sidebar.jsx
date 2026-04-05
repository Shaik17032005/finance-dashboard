import React, { useContext } from 'react';
import { LayoutDashboard, ArrowRightLeft, Lightbulb, User, Moon, Sun, Shield, LogOut } from 'lucide-react';
import { FinanceContext } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { role, setRole } = useContext(FinanceContext);
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <ArrowRightLeft size={20} /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb size={20} /> },
  ];

  return (
    <aside className="sidebar" aria-label="Main Navigation">
      <div className="sidebar-logo">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)', color: 'white', padding: '0.25rem', borderRadius: '0.5rem', display: 'flex', boxShadow: '0 0 15px rgba(79, 70, 229, 0.4)' }}>
            <ArrowRightLeft size={24} />
          </div>
          <span className="text-gradient" style={{ fontWeight: 800 }}>FinDash</span>
        </h2>
      </div>

      <nav style={{ flex: 1, marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </div>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={16} /> Role
          </label>
          <select 
            className="input-field" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>


        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <User size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{user?.name || 'User'}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, textTransform: 'capitalize' }}>{role}</p>
          </div>
          <button 
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
