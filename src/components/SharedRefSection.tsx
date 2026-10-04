import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { SHARED_SNIPPET } from "@/data/chapter3";

export function SharedRefSection() {
  return (
    <section id="partagees" aria-label="Références partagées" className="scroll-mt-20">
      <SectionHeading
        index="02"
        kicker="Lecture"
        title="Les références partagées : lire sans prendre"
        description="Une référence partagée observe une valeur sans en devenir propriétaire. La fonction travaille, l’emprunt s’éteint à sa sortie, et l’appelant conserve l’intégralité de ses droits."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          L’esperluette devant un argument crée l’emprunt : <span className="font-mono text-[13px] text-slate-200">mesurer(&s)</span> ne
          déplace pas la chaîne, il en prête l’adresse accompagnée de la garantie du compilateur. Le paramètre
          déclare le contrat inverse en réceptionnant <span className="font-mono text-[13px] text-slate-200">texte: &String</span> :
          cette fonction lit seulement, elle ne libérera rien et ne rendra rien — il n’y a d’ailleurs rien à rendre.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · &T" code={SHARED_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="capot" title="Sous le capot — fin d’emprunt">
          Le compilateur suit la dernière utilisation de chaque référence : dès que texte n’est plus employé,
          l’emprunt est considéré comme terminé, même avant la fin lexicale de la fonction. Ce mécanisme, la
          non-lexicalité des durées de vie, autorise des motifs comme emprunter en lecture, terminer, puis
          emprunter en écriture dans la même portée — tant que les usages ne se chevauchent jamais.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
