/**
 * UiPlayground.tsx
 * Purpose: Visual QA playground for theme tokens & components
 * Updates:
 *  - 2025-08-12: Initial implementation (typography, buttons, panels, colors)
 *  - 2025-08-13: Align to semantic color tokens; remove legacy color names; runtime swatches from CSS vars; a11y + focus checks
 */
import React from "react";
import Panel from "../components/Panel";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import ColorPanel from "../components/ColorPanel";

/* ---------- semantic-only button matrices ---------- */
const BUTTON_VARIANTS = [
  { heading: "Arcade Variants", items: ["arcade1", "arcade2"] as const },
  { heading: "Default Variants", items: ["default1", "default2"] as const },
] as const;
const SIZES = ["sm", "md", "lg"] as const;

/* ---------- token-driven color swatches (read from CSS vars at runtime) ---------- */
const SEMANTIC_VARS = [
  "fg-default",
  "fg-subtle",
  "bg-app",
  "bg-panel",
  "accent-pink",
  "accent-blue",
  "accent-yellow",
  "border-default",
  "border-accent",
] as const;

const STATE_VARS = [
  "state-success",
  "state-error",
  "state-warning",
  "state-info",
  "divider",
  "overlay-scrim",
  "focus-ring",
] as const;

/* ---------- tiny components ---------- */
function cssVarToHex(name: string): string {
  const val = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
  const [r, g, b] = val.split(/\s+/).map(Number);
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  return val || "";
}

