/**
 * Lingue del sito e indirizzi localizzati.
 *
 * L'italiano vive alla radice (/prodotti), inglese e francese sotto prefisso
 * (/en/prodotti, /fr/prodotti). Internamente tutte le pagine stanno in
 * app/[lang]/: proxy.ts riscrive gli indirizzi senza prefisso verso /it/.
 */
export const LANGS = ['it', 'en', 'fr'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'it';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** '/prodotti' → '/prodotti' (it), '/en/prodotti' (en). Mantiene ?query e #ancora. */
export function localizePath(path: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return path;
  if (path === '/' || path === '') return `/${lang}`;
  if (path.startsWith('/?') || path.startsWith('/#')) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** '/en/prodotti' → { lang: 'en', path: '/prodotti' }; '/prodotti' → { lang: 'it', path: '/prodotti' } */
export function splitLangFromPath(pathname: string): { lang: Lang; path: string } {
  const match = pathname.match(/^\/(en|fr)(?=\/|$)/);
  if (!match) return { lang: DEFAULT_LANG, path: pathname || '/' };
  const rest = pathname.slice(match[0].length);
  return { lang: match[1] as Lang, path: rest || '/' };
}

export const OG_LOCALE: Record<Lang, string> = {
  it: 'it_IT',
  en: 'en_GB',
  fr: 'fr_FR',
};

/** Canonical + hreflang per una pagina disponibile in tutte le lingue. */
export function languageAlternates(path: string, lang: Lang) {
  return {
    canonical: localizePath(path, lang),
    languages: {
      it: localizePath(path, 'it'),
      en: localizePath(path, 'en'),
      fr: localizePath(path, 'fr'),
      'x-default': localizePath(path, 'it'),
    },
  };
}
