"use client";

import { BookOpenIcon, ClipboardListIcon, FileTextIcon, StickyNoteIcon } from "lucide-react";
import { ArtifactPanel } from "./chat-window";

export function PanelEdgesDemo() {
  return (
    <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-5 md:grid-cols-2">
      <div className="h-[420px]">
        <ArtifactPanel
          framed
          extraTabs={[
            { id: "nb", title: "league-wide shooting profile.ipynb", icon: BookOpenIcon },
            { id: "notes", title: "rotation notes with a deliberately long title", icon: StickyNoteIcon },
            { id: "clip", title: "clip.md", icon: FileTextIcon },
          ]}
        />
      </div>
      <div className="h-[420px]">
        <ArtifactPanel
          framed
          kind="empty-tab"
          extraTabs={[
            { id: "empty-tab", title: "empty", icon: ClipboardListIcon },
            { id: "nb2", title: "q4 shot diet notebook.ipynb", icon: BookOpenIcon },
          ]}
        />
      </div>
    </div>
  );
}
