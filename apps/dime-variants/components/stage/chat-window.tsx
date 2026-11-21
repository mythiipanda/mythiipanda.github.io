"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeftRightIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  DatabaseIcon,
  DownloadIcon,
  FileTextIcon,
  HouseIcon,
  Maximize2Icon,
  MessageSquareIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  TableIcon,
  InboxIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Headshot } from "./app-shell";
import DiffTable from "../beautiful/primitives/DiffTable";
import ToolChips, { type ToolStep } from "../beautiful/primitives/ToolChips";
import ThinkingState from "../beautiful/primitives/ThinkingState";
import ApprovalCard from "../beautiful/primitives/ApprovalCard";
import SidebarNav, { type SidebarRecent } from "../beautiful/primitives/SidebarNav";
import PromptBar from "../beautiful/primitives/PromptBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSortHead, type TableSort } from "../beautiful/primitives/Table";
import StreamingText, { type StreamingSource, type StreamingToken } from "../beautiful/primitives/StreamingText";
import { Kbd } from "../beautiful/primitives/Kbd";
import { Button } from "../beautiful/primitives/Button";
import PanelTabs, { PanelIconButton, type PanelTab } from "../beautiful/primitives/PanelTabs";
import { IconSettingsGear1 } from "../beautiful/icons";

const CHATS: SidebarRecent[] = [
  { id: "c1", label: "true shooting leaders", time: "11:42" },
  { id: "c2", label: "giannis-ad trade check", status: { label: "Approval", icon: "approval" } },
  { id: "c3", label: "bench scoring, last 20", status: { label: "Done", icon: "done" } },
  { id: "c4", label: "season: mid points", status: { label: "Working", icon: "working", dur: "4m" } },
];

function Composer({ focused = false }: { focused?: boolean }) {
  return (
    <PromptBar
      variant="Rounded"
      demo={false}
      tall
      placeholder={focused ? "Ask anything. @ players, / boards, $ trades" : "Ask anything"}
    />
  );
}

function fillComposer(text: string) {
  const ta = document.querySelector<HTMLTextAreaElement>("textarea");
  if (!ta) return;
  const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
  set.call(ta, text);
  ta.dispatchEvent(new Event("input", { bubbles: true }));
  ta.focus();
}

const PROMPT_CHIPS = [
  { label: "game prep", prompt: "Game prep for tonight's matchup", icon: FileTextIcon },
  { label: "trade check", prompt: "Check this trade for apron issues: ", icon: PinIcon },
  { label: "scout a lineup", prompt: "Scout this lineup: ", icon: SearchIcon },
  { label: "morning report", prompt: "Build this morning's league report", icon: HouseIcon },
];

