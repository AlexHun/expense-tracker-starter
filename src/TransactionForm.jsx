import { useState } from 'react'
import { categories } from './constants'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!description.trim()) next.description = true;
    if (!amount || parseFloat(amount) <= 0) next.amount = true;
    if (next.description || next.amount) {
      setErrors(next);
      return;
    }
    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
    setErrors({});
  };

  const amountInvalid = amount && parseFloat(amount) <= 0;
  const amountMsg = amountInvalid ? "amount must be greater than 0" : "amount is required";
  const errorMessage = errors.description && errors.amount
    ? `description is required and ${amountMsg}`
    : errors.description
      ? "description is required"
      : errors.amount
        ? amountMsg
        : null;

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="describe the transaction…"
          value={description}
          onChange={(e) => { setDescription(e.target.value); clearError('description'); }}
          className={errors.description ? "error" : ""}
          aria-invalid={errors.description ? "true" : "false"}
        />
        <input
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); clearError('amount'); }}
          className={errors.amount ? "error" : ""}
          aria-invalid={errors.amount ? "true" : "false"}
        />
        <span className="select-wrapper">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </span>
        <span className="select-wrapper">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </span>
        <button type="submit">Commit</button>
      </form>
      {errorMessage && (
        <p className="form-error" role="alert">// {errorMessage}</p>
      )}
    </>
  );
}

export default TransactionForm;
