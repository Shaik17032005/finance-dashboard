import React, { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Lightbulb, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { subMonths, isSameMonth, parseISO } from 'date-fns';

const InsightsPanel = () => {
  const { transactions } = useContext(FinanceContext);

  const insights = useMemo(() => {
    if (transactions.length === 0) return { category: null };

    const now = new Date();
    const lastMonthDate = subMonths(now, 1);
    
    // Group by category for all time (expense only)
    const categoryTotals = {};
    let currentMonthSpend = 0;
    let lastMonthSpend = 0;
    let currentMonthIncome = 0;

    transactions.forEach(t => {
      const tDate = parseISO(t.date);
      if (t.type === 'expense') {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        
        if (isSameMonth(tDate, now)) currentMonthSpend += t.amount;
        if (isSameMonth(tDate, lastMonthDate)) lastMonthSpend += t.amount;
      } else {
        if (isSameMonth(tDate, now)) currentMonthIncome += t.amount;
      }
    });

    let highestCategory = null;
    let maxSpend = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > maxSpend) {
        maxSpend = amt;
        highestCategory = cat;
      }
    }

    const spendDiff = currentMonthSpend - lastMonthSpend;
    const spendDiffPercent = lastMonthSpend === 0 ? 100 : (spendDiff / lastMonthSpend) * 100;
    
    const savingsRate = currentMonthIncome > 0 
      ? ((currentMonthIncome - currentMonthSpend) / currentMonthIncome) * 100 
      : 0;

    return {
      highestCategory,
      highestCategoryAmount: maxSpend,
      currentMonthSpend,
      spendDiff,
      spendDiffPercent,
      savingsRate,
      currentMonthIncome
    };
  }, [transactions]);

  return (
    <section className="flex-col gap-6 w-full" aria-label="Smart Insights">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl" style={{ margin: 0 }}>Smart Insights</h1>
          <p>AI-driven analysis of your spending patterns.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md-grid-cols-1 lg-grid-cols-2" style={{ gap: '1.5rem' }}>
        
        {/* Insight 1: Highest Spending Category */}
        <article className="card flex items-start gap-4">
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem', color: '#f59e0b' }}>
            <AlertTriangle size={24} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Top Expense Category</h3>
            {insights.highestCategory ? (
              <>
                <p style={{ marginBottom: '0.5rem' }}>Your highest spending is on <strong style={{ color: 'var(--text-primary)' }}>{insights.highestCategory}</strong>.</p>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-danger)' }}>
                  ${insights.highestCategoryAmount.toFixed(2)}
                </div>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Consider setting a budget limit for this category to improve savings.</p>
              </>
            ) : (
              <p>Not enough data to analyze categories.</p>
            )}
          </div>
        </article>

        {/* Insight 2: Month over Month */}
        <article className="card flex items-start gap-4">
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.5rem', color: 'var(--accent-primary)' }}>
            <TrendingUp size={24} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Monthly Comparison</h3>
            <p style={{ marginBottom: '0.5rem' }}>Your spending this month compared to last month.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>${insights.currentMonthSpend.toFixed(2)}</span>
              {insights.spendDiff !== undefined && (
                <span style={{ 
                  display: 'flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 500,
                  color: insights.spendDiff > 0 ? 'var(--accent-danger)' : 'var(--accent-success)',
                  backgroundColor: insights.spendDiff > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  padding: '0.125rem 0.5rem', borderRadius: '1rem'
                }}>
                  {insights.spendDiff > 0 ? <TrendingUp size={14} style={{ marginRight: '0.25rem' }}/> : <TrendingDown size={14} style={{ marginRight: '0.25rem' }}/>}
                  {Math.abs(insights.spendDiffPercent).toFixed(1)}%
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {insights.spendDiff > 0 
                ? "You've spent more than last month. Keep an eye on your expenses." 
                : "Great job! You've spent less than last month."}
            </p>
          </div>
        </article>

        {/* Insight 3: Savings Rate */}
        <article className="card flex items-start gap-4">
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', color: 'var(--accent-success)' }}>
            <Lightbulb size={24} aria-hidden="true" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Savings Rate</h3>
            <p style={{ marginBottom: '0.5rem' }}>Percentage of this month's income not spent.</p>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {insights.savingsRate !== undefined ? insights.savingsRate.toFixed(1) : 0}%
            </div>
            <div style={{ width: '100%', backgroundColor: 'var(--bg-color-solid)', height: '8px', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${Math.max(0, Math.min(100, insights.savingsRate || 0))}%`, 
                backgroundColor: 'var(--accent-success)',
                transition: 'width 1s ease-out'
              }}></div>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
};

export default InsightsPanel;
