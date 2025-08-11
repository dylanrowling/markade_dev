/**
 * services/stockClient.ts
 * Purpose: Adapter seam for fetching stock quotes from any provider
 * Updated: 2025-08-11 — Initial scaffold with mock implementation
 * Updates:
 *  - 2025-08-11 — Initial scaffold with mock implementation
 *  - 2025-08-11 19:00 ET — Provider factory (mock | finnhub) + 20s TTL cache
 *  - 2025-08-11 23:10 ET — TTL cache duration now configurable via VITE_QUOTES_TTL_MS
 */

import type { Ticker, StockQuote } from "../types";

export interface StockClient {
  getQuote(ticker: Ticker): Promise<StockQuote>;
  getQuotes(tickers: Ticker[]): Promise<StockQuote[]>;
}

/** Mock implementation for local UI work */
class MockStockClient implements StockClient {
  async getQuote(ticker: Ticker): Promise<StockQuote> {
    const price = 100 + Math.random() * 50;
    const changePct = (Math.random() - 0.5) * 5;
    return { ticker, price, changePct, ts: Date.now() };
  }
  async getQuotes(tickers: Ticker[]): Promise<StockQuote[]> {
    return Promise.all(tickers.map((t) => this.getQuote(t)));
  }
}

/* ---------- Provider factory (lazy) ---------- */
const PROVIDER = (import.meta.env.VITE_STOCKS_PROVIDER || "mock").toLowerCase();

let _client: StockClient | null = null;
async function ensureClient(): Promise<StockClient> {
  if (_client) return _client;

  if (PROVIDER === "finnhub") {
    const { FinnhubClient } = await import("./finhubClient");
    _client = new FinnhubClient();
  } else {
    _client = new MockStockClient();
  }
  return _client;
}

/* ---------- 20s TTL cache ---------- */
const TTL_MS = Number(import.meta.env.VITE_QUOTES_TTL_MS ?? 20_000);
const cache = new Map<string, { ts: number; data: StockQuote }>();

async function cachedGetQuote(ticker: Ticker): Promise<StockQuote> {
  const key = `q:${ticker}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL_MS) return hit.data;

  const client = await ensureClient();
  const data = await client.getQuote(ticker);
  cache.set(key, { ts: Date.now(), data });
  return data;
}

/* ---------- Facade exported to callers ---------- */
export const stockClient: StockClient = {
  async getQuote(ticker: Ticker) {
    return cachedGetQuote(ticker);
  },
  async getQuotes(tickers: Ticker[]) {
    return Promise.all(tickers.map((t) => cachedGetQuote(t)));
  },
};