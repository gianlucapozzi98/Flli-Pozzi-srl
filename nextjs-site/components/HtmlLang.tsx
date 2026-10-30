'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Mantiene document.documentElement.lang allineato alla lingua del LanguageContext.
 * Aggiorna solo dopo il mount (e al cambio lingua) per evitare mismatch di hydration:
 * il server e il primo paint client restano su lang="it" dal RootLayout.
 */
export default function HtmlLang() {
  const { language } = useLanguage();

  useEffect(() => {
    if (document.documentElement.lang !== language) {
      document.documentElement.lang = language;
    }
  }, [language]);

  return null;
}
