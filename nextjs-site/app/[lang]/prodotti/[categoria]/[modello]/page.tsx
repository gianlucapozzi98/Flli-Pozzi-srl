import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import ProductCard from '@/components/catalog/ProductCard';
import CtaBand from '@/components/catalog/CtaBand';
import JsonLd from '@/components/catalog/JsonLd';
import styles from '@/components/catalog/catalog.module.css';
import {
  PRODUCTS,
  SPEC_LABELS,
  categoryPath,
  getCategory,
  getProduct,
  localized,
  productDisplayName,
  productPath,
  resolveRef,
  type Product,
} from '@/lib/catalog';
import { UI } from '@/lib/catalog-ui';
import { DEFAULT_LANG, isLang, localizePath, type Lang } from '@/lib/i18n';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { getT } from '@/lib/translations';

type Params = { params: Promise<{ lang: string; categoria: string; modello: string }> };

export async function generateStaticParams({
  params,
}: {
  params: { categoria?: string } | Promise<{ categoria?: string }>;
}) {
  // I parametri del segmento padre possono arrivare come oggetto o come Promise
  const categoria = (await Promise.resolve(params))?.categoria;
  return PRODUCTS.filter((p) => !categoria || p.category === categoria).map((p) =>
    categoria ? { modello: p.slug } : { categoria: p.category, modello: p.slug }
  );
}

export const dynamicParams = false;

function productDescription(p: Product, lang: Lang): string {
  if (p.description) return p.description[lang];
  if (p.descKey) return getT(lang)(`prodotti.descriptions.${p.descKey}`).replace(/\s+\./g, '.').trim();
  return '';
}

const META_SUFFIX = {
  made: {
    it: 'Prodotto a Caravaggio, con ricambi originali e assistenza.',
    en: 'Made in Caravaggio, Italy, with original spare parts and service.',
    fr: 'Fabriqué à Caravaggio, avec pièces d’origine et assistance.',
  },
  service: {
    it: 'Ricambi e assistenza Fratelli Pozzi, preventivo su richiesta.',
    en: 'Spare parts and service by Fratelli Pozzi, quote on request.',
    fr: 'Pièces et assistance Fratelli Pozzi, devis sur demande.',
  },
} satisfies Record<string, Record<Lang, string>>;

/** Descrizione per Google: frasi intere fino a ~155 caratteri */
function metaDescription(text: string): string {
  if (text.length <= 155) return text;
  const cut = text.slice(0, 155);
  const lastStop = cut.lastIndexOf('. ');
  if (lastStop > 80) return cut.slice(0, lastStop + 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang: raw, categoria, modello } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  const product = getProduct(categoria, modello);
  if (!product) return {};
  const name = productDisplayName(product, lang);
  let description = productDescription(product, lang);
  // Descrizioni brevi: aggiungo un'informazione utile invece di lasciarle a metà
  if (description.length < 110) {
    description = `${description} ${product.madeInItaly ? META_SUFFIX.made[lang] : META_SUFFIX.service[lang]}`;
  }
  return buildMetadata(
    // Nel titolo solo la prima parte della specifica breve: le parole chiave restano in testa e il titolo non si allunga troppo
    { title: `${name} – ${product.short[lang].split(',')[0]}`, description: metaDescription(description) },
    productPath(product),
    lang,
    { image: product.image }
  );
}

