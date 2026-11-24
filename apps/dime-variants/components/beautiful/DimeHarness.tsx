"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import CodeBlock from "@/components/beautiful/primitives/CodeBlock";
import LoadingState from "@/components/beautiful/primitives/LoadingState";
import PromptBar from "@/components/beautiful/primitives/PromptBar";
import RecordsTable from "@/components/beautiful/primitives/RecordsTable";
import SidebarNav from "@/components/beautiful/primitives/SidebarNav";
import ThinkingState from "@/components/beautiful/primitives/ThinkingState";
import { ShotMap } from "@/components/shot-map";
import { THREE_SHARE } from "@/lib/shots";
import { REPO, SHARE_QUERY, TS_QUERY, TS_ROWS } from "@/lib/site";

function StreamLine({
  text,
  tone = "ink",
  onDone,
}: {
  text: string;
  tone?: "ink" | "ink-2";
  onDone?: () => void;
}) {
  const words = text.split(" ");
  const [n, setN] = useState(0);
  const streaming = n < words.length;
  useEffect(() => {
    if (!streaming) return;
    const t = setTimeout(() => setN((c) => c + 1), 34);
    return () => clearTimeout(t);
  }, [n, streaming]);
  useEffect(() => {
    if (!streaming) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streaming]);
  return (
    <p className={`max-w-[620px] text-[13.5px] leading-[1.65] ${tone === "ink" ? "text-ink" : "text-ink-2"}`}>
      {words.slice(0, n).map((word, i) => (
        <span key={i} className="inline">
          {word}{" "}
        </span>
      ))}
      {streaming && <span className="stream-caret is-streaming" />}
    </p>
  );
}

/* a consistent reply: the intro streams in, then the artifact reveals below it
 * once the text settles — so nothing pops in before the sentence lands. */
function Reply({ intro, children }: { intro: string; children?: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <>
      <StreamLine text={intro} tone="ink-2" onDone={() => setReady(true)} />
      {ready && children != null && (
        <div className="mt-5" style={{ animation: "fade-up 400ms cubic-bezier(0.23,1,0.32,1) both" }}>
          {children}
        </div>
      )}
    </>
  );
}

/* ── Dime scenarios ───────────────────────────────────────── */

const TRACE = [
  { primary: "Read", secondary: "silver_contracts", mono: true },
  { primary: "Write", secondary: "query.sql", mono: true },
  { primary: "Run", secondary: "duckdb · 5 rows", mono: true },
];

