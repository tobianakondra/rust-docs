import type { SectionLink } from "@/data/chapter";
import type { QuizQuestion } from "@/data/chapter2";

export const CHAPTER3_META = {
  badge: "Chapitre 03 — Fondamentaux",
  title: "Les Emprunts — utiliser sans posséder",
  subtitle:
    "Les références permettent de lire ou modifier une valeur sans en prendre la propriété : la réponse à la friction du chapitre 2.",
  readingMinutes: 20,
  level: "Intermédiaire",
  prereqs: "Chapitre 2",
} as const;

export const CHAPTER3_LINKS: SectionLink[] = [
  { id: "intuition", label: "L’intuition" },
  { id: "partagees", label: "Références partagées" },
  { id: "mutables", label: "Références mutables" },
  { id: "pendantes", label: "Règles et références pendantes" },
  { id: "tranches", label: "Tranches et pratique" },
  { id: "quiz", label: "Auto-évaluation" },
];

export const SHARED_SNIPPET = `fn main() {
    let s = String::from("rapport");
    let taille = mesurer(&s); // emprunt partage : s reste valide
    println!("{} mesure {}", s, taille);
}
fn mesurer(texte: &String) -> usize {
    texte.len()
} // fin : lemprunt se termine, rien nest libere`;

export const MUTABLE_SNIPPET = `fn main() {
    let mut s = String::from("bonjour");
    completer(&mut s); // emprunt exclusif : ecriture autorisee
    println!("{}", s); // affiche bonjour le monde
}
fn completer(texte: &mut String) {
    texte.push_str(" le monde");
} // fin : lemprunt se termine, s reste proprietaire`;

export const DOUBLE_MUT_SNIPPET = `let mut s = String::from("donnees");
let a = &mut s; // premier emprunt exclusif
let b = &mut s; // refuse : un seul ecrivain a la fois
println!("{} {}", a, b);`;

export const DOUBLE_MUT_ERROR = `error[E0499]: cannot borrow s as mutable more than once at a time
 --> src/main.rs:3:13
  |
2 |     let a = &mut s;
  |             ------ first mutable borrow occurs here
3 |     let b = &mut s;
  |             ^^^^^^ second mutable borrow occurs here
4 |     println!("{} {}", a, b);
  |                    - first borrow later used here`;

export const DANGLE_SNIPPET = `fn extraire() -> &String { // refuse : duree de vie manquante
    let titre = String::from("titre");
    &titre // titre est libere a la fin : reference pendante
}`;

export const DANGLE_ERROR = `error[E0106]: missing lifetime specifier
 --> src/main.rs:1:17
  |
1 | fn extraire() -> &String {
  |                 ^ expected named lifetime parameter
  |
  = help: consider introducing a named lifetime parameter`;

// Second cas d'école : la référence vit dans une portée PLUS LARGE que son
// propriétaire. Les commentaires numérotés guident la lecture ligne par ligne
// (convention pédagogique de ce chapitre : pas de guillemets doubles dans les
// commentaires, pour ne pas perturber la coloration syntaxique).
export const SCOPE_DANGLE_SNIPPET = `fn main() {
    let reference_titre; // 1. on reserve un nom pour une future reference
    {
        let titre = String::from("Rust"); // 2. le proprietaire nait ici
        reference_titre = &titre; // 3. emprunt : simple adresse vers titre
    } // 4. fin du bloc : titre est detruit, l'adresse ne mène plus nulle part
    println!("{}", reference_titre); // 5. refuse : usage apres destruction
}`;

export const SCOPE_DANGLE_ERROR = `error[E0597]: titre does not live long enough
 --> src/main.rs:4:27
  |
2 |         let titre = String::from("Rust");
  |             ----- binding titre declared here
3 |         reference_titre = &titre;
  |                           ^^^^^ borrowed value does not live long enough
4 |     }
  |     - titre dropped here while still borrowed
5 |
6 |     println!("{}", reference_titre);
  |                --------------- borrow later used here`;

export const SLICE_SNIPPET = `let titre = String::from("bonjour le monde");
let debut = &titre[0..7]; // vue partielle : sans propriete
println!("{}", debut); // affiche bonjour`;

export const BORROW_FIX_SNIPPET = `fn main() {
    let rapport = String::from("bilan annuel");
    archiver(&rapport); // simple lecture : propriete conservee
    println!("{}", rapport); // toujours valide, sans retour
}
fn archiver(dossier: &String) {
    println!("{}", dossier);
}`;

export const QUIZ3: QuizQuestion[] = [
  {
    question: "Après cet appel, peut-on encore utiliser s ?",
    code: `let s = String::from("rapport");
let taille = mesurer(&s); // <- s reste-t-il valide ?`,
    choices: [
      "Non : la fonction a pris la propriété de s",
      "Oui : la fonction a seulement emprunté s en lecture",
      "Oui, mais uniquement après avoir récupéré s en retour",
    ],
    answer: 1,
    explanation:
      "Le paramètre texte: &String est un emprunt partagé : la propriété reste à s et l’emprunt se termine à la fin de la fonction.",
  },
  {
    question: "Pourquoi la troisième ligne est-elle refusée ?",
    code: `let mut s = String::from("donnees");
let a = &mut s;
let b = &mut s; // <- pourquoi cette ligne echoue ?`,
    choices: [
      "Parce que s n’est pas déclarée mutable",
      "Parce que deux emprunts exclusifs simultanés sont interdits",
      "Parce que println ne sait pas afficher deux emprunts",
    ],
    answer: 1,
    explanation:
      "Règle d’or : un seul emprunt mutable à la fois, et aucun emprunt partagé pendant qu’il est actif. Le compilateur signale E0499.",
  },
  {
    question: "Que vaut debut après ces deux lignes ?",
    code: `let titre = String::from("bonjour le monde");
let debut = &titre[0..7]; // <- que contient debut ?`,
    choices: [
      "Une copie possédée des sept premiers octets",
      "Une tranche partagée : une vue sans propriété",
      "La chaîne entière, car les bornes sont ignorées",
    ],
    answer: 1,
    explanation:
      "La tranche &titre[0..7] est un emprunt partagé de type &str : elle observe une portion sans en prendre la propriété.",
  },
];
