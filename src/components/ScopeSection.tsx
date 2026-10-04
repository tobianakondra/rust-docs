import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { SCOPE_SNIPPET } from "@/data/chapter2";

export function ScopeSection() {
  return (
    <section id="portee" aria-label="Portée et drop" className="scroll-mt-20">
      <SectionHeading
        index="02"
        kicker="Cycle de vie"
        title="La portée : entre accolade ouvrante et fermante"
        description="Une variable naît à sa déclaration, reste utilisable jusqu’à la fermeture de son bloc, puis sa mémoire est récupérée automatiquement. Ce cycle délimité par les accolades s’appelle la portée."
      />
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Les accolades définissent un périmètre de validité. À l’ouverture, rien n’existe encore ; à la déclaration,
          la variable prend vie et le programme peut l’employer librement. Dès que l’exécution franchit l’accolade
          fermante, le propriétaire disparaît — et avec lui, la valeur dont il avait la charge.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust" code={SCOPE_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
        <ScopeStep step="1" title="Création" text="String::from réserve un buffer et lie la valeur à message." />
        <ScopeStep step="2" title="Utilisation" text="Tant que la portée est ouverte, chaque accès est autorisé." />
        <ScopeStep step="3" title="Destruction" text="À l’accolade fermante, drop libère le buffer aussitôt." />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="capot" title="Sous le capot — drop et mémoire RAM">
          À la fermeture du bloc, le compilateur a inséré un appel implicite à la fonction drop. Celle-ci exécute
          d’abord le code de nettoyage du type, puis rend le buffer du tas à l’allocateur système : les octets sont
          marqués réutilisables, sans être nécessairement effacés. Sur la pile, l’espace occupé par le pointeur, la
          longueur et la capacité est simplement abandonné avec la fin du cadre d’appel. Aucun ramasse-miettes
          n’intervient : la libération est déterministe et son coût connu à la compilation.
        </PedagogicalCallout>
      </div>
    </section>
  );
}

function ScopeStep({ step, title, text }: { step: string; title: string; text: string }) {
  return (
    <div className="bg-[#0d1320] p-4">
      <p className="font-mono text-[11px] text-slate-600">Étape {step}</p>
      <p className="mt-1 text-sm font-semibold text-slate-200">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{text}</p>
    </div>
  );
}
