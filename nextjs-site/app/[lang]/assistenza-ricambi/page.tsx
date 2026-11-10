import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/catalog/Breadcrumbs';
import CtaBand from '@/components/catalog/CtaBand';
import JsonLd from '@/components/catalog/JsonLd';
import styles from '@/components/catalog/catalog.module.css';
import { CATEGORIES, categoryPath, type L } from '@/lib/catalog';
import { UI } from '@/lib/catalog-ui';
import { DEFAULT_LANG, isLang, localizePath } from '@/lib/i18n';
import { pageMetadata, SITE_URL } from '@/lib/seo';

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata('assistenza-ricambi', '/assistenza-ricambi', isLang(lang) ? lang : DEFAULT_LANG);
}

const TXT = {
  crumb: { it: 'Assistenza e ricambi', en: 'Service and spare parts', fr: 'Assistance et pièces' },
  eyebrow: { it: 'Assistenza tecnica · Caravaggio (BG)', en: 'Technical service · Caravaggio (Italy)', fr: 'Assistance technique · Caravaggio (Italie)' },
  h1: {
    it: 'Assistenza e ricambi per reggiatrici e tendireggia',
    en: 'Service and spare parts for strapping tools and tensioners',
    fr: 'Assistance et pièces pour cercleuses et tendeurs',
  },
  lead: {
    it: 'Ripariamo le vostre reggiatrici manuali, a batteria e pneumatiche nel nostro stabilimento di Caravaggio. Nel minor tempo possibile.',
    en: 'We repair your manual, battery and pneumatic strapping tools at our Caravaggio facility. As quickly as possible.',
    fr: 'Nous réparons vos cercleuses manuelles, à batterie et pneumatiques dans notre site de Caravaggio. Dans les plus brefs délais.',
  },
  /** Descrizione completa del servizio per i dati strutturati (non visibile) */
  serviceDesc: {
    it: 'Ripariamo e manuteniamo reggiatrici manuali, a batteria e pneumatiche di ogni marca nel nostro stabilimento di Caravaggio. Forniamo ricambi originali, documentazione tecnica e formazione per il vostro personale.',
    en: 'We repair and maintain manual, battery and pneumatic strapping tools of any brand at our Caravaggio facility. We supply original spare parts, technical documentation and training for your staff.',
    fr: 'Nous réparons et entretenons des cercleuses manuelles, à batterie et pneumatiques de toutes marques dans notre site de Caravaggio. Nous fournissons pièces d’origine, documentation technique et formation de votre personnel.',
  },
  request: { it: 'Richiedi assistenza', en: 'Request service', fr: 'Demander une intervention' },
  servicesTitle: { it: 'Cosa facciamo', en: 'What we do', fr: 'Ce que nous faisons' },
  stepsTitle: { it: 'Come funziona', en: 'How it works', fr: 'Comment ça marche' },
  where: {
    it: 'Siamo in Via L. Da Vinci 37 a Caravaggio, in provincia di Bergamo, facilmente raggiungibili da Milano, Brescia e Cremona.',
    en: 'We are at Via L. Da Vinci 37 in Caravaggio, province of Bergamo, easily reached from Milan, Brescia and Cremona.',
    fr: 'Nous sommes Via L. Da Vinci 37 à Caravaggio, province de Bergame, facilement accessibles depuis Milan, Brescia et Crémone.',
  },
  catsTitle: { it: 'Ricambi per', en: 'Spare parts for', fr: 'Pièces pour' },
} satisfies Record<string, L>;

