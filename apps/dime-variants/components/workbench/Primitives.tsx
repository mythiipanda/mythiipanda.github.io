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
    <span className={`inline-flex h-5 items-center rounded-[5px] px-1.5 font-mono text-[11px] ${tone === "ok" ? "bg-green-tint text-green" : "bg-field text-ink-2 shadow-[0_0_0_1px_var(--line)]"}`}>
      {children}
    </span>
  );
}

export function Tick() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-green">
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

export function Cell({ n, kind, meta, children }: { n: number; kind: string; meta?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="group relative rounded-[10px] bg-canvas shadow-[0_0_0_1px_var(--line)] transition-shadow hover:shadow-[0_0_0_1px_var(--line-strong)]">
      <header className="flex h-8 items-center justify-between border-b border-line px-4 text-[11px] text-ink-3">
        <span className="font-mono">
          <b className="font-medium text-ink-2">{n}</b> · {kind}
        </span>
        {meta}
      </header>
      <div className="p-3.5">{children}</div>
    </section>
  );
}
