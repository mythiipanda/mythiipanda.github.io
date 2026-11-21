import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  DatabaseIcon,
  DownloadIcon,
  FileTextIcon,
  HouseIcon,
  MessageSquareIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Headshot } from "./app-shell";
import { Spark } from "./stills";
import ToolChips, { type ToolStep } from "../beautiful/primitives/ToolChips";
import ThinkingState from "../beautiful/primitives/ThinkingState";
import ApprovalCard from "../beautiful/primitives/ApprovalCard";
import SidebarNav, { type SidebarRecent } from "../beautiful/primitives/SidebarNav";
import PromptBar from "../beautiful/primitives/PromptBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../beautiful/primitives/Table";
import StreamingText, { type StreamingSource, type StreamingToken } from "../beautiful/primitives/StreamingText";
import { Kbd } from "../beautiful/primitives/Kbd";
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
      tall={focused}
      placeholder="Ask anything. @ players, / boards, $ trades"
    />
  );
}

const PROMPT_CHIPS = [
  { label: "game prep", icon: FileTextIcon },
  { label: "trade check", icon: PinIcon },
  { label: "scout a lineup", icon: SearchIcon },
  { label: "morning report", icon: HouseIcon },
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
        Ask the warehouse anything.
      </h2>
      <div className="mt-7 w-full max-w-[520px]">
        <Composer focused />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {PROMPT_CHIPS.map((c) => (
            <span
              key={c.label}
              className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full bg-surface px-3 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line transition-colors hover:bg-hover hover:text-ink"
            >
              <c.icon className="size-3 text-icon-muted" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 text-xs text-secondary-label">
        <span className="tabular-nums">58 tables · 14.9M rows on disk</span>
      </div>
    </div>
  );
}

function CiteChip({ children }: { children: ReactNode }) {
  return (
    <sup className="ml-0.5 inline-flex h-4 items-center rounded-sm border border-accent/40 bg-accent/10 px-1 font-mono text-[9.5px] font-medium leading-none text-accent-ink">
      {children}
    </sup>
  );
}

function TradeArtifact() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {[
        { team: "MIA", label: "receives", rows: [["Anthony Davis", "davis", "58.5"]], sends: "Giannis Antetokounmpo" },
        { team: "WAS", label: "receives", rows: [["Giannis Antetokounmpo", "giannis", "58.5"]], picks: ["2028 1st (top-4 prot.)", "2030 pick swap"], sends: "Anthony Davis" },
      ].map((side) => (
        <div key={side.team} className="overflow-hidden rounded-lg bg-canvas ring-1 ring-inset ring-line">
          <div className="flex h-9 items-center justify-between border-b border-line px-3">
            <span className="font-mono text-[12px] font-medium text-ink">{side.team}</span>
            <span className="text-[11px] font-medium text-secondary-label">{side.label}</span>
          </div>
          <div className="p-2">
            {side.rows.map(([name, img, sal]) => (
              <div key={name as string} className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5">
                <Headshot src={`/dime-site/headshots/${img}.png`} alt={name as string} size={26} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-ink">{name}</div>
                  <div className="font-mono text-[11px] text-ink-3">${sal}M</div>
                </div>
                <span className="text-[11px] font-medium text-secondary-label">in</span>
              </div>
            ))}
            {(side.picks ?? []).map((pk) => (
              <div key={pk} className="flex items-center gap-2.5 px-1.5 py-1.5">
                <span className="flex size-[26px] items-center justify-center rounded-full bg-field text-[9.5px] font-medium text-secondary-label ring-1 ring-inset ring-line">pk</span>
                <span className="flex-1 text-[12px] text-ink-2">{pk}</span>
                <span className="text-[11px] font-medium text-secondary-label">in</span>
              </div>
            ))}
            <div className="mt-0.5 flex items-center gap-2.5 border-t border-line px-1.5 py-1.5">
              <span className="w-[26px] text-center text-[11px] font-medium text-secondary-label">out</span>
              <span className="flex-1 truncate text-[12px] text-ink-2">{side.sends} · $58.5M</span>
            </div>
          </div>
        </div>
      ))}
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
        <Table variant="default" size="sm" scrollFade={false} containerClassName="overflow-visible">
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
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-secondary-label">
        <CheckIcon className="size-3 text-icon-muted" />
        every number cites its table
      </div>
    </div>
  );
}

const SCOUT_ROWS = [
  { img: "/dime-site/headshots/kennard.png", name: "Luke Kennard", team: "LAL", ts: "68.9", usg: "13.1", trend: [61.2, 62.8, 64.5, 63.9, 66.1, 68.9] },
  { img: "/dime-site/headshots/duren.png", name: "Jalen Duren", team: "DET", ts: "68.8", usg: "23.1", trend: [63.4, 65.1, 64.2, 66.8, 67.5, 68.8] },
  { img: "/dime-site/headshots/ayton.png", name: "Deandre Ayton", team: "LAL", ts: "67.6", usg: "16.4", trend: [64.0, 65.5, 66.9, 66.2, 67.1, 67.6] },
  { img: "/dime-site/headshots/queta.png", name: "Neemias Queta", team: "BOS", ts: "67.4", usg: "14.5", trend: [62.6, 64.9, 65.8, 66.0, 66.8, 67.4] },
  { img: "/dime-site/headshots/jokic.png", name: "Nikola Jokić", team: "DEN", ts: "67.0", usg: "28.9", trend: [65.8, 66.4, 66.1, 67.2, 66.6, 67.0] },
  { img: "/dime-site/headshots/sga.png", name: "Shai Gilgeous-Alexander", team: "OKC", ts: "63.7", usg: "31.4", trend: [60.1, 61.9, 62.4, 63.0, 63.2, 63.7] },
  { img: "/dime-site/headshots/giannis.png", name: "Giannis Antetokounmpo", team: "MIL", ts: "62.5", usg: "30.6", trend: [61.8, 62.2, 61.5, 62.8, 62.0, 62.5] },
  { img: "/dime-site/headshots/curry.png", name: "Stephen Curry", team: "GSW", ts: "61.8", usg: "29.4", trend: [60.5, 62.0, 61.2, 62.6, 61.4, 61.8] },
];

