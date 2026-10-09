export type SkillDoc = { name: string; description: string; when: string; insights: string[]; caveats: string[] };

export const skillDocs: SkillDoc[] = [
  {
    "name": "defensive-analysis",
    "description": "Evaluate player defense across multiple signals with minutes floors and team-context caveats.",
    "when": "Questions about a player's defense, best defenders, DPOY-type questions, or defensive matchups.",
    "insights": [
      "Defense is multi-dimensional. No single number defines a defender. Weigh steals and blocks as signals of event creation, not proof of overall value.",
      "Off-ball positioning, rotations, rim protection, and matchup difficulty all matter and none are fully captured in box scores.",
      "Signals to combine: steal and block rates (gambling vs discipline), on-court defensive rating with its team context, opponent shooting when available, and role (who they guard matters more than raw output)."
    ],
    "caveats": [
      "Never crown someone \"best defender\" from on-court DRTG or a steals-per-game total.",
      "Note the minutes floor, the sample size, the teammate context, and which signals point which way.",
      "When signals disagree, say so instead of picking the flattering one."
    ]
  },
  {
    "name": "draft-prospects",
    "description": "Evaluate NBA draft prospects with limited college or international data, focusing on translatable skills, age, production context, and the pitfalls of mock-draft consensus.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "followup-correction",
    "description": "Handle correction openers by inheriting prior context, but reset entities when the new question is league-wide.",
    "when": "The user opens with a correction phrase - \"no i mean\", \"i meant\", \"actually\", \"sorry\", \"correction:\" - indicating the previous answer missed their intent.",
    "insights": [
      "A correction opener signals the user is refining or redirecting, not starting fresh. Inherit the prior turn's context (season, stat, comparison frame) unless the correction explicitly changes it.",
      "Entity reset rule: if the corrected question is league-wide (\"best defensive players in the league\", \"who leads the league in...\"), DROP any player or team entities carried from the prior turn. A league-wide ask names no player - carrying one forward (e.g., Wembanyama from a prior player question) suppresses the league route and steers to the wrong analysis.",
      "If the correction names a specific player or team, bind to the new entity and drop the old one."
    ],
    "caveats": [
      "State what context was inherited (\"using the same 2024-25 season as before\").",
      "State when entities were reset (\"treating this as a league-wide question, not about any single player\")."
    ]
  },
  {
    "name": "in-progress-games",
    "description": "Reason about NBA games still being played, separating mid-game signal from noise and knowing when to refuse a projection.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "injury-impact",
    "description": "Analyze how an NBA injury, absence, restriction, or return changes roles, lineups, team quality, and outlook.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "leaderboard",
    "description": "Read and present stat leaderboards with stated minutes qualifications for rate stats.",
    "when": "Questions about who leads the league in a stat, scoring titles, per-game versus totals leaders, or top-N lists.",
    "insights": [
      "Rate stats (per-game, per-36, percentages, ratings) require minutes qualifications. Never present a rate leaderboard without a minutes floor.",
      "Totals and per-game answer different questions. State which version the user asked for, and name the other version's holder when they differ.",
      "Per-game leaders need a meaningful sample. Totals leaders need no floor beyond availability, but note games played when the gap is close."
    ],
    "caveats": [
      "Always state the minutes floor used, in the output, every time.",
      "Never crown an obscure low-minute player as \"best\" because their per-game line looks gaudy.",
      "Never multiply a per-game average by games to manufacture a total."
    ]
  },
  {
    "name": "league-ratings",
    "description": "Rank NBA teams or players by offense or defense, judge whether a team's record will hold, and recommend hold, buy, or sell.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "matchup-brief",
    "description": "Preview a game between two named teams with ratings, splits, availability, season series, and a labeled prediction.",
    "when": "Questions naming two teams for a pre-game brief, preview, or prediction.",
    "insights": [
      "A brief compares two teams, never evaluates one team alone.",
      "Three narrative cards carry the story: best-on-best, secondary scoring, and x-factor.",
      "Label each card by claim kind: best-on-best is observed, secondary scoring is derived, x-factor is projection or judgment."
    ],
    "caveats": [
      "Lineup evidence needs a possession floor and splits need a games floor. State each floor in every output.",
      "Small samples are noisy. Pair every small-sample number with its sample size.",
      "Quote pace alongside scoring efficiency in every comparison."
    ]
  },
  {
    "name": "odds-lines",
    "description": "Read NBA spreads and totals as market prices, explain what line movement does and does not imply, and compare market prices against modeled estimates.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "player-comparison",
    "description": "Compare NBA players for current ability, team fit, asset value, or a stated future horizon.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "playoff-translation",
    "description": "Test whether a team's regular-season profile will translate to the playoffs using separate performance, rotation, availability, and late-game evidence.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "schedule-rest",
    "description": "Quantify rest, travel, and schedule congestion effects on an NBA matchup using rest splits and schedule density, without overstating them.",
    "when": "",
    "insights": [],
    "caveats": []
  },
  {
    "name": "team-offense",
    "description": "Evaluate team offense via ORTG with pace context, shooting efficiency, and lineup effects.",
    "when": "Questions about a team's offense, offensive rating, scoring systems, or how a team's attack stacks up.",
    "insights": [
      "Offensive rating (points per 100 possessions) is the core number, but it only reads correctly with pace context. A fast team scoring 118 per 100 possessions is running a different operation than a slow team scoring 118 - pace shapes what the rating means for game flow and matchup.",
      "Check TS% alongside ORTG: elite offense is usually elite shooting, and a high ORTG built on volume rather than efficiency is more fragile.",
      "Lineup context matters. Five-man units reveal what the aggregate hides: who creates for whom, which combos collapse, and whether the starting lineup's number matches the bench's."
    ],
    "caveats": [
      "Always quote pace alongside ORTG.",
      "A top-five ORTG against a soft schedule is a caveat, not a crown.",
      "A team's ORTG is a blend of very different units - say which units drive it when the data is available."
    ]
  },
  {
    "name": "trade-analysis",
    "description": "Analyze an NBA trade as a basketball, asset-value, market-price, contract, and legality decision for both teams.",
    "when": "",
    "insights": [],
    "caveats": []
  }
];
