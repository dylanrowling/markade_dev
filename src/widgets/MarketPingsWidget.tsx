export type QuoteRow = {
  ticker: string;
  price: number;
  changePct: number;
  ts: number;
};

export default function MarketPingsWidget({
  rows,
  loading,
  error,
}: {
  rows: QuoteRow[];
  loading?: boolean;
  error?: string | null;
}) {
  if (loading) {
    return <p aria-live="polite" className="font-market mk-text-market-sub">Loading quotes…</p>;
  }
  if (error) {
    return <p aria-live="polite" className="text-lossRed">{error}</p>;
  }

  return (
    <div>
      <table className="w-full border-collapse">
        <caption className="sr-only">Live quotes</caption>
        <thead>
          <tr className="text-left border-b border-divider">
            <th scope="col" className="py-2 px-2">Ticker</th>
            <th scope="col" className="py-2 px-2">Price</th>
            <th scope="col" className="py-2 px-2">Change %</th>
            <th scope="col" className="py-2 px-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((q) => (
            <tr key={q.ticker} className="border-b border-divider/50">
              <td className="py-2 px-2">{q.ticker}</td>
              <td className="py-2 px-2">{q.price.toFixed(2)}</td>
              <td className={`py-2 px-2 ${q.changePct >= 0 ? "text-profitGreen" : "text-lossRed"}`}>
                {q.changePct.toFixed(2)}
              </td>
              <td className="py-2 px-2">
                {new Date(q.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs mk-text-market-sub font-market mt-2">
        Data source controlled by <code>VITE_STOCKS_PROVIDER</code>.
      </p>
    </div>
  );
}