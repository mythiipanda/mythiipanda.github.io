"use client";

import { Collapse, Stage, Stream, Text, type Act } from "@/components/stageshow/kit";
import { ArrowUp, ChevronRight, Database, FileCode2, Home, LayoutGrid, Library, MessageCircle, SquarePen, Workflow } from "lucide-react";
import { DimeMark } from "@/components/mark";
import { TS_ROWS } from "@/lib/site";

const Q = "Who are the highest-paid players in 2026-27?";
const A = "Stephen Curry tops the 2026-27 list at $59.6M — about 36% of the cap. Nikola Jokić is right behind at $59.0M. 464 contracts are in the warehouse.";
const WORDS = A.split(" ").length;

const NAV = [
  { icon: Home, label: "Home" },
  { icon: MessageCircle, label: "Ask", active: true },
  { icon: Workflow, label: "Workflows" },
  { icon: LayoutGrid, label: "Boards" },
  { icon: Library, label: "Library" },
  { icon: Database, label: "Data" },
];

const STEPS = [
  { icon: Database, verb: "Read schema", detail: "silver_salaries" },
  { icon: FileCode2, verb: "Wrote SQL", detail: "SALARY_2026_27 desc" },
  { icon: Database, verb: "Ran on DuckDB", detail: "5 rows" },
];

type S = {
  draft: string;
  sent: boolean;
  steps: number;
  words: number;
  rows: number;
  sources: boolean;
};

const initial: S = { draft: "", sent: false, steps: 0, words: 0, rows: 0, sources: false };
const poster: S = { draft: "", sent: true, steps: STEPS.length, words: WORDS, rows: TS_ROWS.length, sources: true };

async function script(a: Act<S>) {
  await a.wait(700);
  a.mark("type");
  await a.type("draft", Q, { interval: 30 });
  await a.wait(350);
  a.mark("send");
  await a.click("send");
  a.put({ sent: true, draft: "" });
  for (let i = 1; i <= STEPS.length; i++) {
    await a.wait(560);
    a.put({ steps: i });
  }
  await a.wait(650);
  a.mark("answer");
  for (let i = 1; i <= WORDS; i++) {
    a.put({ words: i });
    await a.wait(42);
  }
  await a.wait(350);
  for (let i = 1; i <= TS_ROWS.length; i++) {
    a.put({ rows: i });
    await a.wait(160);
  }
  await a.wait(350);
  a.mark("sources");
  a.put({ sources: true });
  await a.wait(3200);
}

export function AskDemo() {
  return (
    <Stage
      width={980}
      height={560}
      compact={{ below: 620, width: 358, height: 620 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: "send", style: "arrow", ripple: true }}
      className="dd"
    >
      {(s) => (
        <div className="dd-win">
          <aside className="dd-side">
            <div className="dd-brand"><DimeMark size={16} />Dime</div>
            <div className="dd-newchat"><SquarePen size={15} strokeWidth={1.6} />New chat</div>
            <div className="dd-nav">
              {NAV.map(({ icon: Icon, label, active }) => (
                <div key={label} className={active ? "dd-navitem dd-on" : "dd-navitem"}>
                  <Icon size={15} strokeWidth={1.6} />{label}
                </div>
              ))}
            </div>
            <div className="dd-chats">Chats</div>
            <div className="dd-chat">Top salaries, 2026-27</div>
            <div className="dd-chat">Thunder four factors</div>
          </aside>
          <div className="dd-main">
            <div className="dd-topbar"><span className="dd-title">Top salaries, 2026-27</span></div>
            <div className="dd-thread">
              <Collapse open={s.sent} reveal="drop" from="below">
                <div className="dd-q"><Text>{Q}</Text></div>
              </Collapse>
              <div className="dd-steps">
                {STEPS.slice(0, s.steps).map(({ icon: Icon, verb, detail }) => (
                  <div key={verb} className="dd-step">
                    <Icon size={14} strokeWidth={1.6} />
                    <span>{verb}</span>
                    <code>{detail}</code>
                  </div>
                ))}
              </div>
              <Collapse open={s.words > 0}>
                <div className="dd-a">
                  <Stream text={A} count={s.words} />
                </div>
              </Collapse>
              <Collapse open={s.rows > 0}>
                <div className="dd-table">
                  <table>
                    <thead>
                      <tr><th>Player</th><th>Team</th><th>Salary</th><th>Cap %</th></tr>
                    </thead>
                    <tbody>
                      {TS_ROWS.slice(0, s.rows).map((row) => (
                        <tr key={row.player}>
                          <td>{row.player}</td><td>{row.team}</td><td>${row.salary}M</td><td>{row.cap}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Collapse open={s.sources}>
                    <div className="dd-src"><ChevronRight size={13} strokeWidth={1.8} />Sources and provenance<span>5 of 464 rows</span></div>
                  </Collapse>
                </div>
              </Collapse>
            </div>
            <div className="dd-composer" data-target="send">
              <span className="dd-draft">{s.draft || "Ask a follow-up"}</span>
              <span className="dd-go"><ArrowUp size={15} strokeWidth={2} /></span>
            </div>
          </div>
        </div>
      )}
    </Stage>
  );
}
