import { ArrowDown } from "lucide-react";

export function StringMemoryDiagram() {
  return (
    <div className="grid gap-6 rounded-lg border border-white/10 bg-[#0d1320] p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Pile — taille fixe</p>
        <div className="mt-3 divide-y divide-white/[0.06] rounded-md border border-white/10 font-mono text-[13px]">
          <div className="flex justify-between px-3 py-2">
            <span className="text-slate-400">ptr</span>
            <span className="text-sky-300">0x7f3a…</span>
          </div>
          <div className="flex justify-between px-3 py-2">
            <span className="text-slate-400">len</span>
            <span className="text-amber-300">5</span>
          </div>
          <div className="flex justify-between px-3 py-2">
            <span className="text-slate-400">capacity</span>
            <span className="text-amber-300">5</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500">3 × 8 octets, copiables, connus à la compilation.</p>
      </div>
      <ArrowDown size={18} className="mx-auto text-orange-500/80 sm:rotate-[-90deg]" />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Tas — taille dynamique</p>
        <div className="mt-3 flex gap-1 font-mono text-[13px]">
          {["h", "e", "l", "l", "o"].map((letter, index) => (
            <span key={index} className="flex-1 rounded border border-white/10 bg-white/[0.03] px-0 py-2 text-center text-emerald-300">
              {letter}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">Buffer d’octets pointé par ptr, libéré par drop.</p>
      </div>
    </div>
  );
}
