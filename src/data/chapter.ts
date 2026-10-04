export type SectionLink = {
  id: string;
  label: string;
};

export type Benefit = {
  title: string;
  text: string;
};

export type LanguageEntry = {
  id: string;
  name: string;
  tagline: string;
  memory: string;
  concurrency: string;
  learning: string;
  speed: string;
  detail: string;
};

export type Adopter = {
  name: string;
  context: string;
  detail: string;
};

export const CHAPTER_META = {
  badge: "Chapitre 01 — Introduction",
  title: "Pourquoi Rust ?",
  subtitle:
    "Sécurité mémoire sans ramasse-miettes, performances de niveau système et adoption industrielle : le contexte essentiel avant d’écrire la première ligne.",
  readingMinutes: 12,
} as const;

export const SECTION_LINKS: SectionLink[] = [
  { id: "promesse", label: "Contexte et garanties" },
  { id: "realite", label: "Coût et contraintes" },
  { id: "comparatif", label: "Comparatif des langages" },
  { id: "adoptants", label: "Adoption industrielle" },
  { id: "duel", label: "Étude de cas C++ / Rust" },
];

export const BENEFITS: Benefit[] = [
  {
    title: "Sécurité mémoire sans GC",
    text: "Le vérificateur d’emprunts rejette à la compilation les accès après libération et les courses de données, sans ramasse-miettes.",
  },
  {
    title: "Performances de niveau système",
    text: "Abstractions sans surcoût, disposition mémoire contrôlée et binaires prévisibles pour systèmes, embarqué et infrastructures.",
  },
  {
    title: "Concurrence vérifiée",
    text: "Les traits Send et Sync, combinés à la possession, rendent les erreurs de partage entre threads visibles avant l’exécution.",
  },
];

export const LANGUAGES: LanguageEntry[] = [
  {
    id: "rust",
    name: "Rust",
    tagline: "Sécurité et performance système",
    memory: "Possession et emprunts vérifiés, sans GC",
    concurrency: "Concurrence contrôlée par le type",
    learning: "Exigeante, progressive",
    speed: "Comparable à C / C++",
    detail:
      "Le coût de la rigueur est payé à la compilation. Adapté aux systèmes, interfaces en ligne de commande, WebAssembly et composants noyau.",
  },
  {
    id: "cpp",
    name: "C++",
    tagline: "Contrôle maximal, vérification limitée",
    memory: "Gestion manuelle, RAII, pointeurs bruts",
    concurrency: "Expressive, à vérifier manuellement",
    learning: "Étendue, nombreux cas limites",
    speed: "Référence haute performance",
    detail:
      "La liberté offerte implique une responsabilité équivalente : invalidations d’itérateurs et accès après libération restent possibles.",
  },
  {
    id: "go",
    name: "Go",
    tagline: "Simplicité et productivité",
    memory: "Ramasse-miettes",
    concurrency: "Goroutines et canaux",
    learning: "Accessible",
    speed: "Élevée, inférieure à C++",
    detail:
      "Pertinent pour les API et le cloud grâce à sa simplicité. Le ramasse-miettes et le contrôle mémoire réduit limitent certains usages système.",
  },
  {
    id: "python",
    name: "Python",
    tagline: "Expressivité et prototypage",
    memory: "Ramasse-miettes, comptage de références",
    concurrency: "Contrainte par le verrou global",
    learning: "Accessible",
    speed: "Interprétée, inférieure",
    detail:
      "Adapté à l’apprentissage, au prototypage et à l’analyse de données. Moins indiqué lorsque la latence ou l’empreinte mémoire est critique.",
  },
];

export const ADOPTERS: Adopter[] = [
  {
    name: "Noyau Linux",
    context: "Pris en charge depuis la version 6.1",
    detail:
      "Utilisation ciblée pour des pilotes et modules sensibles, afin de réduire les corruptions mémoire sans réécrire l’existant en C.",
  },
  {
    name: "Microsoft",
    context: "Windows et Azure",
    detail:
      "Emploi pour des composants système et critiques, dans un contexte où les failles mémoire représentaient une part majeure des incidents.",
  },
  {
    name: "Google — Android",
    context: "Composants Bluetooth et UWB",
    detail:
      "Nouveaux modules écrits en Rust afin de limiter les vulnérabilités mémoire sur une base d’appareils étendue.",
  },
  {
    name: "AWS",
    context: "Firecracker et Bottlerocket",
    detail:
      "Utilisation pour la virtualisation et l’infrastructure, où la sécurité mémoire conditionne directement la robustesse du service.",
  },
];

export const CPP_SNIPPET = `std::vector<int> v = {1, 2, 3};
auto it = v.begin();
v.push_back(4); // reallocation possible
std::cout << *it << "\\n"; // comportement indefini`;

export const RUST_SNIPPET = `let mut v = vec![1, 2, 3];
let first = &v[0];
v.push(4); // rejete : 'first' emprunte encore 'v'
println!("{}", first);`;

export const RUST_COMPILER_MESSAGE = `error[E0506]: cannot borrow 'v' as mutable because it is also borrowed as immutable
 --> src/main.rs:3:1
  |
2 | let first = &v[0];
  |              - immutable borrow occurs here
3 | v.push(4);
  | ^ mutable borrow occurs here
4 | println!("{}", first);
  |               ----- immutable borrow later used here
  |
  = help: considère de cloner la valeur ou de limiter la portée de l'emprunt`;
