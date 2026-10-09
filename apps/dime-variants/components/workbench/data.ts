export const projects = [
  { name: "true-shooting", cells: 4, active: true },
];

export const skills = [
  { name: "leaderboard", text: "Read and present stat leaderboards with stated minutes qualifications for rate stats.", runs: "SKILL.md", steps: ["When to use", "What to fetch", "Caveats to apply"] },
  { name: "player-comparison", text: "Compare NBA players for current ability, team fit, asset value, or a stated future horizon.", runs: "SKILL.md", steps: ["Define what better means", "Build competing cases", "Test contradictions"] },
  { name: "schedule-rest", text: "Quantify rest, travel and schedule congestion effects on a matchup without overstating them.", runs: "SKILL.md", steps: ["Frame the question", "Gather the schedule evidence", "Size the effect"] },
];

export const tables = [
  { name: "silver_advanced", rows: "582", cols: "83", fresh: "Sep 9" },
  { name: "silver_boxscores", rows: "330,485", cols: "38", fresh: "Sep 29" },
  { name: "silver_lineups", rows: "40,000", cols: "97", fresh: "Sep 29" },
  { name: "silver_shots", rows: "3,295", cols: "28", fresh: "Sep 10" },
  { name: "silver_schedule", rows: "2,470", cols: "16", fresh: "Sep 10" },
];

export const schema = [
  ["PLAYER_NAME", "text"],
  ["TEAM_ABBREVIATION", "text"],
  ["GP", "int"],
  ["MIN", "double"],
  ["TS_PCT", "double"],
  ["USG_PCT", "double"],
  ["AST_PCT", "double"],
  ["NET_RATING", "double"],
];

export const commits = [
  { ref: "4f2a9c1", msg: "Chart the top five by TS%", when: "2 min ago", add: 18, del: 0, files: ["cells/04-chart.json"] },
  { ref: "b81d03e", msg: "Rank by TS% with a 1,500 minute floor", when: "1 hour ago", add: 24, del: 3, files: ["cells/02-sql.sql", "cells/03-chart.json"] },
  { ref: "91c7a52", msg: "Load silver_advanced", when: "yesterday", add: 41, del: 0, files: ["notebook.dime", "notes.md"] },
  { ref: "0a33f10", msg: "Init true-shooting", when: "3 days ago", add: 12, del: 0, files: ["notebook.dime"] },
];

export const rows = [
  { player: "L. Kennard", team: "LAL", ts: 68.9, usg: 13.1 },
  { player: "J. Duren", team: "DET", ts: 68.8, usg: 23.1 },
  { player: "D. Ayton", team: "LAL", ts: 67.6, usg: 16.4 },
  { player: "N. Queta", team: "BOS", ts: 67.4, usg: 14.5 },
  { player: "N. Jokić", team: "DEN", ts: 67.0, usg: 28.9 },
];

export const sqlLines = [
  [["k", "select"], ["", " PLAYER_NAME, TEAM_ABBREVIATION,"]],
  [["", "  round(TS_PCT * 100, 1), round(USG_PCT * 100, 1)"]],
  [["k", "from"], ["", " silver_advanced"]],
  [["k", "where"], ["", " GP * MIN >= 1500"]],
  [["k", "order by"], ["", " TS_PCT "], ["k", "desc limit"], ["", " 5"]],
] as const;

export const runSteps = [
  { label: "Read skill", detail: "leaderboard", ms: "3 ms" },
  { label: "Write SQL", detail: "cells/02-sql.sql", ms: "1.1 s" },
  { label: "Run on DuckDB", detail: "164 rows", ms: "41 ms" },
  { label: "Draw chart", detail: "cells/03-chart.json", ms: "120 ms" },
  { label: "Save and commit", detail: "4f2a9c1", ms: "18 ms" },
];
