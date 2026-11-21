import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DatabaseIcon,
  DownloadIcon,
  FileTextIcon,
  HouseIcon,
  Loader2Icon,
  MessageSquareIcon,
  NotebookPenIcon,
  PanelLeftIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SquarePenIcon,
} from "lucide-react";
import { Headshot } from "./app-shell";
import { Spark } from "./stills";

const CHATS = [
  { id: "c1", label: "true shooting leaders", trail: "11:42" },
  { id: "c2", label: "giannis–ad trade check", trail: "Tue" },
  { id: "c3", label: "bench scoring, last 20", trail: "Mon" },
  { id: "c4", label: "season: mid points", trail: "Sun" },
];

const LIBRARY = [
  { id: "l1", label: "notebooks", icon: NotebookPenIcon, trail: "3" },
  { id: "l2", label: "boards", icon: PinIcon, trail: "4" },
  { id: "l3", label: "warehouse", icon: DatabaseIcon, trail: "58" },
  { id: "l4", label: "reports", icon: FileTextIcon, trail: "6" },
];

function Shelf({ label, count }: { label: string; count: number }) {
  return (
    <div className="relative mx-0.5 mt-2 h-8 first:mt-0">
      <span className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-xs font-medium text-secondary-label">
        <span className="min-w-0 truncate">{label}</span>
        <span aria-hidden className="invisible h-px min-w-2 flex-1 bg-sidebar-border/50" />
        <span className="font-normal tabular-nums">{count}</span>
        <ChevronDownIcon aria-hidden className="size-3 shrink-0" />
      </span>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  active,
  trail,
  tall,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  trail?: string;
  tall?: boolean;
}) {
  return (
    <span
      className={`group/sidebar-row relative flex ${tall ? "h-9" : "h-8"} w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-left text-sm select-none ${
        active
          ? "bg-sidebar-row-active text-ink ring-1 ring-inset ring-sidebar-border/70"
          : "text-sidebar-foreground hover:bg-sidebar-row-hover"
      }`}
    >
      {Icon && (
        <Icon
          aria-hidden
          className={`size-4 shrink-0 transition-colors ${active ? "text-ink" : "text-icon-muted group-hover/sidebar-row:text-ink"}`}
        />
      )}
      <span className={`min-w-0 flex-1 truncate ${active ? "font-medium" : "text-ink/75 group-hover/sidebar-row:text-ink"}`}>
        {label}
      </span>
      {trail ? <span className="shrink-0 text-xs tabular-nums text-secondary-label">{trail}</span> : null}
    </span>
  );
}

function Rail({ active }: { active: string }) {
  return (
    <aside className="hidden w-[212px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-[52px] shrink-0 items-center pr-3">
        <div className="ml-3 flex h-8 min-w-0 flex-1 items-center">
          <span className="font-serif text-[16px] leading-none tracking-[-0.02em] text-ink">
            dime<span className="text-accent">.</span>
          </span>
        </div>
        <span className="flex size-7 items-center justify-center rounded-md text-icon-muted">
          <PanelLeftIcon className="size-4" />
        </span>
      </div>
      <div className="px-2 pb-1">
        <span className="flex h-8 w-full items-center gap-2 rounded-md bg-field px-2 py-1.5 ring-1 ring-inset ring-line">
          <SearchIcon className="size-4 shrink-0 text-icon-muted" />
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-secondary-label">Search or ask</span>
          <kbd className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded bg-ink/[0.07] px-1 font-sans text-xs font-medium text-secondary-label">⌘K</kbd>
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-2 pt-1 pb-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-24px),transparent)]">
        <Row icon={HouseIcon} label="Home" active={active === "home"} />
        <Row icon={SquarePenIcon} label="New chat" />
        <Shelf label="Chats" count={CHATS.length} />
        {CHATS.map((r) => (
          <Row key={r.id} label={r.label} trail={r.trail} active={active === r.id} tall />
        ))}
        <Shelf label="Library" count={LIBRARY.length} />
        {LIBRARY.map((r) => (
          <Row key={r.id} icon={r.icon} label={r.label} trail={r.trail} />
        ))}
      </div>
      <div className="mx-2 mt-2 border-t border-sidebar-border/60 px-0 py-2">
        <div className="flex items-center gap-0.5">
          <span className="flex size-8 items-center justify-center rounded-lg text-icon-muted">
            <SettingsIcon className="size-4" />
          </span>
          <span className="ml-auto flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs text-secondary-label">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            synced
          </span>
        </div>
      </div>
    </aside>
  );
}

