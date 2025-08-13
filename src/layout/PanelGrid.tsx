import React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  /** Tailwind gap utilities, e.g. "gap-4 md:gap-6" (defaults provided) */
  gap?: string;
  /** Grid template columns; use Tailwind classes or arbitrary values */
  cols?: string; // e.g., "grid-cols-6" or "grid-cols-[repeat(auto-fit,minmax(22rem,1fr))]"
  /** Row height: Tailwind or arbitrary values */
  rowHeight?: string; // e.g., "auto-rows-[16rem]" or "auto-rows-max"
}>;

export default function PanelGrid({
  children,
  className = "",
  gap = "gap-4 md:gap-6",
  cols = "grid-cols-[repeat(auto-fit,minmax(22rem,1fr))]",
  rowHeight = "auto-rows-[16rem]",
}: Props) {
  return (
    <div className={`grid ${gap} ${cols} ${rowHeight} ${className}`.trim()}>
      {children}
    </div>
  );
}