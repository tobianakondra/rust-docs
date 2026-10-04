"use client";

import type { LanguageEntry } from "@/data/chapter";

type Props = {
  languages: LanguageEntry[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function LanguageComparisonGrid({ languages, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 xl:grid-cols-4">
      {languages.map((language) => {
        const isSelected = language.id === selectedId;
        return (
          <button
            key={language.id}
            type="button"
            onClick={() => onSelect(language.id)}
            aria-pressed={isSelected}
            className={
              isSelected
                ? "bg-[#151c2b] p-4 text-left outline outline-1 -outline-offset-1 outline-orange-600/60"
                : "bg-[#0d1320] p-4 text-left hover:bg-[#111829]"
            }
          >
            <p className="text-sm font-semibold text-slate-100">{language.name}</p>
            <p className="mt-0.5 text-xs text-slate-500">{language.tagline}</p>
          </button>
        );
      })}
    </div>
  );
}
