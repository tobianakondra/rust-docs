import { useEffect, useRef, useState } from "react";
import { progressLog } from "@/hooks/progressDebug";

// ---------------------------------------------------------------------------
// useReadingProgress : persistance navigateur de la progression de lecture.
//
// Magasin (localStorage, clé versionnée STORAGE_KEY) :
//   { [route]: { seen: string[] /* sections déjà traversées */, last: string | null } }
//
// CONTRAINTE D'HYDRATATION (cause d'un bug réel, cf. historique) :
// le prerender serveur ne connaît pas localStorage, donc son HTML ne contient
// AUCUNE coche « vu ». Si le premier rendu client affichait ces coches aussitôt
// (useState(loadStore)), React détecterait un écart avec le HTML serveur et
// lèverait « Hydration failed » (mismatch <svg> dans les boutons de la sidebar).
// L'état initial est donc VOLONTAIREMENT vide (identique serveur et client) et
// le magasin réel n'est chargé que dans l'effet de montage, APRÈS l'hydratation.
// Les effets de persistance et de marquage restent inertes tant que ce
// chargement n'a pas eu lieu (garde `ready`), sans quoi ils écraseraient la
// sauvegarde avec l'état initial vide.
//
// Trois effets, trois responsabilités (jamais d'effets dans les composants) :
//   1. chargement : lecture unique de localStorage après hydratation ;
//   2. persistance : réécrit le magasin à chaque évolution (localStorage
//      indisponible → repli silencieux, progression conservée en mémoire) ;
//   3. marquage : ajoute la section active aux « vues » du chapitre courant
//      et la mémorise comme dernière position ;
//   4. reprise : au premier montage uniquement (garde restoredRef), restaure
//      la dernière position sauf si l'URL impose déjà une ancre (#...), sauf
//      première visite (aucune sauvegarde) et sauf si la sauvegarde pointe
//      déjà la première section (on est déjà en haut).
//
// La restauration force un défilement INSTANTANÉ (scrollBehavior neutralisé
// le temps de l'opération) : le défilement fluide global du site provoquerait
// sinon une glissade visible depuis le haut à chaque rechargement.
// ---------------------------------------------------------------------------

export type ChapterProgress = {
  seen: string[];
  last: string | null;
};

export type ProgressStore = Record<string, ChapterProgress>;

const STORAGE_KEY = "rust-docs-progress-v1";

// Garde-fou à la relecture : un magasin corrompu (édition manuelle, ancienne
// version) est ignoré entrée par entrée au lieu de faire échouer le parse.
function isChapterProgress(value: unknown): value is ChapterProgress {
  if (!value || typeof value !== "object") return false;
  const seen = (value as { seen?: unknown }).seen;
  return Array.isArray(seen) && seen.every((entry) => typeof entry === "string");
}

function loadStore(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const store: ProgressStore = {};
    for (const [route, value] of Object.entries(parsed)) {
      if (isChapterProgress(value)) store[route] = { seen: value.seen, last: value.last ?? null };
    }
    return store;
  } catch {
    return {};
  }
}

function scrollToSaved(id: string): void {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  document.getElementById(id)?.scrollIntoView({ block: "start" });
  root.style.scrollBehavior = previous;
}

export function useReadingProgress(route: string, sectionIds: string[], activeId: string): ProgressStore {
  // Voir l'en-tête : état initial vide = HTML serveur et premier rendu
  // client strictement identiques, aucune erreur d'hydratation possible.
  const [store, setStore] = useState<ProgressStore>({});
  // Passe à true une fois le magasin réel chargé : autorise alors la
  // persistance et le marquage (qui écriraient sinon sur du vide).
  const [ready, setReady] = useState(false);
  const restoredRef = useRef(false);

  // 1. Chargement différé post-hydratation (une seule fois).
  useEffect(() => {
    setStore(loadStore());
    setReady(true);
    progressLog("chargement post-hydratation terminé");
  }, []);

  // 2. Persistance : chaque nouvel état est sérialisé aussitôt.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      progressLog("persistance localStorage", store);
    } catch {
      // Stockage indisponible (navigation privée stricte, quota) : la
      // progression reste disponible en mémoire pour la session en cours.
    }
  }, [store, ready]);

  // 3. Marquage PROGRESSIF : atteindre la section N valide d'office les
  // sections 1..N comme « vues ». Justification : la lecture est séquentielle
  // et le scroll-spy ne signale que la section courante — un défilement rapide
  // ou un saut par ancre (#quiz) « sauterait » sinon des sections pourtant
  // traversées, et le chapitre ne serait jamais marqué terminé. C'est aussi ce
  // qui rend la coche du chapitre robuste : il suffit d'atteindre le bas du
  // chapitre pour valider l'ensemble du parcours.
  // La mise à jour fonctionnelle compare AVANT d'écrire et retourne l'état
  // précédent inchangé si rien ne bouge. Sans ce court-circuit, chaque rendu
  // créerait un nouvel objet → boucle persistance → rendu.
  useEffect(() => {
    if (!ready || !activeId) return;
    const position = sectionIds.indexOf(activeId);
    if (position < 0) return;
    const reached = sectionIds.slice(0, position + 1);
    progressLog(`marquage : ${route} → ${reached.length}/${sectionIds.length} sections vues`);
    setStore((previous) => {
      const current = previous[route] ?? { seen: [], last: null };
      const seen = [...current.seen];
      let changed = current.last !== activeId;
      for (const id of reached) {
        if (!seen.includes(id)) {
          seen.push(id);
          changed = true;
        }
      }
      if (!changed) return previous;
      return { ...previous, [route]: { seen, last: activeId } };
    });
  }, [route, sectionIds, activeId, ready]);

  // 4. Reprise : exécution unique grâce à restoredRef (le StrictMode de React
  // remonte les effets en dev : sans garde, la restauration se rejouerait).
  // Lit DIRECTEMENT localStorage plutôt que le state, encore vide au montage.
  useEffect(() => {
    if (restoredRef.current) {
      progressLog("reprise : déjà effectuée, ignorée");
      return;
    }
    restoredRef.current = true;
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      progressLog("reprise : ancre présente dans l’URL, le navigateur gère");
      return;
    }
    const saved = loadStore()[route]?.last;
    if (!saved) {
      progressLog("reprise : aucune sauvegarde pour cette page");
      return;
    }
    if (!sectionIds.includes(saved) || saved === sectionIds[0]) {
      progressLog("reprise : sauvegarde déjà en haut de page, sur place", { saved });
      return;
    }
    progressLog(`reprise : restauration de la position → ${saved}`);
    window.requestAnimationFrame(() => scrollToSaved(saved));
  }, [route, sectionIds]);

  return store;
}
