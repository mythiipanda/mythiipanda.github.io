export const copy = {
  nav: { links: [{ label: "Notebooks", href: "#notebooks" }, { label: "Skills", href: "#skills" }, { label: "Setup", href: "#self-host" }, { label: "GitHub", href: "https://github.com/mythiipanda/dime" }], star: "Star" },
  hero: {
    line1: "The open-source analyst",
    line2: "for NBA data",
    sub: "Chat for quick questions. Projects for the work you keep.",
    primary: "Star on GitHub",
    secondary: "See the setup steps",
  },
  statement: { lead: "You ask about a lineup.", rest: "dime shows the SQL under the answer." },
  pillars: [
    { title: "Quick questions in Chat, saved work in Projects", text: "Send an answer to a Project to keep it." },
    { title: "Skills are SKILL.md files", text: "Press / to load one." },
    { title: "Every run is a commit", text: "Diff it. Roll it back." },
  ],
  git: { title: "Every answer keeps its query", sub: "dime writes SQL, chart and note cells into one folder per question. They are plain files, so you can diff them, review them and roll them back." },
  skills: {
    title: "Skills hold the steps you repeat",
    sub: "Metrics and minute floors, saved once.",
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
      { title: "nba.duckdb", text: "nba.duckdb lands in the repo folder after fetch-data.sh." },
      { title: ".env", text: "Your model key goes in a local .env file." },
      { title: "Notebooks", text: "Notebooks save as files you can commit. Remote sync is planned." },
      { title: "Projects", text: "One folder per question, with cells you can rerun." },
    ],
  },
  faq: [
    { id: "who", question: "Who is it for?", answer: "Stat nerds first, then analysts, then teams. Open source, no paid plan." },
    { id: "models", question: "Which models?", answer: "Gemini by default, NVIDIA NIM behind the same interface. Any OpenAI-compatible endpoint is planned." },
    { id: "host", question: "Where does it run?", answer: "On your machine." },
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

export const short = {
  h1a: "Ask the league.",
  h1b: "Keep the work.",
  sub: "Open-source NBA analyst. Self-hosted.",
  star: "Star on GitHub",
  setup: "Setup",
  groups: { chat: "Chat and Projects", data: "Data and skills", history: "History", setup: "Setup" },
  tiles: {
    chat: { name: "Chat", note: "Quick questions" },
    notebook: { name: "Notebook", note: "Saved work" },
    warehouse: { name: "Warehouse", note: "One DuckDB file" },
    skills: { name: "Skills", note: "14 today" },
    git: { name: "Git", note: "Commit per run" },
  },
};
