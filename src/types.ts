

/**
 * types.ts — Domain types for Markade
 * Purpose: Central source of truth for app-wide type definitions
 * Updates:
 *  - 2025-08-11 18:45 ET: Initial domain model (users, leagues, stocks, rosters, matchups, rankings)
 */

// Primitive aliases
export type UserId = string;
export type LeagueId = string;
export type Ticker = string; // e.g., "AAPL", "GOOGL"

// User profile stored in Firestore (users/{uid})
export interface UserProfile {
  uid: UserId;
  email: string;
  displayName?: string;
  createdAt: number; // epoch ms
  role: "player" | "commissioner" | "admin";
  leagueIds: LeagueId[]; // a user may be in multiple leagues
}

// League document (leagues/{leagueId})
export interface League {
  id: LeagueId;
  name: string;
  commissionerId: UserId;
  memberIds: UserId[];
  createdAt: number; // epoch ms
  season: string; // e.g., "2025-26"
}

// Quote from a stocks provider
export interface StockQuote {
  ticker: Ticker;
  price: number;
  changePct: number; // +/- percent change for scoring
  ts: number; // epoch ms
}

// Roster types
export type RosterRole =
  | "big-tech"
  | "bank"
  | "defense"
  | "energy"
  | "etf"
  | "wildcard"
  | string; // extensible

export interface RosterSlot {
  ticker: Ticker;
  role: RosterRole;
}

export interface Roster {
  userId: UserId;
  leagueId: LeagueId;
  slots: RosterSlot[];
}

// Weekly head-to-head
export interface Matchup {
  id: string;
  leagueId: LeagueId;
  week: number;
  homeUserId: UserId;
  awayUserId: UserId;
}

// Rankings per league
export interface Ranking {
  leagueId: LeagueId;
  userId: UserId;
  rank: number; // 1 = best
  scorePct: number; // team cumulative percentage for the scoring window
}