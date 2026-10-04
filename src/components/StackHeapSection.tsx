import { SectionHeading } from "@/components/SectionHeading";
import { CodeBlock } from "@/components/CodeBlock";
import { PedagogicalCallout } from "@/components/PedagogicalCallout";
import { StringMemoryDiagram } from "@/components/StringMemoryDiagram";
import { COPY_SNIPPET } from "@/data/chapter2";

export function StackHeapSection() {
  return (
    <section id="pile-tas" aria-label="Pile vs tas" className="scroll-mt-20">
      <SectionHeading
        index="03"
        kicker="Mémoire"
        title="Pile contre tas : pourquoi l’ownership existe"
        description="La pile est rapide et rigide : on y stocke des valeurs de taille connue. Le tas accueille le reste, au prix d’une indirection. L’ownership répartit les responsabilités entre ces deux zones."
      />
      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2">
        <div className="bg-[#0d1320] p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Pile — Stack</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Empilement strict, dernier arrivé premier sorti. Chaque valeur occupe une taille fixe connue à la
            compilation. Accès quasi immédiat, duplication simple par copie d’octets pour les types qui le
            permettent.
          </p>
        </div>
        <div className="bg-[#0d1320] p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Tas — Heap</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Réserve souple pour les données de taille variable ou inconnue à l’avance. On y accède via un pointeur
            depuis la pile. Allocation plus coûteuse, durée de vie à gérer explicitement — d’où l’ownership.
          </p>
        </div>
      </div>
      <div className="mt-3">
        <StringMemoryDiagram />
      </div>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-slate-400">
        <p>
          Une <span className="font-mono text-[13px] text-slate-200">String</span> est donc un objet hybride : trois
          nombres sur la pile — pointeur, longueur, capacité — décrivant un buffer d’octets sur le tas. Copier les
          trois nombres sans précaution créerait deux descripteurs pour un seul buffer : à la libération, le même
          bloc serait rendu deux fois. C’est précisément le scénario que l’ownership interdit.
        </p>
      </div>
      <div className="mt-6">
        <CodeBlock title="main.rs" badge="Rust · Copy" code={COPY_SNIPPET} tone="safe" />
      </div>
      <div className="mt-3">
        <PedagogicalCallout variant="intuition" title="Point clé — Copy contre Move">
          Les scalaires comme i32 ou bool suivent le trait Copy : leur taille fixe rend la duplication d’octets
          triviale et sûre, l’original reste valide. Les types adossés au tas comme String se déplacent : seul le
          nouveau propriétaire reste utilisable.
        </PedagogicalCallout>
      </div>
    </section>
  );
}
