import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const CAT_COLORS = {
  food: '#ff7a5c',
  housing: '#5cc2ff',
  utilities: '#ffb547',
  transport: '#b48aff',
  entertainment: '#ff6aa6',
  salary: '#c5f04a',
  other: '#7a8a82',
};

function formatAmount(value) {
  return Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
}

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [confirmId, setConfirmId] = useState(null);

  let filtered = transactions;
  if (filterType !== "all") filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  const handleConfirmDelete = () => {
    onDelete(confirmId);
    setConfirmId(null);
  };

  return (
    <>
      {confirmId !== null && (
        <div className="modal-overlay" onClick={() => setConfirmId(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="modal-tag">⚠ destructive action</span>
            <p>Delete this transaction?</p>
            <p className="modal-sub">// this cannot be undone</p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setConfirmId(null)}>Cancel</button>
              <button className="modal-confirm" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td className="col-date">{formatDate(t.date)}</td>
              <td className="col-description">{t.description}</td>
              <td className="col-category">
                <span className="cat-chip" style={{ '--cat-color': CAT_COLORS[t.category] || CAT_COLORS.other }}>
                  {t.category}
                </span>
              </td>
              <td className={`col-amount ${t.type === "income" ? "amount-pos" : "amount-neg"}`}>
                <span className="sign">{t.type === "income" ? "+" : "−"}</span>${formatAmount(t.amount)}
              </td>
              <td>
                <button className="delete-btn" onClick={() => setConfirmId(t.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TransactionList;
