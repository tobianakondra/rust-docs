"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check, CheckCircle2 } from "lucide-react";
import { SECTION_LINKS } from "@/data/chapter";
import { CHAPTER2_LINKS } from "@/data/chapter2";
import { CHAPTER3_LINKS } from "@/data/chapter3";
import type { SectionLink } from "@/data/chapter";
import type { ProgressStore } from "@/hooks/useReadingProgress";

type ChaptersNavListProps = {
  activeId: string;
  onAfterNavigate: () => void;
  store: ProgressStore;
};

type ChapterDescriptor = {
  eyebrow: string;
  heading: string;
  route: string;
  sections: SectionLink[];
};

const CHAPTERS: ChapterDescriptor[] = [
  { eyebrow: "Ch.1", heading: "Chapitre 1 — Pourquoi Rust ?", route: "/", sections: SECTION_LINKS },
  { eyebrow: "Ch.2", heading: "Chapitre 2 — Ownership et scope", route: "/chapitre-2", sections: CHAPTER2_LINKS },
  { eyebrow: "Ch.3", heading: "Chapitre 3 — Les emprunts", route: "/chapitre-3", sections: CHAPTER3_LINKS },
];

export function ChaptersNavList({ activeId, onAfterNavigate, store }: ChaptersNavListProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleSelect(route: string, id: string): void {
    if (route === pathname) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`${route}#${id}`);
    }
    onAfterNavigate();
  }

  return (
    <nav aria-label="Chapitres et sections" className="space-y-5">
      {CHAPTERS.map((chapter) => {
        const seen = store[chapter.route]?.seen ?? [];
        const completed = chapter.sections.every((section) => seen.includes(section.id));
        return (
          <ChapterGroup
            key={chapter.route}
            eyebrow={chapter.eyebrow}
            heading={chapter.heading}
            route={chapter.route}
            sections={chapter.sections}
            activeSectionId={chapter.sections.some((section) => section.id === activeId) ? activeId : ""}
            seenIds={seen}
            completed={completed}
            isCurrent={pathname === chapter.route}
            onSelect={handleSelect}
          />
        );
      })}
    </nav>
  );
}

type ChapterGroupProps = {
  eyebrow: string;
  heading: string;
  route: string;
  sections: SectionLink[];
  activeSectionId: string;
  seenIds: string[];
  completed: boolean;
  isCurrent: boolean;
  onSelect: (route: string, id: string) => void;
};

function ChapterGroup({ eyebrow, heading, route, sections, activeSectionId, seenIds, completed, isCurrent, onSelect }: ChapterGroupProps) {
  const [expanded, setExpanded] = useState(isCurrent);
  const groupId = `${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-modules`;
  // COMPTEUR DE PROGRESSION (et non de position) : nombre de sections déjà
  // vues sur le total. Choix délibéré suite à un retour utilisateur : afficher
  // la position courante (ex. 1/6 en haut de page après lecture complète)
  // était perçu comme une progression remise à zéro. Ce compteur est
  // monotone (il ne redescend jamais en scrollant vers le haut) et atteint
  // sections.length exactement quand `completed` devient vrai (même source :
  // seenIds, alimenté par le marquage progressif du hook useReadingProgress).
  const seenCount = seenIds.length;

  return (
    <div>
      <div className="flex items-center gap-1">
        <Link
          href={route}
          className="flex min-w-0 flex-1 items-baseline gap-2 rounded-md px-1 py-1.5 text-left"
          aria-current={isCurrent ? "page" : undefined}
        >
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-orange-500/90">{eyebrow}</span>
          <span className={isCurrent ? "truncate text-[13px] font-semibold text-slate-100" : "truncate text-[13px] font-medium text-slate-400 hover:text-slate-200"}>
            {heading}
          </span>
        </Link>
        <span
          className="rounded border border-white/10 px-1.5 font-mono text-[11px] text-slate-500"
          title={`${seenCount} section(s) lue(s) sur ${sections.length}`}
        >
          {seenCount}/{sections.length}
        </span>
        {completed ? (
          <span title="Chapitre terminé" aria-label={`${heading} terminé`}>
            <CheckCircle2 size={14} className="text-emerald-400" />
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          aria-controls={groupId}
          aria-label={expanded ? `Réduire ${heading}` : `Étendre ${heading}`}
          className="rounded p-1 text-slate-500 hover:text-slate-300"
        >
          <ChevronDown size={14} className={expanded ? "rotate-180" : ""} />
        </button>
      </div>

      {expanded ? (
        <ol id={groupId} className="mt-1 space-y-0.5">
          {sections.map((section, position) => {
            const isActive = section.id === activeSectionId;
            const isSeen = seenIds.includes(section.id);
            const number = String(position + 1).padStart(2, "0");
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onSelect(route, section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "flex w-full items-baseline gap-2.5 border-l-2 border-orange-600 bg-white/[0.04] px-3 py-2 text-left text-[13px] font-medium text-slate-100"
                      : "flex w-full items-baseline gap-2.5 border-l-2 border-transparent px-3 py-2 text-left text-[13px] text-slate-400 hover:bg-white/[0.03] hover:text-slate-200"
                  }
                >
                  <span className="font-mono text-[11px] text-slate-600">{number}</span>
                  <span className="min-w-0 flex-1 truncate">{section.label}</span>
                  {isSeen ? <Check size={13} className={isActive ? "shrink-0 self-center text-emerald-300" : "shrink-0 self-center text-emerald-500/70"} /> : null}
                </button>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
