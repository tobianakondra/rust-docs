"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { HighlightedCode } from "@/components/HighlightedCode";
import type { CodeLanguage } from "@/data/highlight";

type Props = {
  title: string;
  badge: string;
  code: string;
  tone: "danger" | "safe";
  language?: CodeLanguage;
};

export function CodeBlock({ title, badge, code, tone, language = tone === "danger" ? "cpp" : "rust" }: Props) {
  const [copied, setCopied] = useState(false);
  const copyHint = language === "compiler" ? "Copier la sortie" : "Copier le code";

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <p className="font-mono text-xs text-slate-300">{title}</p>
          <span
            className={
              tone === "danger"
                ? "rounded border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 font-mono text-[11px] text-red-300"
                : "rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[11px] text-emerald-300"
            }
          >
            {badge}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-slate-500 hover:bg-white/5 hover:text-slate-300"
          aria-label={copyHint}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copié" : "Copier"}
        </button>
      </div>
      <HighlightedCode code={code} language={language} />
    </div>
  );
}
