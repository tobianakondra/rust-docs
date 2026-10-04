import type { LanguageEntry } from "@/data/chapter";

type Props = {
  language: LanguageEntry;
};

const ROWS = [
  { key: "memory", label: "Gestion mémoire" },
  { key: "concurrency", label: "Concurrence" },
  { key: "learning", label: "Apprentissage" },
  { key: "speed", label: "Exécution" },
] as const;

export function LanguageDetailPanel({ language }: Props) {
  return (
    <article className="mt-px rounded-b-lg border border-t-0 border-white/10 bg-[#0d1320] p-5">
      <h3 className="text-[15px] font-semibold tracking-tight text-slate-100">
        {language.name} <span className="font-normal text-slate-500">— {language.tagline}</span>
      </h3>
      <dl className="mt-4 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {ROWS.map((row) => (
          <div key={row.key} className="grid grid-cols-[140px_1fr] gap-3 py-2.5 text-sm sm:grid-cols-[180px_1fr]">
            <dt className="text-slate-500">{row.label}</dt>
            <dd className="text-slate-200">{language[row.key]}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-slate-400">{language.detail}</p>
    </article>
  );
}
