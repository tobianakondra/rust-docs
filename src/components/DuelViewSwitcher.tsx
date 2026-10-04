"use client";

export type DuelMode = "split" | "cpp" | "rust";

type Props = {
  mode: DuelMode;
  onChange: (mode: DuelMode) => void;
};

const MODES: Array<{ id: DuelMode; label: string }> = [
  { id: "split", label: "Comparé" },
  { id: "cpp", label: "C++" },
  { id: "rust", label: "Rust" },
];

export function DuelViewSwitcher({ mode, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Mode d’affichage du duel" className="inline-flex rounded-md border border-white/10 bg-[#0d1320] p-0.5">
      {MODES.map((entry) => (
        <button
          key={entry.id}
          role="tab"
          aria-selected={mode === entry.id}
          type="button"
          onClick={() => onChange(entry.id)}
          className={
            mode === entry.id
              ? "rounded-[5px] bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-100"
              : "rounded-[5px] px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300"
          }
        >
          {entry.label}
        </button>
      ))}
    </div>
  );
}
