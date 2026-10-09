export const projects = [
  { name: "wing-efficiency", cells: 4, active: true },
  { name: "rest-day-splits", cells: 6, active: false },
  { name: "mvp-ladder", cells: 9, active: false },
];

export const skills = [
  { name: "scouting-report", text: "One page per player: shooting splits, on/off and three comparable players.", runs: 18, steps: ["load player_season", "split by shot zone", "pull on/off from lineups", "rank 3 comps by usage and ts%"] },
  { name: "shot-quality", text: "Expected points by shot location and defender distance.", runs: 9, steps: ["load shots", "bin by distance and zone", "fit expected points", "chart vs league"] },
  { name: "lineup-report", text: "Five-man units ranked by net rating, with a minutes floor.", runs: 6, steps: ["load lineups", "filter minutes >= 100", "rank by net rating", "flag small samples"] },
];

export const tables = [
  { name: "player_season", rows: "612", cols: "34", fresh: "today" },
  { name: "boxscores", rows: "31,204", cols: "41", fresh: "today" },
  { name: "lineups", rows: "9,811", cols: "22", fresh: "today" },
  { name: "shots", rows: "224,380", cols: "17", fresh: "yesterday" },
  { name: "schedule", rows: "1,230", cols: "12", fresh: "today" },
];

export const schema = [
  ["player", "text"],
  ["team", "text"],
  ["pos", "text"],
  ["minutes", "int"],
  ["ts_pct", "double"],
  ["usg_pct", "double"],
  ["ast_pct", "double"],
  ["net_rtg", "double"],
];

export const commits = [
  { ref: "4f2a9c1", msg: "Add usage trend for Okafor", when: "2 min ago", add: 18, del: 0, files: ["cells/04-chart.json"] },
  { ref: "b81d03e", msg: "Rank wings by ts%", when: "1 hour ago", add: 24, del: 3, files: ["cells/02-sql.sql", "cells/03-chart.json"] },
  { ref: "91c7a52", msg: "Rest-day split by team", when: "yesterday", add: 41, del: 0, files: ["notebook.dime", "notes.md"] },
  { ref: "0a33f10", msg: "Init wing-efficiency", when: "3 days ago", add: 12, del: 0, files: ["notebook.dime"] },
];

export const rows = [
  { player: "D. Okafor", team: "OKC", ts: 68.4, usg: 27.1 },
  { player: "M. Reyes", team: "DEN", ts: 67.9, usg: 24.8 },
  { player: "T. Lindqvist", team: "MIN", ts: 66.8, usg: 22.3 },
  { player: "A. Brandt", team: "BOS", ts: 66.1, usg: 25.6 },
  { player: "J. Calloway", team: "MIA", ts: 65.7, usg: 23.9 },
];

export const sqlLines = [
  [["k", "select"], ["", " player, team, ts_pct, usg_pct"]],
  [["k", "from"], ["", " metrics.player_season"]],
  [["k", "where"], ["", " season = 2025 "], ["k", "and"], ["", " minutes >= 500"]],
  [["", "  "], ["k", "and"], ["", " pos "], ["k", "in"], ["", " ("], ["s", "'SF'"], ["", ", "], ["s", "'SG'"], ["", ")"]],
  [["k", "order by"], ["", " ts_pct "], ["k", "desc limit"], ["", " 5"]],
] as const;

export const runSteps = [
  { label: "Read skill", detail: "scouting-report", ms: "3 ms" },
  { label: "Write SQL", detail: "cells/02-sql.sql", ms: "1.1 s" },
  { label: "Run on DuckDB", detail: "61 rows", ms: "41 ms" },
  { label: "Draw chart", detail: "cells/03-chart.json", ms: "120 ms" },
  { label: "Save and commit", detail: "4f2a9c1", ms: "18 ms" },
];
