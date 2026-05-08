import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  food: '#ff6b6b',
  housing: '#4ecdc4',
  utilities: '#ffa94d',
  transport: '#845ef7',
  entertainment: '#ff8cc6',
  salary: '#51cf66',
  other: '#868e96',
};

function SpendingChart({ transactions }) {
  const totals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const data = Object.entries(totals).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="chart-card">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="value">
              {data.map(entry => (
                <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.other} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart;
