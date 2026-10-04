import { useEffect, useState } from "react";
import { progressLog } from "@/hooks/progressDebug";

// ---------------------------------------------------------------------------
// useScrollSpy : désigne la section « active », c'est-à-dire la dernière
// section dont le haut a franchi la ligne de lecture (35 % de la hauteur
// du viewport). C'est CE signal qui alimente la barre de progression, le
// compteur x/y de la sidebar ET le marquage « vu » persisté : s'il reste
// figé, tous les indicateurs restent figés avec lui.
//
// HISTORIQUE DU BUG (progression bloquée après la 1re section) :
// la première version utilisait un IntersectionObserver avec une fine bande
// d'observation (rootMargin resserré) et threshold 0.1. Or ce seuil porte sur
// un RATIO DE SURFACE (surface visible / surface totale de la cible) : avec
// une bande de ~10 % du viewport, une section plus haute que le viewport ne
// peut JAMAIS atteindre 10 % de visibilité dans la bande. Résultat : le
// callback ne se déclenchait pour AUCUNE de nos (longues) sections et
// activeId restait éternellement sur sa valeur initiale — la 1re section,
// seule « vue ». D'où : une coche verte, puis plus rien.
// La détection ci-dessous, par comparaison géométrique directe, ne souffre
// d'aucun effet de seuil : toute section franchissant la ligne est détectée,
// quelle que soit sa hauteur.
//
// Le tableau sectionIds DOIT être stable entre les rendus (useMemo côté
// page) : un nouveau tableau à chaque rendu réabonnerait les écouteurs.
// ---------------------------------------------------------------------------

// Position verticale de la ligne de lecture, en fraction de la hauteur du
// viewport. 0.35 = légèrement au-dessus du milieu : la section devient active
// dès que son titre entre bien dans le champ de lecture.
const READING_LINE_RATIO = 0.35;

// Balaye les sections DANS L'ORDRE DU TABLEAU (qui suit l'ordre du document)
// et retient la dernière dont le haut a dépassé la ligne de lecture.
// Retourne null si aucune section n'est encore atteinte (haut de page occupé
// par l'en-tête du chapitre) : l'appelant conserve alors la valeur précédente.
function computeActiveId(sectionIds: string[]): string | null {
  const line = window.innerHeight * READING_LINE_RATIO;
  let current: string | null = null;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) current = id;
  }
  return current;
}

export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    // Recense les sections réellement présentes dans le DOM. Un identifiant
    // introuvable (faute de frappe, section affichée sous condition) est
    // journalisé au lieu d'échouer silencieusement : c'est la première chose
    // à vérifier (via ?debug=progress) si la progression semble bloquée.
    const found = sectionIds.filter((id) => document.getElementById(id) !== null);
    const missing = sectionIds.filter((id) => document.getElementById(id) === null);
    progressLog("scrollspy : surveillance démarrée", { found, missing });

    // Dernière valeur publiée : évite les setState redondants et ne
    // journalise que les transitions. Variable LOCALE à l'effet (et non
    // useRef) : tout ce qui touche au scroll vit et meurt avec l'abonnement,
    // et la logique reste testable sans React.
    let published = sectionIds[0] ?? "";
    function publish(id: string): void {
      if (published === id) return;
      published = id;
      progressLog(`scrollspy : section active → ${id}`);
      setActiveId(id);
    }

    // Étrangleur à rAF : le scroll peut émettre des dizaines d'événements par
    // seconde, mais une seule mesure par frame suffit (5 à 6 sections à tester).
    let ticking = false;
    function update(): void {
      ticking = false;
      const current = computeActiveId(sectionIds);
      if (current) publish(current);
    }
    function requestUpdate(): void {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }
    // Mesure initiale : indispensable après un rechargement avec restauration
    // de position (le navigateur replace le scroll AVANT nos effets) et après
    // un redimensionnement ; sinon l'état initial (1re section) persisterait
    // à tort même affiché en bas de page.
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
    // setActiveId est stable (garanti React) : seule sectionIds déclenche.
  }, [sectionIds]);

  return activeId;
}
