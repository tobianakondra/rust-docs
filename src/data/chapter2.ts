import type { SectionLink } from "@/data/chapter";

export type QuizQuestion = {
  question: string;
  code: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export const CHAPTER2_META = {
  badge: "Chapitre 02 — Fondamentaux",
  title: "L’Ownership et le Scope — La mécanique du pouvoir",
  subtitle:
    "Comprendre la règle fondamentale qui permet à Rust d’éliminer le ramasse-miettes sans sacrifier la sécurité.",
  readingMinutes: 18,
  level: "Débutant vers intermédiaire",
  prereqs: "Chapitre 1",
} as const;

export const CHAPTER2_LINKS: SectionLink[] = [
  { id: "intuition", label: "L’intuition" },
  { id: "portee", label: "Portée et drop" },
  { id: "pile-tas", label: "Pile vs tas" },
  { id: "deplacement", label: "Move vs clone" },
  { id: "fonctions", label: "Ownership et fonctions" },
  { id: "quiz", label: "Auto-évaluation" },
];

export const SCOPE_SNIPPET = `fn main() {
    // ---- debut de la portee ----
    {
        // creation : un buffer est reserve sur le tas
        let message = String::from("bonjour");
        // utilisation : autorisee a linterieur
        println!("{}", message);
    } // fin : drop automatique, le buffer est libere
    // println!("{}", message); // refuse : hors de portee
}`;

export const COPY_SNIPPET = `let a: i32 = 42;
let b = a; // copie octet par octet : a reste valide
println!("{} {}", a, b); // affiche 42 42`;

export const MOVE_SNIPPET = `let s1 = String::from("hello");
let s2 = s1; // deplacement : s1 devient invalide
// println!("{}", s1); // refuse : valeur deplacee
println!("{}", s2); // affiche hello`;

export const CLONE_SNIPPET = `let s1 = String::from("hello");
let s2 = s1.clone(); // copie profonde explicite, cout assume
println!("{} {}", s1, s2); // affiche hello hello`;

export const FUNCTION_TAKE_SNIPPET = `fn main() {
    let rapport = String::from("bilan annuel");
    archiver(rapport); // deplacement : rapport invalide ici
    // println!("{}", rapport); // refuse
}
fn archiver(dossier: String) {
    println!("{}", dossier);
} // fin : dossier est libere ici`;

export const FUNCTION_RETURN_SNIPPET = `fn main() {
    let rapport = String::from("bilan annuel");
    let rapport = archiver(rapport); // transfert aller-retour
    println!("{}", rapport); // de nouveau valide
}
fn archiver(dossier: String) -> String {
    println!("{}", dossier);
    dossier // retour : propriete rendue au programme
}`;

export const MOVE_ERROR_MESSAGE = `error[E0382]: borrow of moved value: s1
 --> src/main.rs:4:20
  |
2 |     let s1 = String::from("hello");
  |         -- move occurs because s1 has type String
  |            which does not implement the Copy trait
3 |     let s2 = s1;
  |              -- value moved here
4 |     println!("{}", s1);
  |                    ^^ value borrowed here after move`;

export const QUIZ: QuizQuestion[] = [
  {
    question: "Après ces deux lignes, que peut-on dire de s1 ?",
    code: `let s1 = String::from("hello");
let s2 = s1; // <- que vaut s1 apres cette ligne ?`,
    choices: [
      "s1 contient une copie indépendante de la chaîne",
      "s1 est invalide : la propriété a été déplacée vers s2",
      "s1 et s2 partagent le même buffer en toute sécurité",
    ],
    answer: 1,
    explanation:
      "String ne suit pas le trait Copy : let s2 = s1 effectue un déplacement. Seul s2 est utilisable ensuite.",
  },
  {
    question: "Quand la mémoire de message est-elle libérée ?",
    code: `{
    let message = String::from("bonjour");
    println!("{}", message);
} // <- que se passe-t-il a cette ligne ?`,
    choices: [
      "Uniquement par un appel manuel, sinon elle fuit",
      "À la fermeture de la portée de son propriétaire, via drop",
      "Par le ramasse-miettes, au prochain cycle",
    ],
    answer: 1,
    explanation:
      "À la fin de la portée, drop est appelé implicitement : le buffer du tas est rendu à l’allocateur. Rust n’a pas de ramasse-miettes.",
  },
  {
    question: "Après ces deux lignes, peut-on encore utiliser a ?",
    code: `let a: i32 = 42;
let b = a; // <- a reste-t-il utilisable ?`,
    choices: [
      "String et Vec, comme les entiers",
      "i32, bool et les autres scalaires qui suivent Copy",
      "Aucun type : Rust déplace toujours",
    ],
    answer: 1,
    explanation:
      "Les scalaires de taille fixe suivent le trait Copy : l’affectation duplique les octets et l’original reste valide. Les types du tas se déplacent.",
  },
];
