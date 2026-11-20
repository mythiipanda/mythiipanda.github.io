export const REPO = "https://github.com/mythiipanda/dime";
export const README = `${REPO}#quickstart`;
export const SITE = "https://mythiipanda.github.io/dime-site/";

export const TS_QUERY = `select PLAYER_NAME, TEAM,
       round(SALARY / 1000000.0, 1)         as salary_m,
       round(100.0 * SALARY / 165500000, 1) as cap_pct
from silver_contracts
where SEASON_YEAR = 2026
order by SALARY desc, PLAYER_NAME
limit 5`;

export const TS_ROWS = [
  { player: "Stephen Curry", team: "GSW", salary: "62.6", cap: "37.8" },
  { player: "Nikola Jokic", team: "DEN", salary: "59.0", cap: "35.7" },
  { player: "Anthony Davis", team: "WAS", salary: "58.5", cap: "35.3" },
  { player: "Giannis Antetokounmpo", team: "MIA", salary: "58.5", cap: "35.3" },
  { player: "Jayson Tatum", team: "BOS", salary: "58.5", cap: "35.3" },
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
