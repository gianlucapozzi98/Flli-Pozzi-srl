import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { LANGS, localizePath } from '@/lib/i18n';
import { CATEGORIES, PRODUCTS, categoryPath, productPath } from '@/lib/catalog';

type Entry = { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number };

const STATIC_PAGES: Entry[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/prodotti', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/assistenza-ricambi', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/ordine-rapido', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/diventa-rivenditore', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/azienda', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/contatti', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/eventi', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/cookies', changeFrequency: 'yearly', priority: 0.2 },
];

/** Una voce per pagina e lingua, con i collegamenti hreflang alle altre lingue. */
function withLanguages(entries: Entry[]): MetadataRoute.Sitemap {
  return entries.flatMap((entry) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}${localizePath(entry.path, lang)}`,
      changeFrequency: entry.changeFrequency,
      priority: lang === 'it' ? entry.priority : Math.round(entry.priority * 0.9 * 10) / 10,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}${localizePath(entry.path, l)}`])),
      },
    }))
  );
}

const CATALOG_PAGES: Entry[] = [
  ...CATEGORIES.map((c) => ({ path: categoryPath(c.slug), changeFrequency: 'monthly' as const, priority: 0.9 })),
  ...PRODUCTS.map((p) => ({ path: productPath(p), changeFrequency: 'monthly' as const, priority: 0.8 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return withLanguages([...STATIC_PAGES, ...CATALOG_PAGES]);
}
