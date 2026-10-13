import type { ReactNode } from "react";

export function Page({ children, v }: { children: ReactNode; v: string }) {
  return <div id="top" data-v={v} className="min-h-screen overflow-x-clip bg-canvas text-ink">{children}</div>;
}
