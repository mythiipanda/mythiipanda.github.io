"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { copy } from "@/lib/copy";

const notes = ["Clone", "Fetch data", "Run"];

function Line({ cmd, note }: { cmd: string; note: string }) {
  const [done, setDone] = useState(false);
  const go = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {
      return;
    }
  };
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="w-20 shrink-0 text-[12px] text-ink-3">{note}</span>
      <code className="min-w-0 flex-1 break-words font-mono text-[13px] text-ink md:text-[14px]"><span className="text-[var(--cobalt-tx)]">$ </span>{cmd}</code>
      <Button type="button" variant="quiet" size="icon" onClick={go} aria-label={`Copy ${note}`}>{done ? <Check className="text-green" /> : <Copy />}</Button>
    </div>
  );
}

export function CSetup() {
  return (
    <section id="self-host" className="mx-auto grid max-w-[1320px] scroll-mt-24 items-center gap-8 px-5 py-14 md:px-6 lg:grid-cols-12 lg:gap-12">
      <h2 className="text-[30px] leading-[34px] md:text-[40px] md:leading-[44px] lg:col-span-5">Run it on your machine.</h2>
      <Card className="gap-0 overflow-hidden border-line bg-field p-0 lg:col-span-7">
        {copy.host.commands.map((c, i) => (
          <div key={c}>
            {i > 0 && <Separator />}
            <Line cmd={c} note={notes[i]} />
          </div>
        ))}
      </Card>
    </section>
  );
}
