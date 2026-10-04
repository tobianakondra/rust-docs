import { SectionHeading } from "@/components/SectionHeading";
import { AdopterCard } from "@/components/AdopterCard";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { ADOPTERS } from "@/data/chapter";

export function AdoptersSection() {
  return (
    <section id="adoptants" aria-label="Pourquoi les géants l’adoptent" className="scroll-mt-20">
      <SectionHeading
        index="04"
        kicker="Adoption"
        title="Une adoption motivée par la sécurité mémoire"
        description="Une part importante des vulnérabilités critiques provient d’erreurs de gestion mémoire. Plusieurs organisations utilisent Rust pour les composants exposés et critiques."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {ADOPTERS.map((adopter) => (
          <AdopterCard key={adopter.name} adopter={adopter} />
        ))}
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="capot" title="Contexte sécurité">
          Déréférencements après libération, dépassements de tampon et accès concurrents non synchronisés
          constituent une cause récurrente d’incidents. Une vérification statique réduit cette surface d’attaque.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
