"use client";

import * as React from "react";

/* vendored from hextaUI components/ui/table.tsx — cva/cn stripped,
 * design tokens mapped to the dime set (surface/line/field/ink). */

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

function useScrollEdges(container: HTMLDivElement | null) {
  React.useLayoutEffect(() => {
    if (!container) return;
    const update = () => {
      const offset = Math.abs(container.scrollLeft);
      const max = container.scrollWidth - container.clientWidth;
      const overflowing = max > 0.5 || container.scrollHeight - container.clientHeight > 0.5;
      container.toggleAttribute("data-scrolled-start", offset > 0.5);
      container.toggleAttribute("data-scrolled-end", offset < max - 0.5);
      container.toggleAttribute("data-scrolled-top", container.scrollTop > 0.5);
      container.toggleAttribute("data-overflowing", overflowing);
      if (overflowing) container.tabIndex = 0;
      else container.removeAttribute("tabindex");
    };
    update();
    container.addEventListener("scroll", update, { passive: true });
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
    observer?.observe(container);
    const table = container.firstElementChild;
    if (table) observer?.observe(table);
    return () => {
      container.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, [container]);
}

const VARIANTS: Record<string, string> = {
  default: "",
  surface:
    "isolate overflow-clip rounded-xl bg-(--table-bg) ring-1 ring-inset ring-line [--table-bg:var(--surface)] [--table-head-bg:var(--field)]",
};

const SIZES: Record<string, string> = {
  sm: "[--table-cell-px:--spacing(2.5)] [--table-cell-py:--spacing(1.5)] [--table-head-h:--spacing(8)]",
  default: "[--table-cell-px:--spacing(3)] [--table-cell-py:--spacing(2.5)] [--table-head-h:--spacing(10)]",
};

type TableProps = React.ComponentProps<"table"> & {
  variant?: "default" | "surface";
  size?: "sm" | "default";
  wrap?: boolean;
  scrollFade?: boolean;
  stickyHeader?: boolean;
  containerClassName?: string;
};

export function Table({
  className,
  variant = "surface",
  size = "sm",
  wrap = false,
  scrollFade = true,
  stickyHeader = false,
  containerClassName,
  ...props
}: TableProps) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  useScrollEdges(container);

  return (
    <div
      data-slot="table-frame"
      data-variant={variant}
      data-size={size}
      data-wrap={wrap ? "" : undefined}
      className={cn(
        "group/table relative w-full min-w-0 [--table-bg:var(--surface)] [--table-hover:var(--hover)]",
        VARIANTS[variant],
        SIZES[size]
      )}
    >
      <div
        ref={setContainer}
        data-slot="table-container"
        data-sticky-header={stickyHeader ? "" : undefined}
        className={cn(
          "relative w-full scroll-p-1 overflow-x-auto overscroll-x-none rounded-[inherit] outline-none [--fade-end:0px] [--fade-start:0px] data-sticky-header:overflow-y-auto",
          scrollFade &&
            "mask-[linear-gradient(to_right,transparent,#000_var(--fade-start),#000_calc(100%-var(--fade-end)),transparent)] data-scrolled-end:[--fade-end:--spacing(8)] data-scrolled-start:[--fade-start:--spacing(8)]",
          containerClassName
        )}
      >
        <table
          data-slot="table"
          className={cn("w-full caption-bottom border-separate border-spacing-0 text-sm", className)}
          {...props}
        />
      </div>
    </div>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn("[&_tr]:bg-transparent [&_tr]:hover:bg-transparent", className)} {...props} />
  );
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody data-slot="table-body" className={cn("[&>tr:last-child>*]:border-b-0", className)} {...props} />
  );
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("group/table-row bg-(--table-bg) transition-colors hover:bg-(--table-hover)", className)}
      {...props}
    />
  );
}

const cellBase =
  "border-b border-line align-middle whitespace-nowrap group-data-wrap/table:align-top group-data-wrap/table:whitespace-normal data-[align=center]:text-center data-[align=end]:text-end data-[align=end]:tabular-nums";

const cellLayout = "group-data-[variant=surface]/table:first:ps-4 group-data-[variant=surface]/table:last:pe-4";

export function TableHead({
  className,
  align,
  ...props
}: Omit<React.ComponentProps<"th">, "align"> & { align?: "start" | "center" | "end" }) {
  return (
    <th
      data-slot="table-head"
      data-align={align}
      className={cn(
        cellBase,
        cellLayout,
        "h-(--table-head-h) bg-(--table-head-bg,var(--table-bg)) px-(--table-cell-px) text-start font-medium text-secondary-label",
        className
      )}
      {...props}
    />
  );
}

export type TableSort = { id: string; desc: boolean } | undefined;

export function TableSortHead({
  id,
  sort,
  onSort,
  title,
  className,
  align,
  ...props
}: Omit<React.ComponentProps<"th">, "align"> & {
  id: string;
  sort?: TableSort;
  onSort?: (id: string) => void;
  title: string;
  align?: "start" | "center" | "end";
}) {
  const desc = sort?.id === id ? sort.desc : undefined;
  return (
    <TableHead align={align} {...props} className={cn("p-0", className)}>
      <div data-slot="data-table-column-header" className={cn("flex", align === "end" && "justify-end", align === "center" && "justify-center")}>
        <button
          type="button"
          onClick={() => onSort?.(id)}
          data-sorted={desc === undefined ? undefined : ""}
          className={cn(
            "-mx-1 inline-flex h-7 items-center gap-1.5 rounded-md px-1.5 text-[11px] font-medium text-secondary-label transition-colors hover:bg-hover hover:text-ink data-sorted:text-ink",
            align === "end" && "flex-row-reverse"
          )}
        >
          {title}
          {desc === undefined ? (
            <svg aria-hidden className="size-3.5 opacity-60" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></svg>
          ) : desc ? (
            <svg aria-hidden className="size-3.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 9-7 7-7-7" /></svg>
          ) : (
            <svg aria-hidden className="size-3.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 15 7-7 7 7" /></svg>
          )}
        </button>
      </div>
    </TableHead>
  );
}

export function TableCell({
  className,
  align,
  ...props
}: Omit<React.ComponentProps<"td">, "align"> & { align?: "start" | "center" | "end" }) {
  return (
    <td
      data-slot="table-cell"
      data-align={align}
      className={cn(cellBase, cellLayout, "px-(--table-cell-px) py-(--table-cell-py)", className)}
      {...props}
    />
  );
}
