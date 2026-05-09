import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CAT_COLORS } from './constants';

function SpendingChart({ transactions }) {
  const totals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const data = Object.entries(totals)
    .map(([category, value]) => ({ name: category, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="chart-card">
      {data.length === 0 ? (
        <p className="chart-empty">// no expenses recorded</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 16, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickFormatter={(v) => `$${v}`}
              width={50}
            />
            <Tooltip
              cursor={{ fill: 'rgba(197, 240, 74, 0.06)' }}
              formatter={(value) => [`$${Number(value).toFixed(2)}`, '']}
            />
            <Bar dataKey="value" maxBarSize={56} radius={[2, 2, 0, 0]}>
              {data.map(entry => (
                <Cell key={entry.name} fill={CAT_COLORS[entry.name] || CAT_COLORS.other} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart;
