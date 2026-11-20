import { LUKA, LUKA_TREND } from "@/lib/exhibits";

const HEADLINE = [
  [LUKA.ppg.toFixed(1), "Points"],
  [LUKA.rpg.toFixed(1), "Rebounds"],
  [LUKA.apg.toFixed(1), "Assists"],
];

const DETAIL = [
  ["Games", String(LUKA.gp)],
  ["Minutes", LUKA.mpg.toFixed(1)],
  ["True shooting", `${LUKA.ts.toFixed(1)}%`],
  ["Usage", `${LUKA.usg.toFixed(1)}%`],
  ["Three-point", `${LUKA.fg3.toFixed(1)}%`],
  ["Free throw", `${LUKA.ft.toFixed(1)}%`],
];

const PEAK = Math.max(...LUKA_TREND.map((row) => row[2]));

export function PlayerCard() {
  return (
    <div className="exhibit">
      <div className="flex flex-col gap-5 bg-canvas p-4 font-sans text-[14px] tracking-[-0.01em] text-ink md:gap-6 md:p-7">
        <p className="m-0 max-w-[85%] self-end rounded-[16px] rounded-br-[6px] bg-hover-2 px-4 py-2.5 text-[14.5px]">How is Luka Dončić&apos;s season going?</p>
        <article className="grid overflow-hidden rounded-[16px] bg-surface shadow-[0_0_0_1px_var(--line)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div className="flex flex-col gap-7 p-5 md:p-7">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{LUKA.name}</h3>
                <p className="num m-0 mt-1 text-ink-3">{LUKA.team} · age {LUKA.age} · 2025-26</p>
              </div>
              <span className="num rounded-full bg-accent-tint px-2.5 py-1 text-[12px] font-medium text-accent-ink">1st in scoring</span>
            </header>
            <dl className="m-0 grid grid-cols-3 gap-4">
              {HEADLINE.map(([value, unit]) => (
                <div key={unit}>
                  <dd className="num m-0 text-[36px] font-semibold leading-none tracking-[-0.03em] md:text-[48px]">{value}</dd>
                  <dt className="mt-2 text-ink-3">{unit}</dt>
                </div>
              ))}
            </dl>
            <dl className="m-0 grid grid-cols-2 gap-x-8">
              {DETAIL.map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between border-t border-line py-2.5">
                  <dt className="text-ink-2">{term}</dt>
                  <dd className="num m-0 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="m-0 flex flex-col border-t border-line p-5 md:p-7 lg:border-l lg:border-t-0">
            <figcaption className="text-ink-2">Points per game, by season</figcaption>
            <ol className="m-0 mt-6 flex min-h-[200px] flex-1 list-none items-end gap-2 p-0 md:gap-3">
              {LUKA_TREND.map(([season, team, ppg], i) => (
                <li key={season} className="flex h-full flex-1 flex-col justify-end gap-2">
                  <span className="num text-center text-[12.5px] font-medium">{ppg.toFixed(1)}</span>
                  <span
                    className={`block rounded-t-[6px] ${i === LUKA_TREND.length - 1 ? "bg-accent" : team === "LAL" ? "bg-ink-3" : "bg-line-strong"}`}
                    style={{ height: `${(ppg / PEAK) * 78}%` }}
                  />
                  <span className="num text-center text-[11px] text-ink-3">
                    <span className="hidden sm:inline">{season.slice(0, 5)}</span>
                    {season.slice(5)}
                  </span>
                </li>
              ))}
            </ol>
            <p className="label m-0 mt-5">Dallas through 2023-24, Lakers since</p>
          </figure>
        </article>
        <p className="label m-0">silver_player_season · silver_advanced · silver_hist_player_seasons</p>
      </div>
    </div>
  );
}
