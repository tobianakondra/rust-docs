# Rust Docs — Apprendre Rust autrement

Une documentation interactive, claire et visuelle pour apprendre le langage **Rust** sans se perdre.

## Pourquoi ce projet ?

J'apprends Rust en réalisant ce site. Je suis étudiant en **Licence 2 Informatique à l'Université Assane Seck de Ziguinchor**, et Rust me fascine — j'adore ce langage.

En pratiquant, j'ai remarqué deux choses :

1. **Les ressources sont dispersées.** La documentation officielle est bonne, mais parfois elle n'aide pas : elle explique le « quoi », rarement le « pourquoi » avec des mots simples.
2. **En Rust, on ne cherche pas comme dans les autres langages.** Ailleurs on cherche « comment implémenter une clé API » ou « comment faire une requête HTTP ». En Rust, on cherche le **type de retour**, on cherche à comprendre **comment fonctionne le borrow checker**, pourquoi le compilateur refuse ce code pourtant logique. C'est un autre état d'esprit — et c'est exactement ce que ce site essaie de transmettre : des analogies concrètes, des schémas, des erreurs de compilation expliquées, des quiz.

Bref : la documentation que j'aurais aimé trouver quand j'ai commencé.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS 3** + **DaisyUI 4**
- **Lucide React** pour les icônes
- Aucune base de données : le contenu est statique, la progression est stockée dans le **localStorage** du navigateur

## Contenu

- **Chapitre 1** — Pourquoi Rust ? (promesse, réalité, comparatif C++/Go/Python, adoption industrielle, duel C++ vs Rust)
- **Chapitre 2** — Ownership & Scope (intuition, portée et `drop`, pile vs tas, `move` vs `clone`, fonctions, quiz)
- **Chapitre 3** — Les Emprunts (`&T`, `&mut T`, E0499, E0106, tranches `&str`, quiz)

Fonctionnalités : sidebar multi-chapitres avec sections repliables, suivi de scroll, progression persistée avec coches « lu », blocs de code colorés (style `mockup-code`), quiz interactifs corrigés.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # vérifie que tout compile (utilisé avant chaque publication)
```

## Astuce debug

Ajouter `?debug=progress` à l'URL (ex. `http://localhost:3000/chapitre-2?debug=progress`) pour afficher dans la console les logs du suivi de progression (scroll-spy, marquage, persistance, reprise de lecture).

## Feuille de route

- Chapitre 4 — Structs et méthodes
- Chapitres 5 à 8 (voir la mention « sur 8 » dans l'interface)
- Recherche dans la documentation