function HomeCanvas() {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center px-6">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface shadow-[0_0_0_1px_var(--line)]">
        <span className="font-serif text-[20px] leading-none tracking-[-0.02em] text-ink">
          d<span className="text-accent">.</span>
        </span>
      </span>
      <h2 className="mt-5 text-center font-serif text-[26px] leading-tight tracking-[-0.01em] text-ink">
        Ask Dime anything.
      </h2>
      <div className="mt-7 w-full max-w-[520px]">
        <Composer focused />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {PROMPT_CHIPS.map((c) => (
            <Button key={c.label} variant="secondary" size="xs" onClick={() => fillComposer(c.prompt)}>
              <c.icon className="size-3 text-icon-muted" />
              {c.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-8 text-xs text-secondary-label">
        <span className="tabular-nums">58 tables · 14.9M rows on disk</span>
      </div>
    </div>
  );
}

export function CiteChip({ children }: { children: ReactNode }) {
  return (
    <sup className="ml-0.5 inline-flex h-4 items-center rounded-[3px] bg-accent/10 px-1 font-mono text-[9.5px] font-medium leading-none text-accent-ink">
      {children}
    </sup>
  );
}

function TradeArtifact() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <DiffTable
        title="WAS receives"
        rows={[
          { key: "ad", id: "Anthony Davis", dept: "Player", email: "$58.5M · MIA", removed: true },
        ]}
        added={[
          { key: "giannis", id: "Giannis Antetokounmpo", dept: "Player", email: "$58.5M · MIL" },
          { key: "p1", id: "2028 1st (top-4)", dept: "Pick", email: "MIA" },
          { key: "p2", id: "2030 pick swap", dept: "Pick", email: "MIA" },
        ]}
      />
      <div className="flex items-center gap-2 rounded-lg bg-canvas px-3 py-2.5 ring-1 ring-inset ring-line">
        <span className="w-14 text-[11px] font-medium text-secondary-label">cap hit</span>
        <div className="h-[5px] flex-1 rounded-full bg-field">
          <div className="h-full rounded-full bg-accent/70" style={{ width: "35.3%" }} />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-ink-2">35.3%</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-ink-2">
          <CheckIcon className="size-3 text-accent-ink" />legal
        </span>
      </div>
    </div>
  );
}

function ReportArtifact() {
  return (
    <div className="min-h-0 flex-1 overflow-hidden px-4 py-4">
      <h3 className="text-[14px] font-semibold text-ink">Midseason efficiency review</h3>
      <p className="mt-3 text-[13px] leading-6 text-ink-2">
        Among <span className="font-medium text-ink">164 rotation players</span>, Luke Kennard leads at{" "}
        <span className="font-mono text-[12px] text-ink">68.9%</span> true shooting<CiteChip>1</CiteChip>, edging Jalen Duren
        on nearly twice the usage.
      </p>
      <p className="mt-2.5 text-[13px] leading-6 text-ink-2">
        Nikola Jokić remains the workload outlier, top-five efficiency at{" "}
        <span className="font-mono text-[12px] text-ink">28.9%</span> usage.<CiteChip>2</CiteChip>
      </p>
      <div className="mt-3 rounded-lg bg-field p-3">
        <div className="mb-2 text-[11px] font-medium text-secondary-label">exhibit 1</div>
        <Table variant="default" size="xs" scrollFade={false} containerClassName="overflow-visible">
          <TableBody>
            {SCOUT_ROWS.slice(0, 3).map((p) => (
              <TableRow key={p.name} className="bg-transparent hover:bg-transparent">
                <TableCell className="border-line/60 py-1 text-[12px] font-medium text-ink">{p.name}</TableCell>
                <TableCell align="end" className="border-line/60 py-1 font-mono text-[11px] text-ink-2">{p.ts}</TableCell>
                <TableCell align="end" className="w-8 border-line/60 py-1 font-mono text-[11px] text-ink-3">{p.usg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const SCOUT_ROWS = [
  { img: "/dime-site/headshots/kennard.png", name: "Luke Kennard", team: "LAL", ts: "68.9", usg: "13.1" },
  { img: "/dime-site/headshots/duren.png", name: "Jalen Duren", team: "DET", ts: "68.8", usg: "23.1" },
  { img: "/dime-site/headshots/ayton.png", name: "Deandre Ayton", team: "LAL", ts: "67.6", usg: "16.4" },
  { img: "/dime-site/headshots/queta.png", name: "Neemias Queta", team: "BOS", ts: "67.4", usg: "14.5" },
  { img: "/dime-site/headshots/jokic.png", name: "Nikola Jokić", team: "DEN", ts: "67.0", usg: "28.9" },
  { img: "/dime-site/headshots/sga.png", name: "Shai Gilgeous-Alexander", team: "OKC", ts: "63.7", usg: "31.4" },
  { img: "/dime-site/headshots/giannis.png", name: "Giannis Antetokounmpo", team: "MIL", ts: "62.5", usg: "30.6" },
  { img: "/dime-site/headshots/curry.png", name: "Stephen Curry", team: "GSW", ts: "61.8", usg: "29.4" },
];

const ARTIFACT_META: Record<string, { title: string; tab: string; icon: PanelTab["icon"] }> = {
  board: { title: "true shooting leaders", tab: "leaders", icon: TableIcon },
  trade: { title: "giannis ↔ davis", tab: "trade", icon: ArrowLeftRightIcon },
  report: { title: "midseason review", tab: "review", icon: FileTextIcon },
};

const ARTIFACT_TABS: PanelTab[] = ["board", "trade", "report"].map((id) => ({
  id,
  title: ARTIFACT_META[id].tab,
  icon: ARTIFACT_META[id].icon,
}));

function PanelStateView({ icon: Icon, title, hint, action }: { icon: PanelTab["icon"]; title: string; hint: string; action?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 px-4 py-8">
      <span className="mb-1.5 flex size-8 items-center justify-center rounded-lg bg-inset text-ink-3 ring-1 ring-inset ring-line">
        <Icon className="size-4" />
      </span>
      <span className="text-[13px] font-medium text-ink">{title}</span>
      <span className="text-[12px] text-ink-3">{hint}</span>
      {action && (
        <Button variant="secondary" size="xs" className="mt-2">
          {action}
        </Button>
      )}
    </div>
  );
}

export function ArtifactPanel({ skeleton = false, kind = "board", framed = false, wide = false, panelState, extraTabs }: { skeleton?: boolean; kind?: string; framed?: boolean; wide?: boolean; panelState?: "empty" | "error"; extraTabs?: PanelTab[] }) {
  const [open, setOpen] = useState(kind);
  const meta = ARTIFACT_META[open];
  const known = Boolean(meta);
  const [sort, setSort] = useState<TableSort>({ id: "ts", desc: true });
  const [sel, setSel] = useState<string | null>(null);
  const toggleSort = (id: string) =>
    setSort((cur) => (cur?.id === id ? (cur.desc ? { id, desc: false } : undefined) : { id, desc: true }));
  const boardRows = [...SCOUT_ROWS].sort((a, b) => {
    if (!sort) return 0;
    const key = sort.id as "ts" | "usg" | "player";
    const va: string | number = key === "player" ? a.name : Number(a[key]);
    const vb: string | number = key === "player" ? b.name : Number(b[key]);
    return (typeof va === "string" ? va.localeCompare(vb as string) : (va as number) - (vb as number)) * (sort.desc ? -1 : 1);
  });
  const [added, setAdded] = useState<PanelTab[]>([]);
  const [expanded, setExpanded] = useState(false);
  const tabs = [...ARTIFACT_TABS, ...added, ...(extraTabs ?? [])];
  const addTab = () => {
    const id = `draft-${added.length + 1}`;
    setAdded((a) => [...a, { id, title: `untitled-${added.length + 1}.md`, icon: FileTextIcon }]);
    setOpen(id);
  };
  const copyTitle = () => navigator.clipboard?.writeText(meta?.title ?? open);
  const exportCsv = () => {
    const csv = "player,team,ts,usg\n" + SCOUT_ROWS.map((p) => `${p.name},${p.team},${p.ts},${p.usg}`).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `${open}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const askAbout = () => document.querySelector<HTMLTextAreaElement>("textarea")?.focus();
  const outer = framed
    ? "flex h-full w-full flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-inset ring-line"
    : expanded || wide
      ? "hidden w-[58%] min-w-[400px] shrink-0 flex-col border-l border-line bg-surface md:flex"
      : "hidden w-[46%] min-w-[360px] max-w-[440px] shrink-0 flex-col border-l border-line bg-surface md:flex";
  return (
    <section className={outer}>
      <PanelTabs
        tabs={tabs}
        activeId={open}
        onSelect={setOpen}
        afterTabs={<PanelIconButton icon={PlusIcon} label="open artifact" onClick={addTab} />}
        trailing={
          <PanelIconButton icon={Maximize2Icon} label={expanded ? "shrink" : "expand"} onClick={() => setExpanded((e) => !e)} />
        }
      />
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-line px-3">
        {meta && <meta.icon className="size-3.5 shrink-0 text-icon-muted" />}
        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{meta?.title ?? open}</span>
        <span className="flex shrink-0 items-center gap-0.5">
          <PanelIconButton icon={CopyIcon} label="copy title" onClick={copyTitle} />
          <PanelIconButton icon={DownloadIcon} label="export csv" onClick={exportCsv} />
          <PanelIconButton icon={MessageSquareIcon} label="chat about" onClick={askAbout} />
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {(panelState === "empty" || (!panelState && !known)) && (
          <PanelStateView icon={InboxIcon} title="No artifacts open" hint="Answers can be pinned here" />
        )}
        {panelState === "error" && (
          <PanelStateView icon={TriangleAlertIcon} title="Couldn't load this artifact" hint="The query failed to run" action="Retry" />
        )}
        {!panelState && known && open === "trade" && <TradeArtifact />}
        {!panelState && known && open === "report" && <ReportArtifact />}
        {!panelState && known && open === "board" && (
        <Table variant="default" size="xs" scrollFade stickyHeader containerClassName="h-full" className="[--table-hover:var(--hover-2)]">
          <TableHeader>
            <TableRow>
              <TableSortHead id="player" sort={sort} onSort={toggleSort} title="player" className="text-[11px]" />
              <TableSortHead id="ts" sort={sort} onSort={toggleSort} title="ts%" align="end" className="text-[11px]" />
              <TableSortHead id="usg" sort={sort} onSort={toggleSort} title="usg%" align="end" className="text-[11px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeleton
              ? boardRows.slice(0, 3).map((p) => (
                  <TableRow key={p.name}>
                    <TableCell>
                      <span className="flex h-8 items-center gap-2">
                        <span className="size-[18px] animate-pulse rounded-full bg-field" />
                        <span className="flex flex-col gap-1">
                          <span className="h-2 w-20 animate-pulse rounded bg-field" />
                          <span className="h-1.5 w-8 animate-pulse rounded bg-field" />
                        </span>
                      </span>
                    </TableCell>
                    <TableCell align="end">
                      <span className="inline-block h-2.5 w-8 animate-pulse rounded bg-field" />
                    </TableCell>
                    <TableCell align="end">
                      <span className="inline-block h-2.5 w-8 animate-pulse rounded bg-field" />
                    </TableCell>
                  </TableRow>
                ))
              : boardRows.map((p) => (
                  <TableRow
                    key={p.name}
                    onClick={() => setSel((cur) => (cur === p.name ? null : p.name))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSel((cur) => (cur === p.name ? null : p.name));
                      }
                    }}
                    tabIndex={0}
                    className={`cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${sel === p.name ? "bg-accent-tint/60 hover:bg-accent-tint/60" : ""}`}
                  >
                    <TableCell>
                      <span className="flex h-8 items-center gap-2">
                        <Headshot src={p.img} alt={p.name} size={18} />
                        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{p.name}</span>
                        <span className="w-8 shrink-0 text-right font-mono text-[11px] text-ink-3">{p.team}</span>
                      </span>
                    </TableCell>
                    <TableCell align="end" className="text-[13px] tabular-nums text-ink">{p.ts}</TableCell>
                    <TableCell align="end" className="text-[13px] tabular-nums text-ink-3">{p.usg}</TableCell>

                  </TableRow>
                ))}
          </TableBody>
        </Table>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-surface to-transparent" />
      </div>
    </section>
  );
}

const tblImg = (rows: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#2f6fec"/><g stroke="#fff" stroke-width="6" stroke-linecap="round">${rows}</g></svg>`
  )}`;

const STREAM_SOURCES: Record<string, StreamingSource[]> = {
  board: [
    { name: "Player seasons", domain: "silver_hist_player_seasons", href: "#", image: tblImg('<path d="M16 24h32M16 34h32M16 44h24"/>') },
    { name: "Shot zones", domain: "silver_hist_shots", href: "#", image: tblImg('<path d="M16 44l10-12 8 6 14-16"/>') },
  ],
  trade: [
    { name: "Contracts", domain: "silver_contracts", href: "#", image: tblImg('<path d="M20 44V28M32 44V20M44 44V32"/>') },
    { name: "Apron rules", domain: "cba_2023", href: "#", image: tblImg('<path d="M16 24h32M16 34h32M16 44h24"/>') },
  ],
  report: [
    { name: "Player seasons", domain: "silver_hist_player_seasons", href: "#", image: tblImg('<path d="M16 24h32M16 34h32M16 44h24"/>') },
    { name: "Game logs", domain: "silver_hist_gamelogs", href: "#", image: tblImg('<path d="M16 44l10-12 8 6 14-16"/>') },
  ],
};

const STREAMS: Record<string, { content: StreamingToken[]; followUps: string[] }> = {
  board: {
    content: [
      ..."Among 164 rotation players, Luke Kennard leads at 68.9% true shooting".split(" ").map((text) => ({ text })),
      { text: "", cite: true },
      ..."Jalen Duren is second at 68.8 on nearly twice the usage.".split(" ").map((text) => ({ text })),
      { text: "", cite: true },
    ],
    followUps: ["Who leads among centers only", "Compare to last season's leaders"],
  },
  trade: {
    content: [
      ..."It clears. $58.5M for $58.5M is an even swap".split(" ").map((text) => ({ text })),
      { text: "", cite: true },
      ..."Miami lands at 35.3% cap hit, inside the apron.".split(" ").map((text) => ({ text })),
      { text: "", cite: true },
    ],
    followUps: ["What if Miami adds a pick", "Salary breakdown by year"],
  },
  report: {
    content: [
      ..."Drafted a one-page review. Kennard, Duren, Ayton headline it".split(" ").map((text) => ({ text })),
      { text: "", cite: true },
      ..."Ready to export.".split(" ").map((text) => ({ text })),
      { text: "", cite: true },
    ],
    followUps: ["Add the defensive leaders", "Export as PDF"],
  },
};

const THREADS: Record<string, { q: string; steps: ToolStep[]; link: string }> = {
  board: {
    q: "Who leads the league in true shooting?",
    steps: [
      { icon: "run", label: "Query player stats", chip: "164 rotation players", mono: false, detailMono: false, detail: [{ text: "✓ minutes cutoff applied" }, { text: "✓ ordered by ts% desc" }] },
      { icon: "think", label: "Resolve player names", chip: "8 headshots", mono: false, detailMono: false, detail: [{ text: "matched players to headshots" }] },
    ],
    link: "true shooting leaders",
  },
  trade: {
    q: "Giannis for Anthony Davis straight up. Does it clear the cap?",
    steps: [
      { icon: "run", label: "Resolve salaries", chip: "$58.5M each", mono: false, detailMono: false, detail: [{ text: "✓ both on max contracts" }] },
      { icon: "think", label: "Check apron rules", chip: "35.3% cap hit", mono: false, detailMono: false, detail: [{ text: "✓ inside the apron" }] },
    ],
    link: "giannis ↔ davis",
  },
  report: {
    q: "Write up the midseason efficiency leaders for the morning meeting.",
    steps: [
      { icon: "run", label: "Query player stats", chip: "164 rotation players", mono: false, detailMono: false, detail: [{ text: "✓ minutes cutoff applied" }] },
      { icon: "write", label: "Draft midseason review", chip: "1 page · 2 citations", mono: false, detailMono: false, detail: [] },
    ],
    link: "midseason review",
  },
};

function ThreadLane({ pending = false, kind = "board", inlineArtifact = false }: { pending?: boolean; kind?: string; inlineArtifact?: boolean }) {
  const t = THREADS[kind] ?? THREADS.board;
  return (
    <div className="mx-auto flex h-full w-full max-w-[46rem] flex-col justify-end gap-2.5 px-5 py-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 6%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 6%)" }}>
      <div className="group flex flex-col items-end">
        <span className="min-w-0 max-w-[80%] rounded-2xl bg-message-surface px-3 py-2 text-[15px] leading-6 text-ink">
          {t.q}
        </span>
        <span className="flex items-center gap-2 pe-1 pt-0.5 text-xs tabular-nums text-secondary-label opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="cursor-pointer hover:underline" onClick={() => navigator.clipboard?.writeText(t.q)}>
            copy
          </span>
        </span>
      </div>
      {pending ? (
        <ThinkingState
          variant="Steps"
          active="Working"
          done="Working"
          rows={t.steps.map((s) => ({ primary: s.label.replace(/^(Query|Resolve|Check|Draft)/, "$1ing"), secondary: s.chip }))}
        />
      ) : (
        <ToolChips
          className="max-w-none"
          steps={t.steps}
          diffs={[]}
          labels={{ header: `${t.steps.length} tool calls` }}
        />
      )}
      {!pending && (
        <div className="mt-1">
          <StreamingText
            fill
            loop={false}
            content={STREAMS[kind]?.content ?? STREAMS.board.content}
            sources={STREAM_SOURCES[kind] ?? STREAM_SOURCES.board}
            followUps={STREAMS[kind]?.followUps ?? []}
            onFollowUp={fillComposer}
            labels={{ sources: "2 sources" }}
          />
          {inlineArtifact ? (
            <div className="mt-3 max-w-[560px]">
              <ArtifactPanel kind={kind} framed />
            </div>
          ) : kind === "trade" ? (
            <div className="mt-3 max-w-[380px]">
              <ApprovalCard
                questions={[
                  { q: "Where does this trade check land?", type: "radio", options: ["deadline deals board", "cap room board"] },
                  { q: "Flag anything else for review?", type: "check", options: ["notify the beat writer", "add to morning packet"] },
                ]}
                labels={{ send: "Pin", sentMessage: "Pinned to board" }}
              />
            </div>
          ) : (
            <div className="mt-3 flex h-8 w-fit items-center gap-1.5 rounded-md bg-surface px-2.5 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line">
              <PinIcon className="size-3 text-accent-ink" />
              {t.link}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ChatWindow({ state = "split", artifact = "board", rail = true, layout = "split" }: { state?: "home" | "split" | "pending"; artifact?: string; rail?: boolean; layout?: "split" | "inline" | "focus" }) {
  const isHome = state === "home";
  return (
    <div className="flex h-full min-h-0 w-full bg-canvas text-ink">
      {rail && (
        <SidebarNav
          fill
          className="hidden border-r border-sidebar-border bg-sidebar lg:flex"
          recents={CHATS}
          activeTitle={isHome ? null : "true shooting leaders"}
          activeNav={isHome ? "home" : "chats"}
          footerLabel="Settings"
          footerIcon={<IconSettingsGear1 size={15} />}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-line pl-3 pr-3 md:pl-5 md:pr-5">
          {!rail && (
            <>
              <span className="font-serif text-[16px] text-ink">dime.</span>
              <span className="inline-flex h-7 max-w-[320px] flex-1 items-center gap-2 rounded-md bg-field px-2.5 text-[13px] text-secondary-label ring-1 ring-inset ring-line">
                <SearchIcon className="size-3.5 text-icon-muted" />
                Search or ask
                <Kbd variant="outline" className="ml-auto">⌘K</Kbd>
              </span>
            </>
          )}
          <nav className="min-w-0">
            <ol className="m-0 flex min-w-0 list-none items-center gap-2 p-0 text-sm">
              {isHome ? (
                <li className="font-medium text-ink">{rail ? "Home" : ""}</li>
              ) : (
                <>
                  <li className="text-secondary-label">Chats</li>
                  <li className="text-icon-muted">/</li>
                  <li className="min-w-0 truncate font-medium text-ink">{(THREADS[artifact] ?? THREADS.board).link}</li>
                </>
              )}
            </ol>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-accent-tint font-mono text-[11px] font-medium text-accent-ink">
              TL
            </span>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {isHome ? (
            <HomeCanvas />
          ) : (
            <>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-hidden">
                  <ThreadLane pending={state === "pending"} kind={artifact} inlineArtifact={layout === "inline"} />
                </div>
                <div className="shrink-0 px-5 pb-4">
                  <div className="mx-auto w-full max-w-[46rem]">
                    <Composer />
                  </div>
                </div>
              </div>
              {layout !== "inline" && <ArtifactPanel skeleton={state === "pending"} kind={artifact} wide={layout === "focus"} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
