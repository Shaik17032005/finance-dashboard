import React, { useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FinanceContext } from '../../context/FinanceContext';
import { Mail, Lock, User, ArrowRight, Wallet, Shield, Zap, TrendingUp, Moon, Sun } from 'lucide-react';

export default function AuthPage() {
  const { login, register } = useAuth();
  const { isDarkMode, setIsDarkMode } = useContext(FinanceContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        // Login success unmounts this component.
      } else {
        await register(name, email, password);
        setSuccessMsg('Account created successfully! Please log in.');
        setIsLogin(true);
        setPassword('');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', position: 'relative' }}>
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          width: '40px', height: '40px',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)'
        }}
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Left side: Premium Branding Info */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem',
          background: 'var(--bg-gradient)',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="auth-branding"
      >
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--accent-primary), #a855f7)', 
              padding: '0.75rem', 
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Wallet color="white" size={28} />
            </div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>FinTrack Pro</h1>
          </div>
          
          <h2 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 700 }}>
            Master your <span style={{ color: 'var(--accent-primary)' }}>finances</span> with precision.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Join thousands of users tracking their wealth, analyzing insights, and reaching financial goals faster than ever.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'var(--backdrop-blur)' }}>
              <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--accent-primary)' }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Advanced Analytics</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Visual insights into your spending</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'var(--backdrop-blur)' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--accent-success)' }}>
                <Shield size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Role-based Access</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Secure data with viewer/admin controls</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'var(--backdrop-blur)' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: '#f59e0b' }}>
                <Zap size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Lightning Fast</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Optimized performance and snappy UI</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
      </div>

      {/* Right side: Form */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'var(--bg-color-solid)'
      }}>
        <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isLogin ? 'Enter your details to access your dashboard.' : 'Start tracking your finances today.'}
            </p>
          </div>

          {error && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(225, 29, 72, 0.1)', borderLeft: '4px solid var(--accent-danger)', color: 'var(--accent-danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid var(--accent-success)', color: 'var(--accent-success)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    style={{ width: '100%', paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="input-label">Password</label>
                {isLogin && <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.75rem', fontWeight: 500 }}>Forgot password?</a>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }} 
              style={{ color: 'var(--accent-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @media (max-width: 850px) {
            .auth-branding { display: none !important; }
          }
        `}
      </style>
    </div>
  );
}
