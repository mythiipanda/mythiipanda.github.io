"use client";

import DataTable from "@/components/dime/DataTable";
import AutoChart from "@/components/dime/AutoChart";
import GlideMenu from "@/components/primitives/GlideMenu";
import { skillDocs } from "@/lib/dime/skills";
import ToolChips from "@/components/primitives/ToolChips";
import { CMark } from "@/components/v/CMark";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CalendarBlank, ChatCircle, Compass, PencilSimpleLine, SidebarSimple } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { ChatCircle as MessageSquare, ArrowUp, FolderOpen, Lightning as Zap, Database, GitCommit as GitCommitHorizontal, Notebook as NotebookPen, ArrowElbowDownLeft as CornerDownLeft, GitBranch, CaretDown as ChevronDown, MagnifyingGlass as Search } from "@phosphor-icons/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberFlow } from "@/components/ui/number-flow";
import { Kbd } from "@/components/ui/kbd";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { projects, skills, tables, schema, commits, rows, runSteps } from "./data";
import { Cell, Pill, Sql, Tick } from "./Primitives";
import { Shell, SortTable } from "./Artifact";

const DimeCtx = createContext(false);

const tableRows = rows.map((r) => ({ PLAYER: r.player, TEAM: r.team, TS_PCT: r.ts, USG_PCT: r.usg }));

export type Tab = "chat" | "notebook" | "warehouse" | "skills" | "history";
const tabs: { id: Tab; label: string; icon: typeof NotebookPen }[] = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "notebook", label: "Notebook", icon: NotebookPen },
  { id: "warehouse", label: "Warehouse", icon: Database },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "history", label: "History", icon: GitCommitHorizontal },
];

const ease = [0.23, 1, 0.32, 1] as const;

const chatSteps = [
  { icon: "read", label: "Read skill", chip: "leaderboard", mono: true, detailMono: true, detail: [{ text: "backend/v2/skills/leaderboard" }] },
  { icon: "write", label: "Write SQL", chip: "cells/02-sql.sql", mono: true, detailMono: true, detail: [{ text: "select PLAYER_NAME, TS_PCT, USG_PCT" }, { text: "from silver_advanced" }] },
  { icon: "db", label: "Run on DuckDB", chip: "164 rows in 41 ms", mono: true, detailMono: true, detail: [{ text: "warehouse.duckdb, 582 rows scanned" }] },
];

function Composer() {
  const dime = useContext(DimeCtx);
  const [elapsed, setElapsed] = useState(0);
  const [live, setLive] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    const stop = setTimeout(() => { setLive(false); clearInterval(t); }, 3600);
    return () => { clearInterval(t); clearTimeout(stop); };
  }, []);
  if (!dime) {
    return (
      <div className="flex min-h-11 items-center gap-3 rounded-[12px] bg-surface py-1.5 pl-4 pr-1.5 shadow-[0_0_0_1px_var(--line-strong)]">
        <span className="flex-1 truncate text-[14px] text-ink-3">Ask about a player, team, lineup, trade, or trend...</span>
        {live ? (
          <span className="inline-flex h-8 items-center gap-2 rounded-[8px] bg-ink px-3 text-[12.5px] font-medium tabular-nums text-canvas">Stop {elapsed}s</span>
        ) : (
          <span aria-label="Send" className="flex size-8 items-center justify-center rounded-[8px] bg-hover-2 text-ink-3"><ArrowUp size={16} weight="bold" /></span>
        )}
      </div>
    );
  }
  return <DimeComposer />;
}

