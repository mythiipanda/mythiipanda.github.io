"use client";

import type { ComponentType, ReactNode } from "react";

const cn = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

export interface PanelTab {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
}

function Tab({
  tab,
  active,
  onSelect,
}: {
  tab: PanelTab;
  active: boolean;
  onSelect?: (id: string) => void;
}) {
  const Icon = tab.icon;
  return (
    <div
      data-active-tab={active || undefined}
      onClick={() => onSelect?.(tab.id)}
      className={cn(
        "group/tab flex h-6 max-w-36 shrink-0 cursor-pointer items-center gap-0.5 rounded-md pr-2 pl-1.5 text-xs",
        active ? "bg-hover text-ink" : "text-secondary-label hover:bg-hover-2 hover:text-ink",
      )}
    >
      <span className="flex size-4 shrink-0 items-center justify-center">
        <Icon className="size-3.5 text-icon-muted group-data-[active-tab]/tab:text-ink-2" />
      </span>
      <span className="min-w-0 truncate">{tab.title}</span>
    </div>
  );
}

export default function PanelTabs({
  tabs,
  activeId,
  onSelect,
  leading,
  afterTabs,
  trailing,
  className,
}: {
  tabs: PanelTab[];
  activeId: string;
  onSelect?: (id: string) => void;
  leading?: ReactNode;
  afterTabs?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex h-9 shrink-0 items-center gap-1 border-b border-line pl-2 pr-2", className)}>
      {leading}
      <div className="flex h-full min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <Tab key={tab.id} tab={tab} active={tab.id === activeId} onSelect={onSelect} />
        ))}
        {afterTabs}
      </div>
      {trailing && <div className="ml-auto flex shrink-0 items-center gap-0.5">{trailing}</div>}
    </div>
  );
}

export function PanelIconButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex size-6 items-center justify-center rounded-md text-icon-muted transition-colors hover:bg-hover hover:text-ink"
    >
      <Icon className="size-3.5" />
    </button>
  );
}