const SERVICES: { t: L; d: L }[] = [
  {
    t: { it: 'Riparazione', en: 'Repair', fr: 'Réparation' },
    d: {
      it: 'Diagnosi e riparazione di reggiatrici e tendireggia, anche di altre marche.',
      en: 'Diagnosis and repair of strapping tools and tensioners, including other brands.',
      fr: 'Diagnostic et réparation de cercleuses et tendeurs, y compris d’autres marques.',
    },
  },
  {
    t: { it: 'Manutenzione programmata', en: 'Scheduled maintenance', fr: 'Maintenance programmée' },
    d: {
      it: 'Interventi rapidi e controlli periodici su tutte le macchine e i prodotti che commercializziamo.',
      en: 'Fast response and periodic checks on all the machines and products we sell.',
      fr: 'Interventions rapides et contrôles périodiques sur toutes les machines et produits que nous commercialisons.',
    },
  },
  {
    t: { it: 'Ricambi originali', en: 'Original spare parts', fr: 'Pièces d’origine' },
    d: {
      it: 'Per mantenere le prestazioni nel tempo, anche in ambienti di lavoro ad alta intensità.',
      en: 'To keep performance over time, even in high-intensity working environments.',
      fr: 'Pour garder les performances dans le temps, même dans des environnements de travail intensifs.',
    },
  },
  {
    t: { it: 'Documentazione e formazione', en: 'Documentation and training', fr: 'Documentation et formation' },
    d: {
      it: 'Manuali, lista ricambi e certificazioni; formazione al personale addetto alla manutenzione, nel rispetto delle normative vigenti.',
      en: 'Manuals, spare parts lists and certifications; training for maintenance staff in line with current regulations.',
      fr: 'Manuels, listes de pièces et certifications ; formation du personnel de maintenance selon les normes en vigueur.',
    },
  },
];

const STEPS: L[] = [
  {
    it: 'Descrivi modello dell’utensile e problema, al telefono o con il modulo.',
    en: 'Describe the tool model and the problem, by phone or using the form.',
    fr: 'Décrivez le modèle de l’outil et le problème, par téléphone ou via le formulaire.',
  },
  {
    it: 'Ti diciamo come procedere (ricambio, revisione o riparazione) e con quali tempi.',
    en: 'We tell you how to proceed (spare part, overhaul or repair) and the lead time.',
    fr: 'Nous vous indiquons la marche à suivre (pièce, révision ou réparation) et les délais.',
  },
  {
    it: 'Interveniamo e ti riconsegniamo l’utensile funzionante, con la documentazione.',
    en: 'We carry out the work and return the tool in working order, with documentation.',
    fr: 'Nous intervenons et vous rendons l’outil en état de marche, avec la documentation.',
  },
];

const FAQ: { q: L; a: L }[] = [
  {
    q: { it: 'Riparate anche reggiatrici di altre marche?', en: 'Do you repair other brands of strapping tools?', fr: 'Réparez-vous les cercleuses d’autres marques ?' },
    a: {
      it: 'Sì: nel nostro stabilimento facciamo assistenza tecnica su ogni tipo di reggiatrice.',
      en: 'Yes: at our facility we provide technical service for every type of strapping tool.',
      fr: 'Oui : dans notre site, nous assurons l’assistance technique de tout type de cercleuse.',
    },
  },
  {
    q: { it: 'Come richiedo un ricambio?', en: 'How do I order a spare part?', fr: 'Comment commander une pièce ?' },
    a: {
      it: 'Indica il modello dell’utensile e, se lo conosci, il codice del ricambio: ti confermiamo disponibilità e condizioni.',
      en: 'Give us the tool model and, if you know it, the spare part code: we confirm availability and terms.',
      fr: 'Indiquez le modèle de l’outil et, si vous le connaissez, la référence de la pièce : nous confirmons disponibilité et conditions.',
    },
  },
  {
    q: { it: 'Dove si trova il centro assistenza?', en: 'Where is the service centre?', fr: 'Où se trouve le centre d’assistance ?' },
    a: {
      it: 'Nello stabilimento Fratelli Pozzi, Via L. Da Vinci 37, 24043 Caravaggio (BG).',
      en: 'At the Fratelli Pozzi facility, Via L. Da Vinci 37, 24043 Caravaggio (BG), Italy.',
      fr: 'Dans le site Fratelli Pozzi, Via L. Da Vinci 37, 24043 Caravaggio (BG), Italie.',
    },
  },
];

