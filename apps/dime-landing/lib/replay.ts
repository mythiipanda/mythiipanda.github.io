import type { ArtifactColumn } from "@/components/product/ArtifactTable";
import type { ChartSeries } from "@/components/product/ArtifactChart";

export type ReplayToolChip = { label: string; chip: string };

export type ReplayRow = (string | number)[];

export type ReplayTableProps = {
  columns: ArtifactColumn[];
  rows: ReplayRow[];
};

export type ReplayChartProps = {
  series: ChartSeries[];
  height: number;
  footnote: string;
  kind?: "line" | "bars";
  labels?: string[];
};

export type ReplaySample = {
  isSample: true;
  label: string;
  disclosure: string;
};

export type ReplayConversation = {
  id: string;
  noun: string;
  question: string;
  thinking: string[];
  toolChips: ReplayToolChip[];
  answer: string;
  table: ReplayTableProps;
  chart: ReplayChartProps;
  sample: ReplaySample;
};

export const replay: ReplayConversation = {
  id: "scoring-trend",
  noun: "Player comparison",
  question:
    "Compare Shai Gilgeous-Alexander and Luka Doncic by month over their last six months.",
  thinking: [
    "Pulled game logs for both players",
    "Grouped 66 games each by calendar month",
    "Averaged points inside each month",
    "Read the game count behind each average",
    "Found the three months where the lead changes hands",
  ],
  toolChips: [
    { label: "Look up players", chip: "2 ids" },
    { label: "Read table", chip: "silver_boxscores" },
    { label: "Run query", chip: "GROUP BY month" },
    { label: "Verify row", chip: "2025-11-14 OKC" },
  ],
  answer:
    "SGA leads by 0.2 points per game, 30.6 to 30.4. His best month is November, 2.6 points above his own average and 3.1 clear of Doncic. Both bottom out in February at 27.6 and 26.2.",
  table: {
    columns: [
      { key: "player", label: "Player" },
      { key: "oct", label: "Oct", numeric: true },
      { key: "nov", label: "Nov", numeric: true },
      { key: "dec", label: "Dec", numeric: true },
      { key: "jan", label: "Jan", numeric: true },
      { key: "feb", label: "Feb", numeric: true },
      { key: "mar", label: "Mar", numeric: true },
    ],
    rows: [
      ["Shai Gilgeous-Alexander", 31.8, 33.2, 30.4, 28.9, 27.6, 31.5],
      ["Luka Doncic", 33.4, 30.1, 29.7, 30.8, 26.2, 32.0],
    ],
  },
  chart: {
    series: [
      {
        name: "Shai Gilgeous-Alexander",
        tone: "ink",
        values: [31.8, 33.2, 30.4, 28.9, 27.6, 31.5],
      },
      {
        name: "Luka Doncic",
        tone: "muted",
        values: [33.4, 30.1, 29.7, 30.8, 26.2, 32.0],
      },
    ],
    height: 180,
    footnote: "Sample data. Points per game by month.",
  },
  sample: {
    isSample: true,
    label: "Sample answer",
    disclosure:
      "Sample answer. Every number here is illustrative and none of it comes from a live warehouse.",
  },
};

const matchups: ReplayConversation = {
  id: "matchups",
  noun: "Matchups",
  question: "Compare Shai Gilgeous-Alexander and Luka Doncic over their last 30 games.",
  thinking: [
    "Pulled 60 game logs from 2025-26",
    "Computed per-game and per-100 rates",
    "Checked both totals against box scores",
    "Averaged points, assists and shooting splits",
    "Kept the categories where each player leads",
  ],
  toolChips: [
    { label: "Look up players", chip: "2 ids" },
    { label: "Read table", chip: "game_logs" },
    { label: "Run query", chip: "GROUP BY player" },
    { label: "Verify row", chip: "60 rows" },
  ],
  answer:
    "Shai scores more on fewer shots. He leads by 2.1 points per game and 5.8 points of true shooting. Luka creates more for others, with 2.4 more assists per game, and carries the larger share of his team's possessions.",
  table: {
    columns: [
      { key: "metric", label: "Metric" },
      { key: "sga", label: "SGA", numeric: true },
      { key: "luka", label: "Luka", numeric: true },
    ],
    rows: [
      ["Points", 32.4, 30.3],
      ["Assists", 6.1, 8.5],
      ["Rebounds", 5.4, 8.3],
      ["True shooting %", 65.2, 59.4],
      ["Usage %", 33.1, 36.8],
    ],
  },
  chart: {
    series: [
      {
        name: "SGA",
        tone: "ink",
        values: [33.1, 31.8, 32.9, 31.5, 32.7, 32.4],
      },
      {
        name: "Luka",
        tone: "muted",
        values: [29.8, 31.2, 30.5, 29.6, 30.9, 29.8],
      },
    ],
    height: 180,
    footnote: "Sample data. Points per game by 5-game chunk.",
  },
  sample: {
    isSample: true,
    label: "Sample answer",
    disclosure:
      "Sample answer. Every number here is illustrative and none of it comes from a live warehouse.",
  },
};

