import type { ReactNode } from "react";
import {
  ArrowUpIcon,
  ChevronDownIcon,
  DatabaseIcon,
  FileTextIcon,
  GitBranchIcon,
  NotebookPenIcon,
  PanelLeftIcon,
  PinIcon,
  ArrowLeftRightIcon,
  MessageSquareIcon,
  SettingsIcon,
  SquarePenIcon,
} from "lucide-react";

const SECTIONS = [
  {
    label: "Notebooks",
    rows: [
      { id: "notebook", label: "true-shooting", icon: NotebookPenIcon, trail: "11:42" },
      { id: "nb2", label: "lineup-study", icon: NotebookPenIcon, trail: "Tue" },
      { id: "nb3", label: "giannis-ad", icon: NotebookPenIcon, trail: "Mon" },
    ],
  },
  {
    label: "Boards",
    rows: [
      { id: "boards", label: "starting-fives", icon: PinIcon, trail: "4" },
      { id: "trades", label: "giannis-ad", icon: ArrowLeftRightIcon, trail: "" },
      { id: "reports", label: "midseason-review", icon: FileTextIcon, trail: "" },
    ],
  },
  {
    label: "Warehouse",
    rows: [
      { id: "w1", label: "silver_advanced", icon: DatabaseIcon, trail: "582" },
      { id: "w2", label: "silver_boxscores", icon: DatabaseIcon, trail: "330K" },
      { id: "w3", label: "silver_lineups", icon: DatabaseIcon, trail: "753K" },
      { id: "w4", label: "silver_hist_shots", icon: DatabaseIcon, trail: "3.7M" },
    ],
  },
];

function SectionHeader({ label, count, collapsed = false }: { label: string; count: number; collapsed?: boolean }) {
  return (
    <div className="relative mx-0.5 mt-1 h-8 first:mt-0">
      <span className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-xs font-medium text-secondary-label">
        <span className="min-w-0 truncate">{label}</span>
        <span aria-hidden className="invisible h-px min-w-2 flex-1 bg-sidebar-border/50" />
        <span className="font-normal tabular-nums">{count}</span>
        <ChevronDownIcon aria-hidden className={`size-3 shrink-0 transition-transform ${collapsed ? "-rotate-90" : ""}`} />
      </span>
    </div>
  );
}

