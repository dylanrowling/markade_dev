// leagues.ts — Type definitions for League entities
// Last updated: 2025-08-19
//
// This file defines the minimal LeagueRecord type used in UI components
// (e.g., LeagueListWidget) to represent a league reference.
// It currently contains only id and display fields, but can be extended
// to include full league state (rosters, draft, scoring, settings, etc.)
// as backend logic is built out. Centralizing types here ensures both
// UI and backend integrations use the same shape.

export type LeagueRecord = {
  id: string;
  title?: string;
  leagueName?: string;
};