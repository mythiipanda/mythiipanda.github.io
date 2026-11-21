import type { ReactNode } from "react";
import {
  ArrowUp,
  Calendar,
  Compass,
  Database,
  GitBranch,
  MessageSquare,
  NotebookPen,
  PanelLeft,
  PenLine,
  Pin,
  ArrowLeftRight,
  FileText,
} from "@/components/icons";

const NAV = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "today", label: "Today", icon: Calendar },
  { id: "explore", label: "Explore", icon: Compass },
];

const WORKSPACE = [
  { id: "notebook", label: "true-shooting", icon: NotebookPen },
  { id: "boards", label: "lineup-study", icon: Pin },
  { id: "trades", label: "giannis-ad", icon: ArrowLeftRight },
  { id: "reports", label: "midseason-review", icon: FileText },
];

const WAREHOUSE = [
  ["silver_advanced", "582"],
  ["silver_boxscores", "330,485"],
  ["silver_lineups", "753,242"],
  ["silver_hist_shots", "3.7M"],
];

function RailRow({ icon, label, active, mono, trail }: { icon?: ReactNode; label: string; active?: boolean; mono?: boolean; trail?: string }) {
  return (
    <span
      className={`group/row mx-2 flex h-8 w-[calc(100%-16px)] items-center gap-2.5 rounded-[8px] px-2.5 text-left ${active ? "bg-hover-2" : ""}`}
    >
      {icon && <span className={`flex size-4 shrink-0 items-center justify-center transition-colors group-hover/row:text-ink ${active ? "text-ink" : "text-ink-3"}`}>{icon}</span>}
      <span className={`min-w-0 flex-1 truncate ${mono ? "font-mono text-[12.5px]" : "text-[14px]"} ${active ? "font-medium text-ink" : "text-ink-2"}`}>{label}</span>
      {trail && <span className="ml-2 shrink-0 font-mono text-[11px] tabular-nums text-ink-3">{trail}</span>}
    </span>
  );
}

function RailLabel({ children }: { children: ReactNode }) {
  return <div className="mx-2 mb-0.5 flex h-7 items-center px-2.5 text-[11px] font-medium text-ink-3">{children}</div>;
}

function Sidebar({ active }: { active: string }) {
  return (
    <aside className="hidden w-[216px] shrink-0 flex-col bg-field pb-2 lg:flex">
      <div className="mb-2.5 flex h-[52px] items-center justify-between pl-4 pr-3.5">
        <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          <span className="font-serif text-[17px] leading-none tracking-[-0.02em]">dime<span className="text-accent">.</span></span>
        </span>
        <PanelLeft size={17} className="text-ink-3" />
      </div>
      <RailRow icon={<PenLine size={16} />} label="New analysis" />
      <div className="mt-3">
        {NAV.map((r) => (
          <RailRow key={r.id} icon={<r.icon size={16} />} label={r.label} active={active === r.id} />
        ))}
      </div>
      <div className="mt-4">
        <RailLabel>Notebooks</RailLabel>
        {WORKSPACE.map((r) => (
          <RailRow key={r.id} icon={<r.icon size={15} />} label={r.label} mono active={active === r.id} />
        ))}
      </div>
      <div className="mt-4">
        <RailLabel>Warehouse</RailLabel>
        {WAREHOUSE.map(([name, rows]) => (
          <RailRow key={name} icon={<Database size={15} />} label={name} mono trail={rows} active={active === "warehouse" && name === "silver_advanced"} />
        ))}
      </div>
      <div className="mx-2 mt-auto pt-3">
        <div className="flex h-8 items-center gap-2 px-2 font-mono text-[12px] text-ink-2">
          <GitBranch size={15} className="text-ink-3" />main
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
        <div className="flex h-[52px] shrink-0 items-center justify-between gap-3 border-b border-line">
          {tabs ?? <span className="truncate px-3 font-mono text-[12px] text-ink-2 md:px-4">{crumb}</span>}
          <div className="flex shrink-0 items-center gap-2 px-3 md:px-4">{actions}</div>
        </div>
        <div className={`min-h-0 flex-1 overflow-hidden ${paneClass}`}>{children}</div>
        {composer && (
          <div className="shrink-0 border-t border-line p-3 md:px-6">
            <div className="flex min-h-10 items-center gap-3 rounded-full bg-surface py-1.5 pl-5 pr-1.5 shadow-[0_0_0_1px_var(--line)]">
              <span className="flex-1 truncate text-[13.5px] text-ink-3">Ask about a player, team, lineup, trade, or trend...</span>
              <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-hover-2 text-ink-3">
                <ArrowUp size={15} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Cell({ n, kind, meta, children }: { n: number; kind: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <section className="shrink-0 overflow-hidden rounded-[12px] bg-surface shadow-[0_0_0_1px_var(--line)]">
      <header className="flex h-9 items-center justify-between gap-3 border-b border-line px-3.5 text-[11.5px] text-ink-3">
        <span className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-[6px] bg-hover-2 font-mono text-[11px] tabular-nums text-ink-2">{n}</span>
          <span className="text-[12.5px] font-medium capitalize text-ink-2">{kind}</span>
        </span>
        {meta}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 items-center rounded-[5px] bg-field px-1.5 font-mono text-[11px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">{children}</span>
  );
}

export function Card({ title, source, children, wide }: { title: string; source?: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`min-h-0 overflow-hidden rounded-[12px] bg-surface shadow-[0_0_0_1px_var(--line)] ${wide ? "md:col-span-2" : ""}`}>
      <div className="flex h-10 items-center justify-between gap-3 border-b border-line px-4">
        <span className="truncate text-[13px] font-medium text-ink">{title}</span>
        {source && <span className="hidden truncate font-mono text-[11px] text-ink-3 sm:block">{source}</span>}
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  );
}

export function ActionPill({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-field px-2.5 font-mono text-[11px] text-ink-2 shadow-[0_0_0_1px_var(--line)]">
      {icon}
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

