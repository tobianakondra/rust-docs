import { SectionHeading } from "@/components/SectionHeading";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";

export function RealitySection() {
  return (
    <section id="realite" aria-label="La Réalité" className="scroll-mt-20">
      <SectionHeading
        index="02"
        kicker="Contrainte"
        title="Une exigence déplacée vers la compilation"
        description="Rust ne supprime pas la complexité de la gestion mémoire : il la rend explicite au moment de la compilation, afin de réduire les défaillances en production."
      />
      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
        <div className="bg-[#0d1320] p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Approche C / C++</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Compilation permissive, vérifications limitées. Les erreurs de pointeurs, d’itérateurs invalidés ou de
            concurrence apparaissent à l’exécution, souvent en production.
          </p>
        </div>
        <div className="bg-[#0d1320] p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Approche Rust</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Compilation stricte avec diagnostics détaillés. Une fois le programme accepté, les garanties d’emprunt
            s’appliquent à l’exécution sans surcoût.
          </p>
        </div>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <PedagogicalCallout variant="piege" title="Écueil fréquent">
          Contourner le vérificateur d’emprunts par des copies systématiques masque les problèmes de conception. Il
          est préférable de réduire la portée des emprunts et de lire le diagnostic complet.
        </PedagogicalCallout>
        <PedagogicalCallout variant="capot" title="Règle de possession">
          Chaque valeur possède un propriétaire unique. À un instant donné : soit plusieurs emprunts partagés, soit
          un emprunt exclusif. Cette règle exclut par construction les courses de données.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
