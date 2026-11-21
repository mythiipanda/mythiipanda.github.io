"use client";

import { Stage, Check, Icon, States, type Act } from "@/lib/stageshow";
import "./dime-trade.css";

// A trade check played once: the cursor runs the legality check, the
// constraints resolve one by one, the check goes Legal, and the trade pins
// to the board. Real strings only; payoff is the Legal badge + pin.

type S = {
  step: "idle" | "checking" | "checked" | "pinned";
};

const initial: S = { step: "idle" };
const poster: S = { step: "pinned" };

const GIVE = ["Anthony Davis", "Dalton Knecht", "2029 FRP (DAL)"];
const GET = ["Kyrie Irving", "Daniel Gafford", "Max Christie"];

async function script(a: Act<S>) {
  await a.wait(900);
  a.mark("run");
  await a.click("run-check");
  a.put({ step: "checking" });
  await a.wait(1400);
  a.put({ step: "checked" });
  await a.wait(700);
  a.mark("pin");
  await a.click("pin");
  a.put({ step: "pinned" });
  await a.wait(2200);
}

export default function DimeTrade() {
  return (
    <Stage
      width={1040}
      height={452}
      compact={{ below: 560, width: 358, height: 520 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      accent="var(--accent)"
      className="dt"
    >
      {(s) => (
        <div className="dt-win" data-target="win">
          <div className="dt-head">
            <span className="dt-title">trade check</span>
            <span className="dt-crumb">WAS ↔ DAL</span>
          </div>
          <div className="dt-cols">
            <div className="dt-col">
              <span className="dt-team">WAS receives</span>
              {GIVE.map((p) => (
                <div key={p} className="dt-row">
                  <span className="dt-name">{p}</span>
                </div>
              ))}
            </div>
            <div className="dt-col">
              <span className="dt-team">DAL receives</span>
              {GET.map((p) => (
                <div key={p} className="dt-row">
                  <span className="dt-name">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dt-rules" data-on={s.step === "checked" || s.step === "pinned" || undefined}>
            {["Salary match", "Apron check", "Roster count"].map((r) => (
              <span key={r} className="dt-rule">
                <Check on size={11} /> {r}
              </span>
            ))}
          </div>
          <div className="dt-foot">
            <span
              className="dt-badge"
              data-state={s.step === "pinned" ? "pinned" : s.step === "checked" ? "legal" : "idle"}
            >
              {s.step === "pinned" ? "Pinned to Board 4" : s.step === "checked" ? "Legal" : s.step === "checking" ? "Checking…" : ""}
            </span>
            <button type="button" className="dt-btn" data-target="run-check" data-state={s.step}>
              {s.step === "idle" ? "Run check" : s.step === "checking" ? "Checking…" : "Legal"}
            </button>
            <button type="button" className="dt-btn dt-btn--ghost" data-target="pin" data-on={s.step === "checked" || s.step === "pinned" || undefined}>
              <Icon name="plus" size={11} /> Pin to board
            </button>
          </div>
        </div>
      )}
    </Stage>
  );
}
