/**
 * finhubClient.ts
 * Purpose: Real StockClient backed by Finnhub REST API
 * Updated: 2025-08-11
 * Updates:
 *  - 2025-08-11 18:55 ET: Add request timeout, retry with backoff, and safer dp fallback
 *
 * SECURITY NOTE: For production, prefer a tiny server proxy so the API key
 * is not exposed to clients and you can add server-side caching/rate limits.
 */

import type { Ticker, StockQuote } from "../types";
import type { StockClient } from "./stockClient";

const BASE = import.meta.env.VITE_FINNHUB_API_BASE || "https://finnhub.io/api/v1";
const KEY = import.meta.env.VITE_FINNHUB_API_KEY;

// Network hardening
const TIMEOUT_MS = 6000; // abort slow requests (dev friendly)
const RETRIES = 2;       // total attempts = 1 + RETRIES

function sleep(ms: number) { return new Promise(res => setTimeout(res, ms)); }

function normalizeSymbol(symbol: string): string {
  return (symbol || "").trim().toUpperCase();
}

function computeDp(j: { c?: number; dp?: number; pc?: number }): number {
  if (typeof j.dp === "number") return j.dp;
  if (typeof j.c === "number" && typeof j.pc === "number" && j.pc) {
    return ((j.c - j.pc) / j.pc) * 100;
  }
  return 0;
}

async function fetchWithTimeout(url: string, opts?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function getQuoteOnce(symbol: string): Promise<StockQuote> {
  if (!KEY) throw new Error("Finnhub API key missing. Set VITE_FINNHUB_API_KEY.");
  const url = `${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(KEY)}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) {
    // Finnhub often returns 429 for rate limits
    throw new Error(`Finnhub error ${res.status}`);
  }
  const j = (await res.json()) as { c?: number; dp?: number; pc?: number };
  return {
    ticker: symbol as Ticker,
    price: j.c ?? 0,
    changePct: computeDp(j),
    ts: Date.now(),
  };
}

async function getQuoteWithRetry(symbol: string): Promise<StockQuote> {
  let attempt = 0;
  // simple backoff: 300ms, 600ms
  while (true) {
    try {
      return await getQuoteOnce(symbol);
    } catch (err: any) {
      if (attempt >= RETRIES) throw err;
      const backoffMs = 300 * Math.pow(2, attempt);
      await sleep(backoffMs);
      attempt += 1;
    }
  }
}

export class FinnhubClient implements StockClient {
  async getQuote(ticker: Ticker): Promise<StockQuote> {
    const symbol = normalizeSymbol(ticker);
    return getQuoteWithRetry(symbol);
  }
  async getQuotes(tickers: Ticker[]): Promise<StockQuote[]> {
    const symbols = tickers.map(normalizeSymbol).filter(Boolean);
    return Promise.all(symbols.map(getQuoteWithRetry));
  }
}