import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { CompilerVerdictPanel } from "@/components/CompilerVerdictPanel";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { DANGLE_ERROR, DANGLE_SNIPPET } from "@/data/chapter3";

export function DanglingSection() {
  return (
    <section id="pendantes" aria-label="Règles et références pendantes" className="scroll-mt-20">
      <SectionHeading
        index="04"
        kicker="Garanties"
        title="Aucune référence ne survit à son propriétaire"
        description="La règle qui verrouille l’édifice : chaque référence doit expirer avant la valeur qu’elle observe. Toute tentative de faire revenir une référence vers une variable locale est rejetée."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Les deux premières règles gouvernent la coexistence des emprunts : soit plusieurs lectures, soit une
          écriture exclusive, jamais les deux à la fois. La troisième gouverne la chronologie : la durée de vie
          d’une référence ne peut excéder celle de son propriétaire. Sans elle, un pointeur pourrait désigner une
          mémoire déjà rendue — le use-after-free que Rust s’est juré d’éliminer.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="lib.rs" badge="Rust · Refusé" code={DANGLE_SNIPPET} tone="danger" language="rust" />
      </div>
      <div className="mt-3">
        <CompilerVerdictPanel message={DANGLE_ERROR} verdict="rustc — erreur E0106" />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="capot" title="Sous le capot — durées de vie">
          Le compilateur assigne à chaque référence une durée de vie : la région du programme où son usage est
          prouvé sûr. Ici, titre meurt à la fin de la fonction tandis que la référence promise devrait lui
          survivre — contradiction détectée sans exécuter une ligne. Dans la plupart des cas, ces durées sont
          déduites automatiquement ; l’annotation explicite ne devient nécessaire qu’aux frontières ambiguës, comme
          les fonctions qui relient plusieurs références entre elles.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
