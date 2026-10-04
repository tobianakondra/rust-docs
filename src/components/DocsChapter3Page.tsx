"use client";

import { useMemo, useState } from "react";
import { Layers, Menu } from "lucide-react";
import { DocsSidebar } from "@/components/DocsSidebar";
import { SidebarProgress } from "@/components/SidebarProgress";
import { ChaptersNavList } from "@/components/ChaptersNavList";
import { ChapterHeroHeader } from "@/components/ChapterHeroHeader";
import { BorrowingAnalogySection } from "@/components/BorrowingAnalogySection";
import { SharedRefSection } from "@/components/SharedRefSection";
import { MutableRefSection } from "@/components/MutableRefSection";
import { DanglingSection } from "@/components/DanglingSection";
import { SlicesSection } from "@/components/SlicesSection";
import { QuizSection } from "@/components/QuizSection";
import { Chapter3FooterNav } from "@/components/Chapter3FooterNav";
import { CHAPTER3_LINKS, CHAPTER3_META, QUIZ3 } from "@/data/chapter3";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useReadingProgress } from "@/hooks/useReadingProgress";

export function DocsChapter3Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionIds = useMemo(() => CHAPTER3_LINKS.map((section) => section.id), []);
  const activeId = useScrollSpy(sectionIds);
  const progressStore = useReadingProgress("/chapitre-3", sectionIds, activeId);

  const activePosition = Math.max(0, sectionIds.findIndex((id) => id === activeId));
  const progress = Math.round(((activePosition + 1) / sectionIds.length) * 100);

  function handleAfterNavigate(): void {
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-300 antialiased">
      <div className="border-b border-white/[0.06] bg-[#0a0e17]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-md border border-white/10 p-1.5 text-slate-400 hover:text-slate-200 lg:hidden"
              aria-label="Ouvrir la navigation"
            >
              <Menu size={16} />
            </button>
            <p className="text-[13px] font-semibold tracking-tight text-slate-100">
              Rust <span className="font-normal text-slate-500">/ Documentation</span>
            </p>
            <span className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[11px] text-slate-500 sm:inline">
              v1.0
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[13px] text-slate-500">
            <Layers size={14} />
            <span className="hidden sm:inline">Chapitre 3 sur 8</span>
          </span>
        </div>
        <div className="h-px bg-white/[0.06]">
          <div className="h-px bg-orange-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl px-4 sm:px-6">
        <DocsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <SidebarProgress progress={progress} />
          <ChaptersNavList activeId={activeId} onAfterNavigate={handleAfterNavigate} store={progressStore} />
        </DocsSidebar>
        <main className="min-w-0 flex-1 py-10 lg:py-12">
          <ChapterHeroHeader
            onOpenSidebar={() => setSidebarOpen(true)}
            partie="Partie 1"
            crumb="Fondamentaux"
            badge={CHAPTER3_META.badge}
            title={CHAPTER3_META.title}
            subtitle={CHAPTER3_META.subtitle}
            minutes={CHAPTER3_META.readingMinutes}
            level={CHAPTER3_META.level}
            prereqs={CHAPTER3_META.prereqs}
          />
          <div className="mt-12 space-y-14">
            <BorrowingAnalogySection />
            <SharedRefSection />
            <MutableRefSection />
            <DanglingSection />
            <SlicesSection />
            <QuizSection
              items={QUIZ3}
              title="Auto-évaluation : les emprunts"
              description="Trois questions pour valider les références partagées, exclusives et les tranches. Sélectionnez une réponse par question, puis révélez le corrigé."
              successHint="Maîtrisé — cap sur les structs."
            />
          </div>
          <div className="mt-14">
            <Chapter3FooterNav />
          </div>
        </main>
      </div>
    </div>
  );
}
