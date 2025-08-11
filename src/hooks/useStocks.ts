/**
 * hooks/useStocks.ts
 * Purpose: UI-friendly quotes hook, provider-agnostic (mock | finnhub)
 * Updates:
 *  - 2025-08-11 22:53Z: Initial implementation returning { data, loading, error }
 *  - 2025-08-11 23:05Z: Add optional auto-refresh via options.refreshIntervalMs; pause when tab hidden
 *
 * TODO: When moving from dev/mock to live:
 *   - This hook will work live once VITE_STOCKS_PROVIDER is set to 'finnhub' and a valid API key is provided.
 *   - For production deployments, consider using a backend proxy to hide the API key and add caching to reduce API usage.
 */
import { useEffect, useMemo, useState } from "react";
import type { Ticker, StockQuote } from "../types";
import { stockClient } from "../services/stockClient";

// Optional behavior controls for the hook
export type UseQuotesOptions = { refreshIntervalMs?: number };

export function useQuotes(tickers: Ticker[], options: UseQuotesOptions = {}) {
  const key = useMemo(() => (tickers ?? []).filter(Boolean).sort().join(","), [tickers]);
  const [data, setData] = useState<StockQuote[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    if (!key) { setData([]); return; }
    setLoading(true);

    const fetchNow = () =>
      stockClient.getQuotes(key.split(",") as Ticker[])
        .then(q => { if (alive) setData(q); })
        .catch(e => { if (alive) setError(e?.message ?? "Failed to fetch quotes"); });

    fetchNow().finally(() => { if (alive) setLoading(false); });

    // Optional auto-refresh, paused when the tab is hidden
    let intervalId: number | undefined;
    const tick = () => { if (!document.hidden) fetchNow(); };

    if (options.refreshIntervalMs && options.refreshIntervalMs > 0) {
      intervalId = window.setInterval(tick, options.refreshIntervalMs);
      document.addEventListener("visibilitychange", tick);
    }

    return () => {
      alive = false;
      if (intervalId) window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [key, options.refreshIntervalMs]);

  return { data, loading, error };
}

export default useQuotes;