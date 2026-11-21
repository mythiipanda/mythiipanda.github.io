"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ChatWindow } from "../../components/stage/chat-window";

function Demo() {
  const sp = useSearchParams();
  const state = (sp.get("state") ?? "split") as "home" | "split" | "pending";
  const artifact = sp.get("artifact") ?? "board";
  const layout = (sp.get("layout") ?? "split") as "split" | "inline" | "focus";
  return (
    <div className="h-screen w-screen overflow-hidden bg-canvas">
      <ChatWindow state={state} artifact={artifact} layout={layout} rail={sp.get("rail") !== "0"} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Demo />
    </Suspense>
  );
}
