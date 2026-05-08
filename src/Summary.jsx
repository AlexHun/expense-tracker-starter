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
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const ratio = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : "0.0";
  const balanceTone = balance < 0 ? "neg" : "pos";

  return (
    <section className="hero">
      <div className="hero-cell primary">
        <div className="hero-label">Net Balance</div>
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
        <div className="hero-meta">{transactions.filter(t => t.type === "income").length} entries</div>
      </div>
      <div className="hero-cell">
        <div className="hero-label">Expenses · 30D</div>
        <HeroAmount value={totalExpenses} tone="neg" />
        <div className="hero-meta">{transactions.filter(t => t.type === "expense").length} entries</div>
      </div>
    </section>
  );
}

export default Summary;
