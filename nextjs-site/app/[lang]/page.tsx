import type { Metadata } from 'next';
import HomePage, { type HomeCategory, type HomeProduct } from '@/components/home/HomePage';
import { CATEGORIES, PRODUCTS, categoryPath, productPath, productsIn } from '@/lib/catalog';
import { CATEGORY_CARD_SPEC } from '@/lib/home-content';
import { pageMetadata } from '@/lib/seo';
import { DEFAULT_LANG, isLang, localizePath } from '@/lib/i18n';

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata('home', '/', isLang(lang) ? lang : DEFAULT_LANG);
}

/** La home è un client component: qui prepariamo dal catalogo solo i dati che le servono, già nella lingua giusta. */
export default async function Page({ params }: Params) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;

  const categories: HomeCategory[] = CATEGORIES.filter((c) => c.slug !== 'accessori-imballaggio').map((c) => ({
    slug: c.slug,
    name: c.name[lang],
    spec: CATEGORY_CARD_SPEC[c.slug]?.[lang] ?? '',
    image: c.image,
    alt: c.imageAlt[lang],
    materials: c.materials,
    count: productsIn(c.slug).length,
    href: localizePath(categoryPath(c.slug), lang),
  }));

  const madeProducts: HomeProduct[] = PRODUCTS.filter((p) => p.madeInItaly).map((p) => ({
    name: p.name,
    short: p.short[lang],
    image: p.image,
    href: localizePath(productPath(p), lang),
  }));

  return <HomePage categories={categories} madeProducts={madeProducts} />;
}
