import type { Adopter } from "@/data/chapter";

export function AdopterCard({ adopter }: { adopter: Adopter }) {
  return (
    <article className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5">
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{adopter.context}</p>
      <h3 className="mt-1.5 text-[15px] font-semibold tracking-tight text-slate-100">{adopter.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{adopter.detail}</p>
    </article>
  );
}
