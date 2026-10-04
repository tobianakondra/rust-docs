import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { CompilerVerdictPanel } from "@/components/CompilerVerdictPanel";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { CLONE_SNIPPET, MOVE_ERROR_MESSAGE, MOVE_SNIPPET } from "@/data/chapter2";

export function MoveSection() {
  return (
    <section id="deplacement" aria-label="Move vs clone" className="scroll-mt-20">
      <SectionHeading
        index="04"
        kicker="Sémantique"
        title="Le déplacement contre la copie"
        description="Affecter une String ne duplique rien : la propriété est transférée. Comprendre ce choix — ni copie profonde implicite, ni partage de pointeur — est le cœur du chapitre."
      />
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · Move" code={MOVE_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3">
        <CompilerVerdictPanel message={MOVE_ERROR_MESSAGE} verdict="rustc — erreur E0382" />
      </div>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Trois stratégies étaient envisageables pour <span className="font-mono text-[13px] text-slate-200">let s2 = s1</span>.
          La copie profonde implicite dupliquerait le buffer à chaque affectation : correcte, mais potentiellement
          coûteuse et invisible dans le code. La copie superficielle du pointeur, comme en C++, laisserait deux
          descripteurs sur un seul buffer et provoquerait une double libération. Rust retient la troisième voie :
          le déplacement transfère les trois nombres de la pile vers s2 et invalide s1, sans toucher au tas.
        </p>
        <p>
          Le coût est nul à l’exécution et la sûreté totale : un seul propriétaire, une seule libération, décidée à
          la compilation. C’est le comportement par défaut pour tout type qui ne suit pas Copy.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · Clone" code={CLONE_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="piege" title="Le Piège du Débutant — clone systématique">
          Après l’erreur de valeur déplacée, le réflexe est d’ajouter .clone() partout pour faire taire le
          compilateur. Chaque clone duplique pourtant le buffer sur le tas : dans une boucle ou sur des données
          volumineuses, le coût devient significatif. Réservez clone aux duplications réellement nécessaires et
          préférez restructurer les portées — ou, dès le chapitre suivant, emprunter au lieu de posséder.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
