import { Children, isValidElement, cloneElement } from 'react';
import type { ReactNode, ReactElement } from 'react';

type Tone = "yellow" | "blue" | "pink";

const toneThemeMap: Record<Tone, { border: string; bg: string; text: string }> = {
  yellow: {
    border: "casinoYellow",
    bg: "casinoYellow",
    text: "casinoYellow",
  },
  blue: {
    border: "primary",
    bg: "primary",
    text: "primary",
  },
  pink: {
    border: "accentBold",
    bg: "accentBold",
    text: "accentBold",
  },
};

interface ColorPanelProps {
  tone: Tone;
  label: string;
  children: ReactNode;
  className?: string;
}

const ColorPanel = ({
  tone,
  label,
  children,
  className = "",
}: ColorPanelProps) => {
  const theme = toneThemeMap[tone];

  // Helper: clone children and colorize headings
  function colorizeHeadings(node: ReactNode): ReactNode {
    if (isValidElement(node)) {
      const el = node as ReactElement<any>;
      const type = el.type as any;

      // For headings, add mk-arcade-display and tone color
      if (typeof type === "string" && /^h[1-6]$/.test(type)) {
        const mergedClass =
          `mk-arcade-display text-${theme.text}` +
          (el.props.className ? " " + el.props.className : "");
        return cloneElement(el, { className: mergedClass });
      }

      // Recurse for children if present
      if (el.props && el.props.children) {
        return cloneElement(el, {
          children: Children.map(el.props.children, colorizeHeadings),
        });
      }
    }
    return node;
  }

  return (
    <div
      className={
        `flex bg-black bg-opacity-80 border-l-8 border-${theme.border} rounded-lg overflow-hidden ` +
        className
      }
      style={{ minHeight: 120 }}
    >
      {/* Vertical rail */}
      <div
        className={`flex items-center justify-center bg-${theme.bg} px-2`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          color: "#fff",
          fontWeight: 700,
          letterSpacing: "0.1em",
          fontSize: 18,
          minHeight: 80,
        }}
      >
        {label}
      </div>
      {/* Inner panel */}
      <div
        className={`flex-1 border-l-4 border-${theme.border} p-6`}
        style={{ color: "#fff" }}
      >
        {Children.map(children, colorizeHeadings)}
      </div>
    </div>
  );
};

export default ColorPanel;