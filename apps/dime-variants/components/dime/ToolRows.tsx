export type ToolRowData = { label: string; meta: string; detail?: string };

export default function ToolRows({ rows }: { rows: ToolRowData[] }) {
  return (
    <div>
      {rows.map((r) => (
        <div key={r.label} style={{ borderBottom: "1px solid var(--color-stone-border)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "6px 0" }}>
            <span
              aria-hidden
              style={{ width: 7, height: 7, borderRadius: 9999, background: "var(--color-ink-black)", flexShrink: 0, transform: "translateY(-1px)" }}
            />
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 13, color: "var(--color-ink-black)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.label}</span>
              <span style={{ display: "block", fontSize: 12, color: "var(--color-ash-gray)" }}>{r.meta}</span>
            </span>
          </div>
          {r.detail && (
            <div style={{ padding: "0 0 8px 15px", fontSize: 11, color: "var(--color-warm-gray)" }}>{r.detail}</div>
          )}
        </div>
      ))}
    </div>
  );
}
