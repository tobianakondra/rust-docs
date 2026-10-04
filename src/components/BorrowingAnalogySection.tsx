import { SectionHeading } from "@/components/SectionHeading";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { BorrowingDiagram } from "@/components/BorrowingDiagram";

export function BorrowingAnalogySection() {
  return (
    <section id="intuition" aria-label="L’intuition" className="scroll-mt-20">
      <SectionHeading
        index="01"
        kicker="Intuition"
        title="La bibliothèque : consulter sans acheter"
        description="Emprunter une valeur, c’est obtenir un droit d’usage temporaire sans en devenir propriétaire. Comme à la bibliothèque : on lit sur place ou à domicile, puis on rend — le fonds reste à l’établissement."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Reprenons le registre du chapitre précédent. Jusqu’ici, utiliser une valeur signifiait en obtenir le
          titre de propriété, avec l’obligation de le rendre pour continuer à s’en servir. L’emprunt introduit une
          opération plus légère : une inscription temporaire au registre, qui autorise la lecture — ou, sous
          conditions strictes, l’écriture — sans transférer la propriété.
        </p>
        <p>
          Deux cartes de lecteur existent. La carte ordinaire autorise la consultation : plusieurs lecteurs peuvent
          examiner le même ouvrage simultanément, mais aucun ne peut le modifier. La carte spéciale autorise la
          modification, à condition d’être seul : un unique rédacteur, aucun lecteur concurrent. Le compilateur
          délivre et retire ces cartes en suivant chaque référence, et refuse toute combinaison interdite avant
          l’exécution.
        </p>
      </div>
      <div className="mt-6">
        <BorrowingDiagram />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="intuition" title="L’Intuition — les 3 règles d’or">
          1. Un emprunt partagé, noté &T, autorise la lecture et coexiste avec d’autres lectures. 2. Un emprunt
          exclusif, noté &mut T, autorise l’écriture mais exclut tout autre emprunt simultané. 3. Aucune référence
          ne peut survivre à son propriétaire : tout usage après libération est refusé.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
