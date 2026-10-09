export const sql = `select player, pos, ts_pct, minutes
from metrics.player_season
where season = 2025 and minutes >= 500
  and pos in ('SF','SG')
order by ts_pct desc limit 5`;

export const notebookFile = `# notebook.dime
cell 2 sql
select player, pos, ts_pct, minutes
from metrics.player_season
where season = 2025 and minutes >= 500
order by ts_pct desc limit 5

cell 3 chart bar
x ts_pct  y player  highlight first

cell 4 chart line
x month  y usage  vs league_median`;

export const files = ["notebook.dime", "cells/02-sql.sql", "cells/03-chart.json", "notes.md"];
export const commits = [
  { msg: "Add usage trend for Okafor", ref: "4f2a9c1", when: "2 min ago" },
  { msg: "Rank wings by ts%", ref: "b81d03e", when: "1 hour ago" },
  { msg: "Rest-day split by team", ref: "91c7a52", when: "yesterday" },
  { msg: "Init wing-efficiency", ref: "0a33f10", when: "3 days ago" },
];

