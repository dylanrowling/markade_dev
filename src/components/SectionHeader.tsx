/****
 * SectionHeader.tsx
 * Purpose: Consistent section titles and optional subtext for panels
 * Updates:
 * - 2025-08-07: Initial creation
 * - 2025-08-13: Modernized to semantic tokens and flexible props (as/size)
 */

import React, { type ElementType } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props = {
  title: string;
  /** Secondary line under the title */
  subtitle?: string;
  /** Deprecated alias for subtitle (kept for backwards compatibility) */
  sub?: string;
  /** Which heading element to render (defaults to h2) */
  as?: HeadingLevel;
  /** Visual size for the title */
  size?: "sm" | "md" | "lg";
  /** Additional classes for the wrapper */
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  sub,
  as = "h2",
  size = "md",
  className = "",
}: Props) {
  const subText = subtitle ?? sub;
  const Tag = as as ElementType;

  const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <header className={["mb-3", className].filter(Boolean).join(" ")}>
      <Tag className={[
        "font-market font-bold tracking-normal text-fg-default",
        sizeClasses[size],
      ].join(" ")}>{title}</Tag>
      {subText ? (
        <p className="font-market text-fg-subtle text-sm mt-1">{subText}</p>
      ) : null}
    </header>
  );
}