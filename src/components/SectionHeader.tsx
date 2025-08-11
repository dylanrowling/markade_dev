

/**
 * SectionHeader.tsx
 * Purpose: Consistent section titles and optional subtext for panels
 * Update Log:
 * - 2025-08-07: Initial creation
 */

import React from 'react';

export default function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="mb-3">
      <h2 className="font-market-header text-white tracking-wide">{title}</h2>
      {sub ? <p className="text-textDim text-sm mt-1">{sub}</p> : null}
    </header>
  );
}