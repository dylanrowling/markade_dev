/**
 * UiPlayground.tsx
 * Purpose: Visual QA playground for theme tokens & components
 * Updates:
 *  - 2025-08-12: Initial implementation (typography, buttons, panels, colors)
 */
import React from "react";
import Panel from "../components/Panel";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import ColorPanel from "../components/ColorPanel";

const Swatch: React.FC<{ name: string; className: string; borderClass?: string }> = ({ name, className, borderClass = "border-borderDim" }) => (
  <div className="flex items-center gap-3">
    <div className={`w-10 h-10 rounded border ${borderClass} ${className}`} />
    <span className="text-sm text-textDim">{name}</span>
  </div>
);

const UiPlayground: React.FC = () => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* Typography */}
      <Panel>
        <SectionHeader title="Typography" subtitle="Font stacks & scales" />
        <div className="space-y-3">
          <div>
            <div className="mk-arcade-display text-4xl tracking-tight">Arcade Bold</div>
            <div className="font-arcade text-2xl">Arcade Regular</div>
          </div>
          <div>
            <div className="font-market font-bold tracking-normal text-2xl">Market Header</div>
            <div className="font-market text-base text-textDim">Body copy — IBMPlexMono</div>
          </div>
          {/* Font size scale block */}
          <div className="mt-6">
            <div className="text-textDim text-sm mb-2">Font size scale</div>
            <div className="space-y-3">
              {/* Arcade Bold */}
              <div>
                <div className="text-textDim text-xs mb-1">Arcade Bold</div>
                <div className="flex flex-wrap gap-4 items-end">
                  <span className="font-arcade font-bold text-base">text-base</span>
                  <span className="font-arcade font-bold text-lg">text-lg</span>
                  <span className="font-arcade font-bold text-xl">text-xl</span>
                  <span className="font-arcade font-bold text-2xl">text-2xl</span>
                </div>
              </div>
              {/* Arcade Regular */}
              <div>
                <div className="text-textDim text-xs mb-1">Arcade Regular</div>
                <div className="flex flex-wrap gap-4 items-end">
                  <span className="font-arcade text-base">text-base</span>
                  <span className="font-arcade text-lg">text-lg</span>
                  <span className="font-arcade text-xl">text-xl</span>
                  <span className="font-arcade text-2xl">text-2xl</span>
                </div>
              </div>
              {/* Market Header */}
              <div>
                <div className="text-textDim text-xs mb-1">Market Header</div>
                <div className="flex flex-wrap gap-4 items-end">
                  <span className="font-market font-bold tracking-normal text-base">text-base</span>
                  <span className="font-market font-bold tracking-normal text-lg">text-lg</span>
                  <span className="font-market font-bold tracking-normal text-xl">text-xl</span>
                  <span className="font-market font-bold tracking-normal text-2xl">text-2xl</span>
                </div>
              </div>
              {/* Market Body */}
              <div>
                <div className="text-textDim text-xs mb-1">Market Body</div>
                <div className="flex flex-wrap gap-4 items-end">
                  <span className="font-market text-base text-textDim">text-base</span>
                  <span className="font-market text-lg text-textDim">text-lg</span>
                  <span className="font-market text-xl text-textDim">text-xl</span>
                  <span className="font-market text-2xl text-textDim">text-2xl</span>
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
          <div>
            <div className="text-textDim text-sm mb-2">arcade variants</div>
            <div className="grid grid-cols-1 gap-3 w-full">
              <Button variant="arcade1" size="sm">Arcade1 / sm</Button>
              <Button variant="arcade1" size="md">Arcade1 / md</Button>
              <Button variant="arcade1" size="lg">Arcade1 / lg</Button>
              <Button variant="arcade2" size="sm">Arcade2 / sm</Button>
              <Button variant="arcade2" size="md">Arcade2 / md</Button>
              <Button variant="arcade2" size="lg">Arcade2 / lg</Button>
            </div>
          </div>
          <div>
            <div className="text-textDim text-sm mb-2">default variants</div>
            <div className="grid grid-cols-1 gap-3 w-full">
              <Button variant="default1" size="sm">Default1 / sm</Button>
              <Button variant="default1" size="md">Default1 / md</Button>
              <Button variant="default1" size="lg">Default1 / lg</Button>
              <Button variant="default2" size="sm">Default2 / sm</Button>
              <Button variant="default2" size="md">Default2 / md</Button>
              <Button variant="default2" size="lg">Default2 / lg</Button>
            </div>
          </div>
          <div>
            <div className="text-textDim text-sm mb-2">semantic variants</div>
            <div className="flex flex-wrap gap-3">
              <Button variant="confirm" size="md">Confirm</Button>
              <Button variant="cancel" size="md">Cancel</Button>
              <Button variant="back" size="md">Back</Button>
              <Button variant="confirm" size="md" isLoading>
                Loading…
              </Button>
            </div>
          </div>
        </div>
      </Panel>

      {/* Panels & Headers */}
      <Panel>
        <SectionHeader title="Panel + SectionHeader" subtitle="Consistent framing" />
        <p className="text-textDim">Use this combo for every dashboard section.</p>
      </Panel>

      {/* Triad Panels */}
      <div className="xl:col-span-2 space-y-3">
        <SectionHeader title="Color Panels" subtitle="Yellow / Blue / Pink rails" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ColorPanel tone="yellow" label="News">
            <h3>MARKET WRAP</h3>
            <p className="font-market text-textDim">Futures point higher ahead of CPI…</p>
          </ColorPanel>

          <ColorPanel tone="blue" label="Prices">
            <h3>PLAYER 1</h3>
            <p className="font-market text-textDim">Score: 7,832</p>
          </ColorPanel>

          <ColorPanel tone="pink" label="Roster">
            <h3>LINEUP</h3>
            <p className="font-market text-textDim">Draft opens Friday</p>
          </ColorPanel>
        </div>
      </div>

      {/* Color tokens */}
      <Panel>
        <SectionHeader title="Colors" subtitle="Theme tokens" />
        <div className="grid grid-cols-2 gap-3">
          <Swatch name="primary (neon blue)" className="bg-primary" />
          <Swatch name="accentBold (neon pink)" className="bg-accentBold" />
          <Swatch name="casinoYellow" className="bg-casinoYellow" />
          <Swatch name="casinoPurple" className="bg-casinoPurple" />
          <Swatch name="terminalOrange" className="bg-terminalOrange" />
          <Swatch name="neonBlue" className="bg-neonBlue" />
          <Swatch name="neonPink" className="bg-neonPink" />
          <Swatch name="profitGreen" className="bg-profitGreen" />
          <Swatch name="lossRed" className="bg-lossRed" />
          <Swatch name="surface" className="bg-surface" />
          <Swatch name="background" className="bg-background" />
          <Swatch name="borderDim (gridlines)" className="bg-borderDim" borderClass="border-white" />
          <Swatch name="borderAccent (yellow)" className="bg-borderAccent" borderClass="border-borderDim" />
        </div>
      </Panel>

      {/* Table sample (uses theme borders) */}
      <Panel className="xl:col-span-2">
        <SectionHeader title="Table Sample" subtitle="Borders & text colors" />
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-borderDim">
              <th scope="col" className="py-2 px-3">Column</th>
              <th scope="col" className="py-2 px-3">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-borderDim/50">
              <td className="py-2 px-3">Example</td>
              <td className="py-2 px-3 text-textDim">Hello world</td>
            </tr>
            <tr>
              <td className="py-2 px-3">Accent</td>
              <td className="py-2 px-3 text-neonPink">Neon pink text</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </div>
  );
};

export default UiPlayground;