const ARTIFACT_META: Record<string, { title: string; kind: string }> = {
  board: { title: "true shooting leaders", kind: "board" },
  trade: { title: "giannis ↔ davis", kind: "trade check" },
  report: { title: "midseason review", kind: "report" },
};

export function ArtifactPanel({ skeleton = false, kind = "board", framed = false, wide = false }: { skeleton?: boolean; kind?: string; framed?: boolean; wide?: boolean }) {
  const meta = ARTIFACT_META[kind] ?? ARTIFACT_META.board;
  const outer = framed
    ? "flex h-full w-full flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-inset ring-line"
    : wide
      ? "hidden w-[58%] min-w-[400px] shrink-0 flex-col border-l border-line bg-surface md:flex"
      : "hidden w-[46%] min-w-[360px] max-w-[440px] shrink-0 flex-col border-l border-line bg-surface md:flex";
  return (
    <section className={outer}>
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-line px-4">
        <PinIcon className="size-3.5 shrink-0 text-icon-muted" />
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{meta.title}</span>
        <span className="shrink-0 text-[11px] text-secondary-label">{meta.kind}</span>
        <span className="ml-1 inline-flex h-6 cursor-pointer items-center gap-1 rounded-md px-1.5 text-[11px] font-medium text-ink-2 ring-1 ring-inset ring-line transition-colors hover:bg-hover hover:text-ink">
          <DownloadIcon className="size-3 text-icon-muted" />
          export
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {kind === "trade" && <TradeArtifact />}
        {kind === "report" && <ReportArtifact />}
        {kind === "board" && (
        <Table variant="default" size="sm" scrollFade={false} containerClassName="h-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[11px]">player</TableHead>
              <TableHead align="end" className="text-[11px]">ts%</TableHead>
              <TableHead align="end" className="text-[11px]">usg%</TableHead>
              <TableHead className="text-[11px]">trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeleton
              ? SCOUT_ROWS.slice(0, 3).map((p) => (
                  <TableRow key={p.name}>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <span className="size-6 animate-pulse rounded-full bg-field" />
                        <span className="flex flex-col gap-1">
                          <span className="h-2.5 w-20 animate-pulse rounded bg-field" />
                          <span className="h-2 w-8 animate-pulse rounded bg-field" />
                        </span>
                      </span>
                    </TableCell>
                    <TableCell align="end">
                      <span className="inline-block h-2.5 w-8 animate-pulse rounded bg-field" />
                    </TableCell>
                    <TableCell align="end">
                      <span className="inline-block h-2.5 w-8 animate-pulse rounded bg-field" />
                    </TableCell>
                    <TableCell>
                      <span className="inline-block h-4 w-14 animate-pulse rounded bg-field" />
                    </TableCell>
                  </TableRow>
                ))
              : SCOUT_ROWS.map((p, i) => (
                  <TableRow key={p.name} className={i === 0 ? "bg-accent-tint/50" : ""}>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <Headshot src={p.img} alt={p.name} size={24} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium leading-4 text-ink">{p.name}</span>
                          <span className="block text-[11px] leading-4 text-secondary-label">{p.team}</span>
                        </span>
                      </span>
                    </TableCell>
                    <TableCell align="end" className="font-mono text-[13px] font-medium text-ink">{p.ts}</TableCell>
                    <TableCell align="end" className="font-mono text-[13px] text-ink-2">{p.usg}</TableCell>
                    <TableCell>
                      <Spark points={p.trend} w={56} h={18} />
                    </TableCell>
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
      ..."every number cites its table. Ready to export.".split(" ").map((text) => ({ text })),
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
      { icon: "write", label: "Draft midseason review", chip: "1 page · 2 citations", mono: false, detailMono: false, detail: [{ text: "✓ every number cites its table" }] },
    ],
    link: "midseason review",
  },
};

function ThreadLane({ pending = false, kind = "board", inlineArtifact = false }: { pending?: boolean; kind?: string; inlineArtifact?: boolean }) {
  const t = THREADS[kind] ?? THREADS.board;
  return (
    <div className="mx-auto flex h-full w-full max-w-[46rem] flex-col justify-end gap-2.5 px-5 py-4">
      <div className="flex justify-end">
        <span className="max-w-[85%] rounded-xl bg-message-surface px-3.5 py-2 text-[15px] leading-6 text-ink">
          {t.q}
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
          className="min-h-0 max-w-none"
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
            <div className="mt-3">
              <span className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md bg-surface px-2.5 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line transition-colors hover:bg-hover hover:text-ink">
                <PinIcon className="size-3 text-accent-ink" />
                {t.link}
                <ArrowRightIcon className="size-3 text-icon-muted" />
              </span>
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
