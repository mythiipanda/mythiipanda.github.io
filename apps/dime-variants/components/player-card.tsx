import { DimeMark } from "@/components/mark";

const BARS = [
  { name: "Stephen Curry", team: "GSW", m: 59.6 },
  { name: "Nikola Jokić", team: "DEN", m: 59.0 },
  { name: "Giannis Antetokounmpo", team: "MIL", m: 58.5 },
  { name: "Jayson Tatum", team: "BOS", m: 58.4 },
];

export function PlayerCard() {
  return (
    <div className="overflow-hidden rounded-[12px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="flex items-center gap-2 text-[13px] font-medium"><DimeMark size={14} />player_card</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">2026-27</span>
      </div>
      <div className="px-5 py-4">
        <p className="text-[13px] text-ink-3">Highest-paid player</p>
        <p className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">Stephen Curry <span className="text-[15px] font-medium text-ink-2">GSW · G</span></p>
        <div className="mt-4 space-y-2">
          {BARS.map((row) => (
            <div key={row.name} className="grid grid-cols-[150px_1fr_52px] items-center gap-x-3">
              <span className="truncate text-[13px] font-medium">{row.name}</span>
              <span className="relative h-[6px] rounded-full bg-inset">
                <span className="absolute inset-y-0 rounded-full bg-accent" style={{ width: `${(row.m / 60) * 100}%` }} />
              </span>
              <span className="num text-right font-mono text-[12px] text-ink-2">${row.m.toFixed(1)}M</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line px-5 py-2.5 font-mono text-[11px] text-ink-3">silver_salaries · bref_contracts · fetched Nov 19, 2026</div>
    </div>
  );
}
