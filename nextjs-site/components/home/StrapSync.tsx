'use client';

import { useEffect } from 'react';

/**
 * Tiene l'indicatore di tensione (animazioni CSS) allineato alla reggia (animazioni SMIL dell'SVG).
 * Le due partono in momenti diversi se la pagina viene aperta in una scheda in secondo piano:
 * all'avvio e ogni volta che la pagina torna visibile riportiamo le animazioni CSS al tempo dell'SVG.
 */
export default function StrapSync({ duration }: { duration: number }) {
  useEffect(() => {
    const sync = () => {
      const band = document.querySelector<HTMLElement>('[data-strap-band]');
      const svg = band?.querySelector('svg');
      if (!band || !svg || typeof svg.getCurrentTime !== 'function') return;
      const t = (svg.getCurrentTime() % duration) * 1000;
      band.getAnimations({ subtree: true }).forEach((a) => {
        a.currentTime = t;
      });
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') sync();
    };
    sync();
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('pageshow', sync);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('pageshow', sync);
    };
  }, [duration]);

  return null;
}
