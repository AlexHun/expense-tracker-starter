import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="describe the transaction…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Commit</button>
    </form>
  );
}

export default TransactionForm;
