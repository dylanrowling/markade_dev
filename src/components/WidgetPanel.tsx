/**
 * WidgetPanel.tsx
 * Purpose: Thin adapter that renders a domain widget inside a ColorPanel.
 * Update Log:
 * - 2025-08-13: Initial implementation.
 * - 2025-08-14: Default fit='fill' + safe defaults.
 */

import React from "react";
import ColorPanel, { type Tone } from "./ColorPanel";
import { type Region, toneFor, regionTitle, regionAriaLabel } from "../theme/semantics";

export type WidgetPanelProps = {
  region: Region;
  children: React.ReactNode;
  /** Optional: force a tone for quick experiments (bypasses semantics). */
  toneOverride?: Tone;
  /** Forwarded to ColorPanel sizing */
  fit?: "auto" | "fill";
  className?: string;
  minWidth?: string;
  minHeight?: string;
  /** Forwarded to ColorPanel; defaults to 'p-6' */
  paddingClass?: string;
  /** Optional: explicit aria-label; defaults to region title */
  ariaLabel?: string;
};

export default function WidgetPanel({
  region,
  children,
  toneOverride,
  fit = "fill",               // <= default to fill so inner frame stretches
  className = "",
  minWidth,
  minHeight,
  paddingClass = "p-6",
  ariaLabel,
}: WidgetPanelProps) {
  const tone = toneOverride ?? toneFor(region);
  const label = regionTitle(region);
  const aria = ariaLabel ?? regionAriaLabel(region);

  return (
    <ColorPanel
      fit={fit}
      tone={tone}
      label={label}
      ariaLabel={aria}
      className={className}
      minWidth={minWidth}
      minHeight={minHeight}
      paddingClass={paddingClass}
    >
      {children}
    </ColorPanel>
  );
}