export default async function AssistenzaPage({ params }: Params) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  const requestHref = localizePath('/contatti?topic=assistenza', lang);
  const toolCategories = CATEGORIES.filter((c) =>
    ['tendireggia-manuali', 'reggiatrici-a-batteria', 'reggiatrici-pneumatiche', 'carrelli-porta-reggia'].includes(c.slug)
  );

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: TXT.h1[lang],
    serviceType: TXT.crumb[lang],
    description: TXT.serviceDesc[lang],
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [{ '@type': 'Country', name: 'Italy' }],
    url: `${SITE_URL}${localizePath('/assistenza-ricambi', lang)}`,
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q[lang], acceptedAnswer: { '@type': 'Answer', text: f.a[lang] } })),
  };

  return (
    <>
      <Header />
      <main className={styles.page}>
        <Breadcrumbs items={[{ name: UI.home[lang], href: localizePath('/', lang) }, { name: TXT.crumb[lang] }]} />

        <section className={styles.catHero}>
          <div className={`${styles.wrap} ${styles.catHeroGrid}`}>
            <div>
              <p className={styles.eyebrow}>{TXT.eyebrow[lang]}</p>
              <h1 className={`${styles.h1} font-heading font-bold`}>{TXT.h1[lang]}</h1>
              <p className={styles.lead}>{TXT.lead[lang]}</p>
              <div className={styles.ctaRow}>
                <Link href={requestHref} className={`${styles.btn} ${styles.btnPrimary}`}>
                  {TXT.request[lang]}
                </Link>
                <a href="tel:+390363350380" className={`${styles.btn} ${styles.btnOutline}`}>
                  {UI.call[lang]}
                </a>
              </div>
            </div>
            <div className={styles.catHeroImg}>
              <Image
                src="/Immagini/stabilimento-fratelli-pozzi-caravaggio.png"
                alt="Stabilimento Fratelli Pozzi, Caravaggio (BG)"
                fill
                preload
                fetchPriority="high"
                sizes="(max-width: 900px) 100vw, 480px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <h2 className={`${styles.h2} font-heading font-bold`}>{TXT.servicesTitle[lang]}</h2>
            <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              {SERVICES.map((s) => (
                <div key={s.t.it} className={styles.card}>
                  <div className={styles.cardBody}>
                    <h3 className={`${styles.cardTitle} font-heading font-bold`}>{s.t[lang]}</h3>
                    <p className={styles.cardText}>
                      {s.d[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={`${styles.wrap} ${styles.two}`}>
            <div className={styles.prose}>
              <h2 className={`${styles.h2} font-heading font-bold`}>{TXT.stepsTitle[lang]}</h2>
              <ol style={{ display: 'grid', gap: 14, paddingLeft: 22 }}>
                {STEPS.map((s, i) => (
                  <li key={i} style={{ fontSize: 17, lineHeight: 1.6, color: '#444' }}>
                    {s[lang]}
                  </li>
                ))}
              </ol>
              <p style={{ marginTop: 20 }}>{TXT.where[lang]}</p>
            </div>
            <div>
              <h2 className={`${styles.h2} font-heading font-bold`}>{UI.faq[lang]}</h2>
              <div className={styles.faq}>
                {FAQ.map((f, i) => (
                  <details key={i} open={i === 0}>
                    <summary>{f.q[lang]}</summary>
                    <p>{f.a[lang]}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <h2 className={`${styles.h2} font-heading font-bold`}>{TXT.catsTitle[lang]}</h2>
            <div className={styles.chips}>
              {toolCategories.map((c) => (
                <Link key={c.slug} href={localizePath(categoryPath(c.slug), lang)} className={styles.chip}>
                  {c.name[lang]}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CtaBand lang={lang} />
        <JsonLd data={serviceLd} />
        <JsonLd data={faqLd} />
      </main>
      <Footer />
    </>
  );
}
