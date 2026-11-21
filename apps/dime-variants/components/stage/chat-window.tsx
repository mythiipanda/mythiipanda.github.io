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
    <div className="relative mx-0.5 mt-2 h-7 first:mt-0">
      <span className="flex h-7 w-full items-center gap-2 rounded-md px-2 text-left text-xs font-medium text-secondary-label">
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
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  trail?: string;
}) {
  return (
    <span
      className={`group/sidebar-row relative flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-left text-sm select-none ${
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
        <span className="flex h-8 w-full items-center gap-2 rounded-md bg-field px-2.5 ring-1 ring-inset ring-line">
          <SearchIcon className="size-3.5 shrink-0 text-icon-muted" />
          <span className="min-w-0 flex-1 truncate text-sm text-secondary-label">Search or ask</span>
          <kbd className="shrink-0 font-mono text-[10px] text-icon-muted">⌘K</kbd>
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-2 pt-1 pb-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-24px),transparent)]">
        <Row icon={HouseIcon} label="Home" active={active === "home"} />
        <Row icon={SquarePenIcon} label="New chat" />
        <Shelf label="Chats" count={CHATS.length} />
        {CHATS.map((r) => (
          <Row key={r.id} label={r.label} trail={r.trail} active={active === r.id} />
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
    <div className={`rounded-xl bg-surface p-2 ring-1 ring-inset shadow-composer ${focused ? "ring-accent/40" : "ring-line"}`}>
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
        <span aria-hidden className="flex size-7 items-center justify-center rounded-md bg-ink text-surface">
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
    <sup className="ml-0.5 inline-flex h-4 items-center rounded-[4px] bg-accent-tint px-1 font-mono text-[9.5px] font-medium leading-none text-accent-ink">
      {children}
    </sup>
  );
}

const SCOUT_ROWS = [
  { img: "/dime-site/headshots/kennard.png", name: "Luke Kennard", team: "LAL", ts: "68.9", usg: "13.1", trend: [61.2, 62.8, 64.5, 63.9, 66.1, 68.9] },
  { img: "/dime-site/headshots/duren.png", name: "Jalen Duren", team: "DET", ts: "68.8", usg: "23.1", trend: [63.4, 65.1, 64.2, 66.8, 67.5, 68.8] },
  { img: "/dime-site/headshots/ayton.png", name: "Deandre Ayton", team: "LAL", ts: "67.6", usg: "16.4", trend: [64.0, 65.5, 66.9, 66.2, 67.1, 67.6] },
  { img: "/dime-site/headshots/queta.png", name: "Neemias Queta", team: "BOS", ts: "67.4", usg: "14.5", trend: [62.6, 64.9, 65.8, 66.0, 66.8, 67.4] },
  { img: "/dime-site/headshots/jokic.png", name: "Nikola Jokić", team: "DEN", ts: "67.0", usg: "28.9", trend: [65.8, 66.4, 66.1, 67.2, 66.6, 67.0] },
];

function ArtifactPanel({ skeleton = false }: { skeleton?: boolean }) {
  return (
    <section className="hidden w-[46%] min-w-[360px] max-w-[440px] shrink-0 flex-col border-l border-line bg-surface md:flex">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-line px-4">
        <PinIcon className="size-3.5 shrink-0 text-icon-muted" />
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">efficiency leaders</span>
        <span className="shrink-0 text-[11px] text-secondary-label">board</span>
        <span className="ml-1 inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium text-ink-2 ring-1 ring-inset ring-line">
          <DownloadIcon className="size-3 text-icon-muted" />
          export
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
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
                    <td className="h-11 border-b border-line px-4">
                      <span className="flex items-center gap-2.5">
                        <Headshot src={p.img} alt={p.name} size={26} />
                        <span className="truncate text-[13px] font-medium text-ink">{p.name}</span>
                      </span>
                    </td>
                    <td className="h-11 border-b border-line px-4 text-right font-mono text-[12.5px] font-medium tabular-nums text-ink">{p.ts}</td>
                    <td className="h-11 border-b border-line px-4 text-right font-mono text-[12.5px] tabular-nums text-ink-2">{p.usg}</td>
                    <td className="h-11 border-b border-line px-4">
                      <Spark points={p.trend} w={56} h={18} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ThreadLane({ pending = false }: { pending?: boolean }) {
  return (
    <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-3 px-5 py-5">
      <div className="flex justify-end">
        <span className="max-w-[85%] rounded-xl bg-field px-3.5 py-2 text-[13.5px] leading-6 text-ink ring-1 ring-inset ring-line">
          Who leads the league in true shooting among rotation players?
        </span>
      </div>
      <div className="mt-1 flex flex-col gap-0.5">
        <ToolRow label="query · silver_advanced" trail="41 ms" />
        {pending ? (
          <ToolRow label="running · resolve player names" trail="…" pending />
        ) : (
          <ToolRow label="resolve · player names" trail="12 ms" />
        )}
      </div>
      {!pending && (
        <div className="mt-1 text-[13.5px] leading-7 text-ink-2">
          Among <span className="font-medium text-ink">164 rotation players</span>, <span className="font-medium text-ink">Luke Kennard</span> leads at{" "}
          <span className="font-mono text-[13px] text-ink">68.9%</span> true shooting<CiteChip>1</CiteChip> — Jalen Duren is second at{" "}
          <span className="font-mono text-[13px] text-ink">68.8</span> on a third of the usage.<CiteChip>2</CiteChip>
          <div className="mt-3">
            <span className="inline-flex h-8 items-center gap-2 rounded-md bg-surface px-2.5 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line">
              <PinIcon className="size-3 text-accent-ink" />
              efficiency leaders
              <ArrowRightIcon className="size-3 text-icon-muted" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatWindow({ state = "split" }: { state?: "home" | "split" | "pending" }) {
  const isHome = state === "home";
  return (
    <div className="flex h-full min-h-0 w-full bg-canvas text-ink">
      <Rail active={isHome ? "home" : "c1"} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-line pl-3 pr-3 md:pl-5 md:pr-5">
          <nav className="min-w-0">
            <ol className="m-0 flex min-w-0 list-none items-center gap-2 p-0 text-sm">
              {isHome ? (
                <li className="font-medium text-ink">Home</li>
              ) : (
                <>
                  <li className="text-secondary-label">Chats</li>
                  <li className="text-icon-muted">/</li>
                  <li className="min-w-0 truncate font-medium text-ink">true shooting leaders</li>
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
                  <ThreadLane pending={state === "pending"} />
                </div>
                <div className="shrink-0 px-5 pb-4">
                  <div className="mx-auto w-full max-w-[46rem]">
                    <Composer />
                  </div>
                </div>
              </div>
              <ArtifactPanel skeleton={state === "pending"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
