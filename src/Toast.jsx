import { useEffect } from 'react'

function Toast({ id, tone, message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(id), 3000);
    return () => clearTimeout(t);
  }, [id, onDismiss]);

  return (
    <div className={`toast ${tone === 'neg' ? 'neg' : ''}`} role="status">
      <span className="toast-tag">{tone === 'neg' ? '− removed' : '+ added'}</span>
      <span className="toast-msg">{message}</span>
      <button
        type="button"
        className="toast-dismiss"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

function Toaster({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <Toast key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export default Toaster;
