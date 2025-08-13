/****
 * Panel.tsx
 * Purpose: Shared surface wrapper for consistent cards and panels across Markade.
 * Update Log:
 * - 2025-08-07: Initial creation.
 * - 2025-08-08: Simplified to <section> only for stability; mobile padding p-3 sm:p-4.
 */

import React from 'react';

type PanelProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export default function Panel({ className = '', children, ...rest }: PanelProps) {
  const base = 'bg-surface border-4 border-white rounded-none p-3 sm:p-4';
  return (
    <section className={`${base} ${className}`} {...rest}>
      {children}
    </section>
  );
}