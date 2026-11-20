export const REPO = "https://github.com/mythiipanda/dime";
export const README = `${REPO}#quickstart`;
export const SITE = "https://mythiipanda.github.io/dime-site/";

export const TS_QUERY = `select PLAYER_NAME, TEAM,
       round(SALARY_2026_27 / 1000000.0, 1)      as salary_m,
       round(100.0 * SALARY_2026_27 / 165500000, 1) as cap_pct
from silver_salaries
order by SALARY_2026_27 desc
limit 5`;

export const TS_ROWS = [
  { player: "Stephen Curry", team: "GSW", salary: "59.6", cap: "36.0" },
  { player: "Nikola Jokić", team: "DEN", salary: "59.0", cap: "35.6" },
  { player: "Giannis Antetokounmpo", team: "MIL", salary: "58.5", cap: "35.3" },
  { player: "Jayson Tatum", team: "BOS", salary: "58.4", cap: "35.3" },
  { player: "Joel Embiid", team: "PHI", salary: "57.9", cap: "35.0" },
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
