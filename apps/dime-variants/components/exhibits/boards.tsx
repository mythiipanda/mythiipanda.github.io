import { CLUTCH, CLUTCH_COUNT, LINEUPS, LINEUP_COUNT } from "@/lib/exhibits";
import { RankedList } from "@/components/ingot/ranked-list";

const ACCENT = "#2b5ce6";

export function Lineups() {
  return (
    <div className="exhibit p-5 md:p-6">
      <RankedList
        color={ACCENT}
        title={`2025-26 · 200+ minutes · top 5 of ${LINEUP_COUNT}`}
        valueLabel="net rtg"
        format={(v) => `+${v.toFixed(1)}`}
        rows={LINEUPS.map(([players, team, , minutes, off, def, net]) => ({
          label: players.split(" - ").join(", "),
          code: team,
          value: net,
          meta: `${minutes} min · ${off.toFixed(1)} off · ${def.toFixed(1)} def`,
        }))}
      />
    </div>
  );
}

export function Clutch() {
  return (
    <div className="exhibit p-5 md:p-6">
      <RankedList
        color={ACCENT}
        title={`2025-26 · top 5 of ${CLUTCH_COUNT}`}
        valueLabel="clutch pts"
        format={(v) => String(v)}
        rows={CLUTCH.map(([player, team, , minutes, points, fg, plusMinus]) => ({
          label: player,
          code: team,
          value: points,
          meta: `${minutes} min · ${fg.toFixed(1)}% FG · ${plusMinus > 0 ? "+" : plusMinus < 0 ? "−" : ""}${Math.abs(plusMinus)}`,
        }))}
      />
    </div>
  );
}
