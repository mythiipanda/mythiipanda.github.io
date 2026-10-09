"use client";

import ThreadRail from "@/components/dime/ThreadRail";
import DataTable from "@/components/dime/DataTable";
import ToolRows from "@/components/dime/ToolRows";
import AutoChart from "@/components/dime/AutoChart";
import GlideMenu from "@/components/primitives/GlideMenu";
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

const dimeRows = [
  { label: "Read skill leaderboard", meta: "3ms", detail: "backend/v2/skills/leaderboard" },
  { label: "Write SQL", meta: "1.1s", detail: "cells/02-sql.sql" },
  { label: "Run on DuckDB", meta: "164 rows · 41ms", detail: "582 rows scanned in warehouse.duckdb" },
];

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
  return (
    <div className="composer-card chat-composer chat-composer-dock">
      <span style={{ flex: 1, fontSize: 13, color: "var(--color-ash-gray)", minWidth: 0 }} className="truncate">Ask a follow-up...</span>
      {live ? (
        <span className="pill-ghost" style={{ borderColor: "var(--color-cyan-signal)", color: "var(--color-cyan-edge)", fontSize: 13, padding: "4px 12px" }}>Stop {elapsed}s</span>
      ) : (
        <span aria-label="Send" style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-stone-muted)", color: "var(--color-warm-gray)" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </span>
      )}
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
            {dime ? <ToolRows rows={dimeRows} /> : <ToolChips steps={chatSteps} labels={{ header: "3 tool calls" }} />}
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
              {["Clutch splits?", "Compare Kennard and Duren", "Send to Project"].map((q, i) => (
                <button key={q} type="button" className={`h-10 rounded-full md:h-8 px-3 text-[12.5px] shadow-[0_0_0_1px_var(--line)] transition-colors hover:bg-hover ${i === 2 ? "bg-ink text-canvas hover:bg-ink" : "text-ink-2"}`}>{q}</button>
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
        <div className="px-1">{dime ? <ToolRows rows={dimeRows} /> : <ToolChips steps={chatSteps} labels={{ header: "3 tool calls" }} />}</div>
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

export function Warehouse() {
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
  return (
    <Shell title="Skills" source="backend/v2/skills" copyText="leaderboard, player-comparison, schedule-rest">
      <ul className="divide-y divide-line">
        {skills.map((s, i) => (
          <BlurFade key={s.name} delay={0.06 * i} duration={0.3}>
            <li className="flex gap-3 px-4 py-3.5">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-surface text-ink-2 shadow-[0_0_0_1px_var(--line)]"><Zap size={15} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <b className="truncate text-[14px] font-medium text-ink">{s.name}</b>
                  <span className="shrink-0 font-mono text-[11.5px] text-ink-3">{s.runs}</span>
                </div>
                <p className="mt-0.5 text-[13px] leading-[20px] text-ink-2">{s.text}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.steps.map((st, k) => (
                    <span key={st} className="inline-flex h-6 items-center gap-1.5 rounded-[6px] bg-surface px-2 text-[12px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">
                      <span className="font-mono text-[10.5px] tabular-nums text-ink-3">{k + 1}</span>{st}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          </BlurFade>
        ))}
      </ul>
    </Shell>
  );
}

export function History() {
  return (
    <div className="relative flex flex-col">
      <div className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
      {commits.map((c, i) => (
        <BlurFade key={c.ref} delay={0.06 * i} duration={0.3}>
          <div className="relative flex gap-5 py-3 pl-0">
            <span className={`relative z-[1] mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-canvas ${i === 0 ? "bg-accent" : "bg-[var(--bar-2)]"}`} />
            <div className="min-w-0 flex-1 rounded-[10px] px-4 py-3 shadow-[0_0_0_1px_var(--line)]">
              <div className="flex items-center justify-between gap-3">
                <b className="text-[14px] font-medium">{c.msg}</b>
                <span className="font-mono text-[11px] text-ink-3">{c.ref}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] text-ink-2">
                <span className="text-green">+{c.add}</span>
                <span className="text-red">-{c.del}</span>
                {c.files.map((f) => <span key={f} className="text-ink-3">{f}</span>)}
                <span className="ml-auto text-ink-3">{c.when}</span>
              </div>
            </div>
          </div>
        </BlurFade>
      ))}
      <div className="ml-8 overflow-hidden rounded-[10px] shadow-[0_0_0_1px_var(--line)]">
        <div className="border-b border-line bg-field px-4 py-2 font-mono text-[11px] text-ink-3">cells/04-chart.json</div>
        <pre className="p-4 font-mono text-[12px] leading-[20px]">
          <div className="text-green">+ {`{ "type": "bar", "x": "PLAYER_NAME",`}</div>
          <div className="text-green">+ {`  "y": "TS_PCT", "limit": 5 }`}</div>
        </pre>
      </div>
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

function LegacyRail({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <aside className="hidden w-[224px] shrink-0 flex-col border-r border-line bg-field pb-2 lg:flex">
      <div className="mb-2.5 flex h-10 items-center justify-between pl-4 pr-3.5">
        <span className="flex items-center gap-2 text-[14px] font-semibold"><CMark size={16} /><span>dime<span className="text-[var(--cobalt-tx)]">.</span></span></span>
        <SidebarSimple size={18} className="text-ink-3" />
      </div>
      <RailGroup>
        <RailRow icon={<PencilSimpleLine size={18} />} label="New analysis" onClick={() => setTab("chat")} />
      </RailGroup>
      <div className="mt-3">
        <RailGroup>
          <RailRow icon={<ChatCircle size={18} />} label="Chat" active={tab === "chat"} onClick={() => setTab("chat")} />
          <RailRow icon={<CalendarBlank size={18} />} label="Today" />
          <RailRow icon={<Compass size={18} />} label="Explore" />
        </RailGroup>
      </div>
      <div className="mt-4">
        <RailLabel>Analyses</RailLabel>
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
      <div className="mx-2 mt-auto border-t border-line pt-3">
        <div className="flex h-8 items-center gap-2 px-2 font-mono text-[12px] text-ink-2">
          <GitBranch size={16} className="text-ink-3" />main
        </div>
      </div>
    </aside>
  );
}

const threadSeed = [
  { id: "true-shooting", title: "Best true shooting 2025-26", hours: 0.2, turns: 2 },
  { id: "bench", title: "Thunder bench minutes", hours: 3, turns: 3 },
  { id: "onoff", title: "Luka on/off splits", hours: 30, turns: 4 },
  { id: "mvp", title: "MVP ladder, week 2", hours: 52, turns: 2 },
  { id: "slate", title: "Tonight's slate", hours: 150, turns: 1 },
];

function Rail({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const threads = threadSeed.map((t) => ({ id: t.id, title: t.title, turns: t.turns, updated: new Date(Date.now() - t.hours * 3600000).toISOString() }));
  return (
    <aside className="hidden w-[232px] shrink-0 lg:block">
      <ThreadRail threads={threads} active="true-shooting" onSelect={() => setTab("chat")} onNew={() => setTab("chat")} onHomeClick={() => setTab("chat")} onSearch={() => setTab("warehouse")} />
    </aside>
  );
}

export function Inspector() {
  const [scanned, setScanned] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setScanned(582), 1500);
    return () => clearTimeout(t);
  }, []);
  return (
    <aside className="hidden w-[248px] shrink-0 flex-col gap-5 border-l border-line bg-field p-4 xl:flex">
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
      <div className="rounded-[10px] bg-canvas p-3.5 shadow-[0_0_0_1px_var(--line)]">
        <div className="mb-2 flex items-center justify-between text-[11px] text-ink-3"><span>Staged</span><span className="font-mono">main</span></div>
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
          <div className="font-mono text-[22px] font-medium leading-[28px]"><NumberFlow value={scanned} className="text-ink" /></div>
        </div>
        <span className="font-mono text-[11px] text-ink-3">warehouse.duckdb</span>
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
      {!bare && (dime ? <Rail tab={tab} setTab={setTab} /> : <LegacyRail tab={tab} setTab={setTab} />)}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-line px-3 md:px-4">
          {forced === undefined ? <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
            <AnimatedBackground defaultValue={tab} className="rounded-[7px] bg-hover-2" transition={{ type: "spring", bounce: 0.1, duration: 0.35 }} onValueChange={(v) => v && setTab(v as Tab)}>
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} data-id={id} type="button" className={`flex h-10 shrink-0 md:h-8 items-center gap-1.5 px-2.5 text-[13px] transition-colors ${tab === id ? "text-ink" : "text-ink-2 hover:text-ink"}`}>
                  <span className="flex items-center gap-1.5"><Icon size={14} /><span className={tab === id ? "" : "max-sm:sr-only"}>{label}</span></span>
                </button>
              ))}
            </AnimatedBackground>
          </div> : <span className="font-mono text-[12px] text-ink-2">{forced}</span>}
          <div className="hidden items-center gap-2 font-mono text-[11.5px] text-ink-3 sm:flex">
            <span>warehouse / true-shooting</span>
            <Pill tone="ok">saved</Pill>
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
        <div className={`shrink-0 border-t border-line p-3 md:px-6 ${bare ? "hidden" : ""}`}>
          <Composer />
        </div>
      </div>
      {!bare && <Inspector />}
    </div>
    </DimeCtx.Provider>
  );
}
