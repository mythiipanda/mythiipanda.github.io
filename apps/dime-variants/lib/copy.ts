export const REPO = "https://github.com/mythiipanda/dime";
export const DEMO = "https://dime-fawn.vercel.app";

export const hero = {
  eyebrow: "Open-source NBA analyst",
  h1: "The NBA analyst that shows its work.",
  sub: "Ask a question in plain English. Dime plans the query, runs it on its own data warehouse, and shows the SQL, tables and charts behind every answer.",
  proof: "3.7M shots · 17 seasons of game logs · MIT",
};

export const short = {
  star: "Star on GitHub",
};

export const trace = {
  question: "Who had the best true shooting in 2025-26 with 1,500+ minutes?",
  calls: [
    { step: "Read skill", detail: "leaderboard" },
    { step: "Write SQL", detail: "select PLAYER_NAME, TS_PCT, USG_PCT from silver_advanced" },
    { step: "Run on DuckDB", detail: "5 rows in 41 ms" },
  ],
  answer: "Luke Kennard leads at 68.9% on 13.1% usage. Jalen Duren is a tenth of a point behind — 164 players clear the floor.",
};

export const method = {
  eyebrow: "How it answers",
  title: "Every claim, traceable.",
  steps: [
    { n: "01", name: "Reads the skill", body: "A SKILL.md file that says which tables answer this kind of question and which caveats apply." },
    { n: "02", name: "Writes the SQL", body: "Read-only queries against a local DuckDB warehouse. You can read every one." },
    { n: "03", name: "Runs it", body: "Five rows in 41 ms, not a confident paragraph. The answer is the rows." },
    { n: "04", name: "Cites them", body: "Tables, charts and shot maps come attached, each one tracing back to source rows." },
  ],
};

export const coverage = {
  eyebrow: "The warehouse",
  title: "Seventeen seasons deep.",
  note: "Seeded from public sources, refreshed in season. Every row carries its source.",
  stats: [
    { k: "2009-10 → 2025-26", v: "game logs, shots, lineups and standings" },
    { k: "2020-21 → 2024-25", v: "play-by-play, possession by possession" },
    { k: "1976-77 →", v: "RAPTOR ratings, the full public run" },
    { k: "2026-27", v: "cap ledger, contracts and draft picks for trade checks" },
  ],
};

export const surfaces = {
  eyebrow: "The product",
  title: "Built like a desk, not a magic box.",
  items: [
    { name: "Chat", body: "Quick questions. Answers stream in with tool calls visible while they run." },
    { name: "Notebook", body: "Send an answer to a notebook to keep it. Cells for SQL, charts and notes." },
    { name: "Skills", body: "Plain SKILL.md files that teach the analyst a job. Press / to load one." },
    { name: "History", body: "Every run is a commit. Diff it, roll it back, see exactly what changed." },
  ],
};

export const honest = {
  title: "When the data stops, it says so.",
  body: "Records, four factors, Finals results and rankings are computed from warehouse rows, never recalled. Ask outside the coverage window and Dime says what it doesn't have instead of guessing.",
};

export const cta = {
  title: "Put it on your question.",
};
