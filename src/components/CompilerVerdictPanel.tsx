"use client";

import { useState } from "react";
import { ChevronDown, Terminal } from "lucide-react";
import { HighlightedCode } from "@/components/HighlightedCode";

type Props = {
  message: string;
  verdict?: string;
};

export function CompilerVerdictPanel({ message, verdict = "rustc — erreur E0506" }: Props) {
  const [expanded, setExpanded] = useState(true);
  const lineCount = message.split("\n").length;

  return (
    <div className="overflow-hidden rounded-lg border border-red-500/20 bg-[#0d1117]">
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between border-b border-white/[0.06] px-4 py-2.5 text-left"
      >
        <span className="flex items-center gap-2 font-mono text-xs text-red-300">
          <Terminal size={14} />
          {verdict}
          <span className="font-mono text-[11px] font-normal text-slate-500">{lineCount} lignes</span>
        </span>
        <ChevronDown size={14} className={expanded ? "rotate-180 text-slate-500" : "text-slate-500"} />
      </button>
      {expanded ? <HighlightedCode code={message} language="compiler" /> : null}
    </div>
  );
}
