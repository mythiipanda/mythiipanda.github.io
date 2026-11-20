export const REPO = "https://github.com/mythiipanda/dime";
export const README = `${REPO}#quickstart`;
export const SITE = "https://mythiipanda.github.io/dime-site/";

export const TS_QUERY = `select PLAYER_NAME, TEAM_ABBREVIATION,
       round(TS_PCT * 100, 1)  as ts_pct,
       round(USG_PCT * 100, 1) as usg_pct
from silver_advanced
where MIN * GP >= 1500
order by TS_PCT desc
limit 5`;

export const TS_ROWS = [
  { player: "Luke Kennard", team: "LAL", ts: "68.9", usg: "13.1" },
  { player: "Jalen Duren", team: "DET", ts: "68.8", usg: "23.1" },
  { player: "Deandre Ayton", team: "LAL", ts: "67.6", usg: "16.4" },
  { player: "Neemias Queta", team: "BOS", ts: "67.4", usg: "14.5" },
  { player: "Nikola Jokić", team: "DEN", ts: "67.0", usg: "28.9" },
];

export const SHARE_QUERY = `select season,
       round(100.0 * sum(case when shot_value = 3 then 1 else 0 end)
             / count(*), 1) as three_share
from silver_hist_shots
group by season
order by season`;

export const COUNTS = [
  { n: "3,729,459", label: "shots with court coordinates" },
  { n: "4,482,180", label: "possessions" },
  { n: "3,236,915", label: "play-by-play events" },
  { n: "753,242", label: "lineup rows" },
];

export const COVERAGE = [
  { name: "Shots, possessions, lineups, standings", from: 2010, to: 2026, label: "2009-10 to 2025-26" },
  { name: "Play-by-play", from: 2021, to: 2025, label: "2020-21 to 2024-25" },
  { name: "Draft history", from: 1997, to: 2024, label: "1996-97 to 2023-24" },
  { name: "RAPTOR", from: 1977, to: 2022, label: "1976-77 to 2021-22" },
];
