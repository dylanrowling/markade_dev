/**
 * ColorPanel.tsx
 * Purpose: Branded panel with a vertical color rail and inset borders, aligned to semantic token colors.
 * Update Log:
 * - 2025-08-13: Semantic tokens + borders standardization.
 * - 2025-08-13: Autosize (inline-flex), fixed rail thickness, min sizes.
 * - 2025-08-13: Nits — forwardRef, ARIA polish, configurable padding, class merge helper, export Tone.
 */

import React, { Children, isValidElement, cloneElement, forwardRef } from "react";
import type { ReactNode, ReactElement } from "react";

/** Tiny class merge (no extra dep). Ignores falsy and trims. */
function cx(...parts: Array<string | false | null | undefined>): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export type Tone = "yellow" | "blue" | "pink" | "white";

/**
 * Semantic tone mappings:
 * - yellow => accent-yellow
 * - blue   => accent-blue
 * - pink   => accent-pink
 * - white  => fg-default
 */
const toneClasses: Record<Tone, { border: string; railBg: string; textClass: string }> = {
  yellow: { border: "border-accent-yellow", railBg: "bg-accent-yellow", textClass: "text-accent-yellow" },
  blue: { border: "border-accent-blue", railBg: "bg-accent-blue", textClass: "text-accent-blue" },
  pink: { border: "border-accent-pink", railBg: "bg-accent-pink", textClass: "text-accent-pink" },
  white: { border: "border-fg-default", railBg: "bg-fg-default", textClass: "text-fg-default" },
};

interface ColorPanelProps {
  tone: Tone;
  label: string;
  children: ReactNode;
  className?: string;
  /** CSS length values, e.g. "240px", "16rem". Defaults: 240px × 120px */
  minWidth?: string;
  minHeight?: string;
  /** Tailwind padding utility for inner content (default: "p-6") */
  paddingClass?: string;
  /** Optional explicit aria-label for the whole panel (defaults to label) */
  ariaLabel?: string;
  fit?: 'auto' | 'fill';
}

const ColorPanel = forwardRef<HTMLDivElement, ColorPanelProps>(function ColorPanel(
  {
    tone,
    label,
    children,
    className = "",
    minWidth = "240px",
    minHeight = "120px",
    paddingClass = "p-6",
    ariaLabel,
    fit = "fill",
  },
  ref
) {
  const theme = toneClasses[tone];

  // Geometry constants: keep the mid-line exactly centered in the gap
  const OUTER_BORDER = 3; // px — matches `border-4` on the outer container
  const GAP = 2;          // px — distance between outer and inner borders (inset 4px vs 8px)
  const MID_LINE = 1;     // px — thickness of the hover line (border-2)
  const midInset = OUTER_BORDER + (GAP - MID_LINE) / 2; // -> 5px, centers the 2px line in a 4px gap

  // Force arcade headings to match tone color
  const forcedTextClass =
    {
      yellow: "!text-accent-yellow",
      blue: "!text-accent-blue",
      pink: "!text-accent-pink",
      white: "!text-fg-default",
    }[tone] ?? "";

  // Helper: clone children and colorize headings or elements with mk-arcade-display class
  function colorizeHeadings(node: ReactNode): ReactNode {
    if (isValidElement(node)) {
      const el = node as ReactElement<any>;
      const type = el.type as any;
      const existing = el.props.className || "";

      // For headings or elements with mk-arcade-display, append forced text color
      if ((typeof type === "string" && /^h[1-6]$/.test(type)) || existing.includes("mk-arcade-display")) {
        const classes = existing.split(" ").filter(Boolean);
        if (!classes.includes("mk-arcade-display")) classes.push("mk-arcade-display");
        classes.push(forcedTextClass);
        return cloneElement(el, { className: classes.join(" ") });
      }

      // Recurse for children if present
      if (el.props && el.props.children) {
        return cloneElement(el, { children: Children.map(el.props.children, colorizeHeadings) });
      }
    }
    return node;
  }

  return (
    <div
      ref={ref}
      className={cx(
        "group relative items-stretch",
        fit === "auto" ? "inline-flex" : "flex w-full h-full",
        "bg-black/80", // intentional translucent overlay; keep for vibe
        theme.border,
        "border-4 border-l-0",
        "rounded-none overflow-hidden",
        "transition-colors duration-700 ease-out motion-reduce:transition-none",
        className
      )}
      {...(fit === "auto" ? { style: { minWidth, minHeight } } : {})}
      aria-label={ariaLabel ?? label}
    >
      {/* Vertical rail (fixed thickness). Decorative text only for SRs. */}
      <div
        className={cx(
          "font-arcade font-bold",
          theme.railBg,
          "!text-black",
          "shrink-0 flex items-center justify-center",
          "w-14", // fixed rail thickness
          "transition-colors duration-700 ease-out motion-reduce:transition-none",
          "tracking-[0.1em] text-[18px]"
        )}
        style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        aria-hidden="true"
      >
        {label}
      </div>

      {/* Content wrapper with inset borders (auto-sizes to children) */}
      <div className={cx("relative flex-1 min-w-0", fit === "fill" && "w-full h-full")}>
        {/* Mid-gap hover line: perfectly centered between outer (4px) and inner (8px) borders */}
        <div
          className="pointer-events-none absolute rounded-[2px] border-2 border-fg-default opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-700 group-hover:duration-0 group-focus-within:duration-0 ease-out motion-reduce:transition-none z-0"
          style={{ inset: `${midInset}px` }}
        />

        {/* Inner inset border keyed to tone: always visible, no hover change */}
        <div className={cx(theme.border, "border-2 rounded-[2px] absolute inset-[8px] pointer-events-none z-10")} />

        {/* Inner panel (auto-size) */}
        <div className={cx("relative z-10 w-full transition-colors duration-700 ease-out motion-reduce:transition-none text-fg-default", paddingClass, fit === "fill" && "h-full")}>
          {Children.map(children, colorizeHeadings)}
        </div>
      </div>
    </div>
  );
});

export default ColorPanel;