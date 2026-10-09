export const sql = `select PLAYER_NAME, TEAM_ABBREVIATION, TS_PCT, USG_PCT
from silver_advanced
where GP * MIN >= 1500
order by TS_PCT desc limit 5`;

export const notebookFile = `# notebook.dime
cell 2 sql
select PLAYER_NAME, TEAM_ABBREVIATION, TS_PCT, USG_PCT
from silver_advanced
where GP * MIN >= 1500
order by TS_PCT desc limit 5

cell 3 chart bar
x ts_pct  y player  highlight first

cell 4 chart line
x month  y usage  vs league_median`;

export const files = ["notebook.dime", "cells/02-sql.sql", "cells/03-chart.json", "notes.md"];
export const commits = [
  { msg: "Chart the top five by TS%", ref: "4f2a9c1", when: "2 min ago" },
  { msg: "Rank by TS% with a 1,500 minute floor", ref: "b81d03e", when: "1 hour ago" },
  { msg: "Load silver_advanced", ref: "91c7a52", when: "yesterday" },
  { msg: "Init true-shooting", ref: "0a33f10", when: "3 days ago" },
];

