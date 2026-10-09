"use client";

import { Close } from "@/components/v/Close";
import { useState } from "react";
import { ThemeToggle } from "@/components/landing/Nav";
import { Logo, ButtonLink, GithubMark } from "@/components/landing/ui";
import Workbench from "@/components/workbench/Workbench";
import { Page, RoadmapRows, FaqList, CobaltBand, Foot } from "@/components/v/kit";
import { REPO } from "@/lib/copy";

const tabs = [
  { id: "chat", label: "Chat", file: "chat", code: ["> Which wings over 500 minutes have the best true shooting?", "", "Okafor leads at 68.4% on 27.1 usage.", "61 wings qualify. Table saved as cell 3.", "", "[ Send to Project ]"] },
  { id: "project", label: "Project", file: "wing-efficiency/notebook.dime", code: ["cell 1  prompt   Which wings over 500 minutes...", "cell 2  sql      select player, team, ts_pct from ...", "cell 3  chart    ts% by player, top 5", "cell 4  note     Okafor leads at 68.4%", "", "warehouse  nba-2025 (pinned)"] },
  { id: "skill", label: "Skill", file: "skills/scouting-report/SKILL.md", code: ["name: scouting-report", "steps:", "  - load player_season", "  - split by shot zone", "  - pull on/off from lineups", "  - rank 3 comps by usage and ts%"] },
  { id: "git", label: "History", file: "git log", code: ["4f2a9c1  Add usage trend for Okafor", "b81d03e  Rank wings by ts%", "91c7a52  Rest-day split by team", "0a33f10  Init wing-efficiency"] },
];

export default function C() {
  const [tab, setTab] = useState("chat");
  const t = tabs.find((x) => x.id === tab)!;
  return (
    <Page v="c">
      <header className="h-[58px] border-b border-line">
        <nav className="mx-auto grid h-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 md:px-6">
          <a href="#top" aria-label="dime home"><Logo /></a>
          <div className="hidden justify-center gap-8 text-[14px] text-ink-2 md:flex">
            <a href="#product" className="hover:text-ink">Product</a><a href="#models" className="hover:text-ink">Models</a><a href="#self-host" className="hover:text-ink">Setup</a>
          </div>
          <div className="col-start-3 flex items-center gap-2"><ThemeToggle /><ButtonLink href={REPO} variant="primary" size="pill"><GithubMark size={14} />Star on GitHub</ButtonLink></div>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid min-h-[820px] max-w-[1320px] items-center gap-10 px-5 py-14 md:px-6 lg:grid-cols-[480px_1fr] lg:gap-16">
          <div>
            <h1 className="text-[64px] md:text-[96px]">Ask the league anything.</h1>
            <p className="mt-6 max-w-[440px] text-[18px] leading-[27px] text-ink-2">Chat for quick questions. Projects for the work you keep.</p>
            <div className="mt-8 flex items-center gap-3">
              <ButtonLink href={REPO} variant="primary"><GithubMark />Star on GitHub</ButtonLink>
              <ButtonLink href="#self-host" variant="ghost">See the setup steps</ButtonLink>
            </div>
          </div>
          <div className="min-w-0 lg:-mr-[max(0px,calc((100vw-1320px)/2+24px))]">
            <div className="h-[560px] overflow-hidden rounded-[16px] bg-canvas shadow-[0_0_0_1px_var(--line-strong)] md:h-[680px] lg:rounded-r-none"><Workbench bare initialTab="notebook" /></div>
          </div>
        </section>
        <section id="product" className="mx-auto max-w-[1320px] px-5 py-24 text-center md:px-6">
          <h2 className="mx-auto max-w-[760px] text-[40px] leading-[48px] md:text-[56px] md:leading-[67px]">Every question reruns next <span className="text-[var(--cobalt-tx)]">season</span></h2>
          
          <div className="mx-auto mt-10 flex justify-center gap-2">
            {tabs.map((x) => (
              <button key={x.id} type="button" onClick={() => setTab(x.id)} className={`h-10 rounded-full px-5 text-[14px] transition-colors duration-150 ${tab === x.id ? "bg-ink text-canvas" : "text-ink-2 shadow-[0_0_0_1px_var(--line-strong)] hover:text-ink"}`}>{x.label}</button>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-[1000px] overflow-hidden rounded-[14px] bg-field text-left shadow-[0_0_0_1px_var(--line-strong)]">
            <div className="flex h-10 items-center border-b border-line px-5 font-mono text-[12px] text-ink-3">{t.file}</div>
            <pre className="min-h-[260px] overflow-x-auto p-6 font-mono text-[13.5px] leading-[24px] text-ink-2 md:p-8">{t.code.join("\n")}</pre>
          </div>
          <p className="mx-auto mt-4 max-w-[1000px] text-left text-[13px] text-ink-3">Sample files.</p>
        </section>
        <section id="models" className="mx-auto max-w-[1320px] px-5 py-24 md:px-6">
          <h2 className="max-w-[640px] text-[40px] leading-[48px] md:text-[56px] md:leading-[67px]">Bring your own model</h2>
          
          <div className="mt-12 grid gap-4 md:grid-cols-[1.3fr_1fr]">
            <div className="rounded-[14px] bg-field p-8 shadow-[0_0_0_1px_var(--line)]">
              <div className="font-mono text-[12px] text-ink-3">endpoint</div>
              <p className="mt-4 text-[22px] leading-[30px] md:text-[28px] md:leading-[36px]">Hosted or local.</p>
              
            </div>
            <div className="rounded-[14px] bg-field p-8 shadow-[0_0_0_1px_var(--line)]">
              <div className="font-mono text-[12px] text-ink-3">metrics registry, sample</div>
              <pre className="mt-4 overflow-x-auto font-mono text-[13.5px] leading-[24px] text-ink-2">{"ts_pct:\n  formula: pts / (2 * (fga + 0.44 * fta))"}</pre>
              <p className="mt-6 text-[14px] leading-[22px] text-ink-2">A metric registry. Planned.</p>
            </div>
          </div>
        </section>
        <Close max="max-w-[1320px]" />
      </main>
      <div className="mt-24"><Foot max="max-w-[1320px]" /></div>
    </Page>
  );
}
