"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { DuelViewSwitcher } from "@/components/DuelViewSwitcher";
import { CompilerVerdictPanel } from "@/components/CompilerVerdictPanel";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { CPP_SNIPPET, RUST_SNIPPET, RUST_COMPILER_MESSAGE } from "@/data/chapter";
import type { DuelMode } from "@/components/DuelViewSwitcher";

export function CodeDuelSection() {
  const [mode, setMode] = useState<DuelMode>("split");
  const showCpp = mode === "split" || mode === "cpp";
  const showRust = mode === "split" || mode === "rust";

  return (
    <section id="duel" aria-label="Duel C++ vs Rust" className="scroll-mt-20">
      <SectionHeading
        index="05"
        kicker="Étude de cas"
        title="Invalidation d’itérateur : C++ contre Rust"
        description="Même scénario : conserver une référence sur un vecteur, puis l’agrandir. En C++, le programme compile mais le comportement devient indéfini. En Rust, il est rejeté avec un diagnostic."
      />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <DuelViewSwitcher mode={mode} onChange={setMode} />
        <p className="font-mono text-[11px] text-slate-600">E0506 — emprunt mutable et partagé</p>
      </div>
      <div className={mode === "split" ? "mt-3 grid gap-3 lg:grid-cols-2" : "mt-3 grid gap-3"}>
        {showCpp ? <CodeBlock title="main.cpp" badge="C++" code={CPP_SNIPPET} tone="danger" /> : null}
        {showRust ? <CodeBlock title="main.rs" badge="Rust" code={RUST_SNIPPET} tone="safe" /> : null}
      </div>
      <div className="mt-3">
        <CompilerVerdictPanel message={RUST_COMPILER_MESSAGE} />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="intuition" title="Lecture du diagnostic">
          En C++, la réallocation invalide l’itérateur conservé. En Rust, l’emprunt partagé interdit l’emprunt
          mutable concurrent : le conflit est signalé avant toute exécution.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
