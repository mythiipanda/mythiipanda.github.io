export const copy = {
  nav: { links: [{ label: "Notebooks", href: "#notebooks" }, { label: "Skills", href: "#skills" }, { label: "Setup", href: "#self-host" }, { label: "GitHub", href: "https://github.com/mythiipanda/dime" }], star: "Star" },
  hero: {
    line1: "The open-source analyst",
    line2: "for NBA data",
    sub: "Ask about any player or lineup. dime writes the SQL, runs it on your own DuckDB file, and saves the query and chart.",
    primary: "Star on GitHub",
    secondary: "See the setup steps",
  },
  statement: { lead: "You ask about a lineup.", rest: "dime shows the SQL under the answer. You keep both in a project folder, as plain files you can rerun and commit." },
  pillars: [
    { title: "Every answer keeps its query", text: "SQL, chart and note cells save as plain files in one folder per question." },
    { title: "Skills store the steps you repeat", text: "A skill is a file with your metrics and minute floors. dime loads it when you ask." },
    { title: "Git keeps the history", text: "Each run stages its cells. Commit, diff and roll back like any repo." },
  ],
  git: { title: "Every answer keeps its query", sub: "dime writes SQL, chart and note cells into one folder per question. They are plain files, so you can diff them, review them and roll them back." },
  skills: {
    title: "Skills store the steps you repeat",
    sub: "A skill is a file with the metrics and minute floors you want. dime loads it when you ask.",
    rows: [
      { name: "scouting-report", text: "One page per player: shooting splits, on/off and three comparable players.", runs: "18 runs" },
      { name: "shot-quality", text: "Expected points by shot location and defender distance.", runs: "9 runs" },
      { name: "lineup-report", text: "Five-man units ranked by net rating, with a minutes floor.", runs: "6 runs" },
    ],
  },
  host: {
    title: "Runs on your machine",
    sub: "Clone the repo, fetch the data pack, add a model key and start the app. The warehouse is one DuckDB file.",
    commands: ["git clone github.com/mythiipanda/dime", "./scripts/fetch-data.sh", "cd frontend && npm run dev"],
    items: [
      { title: "Your data", text: "nba.duckdb lands in the repo folder after fetch-data.sh." },
      { title: "Your keys", text: "Your model key goes in a local .env file." },
      { title: "Your repo", text: "Notebooks save as files you can commit. Remote sync is planned." },
      { title: "Your projects", text: "One folder per question, with cells you can rerun." },
    ],
  },
  faq: [
    { id: "run", question: "What does dime need to run?", answer: "A clone of the repo, the data pack from scripts/fetch-data.sh, a model key in a local .env file, and npm run dev in the frontend folder." },
    { id: "files", question: "Where do my answers live?", answer: "In a project folder on your machine. Each question keeps its SQL, chart and note cells as plain files you can rerun and commit." },
    { id: "remote", question: "Can I sync notebooks to a git remote?", answer: "Remote sync is planned. Today the files sit in your repo folder and you commit them yourself." },
  ],
  close: { title: "Clone it and ask about last season", button: "Star on GitHub" },
  foot: { link: "GitHub" },
  chat: {
    q1: "Who sat most on the second night of back to backs in 2025?",
    a1: "Denver 14, Portland 11. Full table saved to rest-days, cell 2.",
    q2: "Wings over 500 minutes sorted by ts% in 2025?",
    a2: "61 wings qualify. Okafor leads at 68.4% on 1,204 minutes. Table in cell 3.",
    placeholder: "Ask about the league",
    note: "Okafor's usage rose every month after the trade. Check rest-days before the playoff split.",
  },
};
export const REPO = "https://github.com/mythiipanda/dime";
