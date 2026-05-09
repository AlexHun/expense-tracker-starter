import { useCallback, useState } from 'react'
import './App.css'
import Summary from './Summary'
import SpendingChart from './SpendingChart'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import Toaster from './Toast'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2026-04-15" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2026-04-16" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2026-04-22" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2026-04-25" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2026-04-28" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2026-05-02" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2026-05-05" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2026-05-08" },
  ]);

  const [toasts, setToasts] = useState([]);

  const notify = useCallback((tone, message) => {
    setToasts(prev => [...prev, { id: Date.now() + Math.random(), tone, message }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleAdd = (t) => {
    setTransactions(prev => [...prev, t]);
    notify('pos', `Recorded "${t.description}"`);
  };

  const handleDelete = (id) => {
    const target = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    if (target) notify('neg', `Removed "${target.description}"`);
  };

  const lastEntry = transactions[transactions.length - 1];
  const lastEntryLabel = lastEntry ? lastEntry.date : '—';

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-brand">
          <span className="topbar-mark" aria-hidden />
          <span>LEDGER<span style={{ color: 'var(--fg-faint)' }}>::</span>TERMINAL</span>
        </div>
        <div className="topbar-status">
          <span><span className="live-dot" /> <span className="key">SYNC</span> <span className="val">LIVE</span></span>
          <span><span className="key">ENTRIES</span> <span className="val">{transactions.length.toString().padStart(3, '0')}</span></span>
          <span><span className="key">LAST</span> <span className="val">{lastEntryLabel}</span></span>
        </div>
      </header>

      <Summary transactions={transactions} />

      <section className="section delay-1">
        <div className="section-head">
          <span className="section-tag">02 / chart</span>
          <span className="section-title">Spending by category</span>
          <span className="section-rule" />
          <span className="section-meta">bar · usd</span>
        </div>
        <SpendingChart transactions={transactions} />
      </section>

      <section className="section delay-2 add-transaction">
        <div className="section-head">
          <span className="section-tag">03 / new</span>
          <span className="section-title">Record a transaction</span>
          <span className="section-rule" />
          <span className="section-meta">⏎ to commit</span>
        </div>
        <TransactionForm onAdd={handleAdd} />
      </section>

      <section className="section delay-3 transactions">
        <div className="section-head">
          <span className="section-tag">04 / log</span>
          <span className="section-title">Transactions</span>
          <span className="section-rule" />
          <span className="section-meta">{transactions.length} total</span>
        </div>
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </section>

      <Toaster toasts={toasts} onDismiss={dismissToast} />

      <footer className="footer">
        <span>// build {new Date().getFullYear()}.01</span>
        <span className="footer-version">v 0.1.0 — local-only</span>
        <span>encrypted · in-memory</span>
      </footer>
    </div>
  );
}

export default App
