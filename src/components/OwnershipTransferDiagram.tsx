import { ArrowRight, BookOpen, CircleX } from "lucide-react";

export function OwnershipTransferDiagram() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-[1fr_auto_1fr]">
      <div className="bg-[#0d1320] p-5">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
          <BookOpen size={13} />
          Avant le transfert
        </p>
        <p className="mt-3 font-mono text-sm text-slate-200">
          s1 <span className="text-slate-600">=</span> <span className="text-emerald-300">propriétaire</span>
        </p>
        <p className="mt-1 font-mono text-sm text-slate-500">s2 — inexistante</p>
      </div>
      <div className="flex items-center justify-center gap-2 bg-[#0d1320] px-4 py-3 font-mono text-xs text-orange-400">
        move
        <ArrowRight size={15} className="rotate-90 sm:rotate-0" />
      </div>
      <div className="bg-[#0d1320] p-5">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
          <CircleX size={13} />
          Après le transfert
        </p>
        <p className="mt-3 font-mono text-sm text-slate-500 line-through">s1 — invalide</p>
        <p className="mt-1 font-mono text-sm text-slate-200">
          s2 <span className="text-slate-600">=</span> <span className="text-emerald-300">propriétaire</span>
        </p>
      </div>
    </div>
  );
}
