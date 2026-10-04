import { SectionHeading } from "@/components/SectionHeading";
import { BenefitCard } from "@/components/BenefitCard";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { BENEFITS } from "@/data/chapter";

const BENEFIT_ICONS = ["shield", "gauge", "users"] as const;

export function PromiseSection() {
  return (
    <section id="promesse" aria-label="La Promesse" className="scroll-mt-20">
      <SectionHeading
        index="01"
        kicker="Contexte"
        title="Pourquoi Rust suscite autant d’intérêt"
        description="Rust combine sécurité mémoire sans ramasse-miettes et performances comparables à C et C++. Le compilateur rejette des classes entières d’erreurs avant l’exécution."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {BENEFITS.map((benefit, position) => (
          <BenefitCard
            key={benefit.title}
            title={benefit.title}
            text={benefit.text}
            icon={BENEFIT_ICONS[position] ?? "shield"}
          />
        ))}
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="intuition" title="Point clé">
          La vérification a lieu à la compilation : les violations d’emprunt ou de possession sont refusées avec un diagnostic, plutôt que de se manifester à l’exécution.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