const lineups: ReplayConversation = {
  id: "lineups",
  noun: "Lineups",
  question: "Which five-man units played 200 or more minutes with a net rating above plus 10?",
  thinking: [
    "Scanned 4,812 five-man units",
    "Filtered to 200 minutes or more",
    "Ranked by net rating",
    "Checked minutes totals against stints",
    "Kept the four units above plus 10",
  ],
  toolChips: [
    { label: "Read table", chip: "lineup_stints" },
    { label: "Run query", chip: "HAVING min >= 200" },
    { label: "Run query", chip: "ORDER BY net" },
    { label: "Verify row", chip: "4,812 units" },
  ],
  answer:
    "Four units clear the bar. The top unit wins by 14.3 points per 100 possessions across 412 minutes, and its edge comes from defense, not offense.",
  table: {
    columns: [
      { key: "unit", label: "Unit" },
      { key: "min", label: "Min", numeric: true },
      { key: "net", label: "Net", numeric: true },
    ],
    rows: [
      ["Unit A", 412, 14.3],
      ["Unit B", 338, 12.6],
      ["Unit C", 271, 11.4],
      ["Unit D", 226, 10.2],
    ],
  },
  chart: {
    series: [
      {
        name: "Net rating",
        tone: "ink",
        values: [14.3, 12.6, 11.4, 10.2],
      },
    ],
    height: 180,
    footnote: "Sample data. Net rating per 100 possessions.",
    kind: "bars",
    labels: ["Unit A", "Unit B", "Unit C", "Unit D"],
  },
  sample: {
    isSample: true,
    label: "Sample answer",
    disclosure:
      "Sample answer. Every number here is illustrative and none of it comes from a live warehouse.",
  },
};

const props: ReplayConversation = {
  id: "props",
  noun: "Props",
  question: "How often has a guard cleared 7.5 assists against a top-five defense this season?",
  thinking: [
    "Found 5 defenses by rating",
    "Filtered guard games against them",
    "Counted games over 7.5 assists",
    "Computed the over rate in each split",
    "Checked totals against guard_games",
  ],
  toolChips: [
    { label: "Read table", chip: "guard_games" },
    { label: "Run query", chip: "GROUP BY tier" },
    { label: "Run query", chip: "avg(ast > 7.5)" },
    { label: "Verify row", chip: "1,967 games" },
  ],
  answer:
    "Guards cleared 7.5 assists in 38 of 121 games against the five best defenses, or 31.4 percent. Against the rest of the league that rate is 44.9 percent.",
  table: {
    columns: [
      { key: "split", label: "Split" },
      { key: "games", label: "Games", numeric: true },
      { key: "over", label: "Over" },
    ],
    rows: [
      ["Top-five defenses", 121, "31.4%"],
      ["All other teams", 1846, "44.9%"],
    ],
  },
  chart: {
    series: [
      {
        name: "Top five",
        tone: "ink",
        values: [32.1, 30.8, 31.5, 29.9, 32.3, 31.8],
      },
      {
        name: "Others",
        tone: "muted",
        values: [45.2, 44.1, 45.8, 43.9, 45.5, 44.9],
      },
    ],
    height: 180,
    footnote: "Sample data. Share of guard games over 7.5 assists.",
  },
  sample: {
    isSample: true,
    label: "Sample answer",
    disclosure:
      "Sample answer. Every number here is illustrative and none of it comes from a live warehouse.",
  },
};

export const scenarios: ReplayConversation[] = [replay, matchups, lineups, props];
