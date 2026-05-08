import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import SpendingChart from './SpendingChart'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const handleAdd = (t) => setTransactions([...transactions, t]);
  const handleDelete = (id) => setTransactions(transactions.filter(t => t.id !== id));

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

      <footer className="footer">
        <span>// build {new Date().getFullYear()}.01</span>
        <span className="footer-version">v 0.1.0 — local-only</span>
        <span>encrypted · in-memory</span>
      </footer>
    </div>
  );
}

export default App