function Swatch({ varName }: { varName: string }) {
  const rgb = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varName}`)
    .trim();
  const hex = cssVarToHex(varName);
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-none border border-divider"
        style={{ backgroundColor: rgb ? `rgb(${rgb})` : undefined }}
        title={hex}
      />
      <div className="text-xs leading-tight">
        <div className="text-fg-default">{varName}</div>
        <div className="text-fg-subtle">{hex}</div>
      </div>
    </div>
  );
}

export default function UiPlayground() {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* Typography */}
      <Panel>
        <SectionHeader title="Typography" subtitle="Font stacks & scales" />
        <div className="space-y-3">
          <div>
            <div className="mk-arcade-display text-4xl tracking-tight text-accent-pink">Arcade Bold</div>
            <div className="font-arcade text-2xl text-accent-blue">Arcade Regular</div>
          </div>

          <div>
            <div className="font-market font-bold tracking-normal text-2xl">Market Header</div>
            <div className="font-market text-base text-fg-subtle">Body copy — Market</div>
          </div>

          {/* Font size scale block */}
          <div className="mt-6">
            <div className="text-fg-subtle text-sm mb-2">Font Size Scale</div>
            <div className="space-y-3">
              {/* Arcade Bold */}
              <div>
                <div className="text-fg-subtle text-xs mb-1">Arcade Bold</div>
                <div className="flex flex-wrap gap-4 items-end">
                  {["text-base","text-lg","text-xl","text-2xl"].map((sz) => (
                    <span key={`ab-${sz}`} className={`font-arcade font-bold ${sz}`}>
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arcade Regular */}
              <div>
                <div className="text-fg-subtle text-xs mb-1">Arcade Regular</div>
                <div className="flex flex-wrap gap-4 items-end">
                  {["text-base","text-lg","text-xl","text-2xl"].map((sz) => (
                    <span key={`ar-${sz}`} className={`font-arcade ${sz}`}>
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Market Header */}
              <div>
                <div className="text-fg-subtle text-xs mb-1">Market Header</div>
                <div className="flex flex-wrap gap-4 items-end">
                  {["text-base","text-lg","text-xl","text-2xl"].map((sz) => (
                    <span key={`mh-${sz}`} className={`font-market font-bold tracking-normal ${sz}`}>
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Market Body */}
              <div>
                <div className="text-fg-subtle text-xs mb-1">Market Body</div>
                <div className="flex flex-wrap gap-4 items-end">
                  {["text-base","text-lg","text-xl","text-2xl"].map((sz) => (
                    <span key={`mb-${sz}`} className={`font-market text-fg-subtle ${sz}`}>
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Buttons */}
      <Panel className="xl:col-span-2">
        <SectionHeader title="Buttons" subtitle="Variants × sizes × loading" />
        <div className="space-y-5">
          {BUTTON_VARIANTS.map(({ heading, items }) => (
            <div key={heading}>
              <div className="text-fg-subtle text-sm mb-2">{heading}</div>
              <div className="grid grid-cols-1 gap-3 w-full">
                {items.flatMap((variant) =>
                  SIZES.map((size) => (
                    <Button key={`${variant}-${size}`} variant={variant} size={size}>
                      {variant[0].toUpperCase() + variant.slice(1)} / {size}
                    </Button>
                  ))
                )}
              </div>
            </div>
          ))}

          <div>
            <div className="text-fg-subtle text-sm mb-2">Semantic Variants</div>
            <div className="flex flex-wrap gap-3">
              <Button variant="confirm" size="md">Confirm</Button>
              <Button variant="cancel" size="md">Cancel</Button>
              <Button variant="back" size="md">Back</Button>
              <Button variant="confirm" size="md" isLoading>Loading…</Button>
            </div>
          </div>
        </div>
      </Panel>

      {/* Panels & Headers */}
      <Panel>
        <SectionHeader title="Panel + SectionHeader" subtitle="Consistent framing" />
        <p className="text-fg-subtle">Use this combo for every dashboard section.</p>
      </Panel>

      {/* Triad Panels */}
      <div className="xl:col-span-2 space-y-3">
        <SectionHeader title="Color Panels" subtitle="Yellow / Blue / Pink rails" />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <ColorPanel tone="yellow" label="News">
            <h3>MARKET WRAP</h3>
            <p className="font-market text-fg-subtle">Futures point higher ahead of CPI…, also let's test how the panels respond to long text</p>
          </ColorPanel>

          <ColorPanel tone="blue" label="Prices">
            <h3>PLAYER 1</h3>
            <p className="font-market text-fg-subtle">Score: 7,832</p>
          </ColorPanel>

          <ColorPanel tone="pink" label="Roster">
            <h3>LINEUP</h3>
            <p className="font-market text-fg-subtle">Draft opens Friday</p>
          </ColorPanel>

          <ColorPanel tone="white" label="RAIL HEIGHT TEST">
            <h3>RAIL HEIGHT TEST</h3>
            <p className="font-market text-fg-subtle">Arcade Bold rail label.</p>
          </ColorPanel>
        </div>
      </div>

      {/* Color tokens — semantic & state */}
      <Panel>
        <SectionHeader title="Colors" subtitle="Theme tokens (semantic + state)" />
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-fg-subtle text-sm mb-2">Semantic</div>
            <div className="grid grid-cols-1 gap-3">
              {SEMANTIC_VARS.map((v) => (
                <Swatch key={v} varName={v} />
              ))}
            </div>
          </div>
          <div>
            <div className="text-fg-subtle text-sm mb-2">State & Polish</div>
            <div className="grid grid-cols-1 gap-3">
              {STATE_VARS.map((v) => (
                <Swatch key={v} varName={v} />
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* Table sample (uses semantic borders/text) */}
      <Panel className="xl:col-span-2">
        <SectionHeader title="Table Sample" subtitle="Borders & text colors" />
        <table className="w-full border-collapse">
          <caption className="sr-only">Demo table for theme borders and text colors</caption>
          <thead>
            <tr className="text-left border-b border-divider">
              <th scope="col" className="py-2 px-3">Column</th>
              <th scope="col" className="py-2 px-3">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-divider/50">
              <td className="py-2 px-3">Example</td>
              <td className="py-2 px-3 text-fg-subtle">Hello world</td>
            </tr>
            <tr>
              <td className="py-2 px-3">Accent</td>
              <td className="py-2 px-3 text-accent-pink">Accent pink text</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </div>
  );
}