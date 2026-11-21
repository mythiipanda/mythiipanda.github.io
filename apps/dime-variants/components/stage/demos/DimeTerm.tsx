"use client";

import { Stage, Window, Prompt, Caret, Text, type Act } from "@/lib/stageshow";
import "./dime-term.css";

// Quickstart played once: clone, fetch the warehouse, first answer returns
// with its source. Lines land one by one; the payoff is the answer chip.

type S = {
  c1: string;
  c2: string;
  step: number;
};

const CMD1 = "git clone https://github.com/mythiipanda/dime";
const CMD2 = "./scripts/fetch-data.sh";

const initial: S = { c1: "", c2: "", step: 0 };
const poster: S = { c1: CMD1, c2: CMD2, step: 5 };

async function script(a: Act<S>) {
  await a.wait(700);
  a.mark("clone");
  await a.type("c1", CMD1, { interval: 26 });
  a.put({ step: 1 });
  await a.wait(1100);
  a.mark("fetch");
  await a.type("c2", CMD2, { interval: 26 });
  a.put({ step: 2 });
  await a.wait(800);
  a.put({ step: 3 });
  await a.wait(700);
  a.mark("answer");
  a.put({ step: 4 });
  await a.wait(1000);
  a.put({ step: 5 });
  await a.wait(2400);
}

export default function DimeTerm() {
  return (
    <Stage
      width={760}
      height={420}
      compact={{ below: 560, width: 358, height: 480 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="var(--accent)"
      className="dq"
    >
      {(s) => (
        <Window title="dime — zsh" className="dq-win">
          <div className="dq-body">
            <Prompt path="~">
              <span className="dq-typed">{s.c1}</span>
            </Prompt>
            {s.step >= 1 && (
              <div className="dq-out">
                <Text>Cloning into 'dime'... done.</Text>
              </div>
            )}
            {s.step >= 1 && (
              <Prompt path="~/dime">
                <span className="dq-typed">{s.c2}</span>
              </Prompt>
            )}
            {s.step >= 3 && (
              <div className="dq-out">
                <Text>warehouse.duckdb — 58 tables, 14.9M rows</Text>
              </div>
            )}
            {s.step >= 4 && (
              <div className="dq-answer" data-on>
                <Text>"Who led the league in true shooting?"</Text>
                <div className="dq-sources">
                  <span className="dq-src">silver_hist_player_seasons</span>
                </div>
              </div>
            )}
            {s.step === 0 && s.c1 === "" && (
              <Prompt path="~">
                <Caret />
              </Prompt>
            )}
          </div>
        </Window>
      )}
    </Stage>
  );
}
