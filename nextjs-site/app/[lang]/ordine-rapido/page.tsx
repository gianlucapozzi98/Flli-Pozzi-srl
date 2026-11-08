import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import QuickOrderForm from '@/components/QuickOrderForm';
import styles from '@/components/catalog/catalog.module.css';
import type { L } from '@/lib/catalog';
import { UI } from '@/lib/catalog-ui';
import { DEFAULT_LANG, isLang, localizePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata('ordine-rapido', '/ordine-rapido', isLang(lang) ? lang : DEFAULT_LANG);
}

const TXT = {
  crumb: { it: 'Ordine rapido', en: 'Quick reorder', fr: 'Commande rapide' },
  eyebrow: { it: 'Consumabili per la reggiatura', en: 'Strapping consumables', fr: 'Consommables de cerclage' },
  h1: { it: 'Ordine rapido di reggia e sigilli', en: 'Quick reorder of strapping and seals', fr: 'Commande rapide de feuillards et chapes' },
  lead: {
    it: 'Per chi riordina consumabili: indica articolo, misura e quantità. Il nostro ufficio commerciale ti conferma disponibilità, tempi di consegna e condizioni prima di procedere.',
    en: 'For repeat orders of consumables: enter item, size and quantity. Our sales office confirms availability, delivery times and terms before going ahead.',
    fr: 'Pour vos réassorts de consommables : indiquez article, dimension et quantité. Notre service commercial confirme disponibilité, délais et conditions avant de lancer la commande.',
  },
  noPay: {
    it: 'Nessun pagamento online: riceverai una conferma d’ordine dal nostro ufficio commerciale.',
    en: 'No online payment: you will receive an order confirmation from our sales office.',
    fr: 'Pas de paiement en ligne : vous recevrez une confirmation de commande de notre service commercial.',
  },
  codesTitle: { it: 'Misure e codici', en: 'Sizes and codes', fr: 'Dimensions et références' },
  codesText: {
    it: 'Trovi misure, resistenze e confezioni nelle schede:',
    en: 'You will find sizes, strength and pack quantities on the product pages:',
    fr: 'Retrouvez dimensions, résistances et conditionnements dans les fiches :',
  },
} satisfies Record<string, L>;

const CODE_LINKS: { href: string; label: L }[] = [
  { href: '/prodotti/reggia/reggia-polipropilene', label: { it: 'Reggia in polipropilene', en: 'Polypropylene strapping', fr: 'Feuillard polypropylène' } },
  { href: '/prodotti/reggia/reggia-poliestere', label: { it: 'Reggia in poliestere', en: 'Polyester strapping', fr: 'Feuillard polyester' } },
  { href: '/prodotti/reggia/reggia-acciaio', label: { it: 'Reggia in acciaio', en: 'Steel strapping', fr: 'Feuillard acier' } },
  { href: '/prodotti/sigilli/sigilli-reggia-plastica', label: { it: 'Sigilli per reggia in plastica', en: 'Seals for plastic strap', fr: 'Chapes pour feuillard plastique' } },
  { href: '/prodotti/sigilli/sigilli-reggia-acciaio', label: { it: 'Sigilli overlap per acciaio', en: 'Overlap seals for steel', fr: 'Chapes overlap pour acier' } },
];

export default async function OrdineRapidoPage({ params }: Params) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  return (
    <>
      <Header />
      <main className={styles.page}>
        <Breadcrumbs items={[{ name: UI.home[lang], href: localizePath('/', lang) }, { name: TXT.crumb[lang] }]} />
        <section className={styles.catHero}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{TXT.eyebrow[lang]}</p>
            <h1 className={`${styles.h1} font-heading font-bold`}>{TXT.h1[lang]}</h1>
            <p className={styles.lead}>{TXT.lead[lang]}</p>
          </div>
        </section>
        <section className={styles.section}>
          <div className={`${styles.wrap} ${styles.twoWide}`}>
            <QuickOrderForm />
            <aside className={styles.prose}>
              <h2 className={`${styles.h2} font-heading font-bold`}>{TXT.codesTitle[lang]}</h2>
              <p>{TXT.codesText[lang]}</p>
              <ul style={{ display: 'grid', gap: 10, marginTop: 14, listStyle: 'none' }}>
                {CODE_LINKS.map((c) => (
                  <li key={c.href}>
                    <Link href={localizePath(c.href, lang)} className={styles.chip} style={{ display: 'inline-block' }}>
                      {c.label[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={styles.note} style={{ marginTop: 20 }}>
                {TXT.noPay[lang]}
              </p>
              <p className={styles.note}>
                {UI.techQuestions[lang]} <a href="tel:+390363350380">+39 0363 350380</a>
              </p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
