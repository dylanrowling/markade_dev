/**
 * src/data/universe.ts
 *
 * This module loads and processes the S&P 500 universe data.
 * It imports a sample JSON dataset, deduplicates entries by ticker symbol (case-insensitive),
 * and exports both the deduplicated list and an array of tickers.
 *
 * Future enhancements may replace the static JSON import with dynamic data sources
 * such as APIs or databases.
 *
 * Update Log:
 * 2024-06-xx - Initial implementation of universe loader with deduplication and exports.
 */

import sp500Sample from './sp500.sample.json';

export type UniverseEntry = {
  ticker: string;
  name: string;
  industry: string;
};

// Deduplicate entries by ticker (case-insensitive), keeping the first occurrence.
// This ensures the universe list has unique tickers and prevents duplicates from the sample data.
const tickerSet = new Set<string>();
const SP500: UniverseEntry[] = [];

for (const entry of sp500Sample as UniverseEntry[]) {
  const tickerLower = entry.ticker.toLowerCase();
  if (!tickerSet.has(tickerLower)) {
    tickerSet.add(tickerLower);
    SP500.push(entry);
  }
}

// Export an array of tickers only for convenience.
export const SP500_TICKERS = SP500.map(entry => entry.ticker);

// Note: This module currently loads data from a static JSON file.
// In the future, this loader can be extended to fetch data from APIs or databases,
// providing more up-to-date and dynamic universe information.
