

/**
 * semantics.ts
 * Purpose: Central mapping between Markade dashboard regions (widgets) and their visual tone.
 * Notes:
 *  - Tones are stable, semantic meanings (not state). Use tokens for transient states (badges, rings).
 *  - Keep this file tiny and dependency-free so all views can import it.
 * Update Log:
 *  - 2025-08-13: Initial region→tone mapping and helpers.
 */

// --- Domain semantics -------------------------------------------------------
export type Region =
  | "leagues"
  | "rosters"
  | "matchups"
  | "news"
  | "tickers"
  | "trades"
  | "draft";

export type Tone = "pink" | "blue" | "yellow" | "white";

/** Default (calm-state) mapping from region to ColorPanel tone. */
export const REGION_TONE: Record<Region, Tone> = {
  leagues: "pink",    // ownership / community
  rosters: "pink",    // team management alongside leagues
  matchups: "white",  // neutral comparison
  news: "yellow",     // attention / announcements
  tickers: "blue",    // market data / prices
  trades: "pink",     // user action within leagues domain
  draft: "blue",      // data-heavy drafting tools
};

// --- Optional state semantics (don’t flip base tone) ------------------------
export type PanelState =
  | { kind: "default" }
  | { kind: "attention" } // e.g., trade window live — show a badge/ring, not tone change
  | { kind: "info" }
  | { kind: "success" | "error" };

/**
 * Current guidance: state should be expressed via badges, chips, or rings inside the panel
 * (e.g., using --state-* tokens), not by changing the panel tone.
 */
export function toneFor(region: Region, _state: PanelState = { kind: "default" }): Tone {
  return REGION_TONE[region];
}

// --- Label helpers ----------------------------------------------------------
/** Title text for rails/headers. */
export function regionTitle(region: Region): string {
  switch (region) {
    case "leagues":
      return "LEAGUES";
    case "rosters":
      return "ROSTERS";
    case "matchups":
      return "MATCHUPS";
    case "news":
      return "NEWS";
    case "tickers":
      return "MARKET"; // more user-friendly than "Tickers"
    case "trades":
      return "TRADES";
    case "draft":
      return "DRAFT";
  }
}

/** ARIA label for the region container (falls back to a Title-case). */
export function regionAriaLabel(region: Region): string {
  // For now, same as title but in normal casing; adjust if localization is added later.
  const title = regionTitle(region);
  return title.charAt(0) + title.slice(1).toLowerCase();
}