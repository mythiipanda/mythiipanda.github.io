import type { ReactNode } from "react";
import SidebarNav, { type SidebarRecent } from "../beautiful/primitives/SidebarNav";
import PromptBar from "../beautiful/primitives/PromptBar";

const RECENTS: SidebarRecent[] = [
  { id: "c1", label: "true shooting leaders", time: "11:42" },
  { id: "c2", label: "giannis-ad trade check", status: { label: "Approval", icon: "approval" } },
  { id: "c3", label: "bench scoring, last 20", status: { label: "Done", icon: "done" } },
];

const NAV_MAP: Record<string, string> = {
  notebook: "notebooks",
  boards: "boards",
  trades: "boards",
  reports: "reports",
  warehouse: "warehouse",
};

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
      <SidebarNav
        fill
        className="hidden border-r border-sidebar-border bg-sidebar lg:flex"
        recents={RECENTS}
        activeTitle="true shooting leaders"
        activeNav={NAV_MAP[active] ?? "home"}
        onNavigate={(key) => {
          const sel = key === "warehouse" ? "#warehouse" : key === "home" ? "#top" : "#platform";
          document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
        }}
      />
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
            <PromptBar variant="Rounded" demo={false} placeholder="Ask about a player, team, lineup, trade, or trend" />
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