function Composer({ focused = false }: { focused?: boolean }) {
  return (
    <div className={`rounded-2xl bg-surface p-2 ring-1 ring-inset shadow-composer ${focused ? "ring-accent/40" : "ring-line"}`}>
      <div className="flex items-center gap-2 px-2 pt-1">
        <span className="min-w-0 flex-1 truncate text-sm text-secondary-label">
          Ask about a player, lineup, trade, or trend…
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 px-1 pb-1">
        <span className="flex size-6 items-center justify-center rounded-md text-icon-muted">
          <PlusIcon className="size-3.5" />
        </span>
        <span className="inline-flex h-6 items-center gap-1 rounded-md bg-field px-1.5 text-[11px] font-medium text-ink-2 ring-1 ring-inset ring-line">
          <DatabaseIcon className="size-3 text-icon-muted" />
          warehouse
        </span>
        <span className="ml-auto inline-flex h-6 items-center rounded-md px-1.5 text-[11px] font-medium text-secondary-label">
          auto
        </span>
        <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-ink text-surface">
          <ArrowUpIcon className="size-3.5" />
        </span>
      </div>
    </div>
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
        <Composer />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {PROMPT_CHIPS.map((c) => (
            <span
              key={c.label}
              className="inline-flex h-7 items-center gap-1.5 rounded-full bg-surface px-3 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line"
            >
              <c.icon className="size-3 text-icon-muted" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2 text-xs text-secondary-label">
        <DatabaseIcon className="size-3.5 text-icon-muted" />
        <span>Answers come from your warehouse</span>
        <span className="tabular-nums text-icon-muted">·</span>
        <span className="tabular-nums">58 tables · 14.9M rows</span>
      </div>
    </div>
  );
}

function ToolRow({ label, trail, pending = false }: { label: string; trail: string; pending?: boolean }) {
  return (
    <span className="flex h-7 w-full items-center gap-2 rounded-md px-1 text-left">
      {pending ? (
        <Loader2Icon className="size-3.5 shrink-0 animate-spin text-accent-ink" />
      ) : (
        <CheckIcon className="size-3.5 shrink-0 text-icon-muted" />
      )}
      <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-ink-2">{label}</span>
      <span className="shrink-0 text-[11px] tabular-nums text-secondary-label">{trail}</span>
      <ChevronRightIcon className="size-3 shrink-0 text-icon-muted" />
    </span>
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
                  <div className="truncate text-[12.5px] font-medium text-ink">{name}</div>
                  <div className="font-mono text-[10.5px] text-ink-3">${sal}M</div>
                </div>
                <span className="text-[10.5px] font-medium text-secondary-label">in</span>
              </div>
            ))}
            {(side.picks ?? []).map((pk) => (
              <div key={pk} className="flex items-center gap-2.5 px-1.5 py-1.5">
                <span className="flex size-[26px] items-center justify-center rounded-full bg-field text-[9px] font-medium text-secondary-label ring-1 ring-inset ring-line">pk</span>
                <span className="flex-1 text-[12px] text-ink-2">{pk}</span>
                <span className="text-[10.5px] font-medium text-secondary-label">in</span>
              </div>
            ))}
            <div className="mt-0.5 flex items-center gap-2.5 border-t border-line px-1.5 py-1.5">
              <span className="w-[26px] text-center text-[10.5px] font-medium text-secondary-label">out</span>
              <span className="flex-1 truncate text-[12px] text-ink-2">{side.sends} · $58.5M</span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 rounded-lg bg-canvas px-3 py-2.5 ring-1 ring-inset ring-line">
        <span className="w-14 text-[10.5px] font-medium text-secondary-label">cap hit</span>
        <div className="h-[5px] flex-1 rounded-full bg-field">
          <div className="h-full rounded-full bg-accent/70" style={{ width: "35.3%" }} />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-ink-2">35.3%</span>
        <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-medium text-ink-2">
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
      <p className="mt-3 text-[12.5px] leading-6 text-ink-2">
        Among <span className="font-medium text-ink">164 rotation players</span>, Luke Kennard leads at{" "}
        <span className="font-mono text-[12px] text-ink">68.9%</span> true shooting<CiteChip>1</CiteChip>, edging Jalen Duren
        on a third of the usage.
      </p>
      <p className="mt-2.5 text-[12.5px] leading-6 text-ink-2">
        Nikola Jokić remains the workload outlier — top-five efficiency at{" "}
        <span className="font-mono text-[12px] text-ink">28.9%</span> usage.<CiteChip>2</CiteChip>
      </p>
      <div className="mt-3 rounded-lg bg-field p-3">
        <div className="mb-2 text-[10.5px] font-medium text-secondary-label">exhibit 1</div>
        {SCOUT_ROWS.slice(0, 3).map((p) => (
          <div key={p.name} className="flex h-7 items-center gap-2 border-b border-line/60 text-[12px] last:border-b-0">
            <span className="min-w-0 flex-1 truncate font-medium text-ink">{p.name}</span>
            <span className="font-mono text-[11px] tabular-nums text-ink-2">{p.ts}</span>
            <span className="w-8 text-right font-mono text-[11px] tabular-nums text-ink-3">{p.usg}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[10.5px] text-secondary-label">
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
];

const ARTIFACT_META: Record<string, { title: string; kind: string }> = {
  board: { title: "efficiency leaders", kind: "board" },
  trade: { title: "giannis ↔ davis", kind: "trade check" },
  report: { title: "midseason review", kind: "report" },
};

function ArtifactPanel({ skeleton = false, kind = "board" }: { skeleton?: boolean; kind?: string }) {
  const meta = ARTIFACT_META[kind] ?? ARTIFACT_META.board;
  return (
    <section className="hidden w-[46%] min-w-[360px] max-w-[440px] shrink-0 flex-col border-l border-line bg-surface md:flex">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-line px-4">
        <PinIcon className="size-3.5 shrink-0 text-icon-muted" />
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{meta.title}</span>
        <span className="shrink-0 text-[11px] text-secondary-label">{meta.kind}</span>
        <span className="ml-1 inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium text-ink-2 ring-1 ring-inset ring-line">
          <DownloadIcon className="size-3 text-icon-muted" />
          export
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {kind === "trade" && <TradeArtifact />}
        {kind === "report" && <ReportArtifact />}
        {kind === "board" && (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["player", "ts%", "usg%", "trend"].map((h, i) => (
                <th
                  key={h}
                  className={`h-8 border-b border-line px-4 text-[11px] font-medium text-secondary-label ${i === 1 || i === 2 ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skeleton
              ? SCOUT_ROWS.slice(0, 3).map((p, i) => (
                  <tr key={p.name}>
                    <td className="h-11 border-b border-line px-4">
                      <span className="flex items-center gap-2.5">
                        <span className="size-[26px] animate-pulse rounded-full bg-field" />
                        <span className="h-2.5 w-20 animate-pulse rounded bg-field" />
                      </span>
                    </td>
                    <td className="h-11 border-b border-line px-4 text-right">
                      <span className="inline-block h-2.5 w-8 animate-pulse rounded bg-field" />
                    </td>
                    <td className="h-11 border-b border-line px-4 text-right">
                      <span className="inline-block h-2.5 w-8 animate-pulse rounded bg-field" />
                    </td>
                    <td className="h-11 border-b border-line px-4">
                      <span className="inline-block h-4 w-14 animate-pulse rounded bg-field" />
                    </td>
                  </tr>
                ))
              : SCOUT_ROWS.map((p, i) => (
                  <tr key={p.name} className={i === 0 ? "bg-accent-tint/50" : ""}>
                    <td className="h-10 border-b border-line px-4">
                      <span className="flex items-center gap-2.5">
                        <Headshot src={p.img} alt={p.name} size={24} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium leading-4 text-ink">{p.name}</span>
                          <span className="block text-[10.5px] leading-4 text-secondary-label">{p.team}</span>
                        </span>
                      </span>
                    </td>
                    <td className="h-10 border-b border-line px-4 text-right font-mono text-[12.5px] font-medium tabular-nums text-ink">{p.ts}</td>
                    <td className="h-10 border-b border-line px-4 text-right font-mono text-[12.5px] tabular-nums text-ink-2">{p.usg}</td>
                    <td className="h-10 border-b border-line px-4">
                      <Spark points={p.trend} w={56} h={18} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        )}
      </div>
    </section>
  );
}

const THREADS: Record<string, { q: string; tools: [string, string][]; a: ReactNode; link: string }> = {
  board: {
    q: "Who leads the league in true shooting among rotation players?",
    tools: [["query · silver_advanced", "41 ms"], ["resolve · player names", "12 ms"]],
    a: (
      <>
        Among <span className="font-medium text-ink">164 rotation players</span>, <span className="font-medium text-ink">Luke Kennard</span> leads at{" "}
        <span className="font-mono text-[13px] text-ink">68.9%</span> true shooting<CiteChip>1</CiteChip> — Jalen Duren is second at{" "}
        <span className="font-mono text-[13px] text-ink">68.8</span> on a third of the usage.<CiteChip>2</CiteChip>
      </>
    ),
    link: "efficiency leaders",
  },
  trade: {
    q: "Giannis for Anthony Davis straight up — does it clear the cap?",
    tools: [["resolve · salaries", "18 ms"], ["check · apron rules", "63 ms"]],
    a: (
      <>
        It clears. <span className="font-mono text-[13px] text-ink">$58.5M ↔ $58.5M</span> is an even swap<CiteChip>1</CiteChip> —
        Miami lands at <span className="font-mono text-[13px] text-ink">35.3%</span> cap hit, inside the apron.<CiteChip>2</CiteChip>
      </>
    ),
    link: "giannis ↔ davis",
  },
  report: {
    q: "Write up the midseason efficiency leaders for the morning meeting.",
    tools: [["query · silver_advanced", "41 ms"], ["draft · midseason review", "2.1 s"]],
    a: (
      <>
        Drafted a one-page review — <span className="font-medium text-ink">Kennard, Duren, Ayton</span> headline it,
        every number cites its table<CiteChip>1</CiteChip>. Ready to export.<CiteChip>2</CiteChip>
      </>
    ),
    link: "midseason review",
  },
};

function ThreadLane({ pending = false, kind = "board" }: { pending?: boolean; kind?: string }) {
  const t = THREADS[kind] ?? THREADS.board;
  return (
    <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-3 px-5 py-5">
      <div className="flex justify-end">
        <span className="max-w-[85%] rounded-xl bg-message-surface px-3.5 py-2 text-sm leading-6 text-ink">
          {t.q}
        </span>
      </div>
      <div className="mt-1 flex flex-col gap-0.5">
        <ToolRow label={t.tools[0][0]} trail={t.tools[0][1]} />
        {pending ? (
          <ToolRow label={`running · ${t.tools[1][0].split("· ")[1]}`} trail="…" pending />
        ) : (
          <ToolRow label={t.tools[1][0]} trail={t.tools[1][1]} />
        )}
      </div>
      {!pending && (
        <div className="mt-1 text-sm leading-7 text-ink-2">
          {t.a}
          <div className="mt-3">
            <span className="inline-flex h-8 items-center gap-2 rounded-md bg-surface px-2.5 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line">
              <PinIcon className="size-3 text-accent-ink" />
              {t.link}
              <ArrowRightIcon className="size-3 text-icon-muted" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatWindow({ state = "split", artifact = "board", rail = true }: { state?: "home" | "split" | "pending"; artifact?: string; rail?: boolean }) {
  const isHome = state === "home";
  return (
    <div className="flex h-full min-h-0 w-full bg-canvas text-ink">
      {rail && <Rail active={isHome ? "home" : "c1"} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-line pl-3 pr-3 md:pl-5 md:pr-5">
          {!rail && (
            <>
              <span className="font-serif text-[16px] text-ink">dime.</span>
              <span className="inline-flex h-7 max-w-[320px] flex-1 items-center gap-2 rounded-md bg-field px-2.5 text-[12.5px] text-secondary-label ring-1 ring-inset ring-line">
                <SearchIcon className="size-3.5 text-icon-muted" />
                Search or ask
                <kbd className="ml-auto rounded bg-surface px-1 font-mono text-[9.5px] text-ink-3 ring-1 ring-inset ring-line">⌘K</kbd>
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
            {!isHome && (
              <span className="inline-flex h-7 items-center gap-1.5 rounded-md bg-surface px-2 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line">
                <PinIcon className="size-3 text-icon-muted" />
                3 pinned
              </span>
            )}
            <span className="flex size-7 items-center justify-center rounded-full bg-accent-tint font-mono text-[10px] font-medium text-accent-ink">
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
                  <ThreadLane pending={state === "pending"} kind={artifact} />
                </div>
                <div className="shrink-0 px-5 pb-4">
                  <div className="mx-auto w-full max-w-[46rem]">
                    <Composer />
                  </div>
                </div>
              </div>
              <ArtifactPanel skeleton={state === "pending"} kind={artifact} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
