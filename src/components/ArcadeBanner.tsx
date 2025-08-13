/**
 * ArcadeBanner.tsx
 * Purpose: Static arcade marquee (bull • MARKADE • bear) matching the 80s vibe
 * Updates:
 *  - 2025-08-12: Initial implementation using inline pixel-style SVG sprites
 *  - 2025-08-13: Modernized to semantic tokens (no legacy classes or hex); token-driven sprites.
 */
import React from "react";

// Pixel-ish bull/bear using token-driven colors via currentColor.
const BullSprite: React.FC<{ className?: string }> = ({ className }) => (
  <div className={"pixelated " + (className ?? "")} aria-hidden="true">
    <svg viewBox="0 0 64 48" width="100%" height="100%" role="img">
      <rect width="64" height="48" fill="transparent" />
      {/* body (uses current text color) */}
      <rect x="6" y="14" width="52" height="20" fill="currentColor" />
      {/* horn highlight uses fg-default */}
      <rect x="50" y="10" width="6" height="6" fill="rgb(var(--fg-default))" />
      {/* legs slightly darker than body */}
      <rect x="12" y="34" width="8" height="6" fill="currentColor" fillOpacity="0.8" />
      <rect x="44" y="34" width="8" height="6" fill="currentColor" fillOpacity="0.8" />
    </svg>
  </div>
);

const BearSprite: React.FC<{ className?: string }> = ({ className }) => (
  <div className={"pixelated " + (className ?? "")} aria-hidden="true">
    <svg viewBox="0 0 64 48" width="100%" height="100%" role="img">
      <rect width="64" height="48" fill="transparent" />
      {/* body (uses current text color) */}
      <rect x="6" y="14" width="52" height="20" fill="currentColor" />
      {/* ear highlight uses fg-default */}
      <rect x="10" y="10" width="6" height="6" fill="rgb(var(--fg-default))" />
      {/* legs slightly darker than body */}
      <rect x="12" y="34" width="8" height="6" fill="currentColor" fillOpacity="0.8" />
      <rect x="44" y="34" width="8" height="6" fill="currentColor" fillOpacity="0.8" />
    </svg>
  </div>
);

const ArcadeBanner: React.FC = () => {
  return (
    <div className="bg-panel border-b border-divider safe-area">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 grid grid-cols-[auto,1fr,auto] items-center gap-4">
        {/* Bull uses success state tone */}
        <BullSprite className="w-10 h-8 md:w-12 md:h-10 text-state-success" />

        <h1 className="text-center mk-arcade-display pixelated text-3xl md:text-5xl text-accent-yellow">
          MARKADE
        </h1>

        {/* Bear uses error state tone */}
        <BearSprite className="w-10 h-8 md:w-12 md:h-10 text-state-error" />
      </div>
    </div>
  );
};

export default ArcadeBanner;