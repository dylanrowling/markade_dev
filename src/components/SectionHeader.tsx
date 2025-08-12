/**
 * SectionHeader.tsx
 * Purpose: Consistent section titles and optional subtext for panels
 * Update Log:
 * - 2025-08-07: Initial creation
 */

import React from 'react';

export default function SectionHeader({ title, sub, subtitle }: { title: string; sub?: string; subtitle?: string }) {
  const subText = subtitle ?? sub;
  return (
    <header className="mb-3">
      <h2 className="font-market-header text-white tracking-wide">{title}</h2>
      {subText ? <p className="text-textDim text-sm mt-1">{subText}</p> : null}
    </header>
  );
}