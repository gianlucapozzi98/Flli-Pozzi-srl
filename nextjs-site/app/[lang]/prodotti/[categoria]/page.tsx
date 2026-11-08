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
  ACCESSORIES,
  CATEGORIES,
  categoryPath,
  getCategory,
  productDisplayName,
  productPath,
  productsIn,
} from '@/lib/catalog';
import { UI } from '@/lib/catalog-ui';
import { DEFAULT_LANG, isLang, localizePath } from '@/lib/i18n';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { getT } from '@/lib/translations';

type Params = { params: Promise<{ lang: string; categoria: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categoria: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang: raw, categoria } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  const category = getCategory(categoria);
  if (!category) return {};
  return buildMetadata(
    { title: category.metaTitle[lang], description: category.metaDescription[lang] },
    categoryPath(category.slug),
    lang
  );
}

export default async function CategoryPage({ params }: Params) {
  const { lang: raw, categoria } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  const category = getCategory(categoria);
  if (!category) notFound();

  const t = getT(lang);
  const products = productsIn(category.slug);
  const isAccessories = category.slug === 'accessori-imballaggio';
  const quoteHref = localizePath(
    `/contatti?topic=${isAccessories ? 'accessori' : 'preventivo'}&prodotto=${encodeURIComponent(category.name[lang])}`,
    lang
  );

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.h1[lang],
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: productDisplayName(p, lang),
      url: `${SITE_URL}${localizePath(productPath(p), lang)}`,
    })),
  };
  const faqLd =
    category.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: category.faq.map((f) => ({
            '@type': 'Question',
            name: f.q[lang],
            acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
          })),
        }
      : null;

  return (
    <>
      <Header />
      <main className={styles.page}>
        <Breadcrumbs
          items={[
            { name: UI.home[lang], href: localizePath('/', lang) },
            { name: UI.products[lang], href: localizePath('/prodotti', lang) },
            { name: category.name[lang] },
          ]}
        />

        <section className={styles.catHero}>
          <div className={`${styles.wrap} ${styles.catHeroGrid}`}>
            <div>
              <p className={styles.eyebrow}>
                {products.length > 0
                  ? `${products.length} ${['reggia', 'sigilli'].includes(category.slug) ? UI.itemsCount[lang] : UI.modelsCount[lang]} · `
                  : ''}
                Fratelli Pozzi
              </p>
              <h1 className={`${styles.h1} font-heading font-bold`}>{category.h1[lang]}</h1>
              <p className={styles.lead}>{category.intro[lang]}</p>
              <div className={styles.ctaRow}>
                <Link href={quoteHref} className={`${styles.btn} ${styles.btnPrimary}`}>
                  {UI.quote[lang]}
                </Link>
                <a href="tel:+390363350380" className={`${styles.btn} ${styles.btnOutline}`}>
                  {UI.call[lang]}
                </a>
              </div>
            </div>
            <div className={styles.catHeroImg}>
              <Image
                src={category.image}
                alt={category.imageAlt[lang]}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 480px"
                style={{ objectFit: 'contain', padding: '20px' }}
              />
            </div>
          </div>
        </section>

        {products.length > 0 && (
          <section className={styles.section}>
            <div className={styles.wrap}>
              <h2 className={`${styles.h2} font-heading font-bold`}>{UI.models[lang]}</h2>
              <div className={styles.grid}>
                {products.map((p) => (
                  <ProductCard key={p.slug} product={p} lang={lang} />
                ))}
              </div>
            </div>
          </section>
        )}

        {isAccessories && (
          <section className={styles.section}>
            <div className={styles.wrap}>
              <div className={styles.grid}>
                {ACCESSORIES.map((item) => (
                  <div key={item.key} className={styles.card}>
                    <div className={styles.cardImg}>
                      <Image
                        src={item.image}
                        alt={t(`prodotti.accessori.items.${item.key}.name`)}
                        fill
                        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={`${styles.cardTitle} font-heading font-bold`}>
                        {t(`prodotti.accessori.items.${item.key}.name`)}
                      </h3>
                      <p className={styles.cardSpec}>
                        {UI.accessoriesUse[lang]}: {t(`prodotti.accessori.items.${item.key}.use`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.ctaRow}>
                <Link href={quoteHref} className={`${styles.btn} ${styles.btnPrimary}`}>
                  {UI.requestInfo[lang]}
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={`${styles.wrap} ${category.faq.length ? styles.two : ''}`}>
            <div className={styles.prose}>
              <h2 className={`${styles.h2} font-heading font-bold`}>{UI.description[lang]}</h2>
              <p>{category.body[lang]}</p>
              <p className={styles.note}>
                <Link href={localizePath('/assistenza-ricambi', lang)}>{UI.service[lang]}</Link>
              </p>
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

        <section className={styles.section}>
          <div className={styles.wrap}>
            <h2 className={`${styles.h2} font-heading font-bold`}>{UI.otherCategories[lang]}</h2>
            <div className={styles.chips}>
              {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                <Link key={c.slug} href={localizePath(categoryPath(c.slug), lang)} className={styles.chip}>
                  {c.name[lang]}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBand lang={lang} />
        {products.length > 0 && <JsonLd data={itemList} />}
        {faqLd && <JsonLd data={faqLd} />}
      </main>
      <Footer />
    </>
  );
}
