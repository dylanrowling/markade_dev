

/**
 * ArcadeBanner.tsx
 * Purpose: Static arcade marquee (bull • MARKADE • bear) matching the 80s vibe
 * Updates:
 *  - 2025-08-12: Initial implementation using inline pixel-style SVG sprites
 */
import React from "react";

// Simple pixel-ish bull/bear placeholders. Swap these with final art later.
const BullSprite: React.FC<{ className?: string }> = ({ className }) => (
  <div className={"pixelated " + (className ?? "")} aria-hidden>
    <svg viewBox="0 0 64 48" width="100%" height="100%" role="img">
      <rect width="64" height="48" fill="transparent" />
      {/* body */}
      <rect x="6" y="14" width="52" height="20" fill="#00c27a" />
      {/* horn */}
      <rect x="50" y="10" width="6" height="6" fill="#d7ffda" />
      {/* leg */}
      <rect x="12" y="34" width="8" height="6" fill="#00a768" />
      <rect x="44" y="34" width="8" height="6" fill="#00a768" />
    </svg>
  </div>
);

const BearSprite: React.FC<{ className?: string }> = ({ className }) => (
  <div className={"pixelated " + (className ?? "")} aria-hidden>
    <svg viewBox="0 0 64 48" width="100%" height="100%" role="img">
      <rect width="64" height="48" fill="transparent" />
      {/* body */}
      <rect x="6" y="14" width="52" height="20" fill="#b22222" />
      {/* ear */}
      <rect x="10" y="10" width="6" height="6" fill="#ff8080" />
      {/* leg */}
      <rect x="12" y="34" width="8" height="6" fill="#8b1a1a" />
      <rect x="44" y="34" width="8" height="6" fill="#8b1a1a" />
    </svg>
  </div>
);

const ArcadeBanner: React.FC = () => {
  return (
    <div className="bg-surface border-b border-borderDim safe-area">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 grid grid-cols-[auto,1fr,auto] items-center gap-4">
        <BullSprite className="w-10 h-8 md:w-12 md:h-10" />

        <h1 className="text-center font-arcade-bold">
          <span className="text-casinoYellow text-3xl md:text-5xl tracking-wider drop-shadow-[0_2px_0_rgba(112,91,0,0.9)]">
            MARKADE
          </span>
        </h1>

        <BearSprite className="w-10 h-8 md:w-12 md:h-10" />
      </div>
    </div>
  );
};

export default ArcadeBanner;