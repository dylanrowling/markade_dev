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

// ---------- Deterministic helpers for mock pricing ----------
// Non-crypto 32-bit FNV-1a hash for stable pseudo-random values per string
function hash(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Stable base price derived from ticker symbol (e.g., $50–$350 with cents)
function basePrice(ticker: string): number {
  const h = hash(ticker);
  const dollars = 50 + (h % 301); // 50..350
  const cents = (h % 100) / 100;  // .00..99
  return Number((dollars + cents).toFixed(2));
}

// Minute-bucket drift percentage in a realistic band (~±2.00%)
function minuteDrift(ticker: string): number {
  const minuteBucket = Math.floor(Date.now() / 60000); // changes once per minute
  const h = hash(`${ticker}:${minuteBucket}`);
  const pct = ((h % 401) - 200) / 100; // -2.00 .. +2.00
  return Number(pct.toFixed(2));
}

export interface StockClient {
  getQuote(ticker: Ticker): Promise<StockQuote>;
  getQuotes(tickers: Ticker[]): Promise<StockQuote[]>;
}

/** Mock implementation for local UI work (deterministic) */
class MockStockClient implements StockClient {
  async getQuote(ticker: Ticker): Promise<StockQuote> {
    const t = String(ticker).toUpperCase();
    const base = basePrice(t);
    const dp = minuteDrift(t); // change percent
    const price = Number((base * (1 + dp / 100)).toFixed(2));
    return { ticker: t as Ticker, price, changePct: dp, ts: Date.now() };
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