export default async function ProductPage({ params }: Params) {
  const { lang: raw, categoria, modello } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  const product = getProduct(categoria, modello);
  const category = getCategory(categoria);
  if (!product || !category) notFound();

  const t = getT(lang);
  const name = productDisplayName(product, lang);
  const description = productDescription(product, lang);
  const quoteHref = localizePath(
    `/contatti?topic=preventivo&prodotto=${encodeURIComponent(product.title ? product.title[lang] : product.name)}`,
    lang
  );
  const cell = (value: string | Record<Lang, string>) => {
    const text = localized(value, lang);
    return text.startsWith('prodotti.') ? t(text) : text;
  };

  const related = product.related
    .map((ref) => resolveRef(ref))
    .filter((r): r is NonNullable<ReturnType<typeof resolveRef>> => Boolean(r));

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(product.title ? {} : { sku: product.name, model: product.name }),
    description,
    image: `${SITE_URL}${product.image}`,
    url: `${SITE_URL}${localizePath(productPath(product), lang)}`,
    category: category.name[lang],
    brand: { '@type': 'Brand', name: 'Fratelli Pozzi' },
    ...(product.madeInItaly
      ? { manufacturer: { '@id': `${SITE_URL}/#organization` }, countryOfOrigin: 'IT' }
      : {}),
    additionalProperty: product.specs.map((s) => ({
      '@type': 'PropertyValue',
      name: SPEC_LABELS[s.label][lang],
      value: localized(s.value, lang),
    })),
  };

  return (
    <>
      <Header />
      <main className={styles.page}>
        <Breadcrumbs
          items={[
            { name: UI.home[lang], href: localizePath('/', lang) },
            { name: UI.products[lang], href: localizePath('/prodotti', lang) },
            { name: category.name[lang], href: localizePath(categoryPath(category.slug), lang) },
            { name: product.title ? product.title[lang] : product.name },
          ]}
        />

        <section className={`${styles.wrap} ${styles.pd}`}>
          <div className={styles.gallery}>
            <Image
              src={product.image}
              alt={name}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 560px"
              style={{ objectFit: 'contain', padding: '28px' }}
            />
          </div>

          <div>
            <p className={styles.eyebrow}>{category.name[lang]}</p>
            {product.madeInItaly && (
              <p className={styles.badge} style={{ marginBottom: 10 }}>
                <span className={styles.flag} aria-hidden="true" />
                {UI.madeIn[lang]}
              </p>
            )}
            <h1 className={`${styles.h1} font-heading font-bold`}>{name}</h1>
            <p className={styles.lead}>{description}</p>

            <dl className={styles.spec} aria-label={UI.specs[lang]}>
              {product.specs.map((s) => (
                <div key={s.label} style={{ display: 'contents' }}>
                  <dt>{SPEC_LABELS[s.label][lang]}</dt>
                  <dd>{localized(s.value, lang)}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.ctaRow}>
              <Link href={quoteHref} className={`${styles.btn} ${styles.btnPrimary}`}>
                {product.title ? UI.quote[lang] : `${UI.quoteFor[lang]} ${product.name}`}
              </Link>
              <a href="tel:+390363350380" className={`${styles.btn} ${styles.btnOutline}`}>
                {UI.call[lang]}
              </a>
            </div>
            <p className={styles.note}>
              {UI.dealer[lang]} <Link href={localizePath('/diventa-rivenditore', lang)}>{UI.dealerLink[lang]}</Link>
            </p>
            <p className={styles.note}>
              <Link href={localizePath('/assistenza-ricambi', lang)}>{UI.service[lang]}</Link>
            </p>
          </div>
        </section>

        {product.tables?.map((table, ti) => (
          <section key={ti} className={`${styles.section} ${styles.sectionAlt}`}>
            <div className={styles.wrap}>
              <h2 className={`${styles.h2} font-heading font-bold`}>
                {table.title ? table.title[lang] : UI.sizes[lang]}
              </h2>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {table.head.map((h, i) => (
                        <th key={i} scope="col">
                          {cell(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((c, ci) => (
                          <td key={ci}>{cell(c)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}

        <section className={styles.section}>
          <div className={`${styles.wrap} ${category.faq.length ? styles.two : ''}`}>
            <div className={styles.prose}>
              <h2 className={`${styles.h2} font-heading font-bold`}>{UI.description[lang]}</h2>
              <p>{category.intro[lang]}</p>
              <p>{category.body[lang]}</p>
            </div>
            {category.faq.length > 0 && (
              <div>
                <h2 className={`${styles.h2} font-heading font-bold`}>{UI.faq[lang]}</h2>
                <div className={styles.faq}>
                  {category.faq.map((f, i) => (
                    <details key={i} open={i === 0}>
                      <summary>{f.q[lang]}</summary>
                      <p>{f.a[lang]}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className={styles.wrap}>
              <h2 className={`${styles.h2} font-heading font-bold`}>{UI.related[lang]}</h2>
              <div className={styles.grid}>
                {related.map((r) =>
                  r.kind === 'product' ? (
                    <ProductCard key={r.product.slug} product={r.product} lang={lang} />
                  ) : (
                    <Link
                      key={r.category.slug}
                      href={localizePath(categoryPath(r.category.slug), lang)}
                      className={styles.card}
                    >
                      <div className={styles.cardImg}>
                        <Image
                          src={r.category.image}
                          alt={r.category.imageAlt[lang]}
                          fill
                          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px"
                          style={{ objectFit: 'contain', padding: '14px' }}
                        />
                      </div>
                      <div className={styles.cardBody}>
                        <h3 className={`${styles.cardTitle} font-heading font-bold`}>{r.category.name[lang]}</h3>
                        <span className={styles.cardGo}>{UI.viewCategory[lang]}</span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </section>
        )}

        <CtaBand lang={lang} product={product.title ? product.title[lang] : product.name} />
        <JsonLd data={productLd} />
      </main>
      <Footer />
    </>
  );
}
