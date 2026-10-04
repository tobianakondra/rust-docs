// ---------------------------------------------------------------------------
// Diagnostic « progression de lecture ».
//
// Les journaux émis via progressLog() ne s'affichent que lorsque l'URL
// contient ?debug=progress (ex. http://localhost:3000/chapitre-2?debug=progress),
// dans tous les environnements (dev comme production). Console ouverte, ils
// permettent de vérifier chaque maillon de la chaîne :
//   1. le scroll-spy détecte les sections traversées (hook useScrollSpy) ;
//   2. chaque section active est marquée « vue » (hook useReadingProgress) ;
//   3. le magasin est persisté dans localStorage ;
//   4. la reprise de lecture restaure (ou non) la dernière position, avec la
//      raison exacte dans chaque cas.
//
// Protocole de diagnostic : si AUCUNE ligne [progress] n'apparaît, la page
// servie est une ancienne version sans ce code (serveur dev non relancé ou
// build non reconstruit). Sinon, la dernière ligne atteinte désigne le
// maillon défaillant.
//
// Sans le paramètre, progressLog() est sans effet (zéro bruit en console).
// ---------------------------------------------------------------------------

export function isProgressDebug(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.search.includes("debug=progress");
}

export function progressLog(step: string, detail?: unknown): void {
  if (!isProgressDebug()) return;
  if (detail === undefined) {
    console.debug(`[progress] ${step}`);
  } else {
    console.debug(`[progress] ${step}`, detail);
  }
}
