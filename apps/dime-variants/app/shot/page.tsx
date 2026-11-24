"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArtifactPanel } from "../../components/stage/chat-window";
import { PlatformWindow } from "../../components/stage/platform-window";
import RecordsTable from "../../components/beautiful/primitives/RecordsTable";

function Shot() {
  const sp = useSearchParams();
  const what = sp.get("what") ?? "records";
  const kind = sp.get("kind") ?? "board";
  const kinds = (sp.get("kinds") ?? "board,report").split(",");
  return (
    <div className="h-dvh w-dvw overflow-hidden bg-canvas [--ink-2:rgb(25_25_25/0.72)] [--ink-3:rgb(25_25_25/0.62)]">
      {what === "records" ? (
        <div className="h-full w-full bg-surface">
          <RecordsTable fill />
        </div>
      ) : what === "pane" ? (
        <PlatformWindow />
      ) : (
        <div className="flex h-full w-full [&>section]:w-full [&>section]:min-w-0 [&>section]:max-w-none [&>section]:border-l-0 [&>section]:flex">
          <ArtifactPanel kind={kind} kinds={kinds} />
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Shot />
    </Suspense>
  );
}