function RailRow({
  icon: Icon,
  label,
  active,
  mono,
  trail,
  indent,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  mono?: boolean;
  trail?: string;
  indent?: boolean;
}) {
  return (
    <span
      className={`group/sidebar-row relative flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-md text-left text-sm select-none ${
        indent ? "ps-9 pe-2.5" : "px-2.5"
      } ${
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
      <span
        className={`min-w-0 flex-1 truncate ${
          mono ? "font-mono text-[13px]" : ""
        } ${active ? "font-medium" : "text-ink/75 group-hover/sidebar-row:text-ink"}`}
      >
        {label}
      </span>
      {trail ? (
        <span className="inline-flex shrink-0 items-center justify-end text-xs tabular-nums text-secondary-label">
          {trail}
        </span>
      ) : null}
    </span>
  );
}

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-[52px] shrink-0 items-center gap-2 pr-3">
        <div className="ml-3 flex h-8 min-w-0 flex-1 items-center">
          <span className="inline-flex min-w-0 items-baseline gap-1 text-sm font-medium tracking-tight">
            <span className="font-serif text-[16px] leading-none tracking-[-0.02em]">dime<span className="text-accent">.</span></span>
          </span>
        </div>
        <span className="flex size-7 items-center justify-center rounded-md text-icon-muted">
          <PanelLeftIcon className="size-4" />
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden px-2 pb-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-24px),transparent)]">
        <RailRow icon={SquarePenIcon} label="New analysis" />
        <RailRow icon={MessageSquareIcon} label="Search" />
        <div className="h-2" />
        {SECTIONS.map((s) => (
          <div key={s.label}>
            <SectionHeader label={s.label} count={s.rows.length} />
            <div className="flex flex-col">
              {s.rows.map((r) => (
                <RailRow
                  key={r.id}
                  icon={r.icon}
                  label={r.label}
                  trail={r.trail}
                  mono={s.label === "Warehouse" || s.label === "Notebooks"}
                  active={active === r.id || (s.label === "Warehouse" && active === "warehouse" && r.id === "w1")}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-2 mt-2 border-t border-sidebar-border/60 px-0 py-2">
        <div className="flex items-center gap-0.5">
          <span className="flex size-8 items-center justify-center rounded-lg text-icon-muted">
            <SettingsIcon className="size-4" />
          </span>
          <span className="flex size-8 items-center justify-center rounded-lg text-icon-muted">
            <GitBranchIcon className="size-4" />
          </span>
          <span className="ml-auto flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs text-secondary-label">
            <span className="size-1.5 rounded-full bg-emerald-500" />synced
          </span>
        </div>
      </div>
    </aside>
  );
}

export function AppShell({
  active,
  crumb,
  tabs,
  actions,
  children,
  composer = false,
  paneClass = "px-4 py-4 md:px-6 md:py-5",
}: {
  active: string;
  crumb: string;
  tabs?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  composer?: boolean;
  paneClass?: string;
}) {
  return (
    <div className="flex h-full min-h-0 w-full bg-canvas text-ink">
      <Sidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-line pl-3 pr-3 md:pl-5 md:pr-5">
          {tabs ?? (
            <nav aria-label="Workspace" className="min-w-0">
              <ol className="m-0 flex min-w-0 list-none items-center gap-2 p-0 text-sm">
                {crumb.split(" / ").map((part, i, arr) => (
                  <li key={i} className="flex min-w-0 items-center gap-2">
                    {i > 0 && <span aria-hidden className="text-icon-muted">/</span>}
                    <span className={`block min-w-0 truncate ${i === arr.length - 1 ? "font-medium text-ink" : "text-secondary-label"}`}>
                      {part}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className="ml-auto flex shrink-0 items-center gap-2">{actions}</div>
        </div>
        <div className={`min-h-0 flex-1 overflow-hidden ${paneClass}`}>{children}</div>
        {composer && (
          <div className="shrink-0 px-3 pb-3 md:px-6 md:pb-5">
            <div className="rounded-xl bg-surface p-2 ring-1 ring-inset ring-line shadow-composer">
              <div className="flex items-center gap-2 px-2">
                <span className="min-w-0 flex-1 truncate text-sm text-secondary-label">
                  Ask about a player, team, lineup, trade, or trend…
                </span>
                <span aria-hidden className="flex size-7 items-center justify-center rounded-md bg-ink text-surface">
                  <ArrowUpIcon className="size-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Cell({ n, kind, meta, children }: { n: number; kind: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <section className="shrink-0 overflow-hidden rounded-lg bg-surface ring-1 ring-inset ring-line">
      <header className="flex h-8 items-center justify-between gap-3 border-b border-line px-2.5">
        <span className="flex items-center gap-2">
          <span className="flex size-[18px] items-center justify-center rounded-[5px] bg-field font-mono text-[10px] tabular-nums text-ink-2 ring-1 ring-inset ring-line">
            {n}
          </span>
          <span className="text-xs font-medium text-ink-2">{kind}</span>
        </span>
        {meta && <span className="text-xs text-secondary-label">{meta}</span>}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 items-center rounded-md bg-field px-1.5 font-mono text-[11px] text-ink-2 ring-1 ring-inset ring-line">
      {children}
    </span>
  );
}

export function Card({ title, source, children, wide }: { title: string; source?: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`min-h-0 overflow-hidden rounded-lg bg-surface ring-1 ring-inset ring-line ${wide ? "md:col-span-2" : ""}`}>
      <div className="flex h-9 items-center justify-between gap-3 border-b border-line px-3">
        <span className="truncate text-[13px] font-medium text-ink">{title}</span>
        {source && <span className="hidden truncate text-xs text-secondary-label sm:block">{source}</span>}
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  );
}

export function ActionPill({ icon: Icon, children }: { icon?: React.ComponentType<{ className?: string }>; children: ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-md bg-surface px-2 text-xs font-medium text-ink-2 ring-1 ring-inset ring-line">
      {Icon && <Icon className="size-3 text-icon-muted" />}
      {children}
    </span>
  );
}

export function Headshot({ src, alt, size = 26 }: { src: string; alt: string; size?: number }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 rounded-full bg-hover-2 object-cover object-top"
      style={{ width: size, height: size }}
    />
  );
}
