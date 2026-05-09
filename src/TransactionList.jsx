import { useEffect, useRef, useState } from 'react'
import { categories, CAT_COLORS } from './constants'

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
  const cancelRef = useRef(null);

  let filtered = transactions;
  if (filterType !== "all") filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  const confirmTarget = confirmId !== null
    ? transactions.find(t => t.id === confirmId)
    : null;

  const handleConfirmDelete = () => {
    onDelete(confirmId);
    setConfirmId(null);
  };

  useEffect(() => {
    if (confirmId === null) return;
    cancelRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setConfirmId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmId]);

  return (
    <>
      {confirmTarget && (
        <div className="modal-overlay" onClick={() => setConfirmId(null)} role="presentation">
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-desc"
          >
            <span className="modal-tag" id="delete-modal-title">⚠ destructive action</span>
            <p id="delete-modal-desc">Delete "{confirmTarget.description}"?</p>
            <p className="modal-sub">// this cannot be undone</p>
            <div className="modal-actions">
              <button
                ref={cancelRef}
                className="modal-cancel"
                onClick={() => setConfirmId(null)}
              >
                Cancel
              </button>
              <button className="modal-confirm" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="filters">
        <span className="select-wrapper">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </span>
        <span className="select-wrapper">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </span>
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
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => setConfirmId(t.id)}
                  aria-label={`Delete ${t.description}`}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TransactionList;
