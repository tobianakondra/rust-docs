import { ArrowRight, BookOpen, Eye, PenLine } from "lucide-react";

export function BorrowingDiagram() {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
      <div className="bg-[#0d1320] p-5">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
          <Eye size={13} />
          Emprunt partagé — &T
        </p>
        <p className="mt-3 font-mono text-sm text-slate-200">
          s <span className="text-slate-600">=</span> <span className="text-emerald-300">propriétaire</span>
        </p>
        <div className="mt-2 space-y-1 font-mono text-sm">
          <p className="flex items-center gap-2 text-slate-400">
            <BookOpen size={13} className="text-sky-300" />
            r1 lit <span className="text-slate-600">·</span> r2 lit <span className="text-slate-600">·</span> r3 lit
          </p>
        </div>
        <p className="mt-2 text-xs text-slate-500">Lecteurs multiples autorisés, aucune écriture.</p>
      </div>
      <div className="bg-[#0d1320] p-5">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-500">
          <PenLine size={13} />
          Emprunt exclusif — &mut T
        </p>
        <p className="mt-3 font-mono text-sm text-slate-200">
          s <span className="text-slate-600">=</span> <span className="text-emerald-300">propriétaire</span>
        </p>
        <p className="mt-2 flex items-center gap-2 font-mono text-sm text-slate-200">
          w écrit seul
          <ArrowRight size={14} className="text-orange-400" />
          <span className="text-slate-500">lecteurs en pause</span>
        </p>
        <p className="mt-2 text-xs text-slate-500">Un seul écrivain, aucun lecteur simultané.</p>
      </div>
    </div>
  );
}
