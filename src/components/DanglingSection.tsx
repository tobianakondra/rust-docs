import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { CompilerVerdictPanel } from "@/components/CompilerVerdictPanel";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { DANGLE_ERROR, DANGLE_SNIPPET, SCOPE_DANGLE_ERROR, SCOPE_DANGLE_SNIPPET } from "@/data/chapter3";

// ---------------------------------------------------------------------------
// Section « références pendantes » : DEUX exemples, chacun suivi de SA
// propre explication (retour utilisateur : regrouper les explications en bas
// perd le lecteur). Ordre de lecture imposé par la mise en page :
//   1. idée centrale (un emprunt = un pointeur, rien de plus) ;
//   2. exemple 1 — renvoyer une référence vers un local (E0106) ;
//   3. exemple 2 — référence survivant à son propriétaire (E0597) ;
//   4. synthèse « durées de vie » en callout (le mécanisme général).
// ---------------------------------------------------------------------------

export function DanglingSection() {
  return (
    <section id="pendantes" aria-label="Règles et références pendantes" className="scroll-mt-20">
      <SectionHeading
        index="04"
        kicker="Garanties"
        title="Aucune référence ne survit à son propriétaire"
        description="La règle qui verrouille l’édifice : chaque référence doit expirer avant la valeur qu’elle observe. Deux cas classiques l’illustrent ci-dessous."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Les deux premières règles gouvernent la coexistence des emprunts : soit plusieurs lectures, soit une
          écriture exclusive, jamais les deux à la fois. La troisième gouverne la chronologie — et elle découle
          d’une image à garder en tête : <strong className="font-semibold text-slate-200">un emprunt n’est rien
          d’autre qu’un pointeur</strong>, c’est-à-dire une adresse mémoire accompagnée d’une garantie du
          compilateur. Si le propriétaire est détruit, son buffer est rendu à l’allocateur et l’adresse ne mène
          plus nulle part : l’emprunt n’a alors plus aucune raison d’exister. D’où la règle : une référence ne vit
          jamais plus longtemps que son propriétaire.
        </p>
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-slate-500">Cas 1 — renvoyer l’adresse d’un local condamné</p>
      <div className="mt-3">
        <CodeBlock title="lib.rs" badge="Rust · Refusé" code={DANGLE_SNIPPET} tone="danger" language="rust" />
      </div>
      <div className="mt-3">
        <CompilerVerdictPanel message={DANGLE_ERROR} verdict="rustc — erreur E0106" />
      </div>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Ici, <span className="font-mono text-[13px] text-slate-200">titre</span> naît dans la fonction et meurt à
          sa fin, tandis que la référence promise devrait lui survivre dans le programme appelant. On demande donc
          au monde extérieur de faire confiance à une adresse dont le contenu est déjà condamné : le compilateur
          refuse de signer ce contrat.
        </p>
      </div>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-slate-500">Cas 2 — survivre dans une portée plus large</p>
      <div className="mt-3">
        <CodeBlock title="main.rs" badge="Rust · Refusé" code={SCOPE_DANGLE_SNIPPET} tone="danger" language="rust" />
      </div>
      <div className="mt-3">
        <CompilerVerdictPanel message={SCOPE_DANGLE_ERROR} verdict="rustc — erreur E0597" />
      </div>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Variante plus sournoise, entièrement dans <span className="font-mono text-[13px] text-slate-200">main</span> :
          la référence vit dans la portée externe mais son propriétaire vit dans le bloc interne. À la fermeture du
          bloc (ligne 4), <span className="font-mono text-[13px] text-slate-200">titre</span> est détruit ; la
          ligne 5 tenterait d’afficher une adresse déjà rendue. Même verdict, même raison : l’emprunt voulait vivre
          plus longtemps que son propriétaire.
        </p>
      </div>

      <div className="mt-3">
        <PedagogicalCallout variant="capot" title="Sous le capot — durées de vie">
          Pour appliquer cette règle, le compilateur assigne à chaque référence une durée de vie : la région du
          programme où son usage est prouvé sûr. Dans les deux cas ci-dessus, la durée promise dépasse la durée
          réelle du propriétaire — contradiction détectée sans exécuter une ligne. La plupart du temps, ces durées
          sont déduites automatiquement ; l’annotation explicite ne devient nécessaire qu’aux frontières ambiguës,
          comme les fonctions qui relient plusieurs références entre elles.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
