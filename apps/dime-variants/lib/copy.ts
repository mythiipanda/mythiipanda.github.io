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
      { name: "leaderboard", text: "Read and present stat leaderboards with stated minutes qualifications for rate stats.", runs: "SKILL.md" },
      { name: "player-comparison", text: "Compare NBA players for current ability, team fit, asset value, or a stated future horizon.", runs: "SKILL.md" },
      { name: "schedule-rest", text: "Quantify rest, travel and schedule congestion effects on a matchup without overstating them.", runs: "SKILL.md" },
    ],
  },
  host: {
    title: "Runs on your machine",
    sub: "Clone the repo, fetch the data pack, add a model key and start the app. The warehouse is one DuckDB file.",
    commands: ["git clone github.com/mythiipanda/dime", "./scripts/fetch-data.sh", "cd frontend && npm run dev"],
    items: [
      { title: "warehouse.duckdb", text: "warehouse.duckdb lands in backend/data after fetch-data.sh." },
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
    q1: "Who had the best true shooting in 2025-26 with 1,500 or more minutes?",
    a1: "Luke Kennard leads at 68.9%. Table saved in cell 2.",
    q2: "Who has the highest usage among them?",
    a2: "Nikola Jokić at 28.9% among the top five. Table in cell 3.",
    placeholder: "Ask about the league",
    note: "164 players clear the 1,500 minute floor.",
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
