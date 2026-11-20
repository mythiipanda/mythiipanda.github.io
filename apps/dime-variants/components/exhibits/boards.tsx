import { CLUTCH, CLUTCH_COUNT, LINEUPS, LINEUP_COUNT } from "@/lib/exhibits";

const TOP_NET = LINEUPS[0][6];
const TOP_PTS = CLUTCH[0][4];

function Bar({ share }: { share: number }) {
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-inset" aria-hidden>
      <span className="block h-full rounded-full bg-accent" style={{ width: `${share * 100}%` }} />
    </span>
  );
}

export function Lineups() {
  return (
    <div className="exhibit">
      <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-4 text-[14px] md:px-6">
        <span className="label">2025-26 · 200+ minutes · top 5 of {LINEUP_COUNT}</span>
        <span className="label">net rtg</span>
      </div>
      <ol className="m-0 list-none p-0">
        {LINEUPS.map(([players, team, , minutes, off, def, net], i) => (
          <li key={players} className="grid grid-cols-[28px_minmax(0,1fr)_76px] items-center gap-3 border-b border-line px-5 py-4 last:border-0 md:px-6">
            <span className="num text-[13px] text-ink-3">{i + 1}</span>
            <div className="min-w-0">
              <p className="m-0 text-[14.5px] leading-snug text-ink">
                <span className="num mr-2 font-semibold">{team}</span>
                {players.split(" - ").join(", ")}
              </p>
              <p className="num m-0 mt-1 text-[13px] text-ink-3">{minutes} min · {off.toFixed(1)} off · {def.toFixed(1)} def</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="num text-[18px] font-semibold tracking-[-0.02em] text-ink">+{net.toFixed(1)}</span>
              <Bar share={net / TOP_NET} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Clutch() {
  return (
    <div className="exhibit">
      <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-4 text-[14px] md:px-6">
        <span className="label">2025-26 · top 5 of {CLUTCH_COUNT}</span>
        <span className="label">clutch pts</span>
      </div>
      <ol className="m-0 list-none p-0">
        {CLUTCH.map(([player, team, , minutes, points, fg, plusMinus], i) => (
          <li key={player} className="grid grid-cols-[28px_minmax(0,1fr)_64px] items-center gap-3 border-b border-line px-5 py-4 last:border-0 md:px-6">
            <span className="num text-[13px] text-ink-3">{i + 1}</span>
            <div className="min-w-0">
              <p className="m-0 truncate text-[14.5px] text-ink">{player}</p>
              <p className="num m-0 mt-1 text-[13px] text-ink-3">
                {team} · {minutes} min · {fg.toFixed(1)}% FG · {plusMinus > 0 ? "+" : plusMinus < 0 ? "−" : ""}{Math.abs(plusMinus)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="num text-[18px] font-semibold tracking-[-0.02em] text-ink">{points}</span>
              <Bar share={points / TOP_PTS} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
