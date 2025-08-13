import React from "react";
import PanelGrid from "../layout/PanelGrid";
import Panel from "../components/Panel";
import SectionHeader from "../components/SectionHeader";
import WidgetPanel from "../components/WidgetPanel";
import { regionTitle } from "../theme/semantics";

export default function GridPlayground() {
  return (
    <div className="space-y-6">
      {/* A. Content-sized row (flex) */}
      <Panel>
        <SectionHeader title="A) Content-sized Row" subtitle="flex + fit='auto' (panels shrink-wrap)" />
        <div className="flex flex-wrap items-start gap-4">
          {/* Experiment freely with tones via toneOverride; semantics stay centralized */}
          <section role="region" aria-label={regionTitle("news")}>
            <WidgetPanel region="news" toneOverride="yellow" fit="auto">
              <h3>MARKET WRAP</h3>
              <p className="font-market text-fg-default">
                Futures point higher ahead of CPI…, also let's test how the panels respond to long text
              </p>
            </WidgetPanel>
          </section>

          <section role="region" aria-label={regionTitle("tickers")}>
            <WidgetPanel region="tickers" toneOverride="blue" fit="auto">
              <h3>PLAYER 1</h3>
              <p className="font-market text-fg-default">Score: 7,832</p>
            </WidgetPanel>
          </section>
        </div>
      </Panel>

      {/* B. Content-sized stack (grid, no stretch) */}
      <Panel>
        <SectionHeader title="B) Content-sized Stack" subtitle="grid + auto-rows-max + place-items-start + fit='auto'" />
        <div className="grid gap-4 auto-rows-max place-items-start">
          <section role="region" aria-label={regionTitle("rosters")}>
            <WidgetPanel region="rosters" toneOverride="pink" fit="auto">
              <h3>LINEUP</h3>
              <p className="font-market text-fg-default">Draft opens Friday</p>
            </WidgetPanel>
          </section>

          <section role="region" aria-label={regionTitle("matchups")}>
            <WidgetPanel region="matchups" toneOverride="white" fit="auto">
              <h3>RAIL HEIGHT TEST</h3>
              <p className="font-market text-fg-default">Arcade Bold rail label.</p>
            </WidgetPanel>
          </section>
        </div>
      </Panel>

      {/* C. TV-style fixed tracks (fill slots, use spans) */}
      <Panel>
        <SectionHeader title="C) TV-Style Grid" subtitle="auto-fit minmax cols + fixed row height + fit='fill' + spans" />
        <PanelGrid cols="grid-cols-[repeat(auto-fit,minmax(22rem,1fr))]" rowHeight="auto-rows-[14rem]">
          <section role="region" aria-label={regionTitle("news")}>
            <WidgetPanel region="news" fit="fill" toneOverride="yellow">
              <h3>MARKET WRAP</h3>
              <p className="font-market text-fg-default">Longer blurb goes here…</p>
            </WidgetPanel>
          </section>

          <section role="region" aria-label={regionTitle("rosters")} className="row-span-2">
            <WidgetPanel region="rosters" fit="fill" toneOverride="pink">
              <h3>LINEUP</h3>
              <p className="font-market text-fg-default">Multiple rows will stretch this vertically</p>
            </WidgetPanel>
          </section>

          <section role="region" aria-label={regionTitle("tickers")} className="col-span-2">
            <WidgetPanel region="tickers" fit="fill" toneOverride="blue">
              <h3>PLAYER 1</h3>
              <p className="font-market text-fg-default">Score: 7,832</p>
            </WidgetPanel>
          </section>

          <section role="region" aria-label={regionTitle("matchups")}>
            <WidgetPanel region="matchups" fit="fill" toneOverride="white">
              <h3>WHITE RAIL</h3>
              <p className="font-market text-fg-default">Arcade Bold rail label.</p>
            </WidgetPanel>
          </section>
        </PanelGrid>
      </Panel>
    </div>
  );
}