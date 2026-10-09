import { sqlLines } from "./data";

export function Sql() {
  return (
    <pre className="overflow-x-auto font-mono text-[12.5px] leading-[21px] text-ink-2">
      {sqlLines.map((line, i) => (
        <div key={i} className="whitespace-pre">
          <span className="mr-4 inline-block w-3 select-none text-right text-ink-3">{i + 1}</span>
          {line.map(([t, s], j) => (
            <span key={j} className={t === "k" ? "text-[var(--cobalt-tx)]" : ""}>{s}</span>
          ))}
        </div>
      ))}
    </pre>
  );
}

export function Pill({ children, tone = "plain" }: { children: React.ReactNode; tone?: "plain" | "ok" }) {
  return (
    <span className={`inline-flex h-5 items-center rounded-[5px] px-1.5 font-mono text-[11px] ${tone === "ok" ? "bg-field text-ink-2 shadow-[0_0_0_1px_var(--line)]" : "bg-field text-ink-2 shadow-[0_0_0_1px_var(--line)]"}`}>
      {children}
    </span>
  );
}

export function Tick() {
  return <span aria-hidden className="block size-1.5 rounded-full bg-ink-3" />;
}

export function Cell({ n, kind, meta, children }: { n: number; kind: string; meta?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="group relative overflow-hidden rounded-[12px] bg-surface shadow-[0_0_0_1px_var(--line)] transition-shadow hover:shadow-[0_0_0_1px_var(--line-strong)]">
      <header className="flex h-10 items-center justify-between gap-3 border-b border-line px-3.5 text-[12px] text-ink-3">
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
