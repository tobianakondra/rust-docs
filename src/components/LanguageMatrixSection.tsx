"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { LanguageComparisonGrid } from "@/components/LanguageComparisonGrid";
import { LanguageDetailPanel } from "@/components/LanguageDetailPanel";
import { LANGUAGES } from "@/data/chapter";

export function LanguageMatrixSection() {
  const [selectedId, setSelectedId] = useState<string>("rust");
  const selected = LANGUAGES.find((entry) => entry.id === selectedId) ?? LANGUAGES[0];

  return (
    <section id="comparatif" aria-label="Comparatif des langages" className="scroll-mt-20">
      <SectionHeading
        index="03"
        kicker="Comparatif"
        title="Positionnement face à C++, Go et Python"
        description="Sélectionnez un langage pour examiner sa gestion mémoire, sa concurrence, sa courbe d’apprentissage et ses performances."
      />
      <div className="mt-6">
        <LanguageComparisonGrid languages={LANGUAGES} selectedId={selected.id} onSelect={setSelectedId} />
        <LanguageDetailPanel language={selected} />
      </div>
    </section>
  );
}
