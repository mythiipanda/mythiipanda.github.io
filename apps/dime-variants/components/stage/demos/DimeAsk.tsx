"use client";

import {
  Bar,
  Collapse,
  Field,
  Stage,
  Stream,
  Text,
  Window,
  type Act,
} from "@/lib/stageshow";
import "./dime-ask.css";

// Dime answering a front-office question: the question is typed and sent,
// Thinking state, the answer streams in, its warehouse sources land under it.
// Adapted from the stageshow gold ai-chat; plays once, the still is the payoff.

const Q = "Who leads the league in true shooting among rotation players?";
const A =
  "Luke Kennard leads at 68.9% true shooting, edging Jalen Duren on nearly half the usage. Nikola Jokić is the workload outlier: top-five efficiency at 28.9% usage.";
const WORDS = A.split(" ").length;

type S = {
  draft: string;
  sent: boolean;
  phase: "idle" | "thinking" | "answer";
  words: number;
  sources: boolean;
};

const initial: S = {
  draft: "",
  sent: false,
  phase: "idle",
  words: 0,
  sources: false,
};
const poster: S = {
  draft: "",
  sent: true,
  phase: "answer",
  words: WORDS,
  sources: true,
};

async function script(a: Act<S>) {
  await a.wait(800);
  a.mark("type");
  await a.type("draft", Q, { interval: 34 });
  await a.wait(400);
  a.mark("send");
  a.put({ sent: true, draft: "" });
  await a.wait(450);
  a.put({ phase: "thinking" });
  await a.wait(1100);
  a.mark("stream");
  a.put({ phase: "answer" });
  for (let i = 1; i <= WORDS; i++) {
    a.put({ words: i });
    await a.wait(42);
  }
  await a.wait(300);
  a.mark("sources");
  a.put({ sources: true });
  await a.wait(2600);
}

export default function DimeAsk() {
  return (
    <Stage
      width={1040}
      height={452}
      compact={{ below: 700, width: 358, height: 520 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="var(--accent)"
      className="da"
    >
      {(s) => (
        <Window title="dime." className="da-win">
          <div className="da-body">
            <div className="da-thread">
              <div className="da-turn da-turn--past">
                <Bar w={210} h={30} r={15} tone={1} className="da-past-q" />
                <Bar w="84%" h={8} r={4} tone={2} />
                <Bar w="58%" h={8} r={4} tone={2} />
              </div>
              <Collapse open={s.sent} reveal="drop" from="below">
                <div className="da-q">
                  <Text>{Q}</Text>
                </div>
              </Collapse>
              <Collapse open={s.phase === "thinking"}>
                <Text className="da-thinking">Thinking</Text>
              </Collapse>
              <Collapse open={s.phase === "answer"}>
                <div className="da-a" data-on>
                  <Stream className="da-stream" text={A} count={s.words} />
                  <div className="da-sources" data-on={s.sources || undefined}>
                    <span className="da-source">silver_hist_player_seasons</span>
                    <span className="da-source">silver_hist_shots</span>
                  </div>
                </div>
              </Collapse>
            </div>
            <Field
              className="da-composer"
              value={s.draft}
              placeholder="Ask anything"
              focused={!s.sent}
            />
          </div>
        </Window>
      )}
    </Stage>
  );
}
