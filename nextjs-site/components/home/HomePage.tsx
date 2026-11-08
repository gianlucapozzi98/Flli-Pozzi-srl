'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PhoneIcon, WrenchScrewdriverIcon, CogIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Finder, { type FinderItem } from './Finder';
import { useLanguage } from '@/contexts/LanguageContext';
import { HOME } from '@/lib/home-content';
import type { Material } from '@/lib/catalog';
import styles from './home.module.css';

export type HomeCategory = {
  slug: string;
  name: string;
  spec: string;
  image: string;
  alt: string;
  materials: Material[];
  count: number;
  href: string;
};

export type HomeProduct = { name: string; short: string; image: string; href: string };

type Props = {
  categories: HomeCategory[];
  finderItems: FinderItem[];
  madeProducts: HomeProduct[];
};

const SERVICE_ICONS = [WrenchScrewdriverIcon, CogIcon, DocumentTextIcon];

export default function HomePage({ categories, finderItems, madeProducts }: Props) {
  const { t, lp, language } = useLanguage();
  const [material, setMaterial] = useState<Material | 'all'>('all');
  const L = <T extends Record<string, string>>(v: T) => v[language];

  const chips: { v: Material | 'all'; label: string }[] = [
    { v: 'all', label: L(HOME.chipAll) },
    { v: 'pp', label: 'PP' },
    { v: 'pet', label: 'PET' },
    { v: 'acc', label: L(HOME.chipSteel) },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Apertura */}
        <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
          <motion.div
            initial={{ scale: 1.26 }}
            animate={{ scale: 1.045 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/Immagini/stabilimento-fratelli-pozzi-caravaggio.png"
              alt="Stabilimento Fratelli Pozzi a Caravaggio (BG)"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ opacity: 0.8, objectPosition: 'left center' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 text-center text-white px-6 lg:px-4" style={{ paddingBottom: '110px', width: '100%' }}>
            {/* Margini inline: il reset globale `* { margin: 0 }` in globals.css non è in un layer e vince sulle utility Tailwind */}
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-white/85 text-balance" style={{ marginBottom: '16px' }}>
              {t('home.hero.eyebrow')}
            </p>
            {/* Contenuti dell'apertura visibili da subito: niente opacity 0 (LCP e SEO) */}
            <h1
              className="text-[32px] leading-[1.08] md:text-5xl lg:text-[56px] font-black font-heading uppercase tracking-tight max-w-5xl text-balance"
              style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              {t('home.hero.title')}
            </h1>
            <p className="text-base md:text-xl lg:text-2xl font-light uppercase tracking-wide">{t('home.hero.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center" style={{ marginTop: '32px' }}>
              <Link
                href={lp('/contatti?topic=preventivo')}
                className="inline-flex items-center justify-center bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-lg w-full sm:w-auto"
                style={{ paddingLeft: '28px', paddingRight: '28px', paddingTop: '14px', paddingBottom: '14px' }}
              >
                {t('home.hero.cta.quote')}
              </Link>
              <a
                href="tel:+390363350380"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-secondary transition-colors w-full sm:w-auto"
                style={{ paddingLeft: '26px', paddingRight: '26px', paddingTop: '12px', paddingBottom: '12px' }}
              >
                <PhoneIcon className="h-5 w-5" aria-hidden="true" />
                {t('cta.call')} +39 0363 350380
              </a>
            </div>
          </div>
        </section>

        {/* Prove concrete */}
        <section className={styles.proof} aria-label="Fratelli Pozzi">
          <ul className={`${styles.wrap} ${styles.proofList}`}>
            {HOME.proof.map((p) => (
              <li key={p.big.it}>
                <b className="font-heading">{L(p.big)}</b>
                <span>{L(p.label)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Categorie per tipo di reggia */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <div>
                <h2 className={`${styles.h2} font-heading font-bold`}>{L(HOME.catTitle)}</h2>
                <p className={styles.sub}>{L(HOME.catText)}</p>
              </div>
              <div className={styles.chips} role="group" aria-label={L(HOME.filterLabel)}>
                {chips.map((c) => (
                  <button
                    key={c.v}
                    type="button"
                    aria-pressed={material === c.v}
                    onClick={() => setMaterial(c.v)}
                    className={styles.chip}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.cats}>
              {categories.map((c) => {
                const active = material === 'all' || c.materials.includes(material);
                return (
                  <Link key={c.slug} href={c.href} className={`${styles.cat} ${active ? '' : styles.dim}`} aria-hidden={!active || undefined} tabIndex={active ? undefined : -1}>
                    <div className={styles.catImg}>
                      <Image src={c.image} alt={c.alt} fill sizes="(max-width: 640px) 40vw, (max-width: 1024px) 45vw, 360px" style={{ objectFit: 'contain', padding: '12px' }} />
                    </div>
                    <div className={styles.catBody}>
                      <h3 className="font-heading font-bold">{c.name}</h3>
                      <p>{c.spec}</p>
                      <span className={styles.go}>
                        {c.count > 0
                          ? `${c.count} ${['reggia', 'sigilli'].includes(c.slug) ? L(HOME.items) : L(HOME.models)} →`
                          : L(HOME.view)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className={styles.links}>
              <Link href={lp('/prodotti')}>{L(HOME.catalogLink)}</Link>
              <Link href={lp('/prodotti/accessori-imballaggio')}>{L(HOME.accessoriesLink)}</Link>
            </div>
          </div>
        </section>

        {/* Selettore guidato */}
        <Finder items={finderItems} />

        {/* Prodotti a Caravaggio */}
        <section className={`${styles.section} ${styles.alt}`}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <div>
                <h2 className={`${styles.h2} font-heading font-bold`}>{L(HOME.madeTitle)}</h2>
                <p className={styles.sub}>{L(HOME.madeText)}</p>
              </div>
              <span className={styles.badge}>
                <span className={styles.flag} aria-hidden="true" />
                {L(HOME.madeBadge)}
              </span>
            </div>
            <div className={styles.made}>
              {madeProducts.map((p) => (
                <Link key={p.name} href={p.href} className={styles.prod}>
                  <div className={styles.prodImg}>
                    <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 40vw, 360px" style={{ objectFit: 'contain', padding: '20px' }} />
                  </div>
                  <div className={styles.prodBody}>
                    <h3 className="font-heading font-bold">{p.name}</h3>
                    <p>{p.short}</p>
                    <span className={styles.go}>{L(HOME.details)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Confronto con l'import */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <div>
                <h2 className={`${styles.h2} font-heading font-bold`}>{L(HOME.compareTitle)}</h2>
                <p className={styles.sub}>{L(HOME.compareText)}</p>
              </div>
            </div>
            <div className={styles.cmpWrap}>
              <table className={styles.cmp}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">—</span>
                    </th>
                    <th scope="col">Fratelli Pozzi</th>
                    <th scope="col">{L(HOME.compareThem)}</th>
                  </tr>
                </thead>
                <tbody>
                  {HOME.compareRows.map((r) => (
                    <tr key={r.k.it}>
                      <th scope="row">{L(r.k)}</th>
                      <td>{L(r.us)}</td>
                      <td>{L(r.them)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Assistenza */}
        <section className={styles.service}>
          <div className={`${styles.wrap} ${styles.serviceGrid}`}>
            <div>
              <h2 className={`${styles.h2} font-heading font-bold`}>{L(HOME.serviceTitle)}</h2>
              <p>{L(HOME.serviceText)}</p>
              <div className={styles.row}>
                <Link href={lp('/assistenza-ricambi')} className={`${styles.btn} ${styles.btnWhite}`}>
                  {L(HOME.serviceBtn)}
                </Link>
                <a href="tel:+390363350380" className={`${styles.btn} ${styles.btnLine}`}>
                  {t('cta.call')} 0363 350380
                </a>
              </div>
            </div>
            <ul className={styles.serviceList}>
              {HOME.serviceItems.map((s, i) => {
                const Icon = SERVICE_ICONS[i];
                return (
                  <li key={s.t.it}>
                    <Icon className={styles.serviceIcon} aria-hidden="true" />
                    <div>
                      <b className="font-heading">{L(s.t)}</b>
                      <span>{L(s.d)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Settori */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <h2 className={`${styles.h2} font-heading font-bold`} style={{ marginBottom: 24 }}>
              {L(HOME.sectorsTitle)}
            </h2>
            <div className={styles.sectors}>
              {HOME.sectors.map((s) => (
                <div key={s.t.it}>
                  <b className="font-heading">{L(s.t)}</b>
                  <span>{L(s.d)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Storia */}
        <section className={`${styles.section} ${styles.alt}`}>
          <div className={`${styles.wrap} ${styles.heritage}`}>
            <figure>
              <Image
                src="/Immagini/fratelli-pozzi-foto-storica-1949.jpg"
                alt={L(HOME.heritageCaption)}
                width={620}
                height={800}
                sizes="(max-width: 900px) 100vw, 420px"
              />
              <figcaption>{L(HOME.heritageCaption)}</figcaption>
            </figure>
            <div>
              <p className={styles.eyebrow}>1947 → 2027</p>
              <h2 className={`${styles.h2} font-heading font-bold`}>{L(HOME.heritageTitle)}</h2>
              <p className={styles.sub}>{L(HOME.heritageText)}</p>
              <p className={`${styles.years} font-heading`}>80</p>
              <Link href={lp('/azienda')} className={styles.textLink}>
                {L(HOME.heritageLink)}
              </Link>
            </div>
          </div>
        </section>

        {/* Chiusura */}
        <section className={styles.final}>
          <div className={`${styles.wrap} ${styles.finalGrid}`}>
            <div>
              <h2 className={`${styles.h2} font-heading font-bold`}>{L(HOME.finalTitle)}</h2>
              <p>{L(HOME.finalText)}</p>
              <p className={`${styles.phone} font-heading`}>
                <a href="tel:+390363350380">+39 0363 350380</a>
              </p>
            </div>
            <div className={styles.finalBtns}>
              <Link href={lp('/contatti?topic=preventivo')} className={`${styles.btn} ${styles.btnRed}`}>
                {L(HOME.finalQuote)}
              </Link>
              <Link href={lp('/ordine-rapido')} className={`${styles.btn} ${styles.btnDark}`}>
                {L(HOME.finalReorder)}
              </Link>
              <Link href={lp('/diventa-rivenditore')} className={`${styles.btn} ${styles.btnDark}`}>
                {t('nav.reseller')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
