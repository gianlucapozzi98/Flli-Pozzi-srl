'use client';

import { createContext, useCallback, useContext, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';
import { localizePath, splitLangFromPath, type Lang } from '@/lib/i18n';

interface LanguageContextType {
  language: Lang;
  /** Va alla stessa pagina nell'altra lingua (cambia l'URL: /prodotti → /en/prodotti). */
  setLanguage: (lang: Lang) => void;
  t: (key: string) => string;
  /** Percorso localizzato per i link interni: lp('/prodotti') → '/en/prodotti' in inglese. */
  lp: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * La lingua arriva dall'URL (segmento [lang] del layout), non più da localStorage:
 * così ogni lingua ha il suo indirizzo e Google può indicizzarla.
 */
export function LanguageProvider({ children, language }: { children: ReactNode; language: Lang }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = useCallback(
    (lang: Lang) => {
      if (lang === language) return;
      const { path } = splitLangFromPath(pathname || '/');
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      router.push(localizePath(path, lang) + hash);
    },
    [language, pathname, router]
  );

  const t = useCallback(
    (key: string): string => {
      const translation = translations[language]?.[key];
      if (!translation && process.env.NODE_ENV === 'development') {
        console.warn(`Translation missing for key "${key}" in language "${language}"`);
      }
      return translation || translations.it[key] || key;
    },
    [language]
  );

  const lp = useCallback((path: string) => localizePath(path, language), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, lp }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