function DimeComposer() {
  const [draft, setDraft] = useState("");
  const can = draft.trim().length > 0;
  return (
    <div className="flex items-center gap-2 rounded-full bg-surface py-1.5 pl-5 pr-1.5 shadow-[0_1px_2px_rgba(20,18,12,0.06),0_8px_24px_-8px_rgba(20,18,12,0.14)] transition-shadow duration-200 focus-within:shadow-[0_0_0_1.5px_var(--accent),0_8px_24px_-8px_rgba(20,18,12,0.14)]">
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Ask about any team, player, lineup, or market…"
        aria-label="Ask"
        className="h-9 min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-3 [@media(pointer:coarse)]:text-base"
      />
      <button
        type="button"
        aria-label="Send"
        disabled={!can}
        className="flex size-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-150 enabled:active:scale-[0.96]"
        style={{ background: "var(--accent)", color: "#fff", opacity: can ? 1 : 0.5 }}
      >
        <ArrowUp size={16} weight="bold" />
      </button>
    </div>
  );
}

export function Chat() {
  const dime = useContext(DimeCtx);
  return (
    <div className="mx-auto flex max-w-[680px] flex-col gap-5">
      <BlurFade delay={0.05} inView={false}>
        <div className="ml-auto max-w-[520px] rounded-[14px] rounded-br-[4px] bg-field px-3.5 py-2.5 text-[14px] leading-[22px] text-ink shadow-[0_0_0_1px_var(--line)]">
          Who had the best true shooting in 2025-26 with 1,500 or more minutes?
        </div>
      </BlurFade>
      <BlurFade delay={0.4}>
        <div className="flex gap-3">
          <CMark size={22} className="mt-px shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <ToolChips steps={chatSteps} labels={{ header: "3 tool calls" }} />
            <p className="text-[14px] leading-[22px] text-ink">
              <b className="font-medium">Luke Kennard leads at 68.9%</b> on 13.1 usage. Jalen Duren is a tenth behind at 68.8%. 164 players clear the 1,500 minute floor.
            </p>
            {dime ? (
              <DataTable rows={tableRows} storeKey="ts" />
            ) : (
              <Shell title="True shooting leaders" source="silver_advanced · 5 of 164" copyText="select PLAYER_NAME, TEAM_ABBREVIATION, TS_PCT, USG_PCT from silver_advanced where GP * MIN >= 1500">
                <SortTable
                  columns={[{ key: "p", label: "Player" }, { key: "t", label: "Team" }, { key: "ts", label: "TS%", numeric: true }, { key: "u", label: "USG%", numeric: true }]}
                  rows={rows.map((r) => [r.player, r.team, r.ts.toFixed(1), r.usg.toFixed(1)])}
                />
              </Shell>
            )}
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={0.9}>
        <div className="ml-auto max-w-[520px] rounded-[14px] rounded-br-[4px] bg-field px-3.5 py-2.5 text-[14px] leading-[22px] text-ink shadow-[0_0_0_1px_var(--line)]">Who has the highest usage among them?</div>
      </BlurFade>
      <BlurFade delay={1.2}>
        <div className="flex gap-3">
          <CMark size={22} className="mt-px shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="text-[14px] leading-[22px] text-ink"><b className="font-medium">Nikola Jokić at 28.9%</b>, well ahead of Duren at 23.1%.</p>
            {dime ? <AutoChart table={{ rows: tableRows, meta: { stat_category: "USG_PCT" } }} /> : (
            <ul className="flex flex-col gap-1.5 rounded-[10px] bg-field p-3 shadow-[0_0_0_1px_var(--line)]">
              {[...rows].sort((a, b) => b.usg - a.usg).map((r) => (
                <li key={r.player} className="grid grid-cols-[88px_1fr_40px] items-center gap-3 text-[12.5px]">
                  <span className="truncate text-ink-2">{r.player}</span>
                  <span className="h-1.5 rounded-full bg-hover-2"><span className="block h-full rounded-full bg-[var(--cobalt-tx)]" style={{ width: `${(r.usg / 30) * 100}%` }} /></span>
                  <span className="text-right font-mono text-ink">{r.usg.toFixed(1)}</span>
                </li>
              ))}
            </ul>
            )}
            <div className="flex flex-wrap gap-1.5">
              {["Clutch splits?", "Compare Kennard and Duren", "Send to notebook"].map((q, i) => (
                <button key={q} type="button" className={`h-10 rounded-full md:h-8 px-3 text-[12.5px] shadow-[0_0_0_1px_var(--line)] transition-colors hover:bg-hover ${i === 2 ? (dime ? "!shadow-[0_0_0_1px_var(--accent)] text-accent hover:bg-hover" : "bg-ink text-canvas hover:bg-ink") : "text-ink-2"}`}>{q}</button>
              ))}
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

export function Notebook() {
  const dime = useContext(DimeCtx);
  return (
    <div className="flex flex-col gap-3">
      <BlurFade delay={0.05} inView={false}>
        <Cell n={1} kind="ask">
          <p className="text-[15px] leading-[22px] text-ink">Who had the best true shooting in 2025-26 with 1,500 or more minutes?</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Pill>@silver_advanced</Pill>
            <Pill>/leaderboard</Pill>
          </div>
        </Cell>
      </BlurFade>
      <BlurFade delay={0.3}>
        <div className="px-1"><ToolChips steps={chatSteps} labels={{ header: "3 tool calls" }} /></div>
      </BlurFade>
      <BlurFade delay={0.45}>
        <Cell n={2} kind="sql" meta={<span className="flex items-center gap-2"><Pill tone="ok">ran 41 ms</Pill><span className="font-mono">164 rows</span></span>}>
          <Sql />
          <div className="mt-3">
            {dime ? <DataTable rows={tableRows} storeKey="nb" /> : (
            <Shell title="Result" source="5 of 164 rows">
              <SortTable
                columns={[{ key: "p", label: "Player" }, { key: "t", label: "Team" }, { key: "ts", label: "TS%", numeric: true }, { key: "u", label: "USG%", numeric: true }]}
                rows={rows.map((r) => [r.player, r.team, r.ts.toFixed(1), r.usg.toFixed(1)])}
              />
            </Shell>
            )}
          </div>
        </Cell>
      </BlurFade>
      <BlurFade delay={0.85}>
        <Cell n={3} kind="chart" meta={<span className="font-mono">ts% · top 5 of 164</span>}>
          {dime ? <AutoChart table={{ rows: tableRows, meta: { stat_category: "TS_PCT" } }} /> : (
          <div className="flex flex-col gap-2.5">
            {rows.map((r, i) => (
              <div key={r.player} className="grid grid-cols-[88px_1fr_44px] items-center gap-3 text-[12.5px]">
                <span className="truncate text-ink-2">{r.player}</span>
                <div className="h-[10px] rounded-[3px] bg-field">
                  <motion.div
                    className={`h-full origin-left rounded-[3px] ${i === 0 ? "bg-accent" : "bg-[var(--bar-2)]"}`}
                    style={{ width: `${((r.ts - 60) / 10) * 100}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 1.1 + i * 0.07, ease }}
                  />
                </div>
                <span className="text-right font-mono text-ink">{r.ts.toFixed(1)}</span>
              </div>
            ))}
          </div>
          )}
        </Cell>
      </BlurFade>
      <BlurFade delay={1.4}>
        <Cell n={4} kind="note">
          <p className="text-[14px] leading-[22px] text-ink-2">
            <b className="font-medium text-ink">Luke Kennard leads at 68.9%</b> on 13.1 usage. Jalen Duren is a tenth behind at 68.8%. 164 players clear the 1,500 minute floor.
          </p>
        </Cell>
      </BlurFade>
    </div>
  );
}

const tableList = tables.map((t) => ({ TABLE: t.name, ROWS: t.rows, COLS: t.cols, REFRESHED: t.fresh }));

function DimeCard({ title, source, quiet, children }: { title: string; source?: string; quiet?: boolean; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] bg-canvas shadow-[0_0_0_1px_var(--line)]">
      <div className="flex h-10 items-center justify-between border-b border-line px-4">
        <span className="truncate text-[13px] font-medium text-ink">{title}</span>
        {source && <span className="truncate font-mono text-[11px] text-ink-3">{source}</span>}
      </div>
      <div className={`p-3 ${quiet ? "quiet-tools" : ""}`}>{children}</div>
    </div>
  );
}

export function Warehouse() {
  const dime = useContext(DimeCtx);
  if (dime) {
    return (
      <div className="flex flex-col gap-3">
        <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
          <DimeCard title="Tables" source="warehouse.duckdb" quiet><DataTable rows={tableList} storeKey="wh-tables" /></DimeCard>
          <div className="rounded-[10px] shadow-[0_0_0_1px_var(--line)]">
            <div className="flex h-10 items-center border-b border-line px-4 text-[13px] font-medium text-ink">silver_advanced</div>
            <div className="px-4 py-2">
              {schema.map(([c, t]) => (
                <div key={c} className="flex h-7 items-center justify-between text-[12.5px]">
                  <span className="font-mono text-ink">{c}</span>
                  <span className="font-mono text-ink-3">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DimeCard title="Preview" source="silver_advanced · 5 of 582"><DataTable rows={tableRows} storeKey="wh-preview" /></DimeCard>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
        <Shell title="Tables" source="warehouse.duckdb" copyText="silver_advanced, silver_boxscores, silver_lineups, silver_shots, silver_schedule">
          <SortTable
            active={0}
            columns={[{ key: "t", label: "Table" }, { key: "r", label: "Rows", numeric: true }, { key: "c", label: "Cols", numeric: true }, { key: "f", label: "Refreshed", numeric: true }]}
            rows={tables.map((t) => [t.name, t.rows, t.cols, t.fresh])}
          />
        </Shell>
        <div className="rounded-[10px] shadow-[0_0_0_1px_var(--line)]">
          <div className="flex h-10 items-center border-b border-line px-4 text-[13px] font-medium text-ink">silver_advanced</div>
          <div className="px-4 py-2">
            {schema.map(([c, t]) => (
              <div key={c} className="flex h-7 items-center justify-between text-[12.5px]">
                <span className="font-mono text-ink">{c}</span>
                <span className="font-mono text-ink-3">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Shell title="Preview" source="silver_advanced · 5 of 582" copyText="select * from silver_advanced limit 5">
        <SortTable
          columns={[{ key: "p", label: "Player" }, { key: "t", label: "Team" }, { key: "ts", label: "TS%", numeric: true }, { key: "u", label: "USG%", numeric: true }]}
          rows={rows.map((r) => [r.player, r.team, r.ts.toFixed(1), r.usg.toFixed(1)])}
        />
      </Shell>
    </div>
  );
}

export function Skills() {
  const [sel, setSel] = useState("leaderboard");
  const doc = skillDocs.find((d) => d.name === sel) ?? skillDocs[0];
  return (
    <div className="grid h-full min-h-0 overflow-hidden rounded-[10px] shadow-[0_0_0_1px_var(--line)] md:grid-cols-[210px_1fr]">
      <div className="max-h-[170px] overflow-auto border-b border-line py-1.5 md:max-h-none md:border-b-0 md:border-r">
        <div className="px-3 pb-1.5 pt-1 font-mono text-[11px] text-ink-3">backend/v2/skills</div>
        {skillDocs.map((d) => (
          <button
            key={d.name}
            type="button"
            onClick={() => setSel(d.name)}
            className={`flex h-8 w-full items-center px-3 text-left text-[13px] transition-colors duration-150 ${d.name === sel ? "bg-field text-ink shadow-[inset_2px_0_0_var(--accent)]" : "text-ink-2 hover:bg-hover"}`}
          >
            {d.name}
          </button>
        ))}
      </div>
      <div key={doc.name} className="min-h-0 overflow-auto px-5 py-4">
        <BlurFade duration={0.25} offset={4} direction="up">
          <div className="font-mono text-[11px] text-ink-3">SKILL.md</div>
          <h3 className="mt-1 text-[20px] font-medium leading-[26px] text-ink">{doc.name}</h3>
          <p className="mt-1 text-[14px] leading-[22px] text-ink-2">{doc.description}</p>
          {doc.when && (
            <>
              <div className="mt-5 text-[12px] font-medium text-ink">When to use</div>
              <p className="mt-1 text-[13px] leading-[20px] text-ink-2">{doc.when}</p>
            </>
          )}
          {doc.insights.length > 0 && (
            <>
              <div className="mt-5 text-[12px] font-medium text-ink">Key insights</div>
              <ul className="mt-1 flex flex-col gap-1.5">
                {doc.insights.map((t) => <li key={t} className="text-[13px] leading-[20px] text-ink-2">{t}</li>)}
              </ul>
            </>
          )}
          {doc.caveats.length > 0 && (
            <>
              <div className="mt-5 text-[12px] font-medium text-ink">Caveats</div>
              <ul className="mt-1 flex flex-col gap-1.5">
                {doc.caveats.map((t) => <li key={t} className="text-[13px] leading-[20px] text-ink-2">{t}</li>)}
              </ul>
            </>
          )}
        </BlurFade>
      </div>
    </div>
  );
}

export function History() {
  const dime = useContext(DimeCtx);
  return (
    <div className="relative flex flex-col">
      <div className={dime ? "absolute bottom-3 left-[4.5px] top-3 w-[2px] rounded-full bg-hover-2" : "absolute bottom-3 left-[5px] top-3 w-px bg-line"} />
      {commits.map((c, i) => (
        <BlurFade key={c.ref} delay={0.06 * i} duration={0.3}>
          <div className="relative flex gap-5 py-3 pl-0">
            <span className={`relative z-[1] mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-canvas ${i === 0 ? "bg-accent" : "bg-[var(--bar-2)]"}`} />
            <div className="min-w-0 flex-1 rounded-[10px] px-4 py-3 shadow-[0_0_0_1px_var(--line)]">
              <div className="flex items-center justify-between gap-3">
                <b className="text-[14px] font-medium">{c.msg}</b>
                <span className="shrink-0 font-mono text-[11px] text-ink-3">{c.ref}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] text-ink-2">
                <span className="text-green">+{c.add}</span>
                <span className="text-red">-{c.del}</span>
                {c.files.map((f) => <span key={f} className="text-ink-3">{f}</span>)}
                <span className="ml-auto text-ink-3">{c.when}</span>
              </div>
              {dime && i === 0 && (
                <div className="mt-3 overflow-hidden rounded-[8px] bg-field shadow-[0_0_0_1px_var(--line)]">
                  <div className="border-b border-line px-3 py-1.5 font-mono text-[11px] text-ink-3">cells/04-chart.json</div>
                  <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[12px] leading-[20px] text-ink">
                    <div><span className="mr-2 text-accent">+</span>{`{ "type": "bar", "x": "PLAYER_NAME",`}</div>
                    <div><span className="mr-2 text-accent">+</span>{`  "y": "TS_PCT", "limit": 5 }`}</div>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </BlurFade>
      ))}
      {dime ? null : (
      <div className="ml-8 overflow-hidden rounded-[10px] shadow-[0_0_0_1px_var(--line)]">
        <div className="border-b border-line bg-field px-4 py-2 font-mono text-[11px] text-ink-3">cells/04-chart.json</div>
        <pre className="p-4 font-mono text-[12px] leading-[20px]">
          <div className="text-green">+ {`{ "type": "bar", "x": "PLAYER_NAME",`}</div>
          <div className="text-green">+ {`  "y": "TS_PCT", "limit": 5 }`}</div>
        </pre>
      </div>
      )}
    </div>
  );
}

function RailRow({ icon, label, active, mono, trail, onClick }: { icon?: ReactNode; label: string; active?: boolean; mono?: boolean; trail?: string; onClick?: () => void }) {
  return (
    <button
      data-row
      type="button"
      onClick={onClick}
      className={`relative z-10 mx-2 flex h-8 w-[calc(100%-16px)] items-center rounded-[8px] px-2 text-left transition-transform duration-150 active:scale-[0.98] ${active ? "bg-hover-2" : ""}`}
    >
      {icon && <span className={`mr-1.5 flex size-5 shrink-0 items-center justify-center ${active ? "text-ink" : "text-ink-2"}`}>{icon}</span>}
      <span className={`min-w-0 flex-1 truncate ${mono ? "font-mono text-[12.5px]" : "text-[14px] font-medium"} ${active ? "text-ink" : "text-ink-2"}`}>{label}</span>
      {trail && <span className="ml-2 shrink-0 text-[12px] tabular-nums text-ink-3">{trail}</span>}
    </button>
  );
}

function RailGroup({ children }: { children: ReactNode }) {
  return (
    <GlideMenu rowSelector="[data-row]" highlightClassName="inset-x-2 rounded-[8px] bg-hover-2" className="flex flex-col gap-px">
      {children}
    </GlideMenu>
  );
}

function RailLabel({ children }: { children: ReactNode }) {
  return <div className="mx-2 mb-1 flex h-7 items-center px-2 text-[12.5px] font-medium text-ink-3">{children}</div>;
}

function LegacyRail({ tab, setTab, dime }: { tab: Tab; setTab: (t: Tab) => void; dime?: boolean }) {
  return (
    <aside data-sidebar={dime ? "frozen" : undefined} className={`hidden w-[224px] shrink-0 flex-col bg-field pb-2 lg:flex ${dime ? "" : "border-r border-line"}`}>
      <div className="mb-2.5 flex h-10 items-center justify-between pl-4 pr-3.5">
        <span className="flex items-center gap-2 text-[14px] font-semibold"><CMark size={16} /><span>dime<span className="text-[var(--cobalt-tx)]">.</span></span></span>
        <SidebarSimple size={18} className="text-ink-3" />
      </div>
      <RailGroup>
        <RailRow icon={<PencilSimpleLine size={18} />} label="New notebook" onClick={() => setTab("chat")} />
      </RailGroup>
      <div className="mt-3">
        <RailGroup>
          <RailRow icon={<ChatCircle size={18} />} label="Chat" active={tab === "chat"} onClick={() => setTab("chat")} />
          <RailRow icon={<CalendarBlank size={18} />} label="Today" />
          <RailRow icon={<Compass size={18} />} label="Explore" />
        </RailGroup>
      </div>
      <div className="mt-4">
        <RailLabel>Notebooks</RailLabel>
        <RailGroup>
          {projects.map((p) => (
            <RailRow key={p.name} label={p.name} active={tab === "notebook"} onClick={() => setTab("notebook")} />
          ))}
        </RailGroup>
      </div>
      <div className="mt-4">
        <RailLabel>Warehouse</RailLabel>
        <RailGroup>
          {tables.slice(0, 4).map((t) => (
            <RailRow key={t.name} label={t.name} mono trail={t.rows} onClick={() => setTab("warehouse")} />
          ))}
        </RailGroup>
      </div>
      <div className="mx-2 mt-auto pt-3">
        <div className="flex h-8 items-center gap-2 px-2 font-mono text-[12px] text-ink-2">
          <GitBranch size={16} className="text-ink-3" />main
        </div>
        {dime && (
          <div className="mt-1 flex h-9 items-center gap-2 rounded-[8px] px-2 text-[13px] font-medium text-ink">
            <span className="flex size-5 items-center justify-center rounded-full bg-hover-2 text-[10px] font-semibold text-ink-2">T</span>Tony
          </div>
        )}
      </div>
    </aside>
  );
}

export function Inspector() {
  const dime = useContext(DimeCtx);
  const [scanned, setScanned] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setScanned(582), 1500);
    return () => clearTimeout(t);
  }, []);
  return (
    <aside className="hidden w-[248px] shrink-0 flex-col gap-5 border-l border-line bg-field p-4 xl:flex">
      {!dime && (
      <div>
        <div className="mb-2.5 text-[11px] text-ink-3">Run</div>
        <ol className="flex flex-col">
          {runSteps.map((s, i) => (
            <BlurFade key={s.label} delay={0.3 + i * 0.28} duration={0.3}>
              <li className="flex items-start gap-2.5 py-1.5">
                <span className="mt-0.5"><Tick /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] text-ink">{s.label}</span>
                  <span className="block truncate font-mono text-[11px] text-ink-3">{s.detail}</span>
                </span>
                <span className="font-mono text-[11px] text-ink-3">{s.ms}</span>
              </li>
            </BlurFade>
          ))}
        </ol>
      </div>
      )}
      <div className="rounded-[10px] bg-canvas p-3.5 shadow-[0_0_0_1px_var(--line)]">
        <div className="mb-2 flex items-center justify-between text-[11px] text-ink-3"><span>Staged</span><span className={dime ? "hidden" : "font-mono"}>main</span></div>
        <div className="font-mono text-[11.5px] leading-[20px] text-ink-2">
          <div><span className="text-green">+</span> cells/02-sql.sql</div>
          <div><span className="text-green">+</span> cells/03-chart.json</div>
          <div><span className="text-ink-3">~</span> notebook.dime</div>
        </div>
        <div className="mt-3 rounded-[6px] bg-field px-2.5 py-2 text-[12px] text-ink shadow-[0_0_0_1px_var(--line)]">Rank by TS% with a 1,500 minute floor</div>
      </div>
      <div className="mt-auto flex items-end justify-between">
        <div>
          <div className="text-[11px] text-ink-3">Rows scanned</div>
          <div className="font-mono text-[22px] font-medium leading-[28px]"><NumberFlow value={scanned} className={dime ? "text-accent" : "text-ink"} /></div>
        </div>
        <span className={dime ? "hidden" : "font-mono text-[11px] text-ink-3"}>warehouse.duckdb</span>
      </div>
    </aside>
  );
}

export default function Workbench({ initialTab = "notebook", bare = false, tab: forced, dime = false }: { initialTab?: Tab; bare?: boolean; tab?: Tab; dime?: boolean }) {
  const [own, setTab] = useState<Tab>(initialTab);
  const tab = forced ?? own;
  return (
    <DimeCtx.Provider value={dime}>
    <div data-dime={dime ? "" : undefined} className="flex h-full min-h-0 w-full bg-canvas text-ink">
      {!bare && <LegacyRail tab={tab} setTab={setTab} dime={dime} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line px-3 md:px-4">
          {forced === undefined ? <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            <AnimatedBackground defaultValue={tab} className={dime ? "rounded-[8px] bg-surface shadow-[0_0_0_1px_rgba(20,18,12,0.04),0_1px_2px_rgba(20,18,12,0.04)]" : "rounded-[7px] bg-hover-2"} transition={{ type: "spring", bounce: 0.1, duration: 0.35 }} onValueChange={(v) => v && setTab(v as Tab)}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} data-id={id} type="button" className={`flex h-10 shrink-0 md:h-8 items-center gap-1.5 px-2.5 ${dime ? "text-[14px] font-medium" : "text-[13px]"} transition-colors ${tab === id ? "text-ink" : "text-ink-2 hover:text-ink"}`}>
                  <span className="flex items-center gap-1.5"><Icon size={dime ? 18 : 14} /><span className={tab === id ? "" : "max-sm:sr-only"}>{label}</span></span>
                </button>
              ))}
            </AnimatedBackground>
          </div> : <span className="font-mono text-[12px] text-ink-2">{forced}</span>}
          <div className={dime ? "hidden" : "hidden items-center gap-2 font-mono text-[11.5px] text-ink-3 sm:flex"}>
            <span>warehouse / true-shooting</span>
            {dime ? null : <Pill tone="ok">saved</Pill>}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease }}>
              {tab === "chat" && <Chat />}
              {tab === "notebook" && <Notebook />}
              {tab === "warehouse" && <Warehouse />}
              {tab === "skills" && <Skills />}
              {tab === "history" && <History />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={`shrink-0 border-t border-line p-3 md:px-6 ${bare && !dime ? "hidden" : ""}`}>
          <Composer />
        </div>
      </div>
      {!bare && <Inspector />}
    </div>
    </DimeCtx.Provider>
  );
}
