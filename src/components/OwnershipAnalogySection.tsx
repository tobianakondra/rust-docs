import { SectionHeading } from "@/components/SectionHeading";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { OwnershipTransferDiagram } from "@/components/OwnershipTransferDiagram";

export function OwnershipAnalogySection() {
  return (
    <section id="intuition" aria-label="L’intuition" className="scroll-mt-20">
      <SectionHeading
        index="01"
        kicker="Intuition"
        title="Un titre de propriété, pas une photocopie"
        description="En Rust, posséder une valeur ressemble à détenir le titre de propriété d’un bien : un seul titulaire à la fois. Remettre le titre à quelqu’un d’autre, c’est cesser d’en être le détenteur."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Imaginez un registre foncier qui n’accepte qu’un seul nom par bien. Tant que le bien est inscrit à votre
          nom, vous pouvez l’utiliser, le prêter sous conditions, ou le céder. Mais dès que l’acte de cession est
          signé, l’ancien nom est radié : toute tentative d’y accéder ensuite est rejetée par le registre, avant même
          tout déplacement sur le terrain.
        </p>
        <p>
          Le compilateur Rust joue exactement ce rôle de registre. Il suit, pour chaque valeur, quelle variable en
          est le propriétaire actuel. Céder la valeur à une autre variable transfère l’inscription et invalide
          l’ancienne : c’est le mécanisme du déplacement, ou <span className="font-mono text-[13px] text-slate-200">move</span>.
          Aucun contrôle n’a lieu à l’exécution, car tout a été vérifié en amont.
        </p>
      </div>
      <div className="mt-6">
        <OwnershipTransferDiagram />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="intuition" title="L’Intuition — les 3 règles d’or">
          1. Chaque valeur possède un propriétaire unique : une seule variable responsable à la fois. 2. Il ne peut
          y avoir qu’un seul propriétaire : céder la valeur déplace la propriété et invalide l’ancien détenteur.
          3. Quand le propriétaire sort de sa portée, la valeur est libérée automatiquement.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