function SalaryTable() {
  const top = Number(TS_ROWS[0].cap);
  return (
    <div className="overflow-hidden rounded-card bg-surface shadow-card">
      <table className="w-full border-collapse text-left text-[12.5px]">
        <thead>
          <tr className="text-[11.5px] font-medium text-ink-3">
            <th className="px-3.5 py-2.5 font-medium">Player</th>
            <th className="px-2 py-2.5 font-medium">Team</th>
            <th className="px-2 py-2.5 text-right font-medium">Salary</th>
            <th className="w-[34%] py-2.5 pl-4 pr-3.5 font-medium">Share of cap</th>
          </tr>
        </thead>
        <tbody>
          {TS_ROWS.map((row, i) => (
            <tr key={row.player} className="border-t border-line" style={{ animation: `fade-up 420ms cubic-bezier(0.23,1,0.32,1) ${i * 70}ms both` }}>
              <td className="px-3.5 py-2.5 font-medium text-ink">{row.player}</td>
              <td className="px-2 py-2.5 font-mono text-[11.5px] text-ink-2">{row.team}</td>
              <td className="px-2 py-2.5 text-right font-mono text-[11.5px] tabular-nums text-ink">${row.salary}M</td>
              <td className="py-2.5 pl-4 pr-3.5">
                <span className="flex items-center gap-2.5">
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-hover-2">
                    <span className="block h-full rounded-full bg-accent" style={{ width: `${(Number(row.cap) / top) * 100}%` }} />
                  </span>
                  <span className="w-10 text-right font-mono text-[11.5px] tabular-nums text-ink-2">{row.cap}%</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-line px-3.5 py-2 font-mono text-[11px] text-ink-3">
        <span>silver_contracts</span>
        <span>5 of 483 rows · 2026-27</span>
      </div>
    </div>
  );
}

function SalaryAnswer() {
  const [settled, setSettled] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <ThinkingState variant="Coding" rows={TRACE} active="Querying the warehouse" done="Ran 3 tools" onSettled={() => setSettled(true)} />
      {settled && (
        <Reply intro="Stephen Curry, at $62.6M. That is 37.8% of the $165.5M cap. Three players are tied for third at $58.5M.">
          <SalaryTable />
        </Reply>
      )}
    </div>
  );
}

function Provenance({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-4 hidden grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[12.5px] lg:grid">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-ink-3">{k}</dt>
          <dd className="m-0 text-right font-mono text-[11.5px] text-ink-2">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function ShareSpark() {
  const w = 620;
  const h = 96;
  const x = (i: number) => (i / (THREE_SHARE.length - 1)) * w;
  const y = (v: number) => h - ((v - 10) / 35) * h;
  const line = (col: 1 | 2) => THREE_SHARE.map((row, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(row[col]).toFixed(1)}`).join("");
  return (
    <div className="rounded-card bg-surface p-4 shadow-card">
      <div className="flex items-baseline justify-between text-[12px] text-ink-3">
        <span><span className="mr-1.5 inline-block size-2 rounded-full bg-accent" />Threes <span className="ml-1 font-mono text-ink">22.3% → 41.4%</span></span>
        <span><span className="mr-1.5 inline-block size-2 rounded-full bg-ink-3" />Midrange <span className="ml-1 font-mono text-ink">32.9% → 15.3%</span></span>
      </div>
      <svg viewBox={`0 -6 ${w} ${h + 12}`} className="mt-3 block h-auto w-full" role="img" aria-label="Share of shots that were threes and midrange, 2009-10 to 2025-26">
        <path d={line(2)} fill="none" stroke="var(--ink-3)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d={line(1)} fill="none" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-3"><span>2009-10</span><span>2025-26</span></div>
    </div>
  );
}

type Scenario = {
  prompt: string;
  beat: number;
  Answer: () => ReactNode;
  loadingVariant?: string;
  fullBleed?: boolean;
  paneTitle?: string;
  Pane?: () => ReactNode;
  Workspace?: () => ReactNode;
  workspaceTitle?: string;
};

const SCENARIOS: Record<string, Scenario> = {
  salaries: {
    prompt: "Who is the highest-paid player in 2026-27?",
    beat: 450,
    paneTitle: "Query",
    Pane: () => (
      <>
        <CodeBlock wide lines={TS_QUERY.split("\n").map((line) => line.replace(/^ {7}/, "  ").replace(/ {2,}as /, " as "))} code={TS_QUERY} filename="query.sql" />
        <Provenance rows={[["Table", "silver_contracts"], ["Season", "2026-27"], ["Rows read", "483"], ["Pack", "Nov 19, 2026"]]} />
      </>
    ),
    Answer: () => <SalaryAnswer />,
  },
  shots: {
    prompt: "How has shot selection changed since 2009-10?",
    beat: 900,
    paneTitle: "Shot chart",
    Pane: () => (
      <div className="mx-auto max-w-[276px] lg:max-w-none">
        <ShotMap fill />
        <Provenance rows={[["Table", "silver_hist_shots"], ["Shots", "3,729,459"], ["Seasons", "2009-10 to 2025-26"]]} />
      </div>
    ),
    Answer: () => (
      <Reply intro="Threes went from 22.3% of all shots to 41.4%. The midrange gave up almost exactly that much. The chart on the right is every shot location in the season you pick.">
        <ShareSpark />
      </Reply>
    ),
  },
  warehouse: {
    prompt: "What is in the warehouse?",
    beat: 700,
    workspaceTitle: "Warehouse",
    Workspace: () => <RecordsTable fill />,
    Answer: () => <StreamLine tone="ink-2" text="The largest tables are on the left, with row counts and the last season each one covers. Click a header to sort, or a column to see how it is filled." />,
  },
  sql: {
    prompt: "Show me the SQL for three-point share by season.",
    beat: 600,
    Answer: () => (
      <Reply intro="One query on silver_hist_shots. It returns 17 rows, one per season.">
        <CodeBlock wide lines={SHARE_QUERY.split("\n")} code={SHARE_QUERY} filename="three_share.sql" />
      </Reply>
    ),
  },
  limits: {
    prompt: "What can't you answer?",
    beat: 600,
    Answer: () => (
      <StreamLine tone="ink-2" text="Play-by-play stops at 2024-25, draft history at 2023-24 and RAPTOR at 2021-22. The pack was built on Nov 19, 2026, so nothing after that is in it. I am also a model and can be wrong, which is why every answer comes with its rows." />
    ),
  },
  other: {
    prompt: "",
    beat: 500,
    Answer: () => (
      <StreamLine tone="ink-2" text="This page only scripts five questions, so I can't answer that one here. Try salaries, shot selection, the warehouse tables, the SQL, or where the data stops. The real Dime takes any question." />
    ),
  },
};

type ScenarioId = keyof typeof SCENARIOS;

const KEYWORDS: [ScenarioId, string[]][] = [
  ["sql", ["sql", "query", "code"]],
  ["salaries", ["paid", "salary", "salaries", "contract", "cap", "money", "earn"]],
  ["shots", ["shot", "three", "3-point", "midrange", "chart", "curry"]],
  ["warehouse", ["warehouse", "table", "data", "rows", "schema", "have"]],
  ["limits", ["can't", "cannot", "limit", "wrong", "miss", "stop"]],
];

function matchScenario(text: string): ScenarioId {
  const lower = text.trim().toLowerCase();
  const exact = SUGGESTION_POOL.find((item) => item.label.toLowerCase() === lower);
  if (exact) return exact.id;
  for (const [id, words] of KEYWORDS) {
    if (words.some((word) => lower.includes(word))) return id;
  }
  return "other";
}

function SuggestionIcon({ kind }: { kind: string }) {
  const paths: Record<string, ReactNode> = {
    salaries: <g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>,
    shots: <g><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /></g>,
    warehouse: <g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
    sql: <path d="M8 6l-5 6 5 6M16 6l5 6-5 6" />,
    limits: <g><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5v.01" /></g>,
  };
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[kind] ?? paths.limits}
    </svg>
  );
}

const SUGGESTION_POOL: { id: ScenarioId; label: string }[] = [
  { id: "salaries", label: SCENARIOS.salaries.prompt },
  { id: "shots", label: SCENARIOS.shots.prompt },
  { id: "warehouse", label: SCENARIOS.warehouse.prompt },
  { id: "sql", label: SCENARIOS.sql.prompt },
  { id: "limits", label: SCENARIOS.limits.prompt },
];

const RECENTS: { id: ScenarioId; label: string; prompt?: string }[] = [
  { id: "salaries", label: "Highest-paid, 2026-27", prompt: SCENARIOS.salaries.prompt },
  { id: "shots", label: "Shot selection since 2009-10", prompt: SCENARIOS.shots.prompt },
  { id: "warehouse", label: "Warehouse tables", prompt: SCENARIOS.warehouse.prompt },
  { id: "sql", label: "Three-point share SQL", prompt: SCENARIOS.sql.prompt },
  { id: "limits", label: "Where the data stops", prompt: SCENARIOS.limits.prompt },
];

/* ── the agent reply — thinks, then builds the answer ─────── */

function AssistantResponse({ scenarioId, className = "" }: { scenarioId: ScenarioId; className?: string }) {
  const scenario = SCENARIOS[scenarioId];
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnswered(true), scenario.beat);
    return () => clearTimeout(t);
  }, [scenario.beat]);

  return (
    <article className={`min-w-0 ${className}`} style={{ animation: "fade-up 450ms cubic-bezier(0.23,1,0.32,1) both" }}>
      {answered ? (
        <div style={{ animation: "fade-in 260ms ease both" }}>{scenario.Answer()}</div>
      ) : (
        <div className="flex min-h-6 items-center" style={{ animation: "fade-in 200ms ease-out both" }}>
          {scenario.loadingVariant === "Surfer" ? (
            <LoadingState variant="Surfer" />
          ) : (
            <LoadingState label="Thinking" variant="Dots" />
          )}
        </div>
      )}
    </article>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end pl-10 sm:pl-24" style={{ animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" }}>
      <div className="rounded-xl bg-field px-3.5 py-2 text-[13px] leading-relaxed text-ink shadow-hairline">{text}</div>
    </div>
  );
}

/* ── empty state ──────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────
 * HOME ENTRANCE STORYBOARD
 *
 * Read top-to-bottom. Each value is ms after mount.
 *
 *  170ms   “Hello Shane” rises 23px, blur 17px → 0
 *  330ms   question follows with the same reveal
 *  400ms   prompt bar resolves into place
 *  550ms   recommendations finish the sequence
 * ───────────────────────────────────────────────────────── */

const HOME_REVEAL_TIMING = {
  hello:           170, // greeting enters first
  question:        330, // question follows closely
  prompt:          400, // composer lands after the copy
  recommendations: 550, // secondary actions finish the scene
};

const HOME_REVEAL = {
  offsetY:  23, // px traveled upward
  blur:     17, // px of initial blur
  duration: 800, // ms for each element to settle
  easing:   "cubic-bezier(0.16, 1, 0.3, 1)",
};

/* Static entrance params. These were previously tunable via DialKit; DialKit
 * (a dev-only tuning overlay) has been removed, so we use the tuned defaults. */
const revealParams = {
  reveal: {
    blur: HOME_REVEAL.blur,
    offsetY: HOME_REVEAL.offsetY,
    duration: HOME_REVEAL.duration,
  },
  sequence: {
    helloAt: HOME_REVEAL_TIMING.hello,
    questionAt: HOME_REVEAL_TIMING.question,
    promptAt: HOME_REVEAL_TIMING.prompt,
    recommendationsAt: HOME_REVEAL_TIMING.recommendations,
  },
};

function homeRevealStyle(
  visible: boolean,
  reveal: { blur: number; offsetY: number; duration: number },
): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0, 0, 0)" : `translate3d(0, ${reveal.offsetY}px, 0)`,
    filter: visible ? "blur(0px)" : `blur(${reveal.blur}px)`,
    transition: ["opacity", "transform", "filter"]
      .map((property) => `${property} ${reveal.duration}ms ${HOME_REVEAL.easing}`)
      .join(", "),
  };
}

function EmptyState({ onSend, shuffle, offset }: { onSend: (text: string, id: ScenarioId) => void; shuffle: () => void; offset: number }) {
  const shown = [0, 1, 2].map((i) => SUGGESTION_POOL[(offset + i) % SUGGESTION_POOL.length]);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    setStage(0);
    const timers = [
      setTimeout(() => setStage(1), revealParams.sequence.helloAt),
      setTimeout(() => setStage(2), revealParams.sequence.questionAt),
      setTimeout(() => setStage(3), revealParams.sequence.promptAt),
      setTimeout(() => setStage(4), revealParams.sequence.recommendationsAt),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mx-auto flex min-h-full max-w-[720px] flex-col justify-center px-4 py-10 sm:px-8">
      <h1 className="text-[26px] font-normal tracking-[-0.02em] text-ink">
        <span className="home-reveal block text-ink-3" style={homeRevealStyle(stage >= 1, revealParams.reveal)}>Dime</span>
        <span className="home-reveal block" style={homeRevealStyle(stage >= 2, revealParams.reveal)}>Ask a basketball question.</span>
      </h1>

      <div className="home-reveal relative mt-7" style={homeRevealStyle(stage >= 3, revealParams.reveal)}>
        <div className="relative">
          <PromptBar
            demo={false}
            tall
            placeholder="Players, teams, shots, contracts…"
            onSend={(text) => onSend(text, matchScenario(text))}
          />
        </div>
      </div>

      <div className="home-reveal mt-6 flex flex-col" style={homeRevealStyle(stage >= 4, revealParams.reveal)}>
        {shown.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSend(item.label, item.id);
            }}
            className="-mx-2 flex items-center gap-3 rounded-control px-2 py-2.5 text-left text-[14px] text-ink transition-colors duration-150 hover:bg-hover"
          >
            <span className="text-ink-3">
              <SuggestionIcon kind={item.id} />
            </span>
            <span className="min-w-0 truncate">{item.label}</span>
          </button>
        ))}
        <div className="mt-1 flex items-center gap-5 pl-0.5 text-[13px] text-ink-3">
          <button type="button" onClick={shuffle} className="flex items-center gap-2 py-1 transition-colors duration-150 hover:text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg>
            Shuffle suggestions
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────── */

type Msg = { id: number; role: "user"; text: string } | { id: number; role: "assistant"; scenarioId: ScenarioId };
type Chat = { id: number; title: string | null; messages: Msg[] };

/* the pane arrives on the same beat as the answer it belongs to */
/* The pane shell reserves its space as soon as the message is sent, so the
 * column never reflows mid-thought. Only the body swaps — a quiet loader while
 * the agent works, then the artifact fades up in place. */
function PaneBody({ beat, children }: { beat: number; children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), beat);
    return () => clearTimeout(t);
  }, [beat]);

  if (!show) {
    return (
      <div className="flex h-full items-center justify-center pb-10">
        <LoadingState label="Gathering" variant="Dots" />
      </div>
    );
  }

  return <div className="pb-9 lg:pb-0" style={{ animation: "fade-up 400ms cubic-bezier(0.23,1,0.32,1) both" }}>{children}</div>;
}

/* ── spreadsheet views + property inspector ───────────────────
 * The bottom bar lists views; selecting one swaps the right pane
 * from the assistant chat to a Property configuration inspector.
 */

export default function DimeHarness({ autoplay = "shots" }: { autoplay?: ScenarioId | null }) {
  const [chats, setChats] = useState<Chat[]>([{ id: 1, title: null, messages: [] }]);
  const [activeId, setActiveId] = useState(1);
  const [offset, setOffset] = useState(0);
  /* spreadsheet: which view/property is open in the right inspector (null = chat) */
  const chatIdRef = useRef(1);
  const msgIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const [composerH, setComposerH] = useState(150);

  const chat = chats.find((c) => c.id === activeId) ?? chats[0];
  const active = chat.messages.length > 0;

  /* right-hand pane: the latest assistant message that carries one */
  const [closedPaneId, setClosedPaneId] = useState(0);
  const lastPaneMsg = [...chat.messages]
    .reverse()
    .find(
      (m): m is Extract<Msg, { role: "assistant" }> =>
        m.role === "assistant" && !!SCENARIOS[m.scenarioId].Pane,
    );
  const paneMsg = lastPaneMsg && lastPaneMsg.id !== closedPaneId ? lastPaneMsg : null;
  const paneScenario = paneMsg ? SCENARIOS[paneMsg.scenarioId] : null;

  /* spreadsheet workspace: table becomes the main pane, chat docks to the right */
  const workspaceMsg = [...chat.messages]
    .reverse()
    .find(
      (m): m is Extract<Msg, { role: "assistant" }> =>
        m.role === "assistant" && !!SCENARIOS[m.scenarioId].Workspace,
    );
  const workspaceScenario = workspaceMsg ? SCENARIOS[workspaceMsg.scenarioId] : null;

  const appendExchange = (target: Chat, text: string, scenarioId: ScenarioId): Chat => ({
    ...target,
    title: target.title ?? (text.length > 30 ? `${text.slice(0, 30).trimEnd()}…` : text),
    messages: [
      ...target.messages,
      { id: (msgIdRef.current += 1), role: "user", text },
      { id: (msgIdRef.current += 1), role: "assistant", scenarioId },
    ],
  });

  const send = (text: string, scenarioId: ScenarioId) => {
    setChats((current) => current.map((c) => (c.id === chat.id ? appendExchange(c, text, scenarioId) : c)));
  };

  /* reopening an existing chat replays it; otherwise recents open in a
   * fresh chat unless the current one is empty */
  const [replay, setReplay] = useState<Record<number, number>>({});
  const pickRecent = (scenarioId: ScenarioId, label: string, prompt = label) => {
    const existing = chats.find((c) => c.title === label);
    if (existing) {
      if (prompt !== label) {
        setChats((current) =>
          current.map((c) =>
            c.id === existing.id
              ? {
                  ...c,
                  messages: c.messages.map((message) =>
                    message.role === "user" && message.text === label ? { ...message, text: prompt } : message,
                  ),
                }
              : c,
          ),
        );
      }
      setActiveId(existing.id);
      setReplay((current) => ({ ...current, [existing.id]: (current[existing.id] ?? 0) + 1 }));
      return;
    }
    if (chat.messages.length === 0) {
      setChats((current) =>
        current.map((c) => (c.id === chat.id ? appendExchange({ ...c, title: label }, prompt, scenarioId) : c)),
      );
      return;
    }
    const id = (chatIdRef.current += 1);
    setChats((current) => [...current, appendExchange({ id, title: label, messages: [] }, prompt, scenarioId)]);
    setActiveId(id);
  };

  const newChat = () => {
    const id = (chatIdRef.current += 1);
    setChats((current) => [...current, { id, title: null, messages: [] }]);
    setActiveId(id);
  };

  const closeChat = (id: number) => {
    const remaining = chats.filter((c) => c.id !== id);
    if (remaining.length === 0) {
      const nid = (chatIdRef.current += 1);
      setChats([{ id: nid, title: null, messages: [] }]);
      setActiveId(nid);
      return;
    }
    setChats(remaining);
    if (id === activeId) setActiveId(remaining[remaining.length - 1].id);
  };

  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    if (el && window.innerWidth >= 1024) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [chat.messages, active]);

  /* the composer floats over the thread (ChatGPT-style), so the thread pads its
   * bottom by the composer's height — that lets the last message rest flush with
   * the bar and older content scroll behind it. Measure it as it changes. */
  useEffect(() => {
    const el = composerRef.current;
    if (!el) return;
    const measure = () => setComposerH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active, activeId]);

  /* artifacts (charts, tables, approval cards) reveal after the text streams
   * in, growing the thread well after `messages` last changed — often in one
   * big jump. Track whether the reader is pinned to the bottom from their
   * scroll position, then follow any later growth so a tall reply's footer
   * isn't left clipped behind the composer. Scrolling up to re-read releases
   * the pin. */
  useEffect(() => {
    if (!active) return;
    const el = scrollRef.current;
    const content = el?.firstElementChild;
    if (!el || !content) return;
    let stick = true;
    let raf = 0;
    const onScroll = () => {
      stick = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    };
    const pin = () => {
      if (!stick || window.innerWidth < 1024) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    // ResizeObserver catches gradual growth (streaming); MutationObserver catches
    // a whole artifact being inserted and its height-animation style ticks.
    const resize = new ResizeObserver(pin);
    resize.observe(content);
    const mutate = new MutationObserver(pin);
    mutate.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ["style"] });
    return () => {
      el.removeEventListener("scroll", onScroll);
      resize.disconnect();
      mutate.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [active, activeId]);

  /* the landing hero plays one question by itself, once */
  const played = useRef(false);
  useEffect(() => {
    if (!autoplay || played.current) return;
    played.current = true;
    const t = setTimeout(() => pickRecent(autoplay, RECENTS.find((r) => r.id === autoplay)?.label ?? SCENARIOS[autoplay].prompt, SCENARIOS[autoplay].prompt), 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* the tab bar rides the top of the main pane in both layouts */
  const tabBar = (
    <div className="flex h-11 shrink-0 items-center gap-1 overflow-x-auto border-b border-line px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chats.map((c) => (
        <div
          key={c.id}
          /* fixed width so every close button sits in the same spot — you can
           * close a run of tabs without chasing the next × across the bar */
          className={`group/tab flex h-7 w-36 shrink-0 items-center gap-0.5 rounded-[7px] pl-2.5 pr-0.5 text-[12.5px] font-medium transition-colors duration-100 ${
            c.id === activeId ? "bg-hover-2 text-ink" : "text-ink-2 hover:bg-hover hover:text-ink"
          }`}
        >
          <button type="button" aria-pressed={c.id === activeId} onClick={() => setActiveId(c.id)} title={c.title ?? "New chat"} className="min-w-0 flex-1 text-left">
            <span className="block truncate">{c.title ?? "New chat"}</span>
          </button>
          <button
            type="button"
            aria-label="Close tab"
            onClick={() => closeChat(c.id)}
            className="-my-1 flex size-6 shrink-0 items-center justify-center rounded-[5px] text-ink-3 transition-[background-color,color] duration-100 hover:bg-hover-2 hover:text-ink"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        aria-label="New chat"
        onClick={newChat}
        className="ml-0.5 flex size-7 shrink-0 items-center justify-center rounded-[7px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );

  /* the message thread + composer — reused as the main column (wide) or the
   * docked assistant panel in spreadsheet mode (narrow) */
  const renderThread = (narrow: boolean) => (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div
          className={`flex flex-col gap-8 pt-8 ${narrow ? "px-4" : "px-4 sm:px-8 lg:px-12"}`}
          /* pad the bottom by the floating composer's height so the last message
             can rest flush with the bar and older content scrolls behind it */
          style={{ paddingBottom: composerH + 16 }}
        >
          {chat.messages.map((message) => {
            const full = !narrow && message.role === "assistant" && SCENARIOS[message.scenarioId].fullBleed;
            return (
              <div key={message.id} className={narrow || full ? "w-full" : "mx-auto w-full max-w-[720px]"}>
                {message.role === "user" ? (
                  <UserBubble text={message.text} />
                ) : (
                  <AssistantResponse key={`${message.id}-${replay[chat.id] ?? 0}`} scenarioId={message.scenarioId} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* soft fade so content dissolves into the bar instead of hard-clipping */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: composerH + 32, background: "linear-gradient(to top, var(--page) 64%, transparent)" }}
      />

      {/* the composer floats over the thread; content scrolls behind it */}
      <div
        ref={composerRef}
        className={`absolute inset-x-0 bottom-0 ${narrow ? "p-3" : "px-4 pb-6 sm:px-8 lg:px-12"}`}
      >
        <div className={narrow ? "" : "mx-auto max-w-[720px]"}>
          <PromptBar
            demo={false}
            tall
            placeholder="Reply"
            onSend={(text) => send(text, matchScenario(text))}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="light flex h-full gap-0 bg-canvas p-2.5 font-sans text-[14px] leading-normal tracking-[-0.01em] text-ink lg:pl-0">
      <SidebarNav
        fill
        className="hidden lg:flex"
        recents={RECENTS}
        activeTitle={chat.title}
        onPick={(id, label, prompt) => pickRecent(id as ScenarioId, label, prompt)}
        onNewChat={newChat}
        footerLabel="Star on GitHub"
        onFooterClick={() => window.open(REPO, "_blank", "noopener")}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {/* panels row — main pane + docked side pane */}
        <div className="flex min-h-0 flex-1 flex-col gap-2.5 lg:flex-row">
          {workspaceScenario ? (
            <>
              {/* main pane — the live spreadsheet */}
              <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[14px] border border-line bg-page">
                {tabBar}
                <div className="flex min-h-0 flex-1 flex-col">{workspaceScenario.Workspace?.()}</div>
              </section>

              {/* right inspector — assistant chat */}
              <aside
                className="hidden w-[300px] shrink-0 flex-col overflow-hidden rounded-[14px] border border-line bg-page lg:flex"
                style={{ animation: "fade-up 400ms cubic-bezier(0.23,1,0.32,1) both" }}
              >
                <div className="flex h-11 shrink-0 items-center border-b border-line px-4">
                  <span className="text-[13px] font-semibold text-ink">Chat</span>
                </div>
                {renderThread(true)}
              </aside>
            </>
          ) : (
            <>
              <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[14px] border border-line bg-page">
                {tabBar}
                {active ? (
                  renderThread(false)
                ) : (
                  <div className="min-h-0 flex-1 overflow-y-auto">
                    <EmptyState onSend={send} shuffle={() => setOffset((current) => (current + 3) % SUGGESTION_POOL.length)} offset={offset} />
                  </div>
                )}
              </section>

              {/* artifact pane — its own rounded container */}
              {active && paneMsg && paneScenario?.Pane && (
                  <aside
                    key={`${paneMsg.id}-${replay[chat.id] ?? 0}`}
                    className="light flex h-[54%] w-full shrink-0 flex-col overflow-hidden rounded-[14px] border border-line bg-page lg:h-auto lg:w-[380px] lg:shrink-0"
                    style={{ animation: "fade-in 300ms ease both" }}
                  >
                    <div className="flex h-11 shrink-0 items-center justify-between border-b border-line px-3 sm:pl-4">
                      <span className="text-[13px] font-semibold text-ink">{paneScenario.paneTitle}</span>
                      <div className="flex items-center gap-0.5 text-ink-3">
                        <button
                          type="button"
                          aria-label="Close pane"
                          onClick={() => setClosedPaneId(paneMsg.id)}
                          className="flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 hover:bg-hover hover:text-ink"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto p-4">
                      <PaneBody beat={paneScenario.beat}>{paneScenario.Pane()}</PaneBody>
                    </div>
                  </aside>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
