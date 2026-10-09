"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ArrowUp, FolderOpen, Zap, Database, GitCommitHorizontal, NotebookPen, CornerDownLeft, GitBranch, ChevronDown, Search } from "lucide-react";
import { DimeMark } from "@/components/product/DimeMark";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberFlow } from "@/components/ui/number-flow";
import { Kbd } from "@/components/ui/kbd";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { projects, skills, tables, schema, commits, rows, runSteps } from "./data";
import { Cell, Pill, Sql, Tick } from "./Primitives";
import { Shell, SortTable } from "./Artifact";

export type Tab = "chat" | "notebook" | "warehouse" | "skills" | "history";
const tabs: { id: Tab; label: string; icon: typeof NotebookPen }[] = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "notebook", label: "Notebook", icon: NotebookPen },
  { id: "warehouse", label: "Warehouse", icon: Database },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "history", label: "History", icon: GitCommitHorizontal },
];

const ease = [0.23, 1, 0.32, 1] as const;

export function Chat() {
  return (
    <div className="mx-auto flex max-w-[680px] flex-col gap-5">
      <BlurFade delay={0.05} inView={false}>
        <div className="ml-auto max-w-[520px] rounded-[14px] rounded-br-[4px] bg-field px-3.5 py-2.5 text-[14px] leading-[22px] text-ink shadow-[0_0_0_1px_var(--line)]">
          Who had the best true shooting in 2025-26 with 1,500 or more minutes?
        </div>
      </BlurFade>
      <BlurFade delay={0.4}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {runSteps.slice(0, 3).map((st) => (
              <span key={st.label} className="inline-flex h-6 items-center gap-1.5 rounded-full bg-field px-2.5 text-[11.5px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">
                <Tick />
                {st.label}
                <span className="font-mono text-ink-3">{st.ms}</span>
              </span>
            ))}
          </div>
          <p className="text-[14px] leading-[22px] text-ink">
            <b className="font-medium">Luke Kennard leads at 68.9%</b> on 13.1 usage. Jalen Duren is a tenth behind at 68.8%. 164 players clear the 1,500 minute floor.
          </p>
          <Shell title="True shooting leaders" source="silver_advanced · 5 of 164" copyText="select PLAYER_NAME, TEAM_ABBREVIATION, TS_PCT, USG_PCT from silver_advanced where GP * MIN >= 1500">
            <SortTable
              columns={[{ key: "p", label: "Player" }, { key: "t", label: "Team" }, { key: "ts", label: "TS%", numeric: true }, { key: "u", label: "USG%", numeric: true }]}
              rows={rows.map((r) => [r.player, r.team, r.ts.toFixed(1), r.usg.toFixed(1)])}
            />
          </Shell>
          <div className="flex flex-wrap gap-1.5">
            {["Clutch splits?", "Compare Kennard and Duren", "Send to Project"].map((q, i) => (
              <button key={q} type="button" className={`h-10 rounded-full md:h-8 px-3 text-[12.5px] shadow-[0_0_0_1px_var(--line)] transition-colors hover:bg-hover ${i === 2 ? "bg-ink text-canvas hover:bg-ink" : "text-ink-2"}`}>{q}</button>
            ))}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

export function Notebook() {
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
        <div className="flex flex-wrap items-center gap-1.5 px-1">
          {runSteps.slice(0, 3).map((st) => (
            <span key={st.label} className="inline-flex h-6 items-center gap-1.5 rounded-full bg-field px-2.5 text-[11.5px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">
              <Tick />
              {st.label}
              <span className="font-mono text-ink-3">{st.ms}</span>
            </span>
          ))}
        </div>
      </BlurFade>
      <BlurFade delay={0.45}>
        <Cell n={2} kind="sql" meta={<span className="flex items-center gap-2"><Pill tone="ok">ran 41 ms</Pill><span className="font-mono">164 rows</span></span>}>
          <Sql />
          <div className="mt-3">
            <Shell title="Result" source="5 of 164 rows">
              <SortTable
                columns={[{ key: "p", label: "Player" }, { key: "t", label: "Team" }, { key: "ts", label: "TS%", numeric: true }, { key: "u", label: "USG%", numeric: true }]}
                rows={rows.map((r) => [r.player, r.team, r.ts.toFixed(1), r.usg.toFixed(1)])}
              />
            </Shell>
          </div>
        </Cell>
      </BlurFade>
      <BlurFade delay={0.85}>
        <Cell n={3} kind="chart" meta={<span className="font-mono">ts% · top 5 of 164</span>}>
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
            <li className="px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <b className="flex min-w-0 items-center gap-2 font-mono text-[13px] font-medium"><Zap size={14} className="shrink-0 text-ink-3" /><span className="truncate">{s.name}</span></b>
                <span className="shrink-0 font-mono text-[11.5px] text-ink-3">{s.runs}</span>
              </div>
              <p className="mt-1 text-[13px] leading-[20px] text-ink-2">{s.text}</p>
              <p className="mt-2 font-mono text-[11.5px] leading-[18px] text-ink-3">{s.steps.join("  /  ")}</p>
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

function Rail({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <aside className="hidden w-[232px] shrink-0 flex-col border-r border-line bg-field lg:flex">
      <div className="flex h-12 items-center justify-between px-3.5">
        <span className="flex items-center gap-2 text-[14px] font-semibold"><DimeMark size={17} /><span>dime<span className="text-[var(--cobalt-tx)]">.</span></span></span>
        <Search size={14} className="text-ink-3" />
      </div>
      <div className="px-2">
        <button type="button" onClick={() => setTab("notebook")} className="flex h-8 w-full items-center justify-between rounded-[7px] px-2 text-[13px] text-ink-2 shadow-[0_0_0_1px_var(--line)] hover:bg-hover">
          <span className="flex items-center gap-2 text-ink"><FolderOpen size={14} />nba-2025</span>
          <ChevronDown size={14} />
        </button>
      </div>
      <div className="mt-4 px-3.5 text-[11px] text-ink-3">Notebooks</div>
      <nav className="mt-1.5 flex flex-col gap-0.5 px-2">
        {projects.map((p) => (
          <button key={p.name} type="button" onClick={() => setTab("notebook")} className={`flex h-8 items-center justify-between rounded-[7px] px-2 text-[13px] ${p.active ? "bg-hover-2 text-ink" : "text-ink-2 hover:bg-hover"}`}>
            <span className="flex items-center gap-2 truncate font-mono text-[12px]"><NotebookPen size={13} className="text-ink-3" />{p.name}</span>
            <span className="font-mono text-[10.5px] text-ink-3">{p.cells}</span>
          </button>
        ))}
      </nav>
      <div className="mt-5 px-3.5 text-[11px] text-ink-3">Skills</div>
      <nav className="mt-1.5 flex flex-col gap-0.5 px-2">
        {skills.map((s) => (
          <button key={s.name} type="button" onClick={() => setTab("skills")} className="flex h-8 items-center gap-2 rounded-[7px] px-2 font-mono text-[12px] text-ink-2 hover:bg-hover">
            <Zap size={13} className="text-ink-3" />{s.name}
          </button>
        ))}
      </nav>
      <div className="mt-5 px-3.5 text-[11px] text-ink-3">Warehouse</div>
      <nav className="mt-1.5 flex flex-col gap-0.5 px-2">
        {tables.slice(0, 4).map((t) => (
          <button key={t.name} type="button" onClick={() => setTab("warehouse")} className="flex h-8 items-center gap-2 rounded-[7px] px-2 font-mono text-[12px] text-ink-2 hover:bg-hover">
            <Database size={13} className="text-ink-3" />{t.name}
          </button>
        ))}
      </nav>
      <div className="mt-auto flex h-10 items-center gap-2 border-t border-line px-3.5 font-mono text-[11.5px] text-ink-2">
        <GitBranch size={13} className="text-ink-3" />main
        <span className="ml-auto text-ink-3">4 ahead</span>
      </div>
    </aside>
  );
}

export function Inspector() {
  const [scanned, setScanned] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setScanned(31204), 1500);
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

export default function Workbench({ initialTab = "notebook", bare = false, tab: forced }: { initialTab?: Tab; bare?: boolean; tab?: Tab }) {
  const [own, setTab] = useState<Tab>(initialTab);
  const tab = forced ?? own;
  return (
    <div className="flex h-full min-h-0 w-full bg-canvas text-ink">
      {!bare && <Rail tab={tab} setTab={setTab} />}
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
          <div className="flex h-11 items-center gap-3 rounded-[10px] bg-field px-3.5 shadow-[0_0_0_1px_var(--line-strong)]">
            <span className="flex-1 truncate text-[13.5px] text-ink-3">Ask a question, or press <Kbd>/</Kbd> for skills and <Kbd>@</Kbd> for tables</span>
            <span className="hidden items-center gap-1 text-[11px] text-ink-3 sm:flex">Run <CornerDownLeft size={12} /></span>
          </div>
        </div>
      </div>
      {!bare && <Inspector />}
    </div>
  );
}
