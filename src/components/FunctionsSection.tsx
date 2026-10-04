import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { FUNCTION_RETURN_SNIPPET, FUNCTION_TAKE_SNIPPET } from "@/data/chapter2";

export function FunctionsSection() {
  return (
    <section id="fonctions" aria-label="Ownership et fonctions" className="scroll-mt-20">
      <SectionHeading
        index="05"
        kicker="Transferts"
        title="L’ownership traverse les fonctions"
        description="Passer une valeur à une fonction en déplace la propriété ; la renvoyer la restitue. Les fonctions deviennent ainsi des postes frontière que chaque valeur franchit avec un visa en règle."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Appeler une fonction avec une String en argument, c’est céder le titre de propriété au paramètre : à
          l’intérieur de la fonction, seul ce paramètre est valide, et l’appelant ne peut plus toucher à sa
          variable. À la fin de la fonction, le paramètre sort de portée et la valeur est libérée — sauf si la
          fonction la renvoie, auquel cas la propriété est transférée à l’appelant.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · Transfert aller" code={FUNCTION_TAKE_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Pour continuer d’utiliser la valeur après l’appel, il faut donc organiser un transfert aller-retour : la
          fonction reçoit la propriété, travaille, puis la rend comme valeur de retour. Fonctionnel, mais vite
          fastidieux dès que plusieurs valeurs sont en jeu.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · Aller-retour" code={FUNCTION_RETURN_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="intuition" title="Vers le chapitre 3 — l’emprunt">
          Devoir rendre chaque valeur pour continuer à l’utiliser est une friction délibérée : elle prépare
          l’emprunt. Au chapitre suivant, les références permettront d’utiliser une valeur sans en prendre la
          propriété — consulter le registre sans exiger le titre.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
