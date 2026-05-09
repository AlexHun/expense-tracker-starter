function splitAmount(value) {
  const fixed = Math.abs(value).toFixed(2);
  const [whole, dec] = fixed.split('.');
  const withCommas = Number(whole).toLocaleString('en-US');
  return { whole: withCommas, dec };
}

function HeroAmount({ value, tone = "neutral" }) {
  const { whole, dec } = splitAmount(value);
  const cls = tone === "pos" ? "hero-amount pos" : tone === "neg" ? "hero-amount neg" : "hero-amount";
  return (
    <div className={cls}>
      <span className="currency">$</span>{whole}<span className="decimals">.{dec}</span>
    </div>
  );
}

function Summary({ transactions }) {
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - 30);

  let totalIncome = 0;
  let totalExpenses = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  for (const t of transactions) {
    if (new Date(t.date) < cutoff) continue;
    const amount = parseFloat(t.amount);
    if (t.type === "income") {
      totalIncome += amount;
      incomeCount += 1;
    } else if (t.type === "expense") {
      totalExpenses += amount;
      expenseCount += 1;
    }
  }

  const balance = totalIncome - totalExpenses;
  const ratio = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : "0.0";
  const balanceTone = balance < 0 ? "neg" : "pos";

  return (
    <section className="hero">
      <div className="hero-cell primary">
        <div className="hero-label">Net Balance · 30D</div>
        <HeroAmount value={balance} tone={balanceTone} />
        <div className="hero-meta">
          <span className={`hero-pill ${balance < 0 ? 'neg' : ''}`}>
            {balance < 0 ? '▼' : '▲'} {ratio}%
          </span>
          <span>of income retained</span>
        </div>
      </div>
      <div className="hero-cell">
        <div className="hero-label">Income · 30D</div>
        <HeroAmount value={totalIncome} tone="pos" />
        <div className="hero-meta">{incomeCount} entries</div>
      </div>
      <div className="hero-cell">
        <div className="hero-label">Expenses · 30D</div>
        <HeroAmount value={totalExpenses} tone="neg" />
        <div className="hero-meta">{expenseCount} entries</div>
      </div>
    </section>
  );
}

export default Summary;
