'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getHashId(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#/, '');
}

/** Usa scroll-margin-top già definito sulle sezioni (es. 200px in prodotti). */
function scrollToElementById(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

/**
 * Attende che l'elemento sia nel DOM (navigazione App Router / idratazione)
 * tramite MutationObserver + rAF, senza timeout fissi come strategia primaria.
 */
function scrollToHashWhenReady(id: string): () => void {
  if (!id) return () => {};

  let finished = false;
  let rafId = 0;
  let observer: MutationObserver | null = null;
  let safetyTimer = 0;

  const cleanup = () => {
    finished = true;
    cancelAnimationFrame(rafId);
    observer?.disconnect();
    observer = null;
    if (safetyTimer) window.clearTimeout(safetyTimer);
  };

  const tryScroll = (): boolean => {
    if (finished) return true;
    if (scrollToElementById(id)) {
      cleanup();
      return true;
    }
    return false;
  };

  if (tryScroll()) return cleanup;

  observer = new MutationObserver(() => {
    tryScroll();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  rafId = requestAnimationFrame(() => {
    tryScroll();
  });

  // Solo fallback se l'ID non esiste o non compare mai (evita observer infinito)
  safetyTimer = window.setTimeout(() => {
    tryScroll();
    cleanup();
  }, 5000);

  return cleanup;
}

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  // Cambio pagina: in cima se non c'è hash, altrimenti verso l'ancora
  useEffect(() => {
    const hashId = getHashId();
    if (!hashId) {
      window.scrollTo(0, 0);
      return;
    }
    return scrollToHashWhenReady(hashId);
  }, [pathname]);

  // Stessa pagina / pulsante indietro-avanti tra hash
  useEffect(() => {
    let cancelPending: (() => void) | undefined;

    const handleHashChange = () => {
      cancelPending?.();
      const hashId = getHashId();
      cancelPending = hashId ? scrollToHashWhenReady(hashId) : undefined;
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      cancelPending?.();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
}
