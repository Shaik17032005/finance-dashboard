import React, { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { format, parseISO, isSameMonth } from 'date-fns';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'];

const Overview = () => {
  const { transactions } = useContext(FinanceContext);

  const { totalBalance, totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.totalIncome += curr.amount;
          acc.totalBalance += curr.amount;
        } else {
          acc.totalExpense += curr.amount;
          acc.totalBalance -= curr.amount;
        }
        return acc;
      },
      { totalBalance: 0, totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);

  // Sort and accumulate daily balance for the chart
  const balanceData = useMemo(() => {
    if (transactions.length === 0) return [];
    
    // Sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let currentBalance = 0;
    const dailyBalanceMap = new Map();
    
    sorted.forEach(t => {
      if (t.type === 'income') currentBalance += t.amount;
      else currentBalance -= t.amount;
      
      dailyBalanceMap.set(t.date, currentBalance);
    });

    return Array.from(dailyBalanceMap.entries()).map(([date, balance]) => ({
      date: format(parseISO(date), 'MMM dd'),
      balance
    }));
  }, [transactions]);

  // Aggregate spending by category
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <section className="flex-col gap-6" aria-label="Dashboard Overview">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gradient" style={{ margin: 0, fontWeight: 800, fontSize: '2rem' }}>Dashboard Overview</h1>
          <p>Welcome back! Here's a summary of your finances.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md-grid-cols-1 lg-grid-cols-2" style={{ gap: '1.5rem', marginBottom: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <article className="card flex items-center justify-between">
          <div>
            <p className="input-label mb-2">Total Balance</p>
            <h2 className="animate-pulse-slow text-gradient" style={{ fontSize: '2.5rem', margin: 0, fontWeight: 800 }}>${totalBalance.toFixed(2)}</h2>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: 'var(--accent-primary)' }}>
            <Wallet size={32} />
          </div>
        </article>
        
        <article className="card flex items-center justify-between">
          <div>
            <p className="input-label mb-2">Total Income</p>
            <h2 className="text-gradient-success" style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>+${totalIncome.toFixed(2)}</h2>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--accent-success)' }}>
            <TrendingUp size={32} />
          </div>
        </article>

        <article className="card flex items-center justify-between">
          <div>
            <p className="input-label mb-2">Total Expenses</p>
            <h2 style={{ fontSize: '1.875rem', margin: 0, color: 'var(--accent-danger)' }}>-${totalExpense.toFixed(2)}</h2>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%', color: 'var(--accent-danger)' }}>
            <TrendingDown size={32} />
          </div>
        </article>
      </div>

      <div className="grid grid-cols-1 lg-grid-cols-2" style={{ gap: '1.5rem' }}>
        <article className="card flex-col" style={{ height: '400px' }}>
          <h3 className="mb-4">Balance Trend</h3>
          {balanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <AreaChart data={balanceData} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="balance" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center w-full h-full" style={{ color: 'var(--text-muted)' }}>No data to display</div>
          )}
        </article>

        <article className="card flex-col" style={{ height: '400px' }}>
          <h3 className="mb-4">Spending Breakdown</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <PieChart margin={{ top: 10, right: 20, left: 20, bottom: 40 }}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="flex items-center justify-center w-full h-full" style={{ color: 'var(--text-muted)' }}>No expense data to display</div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Overview;
