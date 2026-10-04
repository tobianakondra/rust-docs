"use client";

import { ChevronRight, Clock } from "lucide-react";
import { CHAPTER_META } from "@/data/chapter";

type Props = {
  onOpenSidebar: () => void;
  partie?: string;
  crumb?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  minutes?: number;
  level?: string;
  prereqs?: string;
};

export function ChapterHeroHeader({
  onOpenSidebar,
  partie = "Partie 1",
  crumb = "Introduction",
  badge = CHAPTER_META.badge,
  title = CHAPTER_META.title,
  subtitle = CHAPTER_META.subtitle,
  minutes = CHAPTER_META.readingMinutes,
  level = "introduction",
  prereqs = "aucun",
}: Props) {
  return (
    <header className="border-b border-white/[0.06] pb-8">
      <nav aria-label="Fil d’Ariane" className="flex items-center gap-1.5 text-[13px] text-slate-500">
        <span>Documentation</span>
        <ChevronRight size={13} />
        <span>{partie}</span>
        <ChevronRight size={13} />
        <span className="text-slate-300">{crumb}</span>
        <button type="button" onClick={() => onOpenSidebar()} className="ml-auto text-slate-500 underline-offset-4 hover:underline lg:hidden">
          Sommaire
        </button>
      </nav>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-orange-500/90">{badge}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">{subtitle}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Clock size={13} />
          {minutes} min de lecture
        </span>
        <span className="h-3 w-px bg-white/10" />
        <span>Niveau : {level}</span>
        <span className="h-3 w-px bg-white/10" />
        <span>Prérequis : {prereqs}</span>
      </p>
    </header>
  );
}
