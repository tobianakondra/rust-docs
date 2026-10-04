import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { BORROW_FIX_SNIPPET, SLICE_SNIPPET } from "@/data/chapter3";

export function SlicesSection() {
  return (
    <section id="tranches" aria-label="Tranches et pratique" className="scroll-mt-20">
      <SectionHeading
        index="05"
        kicker="Pratique"
        title="Tranches et fin du va-et-vient"
        description="Les tranches généralisent l’emprunt à une portion de donnée, et l’emprunt simple résout la friction du chapitre 2 : consulter sans posséder, sans rien devoir rendre."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Une tranche, notée <span className="font-mono text-[13px] text-slate-200">&titre[0..7]</span>, est un
          emprunt partagé sur une plage : elle observe sept octets sans en prendre la propriété, avec vérification
          des bornes à l’exécution. Son type dédié, <span className="font-mono text-[13px] text-slate-200">&str</span>,
          est d’ailleurs la forme sous laquelle on croise le plus souvent les chaînes en lecture seule.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · &str" code={SLICE_SNIPPET} tone="safe" />
      </div>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Revisitons maintenant le transfert aller-retour du chapitre précédent. Là où il fallait céder la
          propriété puis la récupérer, un simple emprunt partagé suffit dès que la fonction ne fait que lire : plus
          de jonglage, la variable reste valide avant comme après l’appel.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · Emprunt" code={BORROW_FIX_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="intuition" title="Point clé — la signature comme contrat">
          Lire une signature suffit désormais à prédire le comportement : un paramètre String prend la propriété,
          un paramètre &String ou &str emprunte seulement. Cette lisibilité des intentions, vérifiée par le
          compilateur, est l’une des raisons pour lesquelles les bases de code Rust vieillissent bien.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
