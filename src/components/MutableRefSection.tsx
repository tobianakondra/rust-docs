import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { CompilerVerdictPanel } from "@/components/CompilerVerdictPanel";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { DOUBLE_MUT_ERROR, DOUBLE_MUT_SNIPPET, MUTABLE_SNIPPET } from "@/data/chapter3";

export function MutableRefSection() {
  return (
    <section id="mutables" aria-label="Références mutables" className="scroll-mt-20">
      <SectionHeading
        index="03"
        kicker="Écriture"
        title="Les références mutables : un seul écrivain"
        description="Modifier par procuration exige un emprunt exclusif : une seule référence mutable active à la fois, et aucune lecture concurrente. C’est le prix de l’absence de courses de données."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          L’écriture suit un protocole plus strict que la lecture. La variable prêtée doit elle-même être déclarée
          mutable, l’emprunt s’écrit <span className="font-mono text-[13px] text-slate-200">&mut s</span> et le
          paramètre <span className="font-mono text-[13px] text-slate-200">texte: &mut String</span>. Pendant toute la
          durée de cet emprunt, le propriétaire d’origine ne peut ni lire ni prêter à nouveau : il attend la fin de
          l’intervention, comme un lecteur prié de patienter pendant la reliure.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · &mut T" code={MUTABLE_SNIPPET} tone="safe" />
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · Refusé" code={DOUBLE_MUT_SNIPPET} tone="danger" language="rust" />
      </div>
      <div className="mt-3">
        <CompilerVerdictPanel message={DOUBLE_MUT_ERROR} verdict="rustc — erreur E0499" />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="piege" title="Le Piège du Débutant — deux écrivains">
          Face à E0499, la tentation est de cloner la valeur pour obtenir deux exemplaires modifiables. Mais deux
          copies qui divergent contredisent généralement l’intention : il faut choisir quel emprunt survit. Le
          réflexe professionnel consiste à réduire la portée du premier emprunt — l’utiliser, le terminer — avant
          de créer le second, plutôt que de dupliquer les données.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
