import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ChapterFooterNav() {
  return (
    <footer className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
      <div className="bg-[#0d1320] p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Précédent</p>
        <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
          <ArrowLeft size={14} />
          Introduction au parcours
        </p>
      </div>
      <Link href="/chapitre-2" className="bg-[#0d1320] p-5 text-left hover:bg-[#111829]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Suivant</p>
        <p className="mt-1.5 flex items-center justify-between text-sm font-medium text-slate-100">
          Chapitre 2 — Ownership et scope
          <ArrowRight size={14} />
        </p>
      </Link>
    </footer>
  );
}
