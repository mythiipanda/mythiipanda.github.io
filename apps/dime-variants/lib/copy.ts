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
    { title: "Quick questions in Chat, saved work in Projects", text: "Ask in Chat for a quick answer. Send it to a Project and it becomes a notebook of prompt, SQL, Python, chart and markdown cells." },
    { title: "Skills are SKILL.md files", text: "A skill is a SKILL.md file. A workflow is a skill with parameters that generates a whole Project. 14 skills exist today." },
    { title: "Every run is a commit", text: "Projects save as files in git and pin to a warehouse version, so any result can be rerun and diffed." },
  ],
  git: { title: "Every answer keeps its query", sub: "dime writes SQL, chart and note cells into one folder per question. They are plain files, so you can diff them, review them and roll them back." },
  skills: {
    title: "Skills hold the steps you repeat",
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
      { title: "nba.duckdb", text: "nba.duckdb lands in the repo folder after fetch-data.sh." },
      { title: ".env", text: "Your model key goes in a local .env file." },
      { title: "Notebooks", text: "Notebooks save as files you can commit. Remote sync is planned." },
      { title: "Projects", text: "One folder per question, with cells you can rerun." },
    ],
  },
  faq: [
    { id: "who", question: "Who is dime for?", answer: "Stat nerds first, analysts next, teams later. It is an open-source project with no paid plan." },
    { id: "models", question: "Which models does it run on?", answer: "Any OpenAI-compatible endpoint. Local models are first-class." },
    { id: "data", question: "Where does the data come from?", answer: "A prebuilt warehouse on Hugging Face, versioned and refreshed nightly, is on the roadmap. Today scripts/fetch-data.sh downloads the data pack into one DuckDB file." },
    { id: "host", question: "Where does dime run?", answer: "On your machine. Self-hosting comes first, and the setup is a clone, a data fetch and npm run dev." },
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
