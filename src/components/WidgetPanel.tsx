

/**
 * WidgetPanel.tsx
 * Purpose: Thin adapter that renders a domain widget inside a ColorPanel.
 * - Uses semantic region→tone mapping by default, but allows toneOverride for quick experiments.
 * - Centralizes rail label/ARIA so views don’t repeat themselves.
 * Update Log:
 * - 2025-08-13: Initial implementation.
 */

import React from "react";
import ColorPanel, { type Tone } from "./ColorPanel";
import {
  type Region,
  toneFor,
  regionTitle,
  regionAriaLabel,
} from "../theme/semantics";

export type WidgetPanelProps = {
  region: Region;
  children: React.ReactNode;
  /** Optional: force a tone for quick experiments (bypasses semantics). */
  toneOverride?: Tone;
  /** Forwarded props to ColorPanel */
  fit?: "auto" | "fill";
  className?: string;
  minWidth?: string;
  minHeight?: string;
  paddingClass?: string;
  /** Optional: explicit aria-label; defaults to region title */
  ariaLabel?: string;
};

export default function WidgetPanel({
  region,
  children,
  toneOverride,
  fit = "auto",
  className,
  minWidth,
  minHeight,
  paddingClass,
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