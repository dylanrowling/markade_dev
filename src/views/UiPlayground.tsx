/**
 * UiPlayground.tsx
 * Purpose: Visual QA playground for theme tokens & components
 * Updates:
 *  - 2025-08-12: Initial implementation (typography, buttons, panels, colors)
 *  - 2025-08-13: Align to semantic color tokens; remove legacy color names; runtime swatches from CSS vars; a11y + focus checks
 */
import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import ColorPanel from "../components/ColorPanel";
import Icon, { availableIcons } from "../components/Icons";

/* ---------- semantic-only button matrices ---------- */
const BUTTON_VARIANTS = [
  { heading: "Arcade (White)", items: ["arcadewhite"] as const },
  { heading: "Arcade (Colors)", items: ["arcadeyellow", "arcadeblue", "arcadepink"] as const },
  { heading: "Neutral Variants", items: ["default", "subtle"] as const },
] as const;
const SIZES = ["md"] as const;

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
  const [rgb, setRgb] = useState<string>("");
  const [hex, setHex] = useState<string>("");

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const rgbVal = style.getPropertyValue(`--${varName}`).trim();
    setRgb(rgbVal);
    setHex(cssVarToHex(varName));
  }, [varName]);

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
            <h3 className="mk-arcade-display text-4xl tracking-tight text-accent-pink">Arcade Bold</h3>
            <h4 className="font-arcade text-2xl text-accent-blue">Arcade Regular</h4>
          </div>

          <div>
            <h3 className="font-market font-bold tracking-normal text-2xl">Market Header</h3>
            <p className="font-market text-base text-fg-subtle">Body copy — Market</p>
          </div>

          {/* Font size scale block */}
          <div className="mt-6">
            <div className="text-fg-subtle text-sm mb-2">Font Size Scale</div>
            <div className="space-y-3">
              {/* Arcade Bold */}
              <div>
                <h4 className="text-fg-subtle text-xs mb-1">Arcade Bold</h4>
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
                <h4 className="text-fg-subtle text-xs mb-1">Arcade Regular</h4>
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
                <h4 className="text-fg-subtle text-xs mb-1">Market Header</h4>
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
                <h4 className="text-fg-subtle text-xs mb-1">Market Body</h4>
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

      {/* Form Inputs */}
      <Panel>
        <SectionHeader title="Form Inputs" subtitle="Text fields, selects, toggles, pickers" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text */}
          <div className="space-y-1">
            <label className="text-sm text-fg-subtle" htmlFor="in-text">Text</label>
            <input
              id="in-text"
              type="text"
              placeholder="Ticker symbol (e.g., AAPL)"
              className="w-full rounded-none bg-bg-panel text-fg-default placeholder-fg-subtle border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))]"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm text-fg-subtle" htmlFor="in-password">Password</label>
            <input
              id="in-password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-none bg-bg-panel text-fg-default placeholder-fg-subtle border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))]"
            />
          </div>

          {/* Number */}
          <div className="space-y-1">
            <label className="text-sm text-fg-subtle" htmlFor="in-number">Number</label>
            <input
              id="in-number"
              type="number"
              defaultValue={10}
              className="w-full rounded-none bg-bg-panel text-fg-default placeholder-fg-subtle border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Select */}
          <div className="space-y-1">
            <label className="text-sm text-fg-subtle" htmlFor="in-select">Select</label>
            <select
              id="in-select"
              className="w-full rounded-none bg-bg-panel text-fg-default border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))]"
              defaultValue="weekly"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-sm text-fg-subtle" htmlFor="in-date">Date</label>
            <input
              id="in-date"
              type="date"
              className="w-full rounded-none bg-bg-panel text-fg-default border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))]"
            />
          </div>

          {/* Time */}
          <div className="space-y-1">
            <label className="text-sm text-fg-subtle" htmlFor="in-time">Time</label>
            <input
              id="in-time"
              type="time"
              className="w-full rounded-none bg-bg-panel text-fg-default border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))]"
            />
          </div>

          {/* Datetime-local */}
          <div className="space-y-1">
            <label className="text-sm text-fg-subtle" htmlFor="in-dt">Datetime</label>
            <input
              id="in-dt"
              type="datetime-local"
              className="w-full rounded-none bg-bg-panel text-fg-default border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))]"
            />
          </div>

          {/* Textarea */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-fg-subtle" htmlFor="in-notes">Textarea</label>
            <textarea
              id="in-notes"
              rows={3}
              placeholder="Notes…"
              className="w-full rounded-none bg-bg-panel text-fg-default placeholder-fg-subtle border border-divider px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))]"
            />
          </div>

          {/* Checkboxes & radios */}
          <div className="space-y-2">
            <div className="text-sm text-fg-subtle">Checkboxes</div>
            <label className="inline-flex items-center gap-2 text-fg-default">
              <input type="checkbox" className="accent-[rgb(var(--accent-pink))]" defaultChecked />
              Email alerts
            </label>
            <label className="inline-flex items-center gap-2 text-fg-default">
              <input type="checkbox" className="accent-[rgb(var(--accent-blue))]" />
              Push pings
            </label>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-fg-subtle">Radios</div>
            <label className="inline-flex items-center gap-2 text-fg-default">
              <input name="r1" type="radio" className="accent-[rgb(var(--accent-yellow))]" defaultChecked />
              Public league
            </label>
            <label className="inline-flex items-center gap-2 text-fg-default">
              <input name="r1" type="radio" className="accent-[rgb(var(--accent-pink))]" />
              Private league
            </label>
          </div>

          {/* Toggle */}
          <div className="space-y-1">
            <div className="text-sm text-fg-subtle">Toggle</div>
            <button
              type="button"
              className="relative inline-flex h-6 w-11 items-center border border-divider bg-bg-panel focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))]"
              onClick={(e) => e.currentTarget.classList.toggle('!bg-white')}
              aria-pressed="false"
            >
              <span className="sr-only">Enable</span>
              <span className="inline-block h-4 w-4 translate-x-1 bg-[rgb(var(--accent-blue))] transition-transform group-[:where(&.\!bg-white)]:translate-x-6" />
            </button>
          </div>

          {/* Range */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm text-fg-subtle" htmlFor="in-range">Range</label>
            <input id="in-range" type="range" className="w-full" />
          </div>
        </div>
      </Panel>

      {/* Triad Panels */}
      <div className="xl:col-span-2 space-y-3">
        <SectionHeader title="Color Panels" subtitle="Yellow / Blue / Pink rails" />
        <div className="grid gap-4 auto-rows-[minmax(12rem,auto)] lg:grid-cols-2 xl:grid-cols-3 min-w-0 place-items-stretch">
          <ColorPanel tone="yellow" label="NEWS">
            <h3>MARKET WRAP</h3>
            <p className="font-market text-fg-default">Futures point higher ahead of CPI…, also let's test how the panels respond to long text</p>
          </ColorPanel>

          <ColorPanel tone="blue" label="PRICES">
            <h3>PLAYER 1</h3>
            <p className="font-market text-fg-default">Score: 7,832</p>
          </ColorPanel>

          <ColorPanel tone="pink" label="ROSTER">
            <h3>LINEUP</h3>
            <p className="font-market text-fg-default">Draft opens Friday</p>
          </ColorPanel>

          <ColorPanel tone="white" label="RAIL HEIGHT TEST">
            <h3>RAIL HEIGHT TEST</h3>
            <p className="font-market text-fg-default">Arcade Bold rail label.</p>
          </ColorPanel>
        </div>
      </div>

      {/* Icons gallery */}
      <Panel>
        <SectionHeader title="Icons" subtitle="Inline SVGs (semantic color-aware)" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {availableIcons.length === 0 ? (
            <div className="col-span-full text-sm text-fg-subtle">No icons registered.</div>
          ) : (
            availableIcons.map((n) => (
              <div key={n} className="flex flex-col items-center gap-2 min-w-0">
                <Icon
                  name={n}
                  className="w-6 h-6 text-fg-default hover:text-accent-pink transition-colors"
                />
                <div className="text-[10px] text-fg-subtle truncate max-w-[6rem]" title={n}>
                  {n}
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>

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