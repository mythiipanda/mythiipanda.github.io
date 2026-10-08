export type Row = { label: string; values: string[]; lead?: number };

export type Sample = {
  id: string;
  noun: string;
  question: string;
  steps: string[];
  answer: string;
  columns: string[];
  rows: Row[];
  chartTitle: string;
  chart: { label: string; value: number; display: string }[];
  sql: string;
  source: string;
};

export const samples: Sample[] = [
  {
    id: "matchups",
    noun: "Matchups",
    question: "Compare Shai Gilgeous-Alexander and Luka Doncic over their last 30 games.",
    steps: ["Pulled 60 game logs from 2025-26", "Computed per-game and per-100 rates", "Checked both totals against box scores"],
    answer:
      "Shai scores more on fewer shots. He leads by 2.1 points per game and 5.8 points of true shooting. Luka creates more for others, with 2.4 more assists per game, and carries the larger share of his team's possessions.",
    columns: ["SGA", "Luka"],
    rows: [
      { label: "Points", values: ["32.4", "30.3"], lead: 0 },
      { label: "Assists", values: ["6.1", "8.5"], lead: 1 },
      { label: "Rebounds", values: ["5.4", "8.3"], lead: 1 },
      { label: "True shooting %", values: ["65.2", "59.4"], lead: 0 },
      { label: "Usage %", values: ["33.1", "36.8"], lead: 1 },
    ],
    chartTitle: "True shooting %, last 30 games",
    chart: [
      { label: "SGA", value: 65.2, display: "65.2" },
      { label: "Luka", value: 59.4, display: "59.4" },
      { label: "League", value: 57.8, display: "57.8" },
    ],
    sql: "SELECT player, avg(pts), avg(ast), avg(reb), sum(pts) / (2 * (sum(fga) + 0.44 * sum(fta))) AS ts\nFROM game_logs\nWHERE player IN ('Shai Gilgeous-Alexander', 'Luka Doncic')\n  AND game_rank <= 30\nGROUP BY player;",
    source: "Source: game_logs, 60 rows",
  },
  {
    id: "lineups",
    noun: "Lineups",
    question: "Which five-man units played 200 or more minutes with a net rating above plus 10?",
    steps: ["Scanned 4,812 five-man units", "Filtered to 200 minutes or more", "Ranked by net rating"],
    answer:
      "Four units clear the bar. The top unit wins by 14.3 points per 100 possessions across 412 minutes, and its edge comes from defense, not offense.",
    columns: ["Min", "Net"],
    rows: [
      { label: "Unit A", values: ["412", "+14.3"] },
      { label: "Unit B", values: ["338", "+12.6"] },
      { label: "Unit C", values: ["271", "+11.4"] },
      { label: "Unit D", values: ["226", "+10.2"] },
    ],
    chartTitle: "Net rating per 100 possessions",
    chart: [
      { label: "A", value: 14.3, display: "+14.3" },
      { label: "B", value: 12.6, display: "+12.6" },
      { label: "C", value: 11.4, display: "+11.4" },
      { label: "D", value: 10.2, display: "+10.2" },
    ],
    sql: "SELECT unit_id, sum(minutes) AS min, 100 * sum(pts_for - pts_against) / sum(possessions) AS net\nFROM lineup_stints\nGROUP BY unit_id\nHAVING sum(minutes) >= 200 AND net > 10\nORDER BY net DESC;",
    source: "Source: lineup_stints, 4,812 units",
  },
  {
    id: "props",
    noun: "Props",
    question: "How often has a guard cleared 7.5 assists against a top-five defense this season?",
    steps: ["Found 5 defenses by rating", "Filtered guard games against them", "Counted games over 7.5"],
    answer:
      "Guards cleared 7.5 assists in 38 of 121 games against the five best defenses, or 31.4 percent. Against the rest of the league that rate is 44.9 percent.",
    columns: ["Games", "Over"],
    rows: [
      { label: "Top-five defenses", values: ["121", "31.4%"] },
      { label: "All other teams", values: ["1,846", "44.9%"] },
    ],
    chartTitle: "Share of guard games over 7.5 assists",
    chart: [
      { label: "Top five", value: 31.4, display: "31.4%" },
      { label: "Others", value: 44.9, display: "44.9%" },
    ],
    sql: "SELECT opp_def_tier, count(*) AS games, avg((ast > 7.5)::int) AS over_rate\nFROM guard_games\nGROUP BY opp_def_tier;",
    source: "Source: guard_games, 1,967 games",
  },
];
