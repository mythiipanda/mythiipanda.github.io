const KEYWORDS = /\b(select|from|where|order by|group by|limit|as|case|when|then|else|end|desc|sum|count|round)\b/g;

export function Sql({ code }: { code: string }) {
  const parts = code.split(KEYWORDS);
  return (
    <pre className="sql">
      <code>
        {parts.map((part, i) => (i % 2 ? <span key={i} className="k">{part}</span> : part))}
      </code>
    </pre>
  );
}

export function Query({ code, source }: { code: string; source: string }) {
  return (
    <details className="group rounded-[12px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
      <summary className="flex min-h-11 items-center justify-between gap-4 px-4 text-[14px] text-ink-2">
        <span>
          <span className="font-medium text-ink">Query behind this chart</span>
          <span className="max-sm:hidden"> · {source}</span>
        </span>
        <span aria-hidden="true" className="font-mono text-[13px] text-ink-3 group-open:hidden">show</span>
        <span aria-hidden="true" className="hidden font-mono text-[13px] text-ink-3 group-open:inline">hide</span>
      </summary>
      <div className="border-t border-line px-4 py-4">
        <Sql code={code} />
      </div>
    </details>
  );
}
