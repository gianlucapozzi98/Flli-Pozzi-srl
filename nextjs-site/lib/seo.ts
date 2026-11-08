/** Costanti e metadati SEO condivisi — Fratelli Pozzi, Caravaggio, dal 1947 */
import type { Metadata } from 'next';
import { LANGS, OG_LOCALE, languageAlternates, localizePath, type Lang } from './i18n';

export const SITE_URL = 'https://www.fllipozzi.it';

export const SITE_NAME = 'Fratelli Pozzi';
export const SITE_TAGLINE = 'Fratelli Pozzi — Caravaggio, dal 1947';

/** Immagine di condivisione 1200×630 (foto dello stabilimento) */
export const DEFAULT_OG_IMAGE = '/og/fratelli-pozzi-stabilimento-caravaggio.jpg';

type MetaText = { title: string; description: string };

/**
 * Titoli e descrizioni per pagina e lingua.
 * Il titolo viene completato dal template "%s | Fratelli Pozzi" del layout.
 * Descrizioni sotto i ~155 caratteri, oltre Google le tronca.
 */
export const PAGE_META: Record<string, Record<Lang, MetaText>> = {
  home: {
    it: {
      title: 'Tendireggia e reggiatrici per imballaggio dal 1947',
      description:
        'Fratelli Pozzi, Caravaggio (BG): tendireggia manuali prodotti in Italia, reggiatrici a batteria e pneumatiche, reggia e sigilli. Ricambi e assistenza.',
    },
    en: {
      title: 'Strapping tensioners and tools since 1947',
      description:
        'Fratelli Pozzi, Caravaggio (Italy): manual strapping tensioners made in Italy, battery and pneumatic strapping tools, strapping and seals. Spare parts.',
    },
    fr: {
      title: 'Tendeurs et cercleuses depuis 1947',
      description:
        "Fratelli Pozzi, Caravaggio (Italie) : tendeurs manuels fabriqués en Italie, cercleuses à batterie et pneumatiques, feuillards et chapes. Pièces d'origine.",
    },
  },
  prodotti: {
    it: {
      title: 'Reggiatrici, tendireggia, reggia e sigilli',
      description:
        'Gamma Fratelli Pozzi: tendireggia manuali Made in Italy, reggiatrici a batteria e pneumatiche, sigilli, reggia e accessori per imballaggio industriale.',
    },
    en: {
      title: 'Strapping tools, tensioners, strapping and seals',
      description:
        'Fratelli Pozzi range: manual tensioners made in Italy, battery and pneumatic strapping tools, seals, strapping and accessories for industrial packaging.',
    },
    fr: {
      title: 'Cercleuses, tendeurs, feuillards et chapes',
      description:
        "Gamme Fratelli Pozzi : tendeurs manuels made in Italy, cercleuses à batterie et pneumatiques, chapes, feuillards et accessoires d'emballage industriel.",
    },
  },
  azienda: {
    it: {
      title: "L'azienda — Storia e valori",
      description:
        'Fratelli Pozzi, Caravaggio, dal 1947: storia, valori e produzione Made in Italy di attrezzature per la reggiatura e l’imballaggio industriale.',
    },
    en: {
      title: 'The company — History and values',
      description:
        'Fratelli Pozzi, Caravaggio, since 1947: history, values and Italian production of strapping equipment for industrial packaging.',
    },
    fr: {
      title: "L'entreprise — Histoire et valeurs",
      description:
        "Fratelli Pozzi, Caravaggio, depuis 1947 : histoire, valeurs et production italienne d'équipements de cerclage pour l'emballage industriel.",
    },
  },
  contatti: {
    it: {
      title: 'Contatti e preventivi',
      description:
        'Contatta Fratelli Pozzi a Caravaggio (BG): telefono, email e modulo per preventivi su tendireggia, reggiatrici, reggia e sigilli per imballaggio.',
    },
    en: {
      title: 'Contact and quotes',
      description:
        'Contact Fratelli Pozzi in Caravaggio (Italy): phone, email and quote form for strapping tensioners, strapping tools, strapping and seals.',
    },
    fr: {
      title: 'Contact et devis',
      description:
        'Contactez Fratelli Pozzi à Caravaggio (Italie) : téléphone, e-mail et formulaire de devis pour tendeurs, cercleuses, feuillards et chapes.',
    },
  },
  eventi: {
    it: {
      title: 'Eventi e fiere',
      description:
        'Fiere ed eventi di Fratelli Pozzi: IPACK-IMA, Macfrut e altre manifestazioni internazionali del settore imballaggio.',
    },
    en: {
      title: 'Trade fairs and events',
      description:
        'Fratelli Pozzi at trade fairs: IPACK-IMA, Macfrut and other international packaging industry events.',
    },
    fr: {
      title: 'Salons et événements',
      description:
        "Fratelli Pozzi dans les salons : IPACK-IMA, Macfrut et d'autres manifestations internationales de l'emballage.",
    },
  },
  'diventa-rivenditore': {
    it: {
      title: 'Diventa rivenditore',
      description:
        'Distributori e rivenditori di imballaggio: richiedi a Fratelli Pozzi catalogo B2B, listino riservato e condizioni commerciali dedicate.',
    },
    en: {
      title: 'Become a dealer',
      description:
        'Packaging distributors and dealers: request the Fratelli Pozzi B2B catalogue, reserved price list and dedicated trade terms.',
    },
    fr: {
      title: 'Devenir revendeur',
      description:
        "Distributeurs et revendeurs d'emballage : demandez à Fratelli Pozzi le catalogue B2B, la liste de prix réservée et des conditions dédiées.",
    },
  },
  'assistenza-ricambi': {
    it: {
      title: 'Assistenza e ricambi per reggiatrici',
      description:
        'Riparazione e manutenzione di reggiatrici e tendireggia di ogni marca, ricambi originali e formazione nel nostro stabilimento di Caravaggio (BG).',
    },
    en: {
      title: 'Strapping tool service and spare parts',
      description:
        'Repair and maintenance of strapping tools and tensioners of any brand, original spare parts and training at our Caravaggio (Italy) facility.',
    },
    fr: {
      title: 'Assistance et pièces pour cercleuses',
      description:
        "Réparation et entretien de cercleuses et tendeurs de toutes marques, pièces d'origine et formation dans notre site de Caravaggio (Italie).",
    },
  },
  'ordine-rapido': {
    it: {
      title: 'Ordine rapido di reggia e sigilli',
      description:
        'Riordina reggia, sigilli e consumabili per la reggiatura: indica articolo, misura e quantità, ti confermiamo disponibilità, tempi e condizioni.',
    },
    en: {
      title: 'Quick reorder of strapping and seals',
      description:
        'Reorder strapping, seals and consumables: enter item, size and quantity and we confirm availability, lead times and terms.',
    },
    fr: {
      title: 'Commande rapide de feuillards et chapes',
      description:
        'Recommandez feuillards, chapes et consommables : article, dimension et quantité, nous confirmons disponibilité, délais et conditions.',
    },
  },
  privacy: {
    it: {
      title: 'Privacy Policy',
      description:
        'Informativa sulla privacy di Fratelli Pozzi: come trattiamo i dati personali raccolti tramite il sito e i moduli di contatto.',
    },
    en: {
      title: 'Privacy Policy',
      description:
        'Fratelli Pozzi privacy policy: how we process personal data collected through the website and contact forms.',
    },
    fr: {
      title: 'Politique de confidentialité',
      description:
        'Politique de confidentialité de Fratelli Pozzi : traitement des données personnelles collectées via le site et les formulaires.',
    },
  },
  cookies: {
    it: {
      title: 'Cookie Policy',
      description:
        'Cookie Policy di Fratelli Pozzi: informazioni sui cookie e sulle tecnologie di memorizzazione utilizzate sul sito.',
    },
    en: {
      title: 'Cookie Policy',
      description: 'Fratelli Pozzi cookie policy: cookies and storage technologies used on the website.',
    },
    fr: {
      title: 'Politique cookies',
      description: 'Politique cookies de Fratelli Pozzi : cookies et technologies de stockage utilisés sur le site.',
    },
  },
  grazie: {
    it: { title: 'Richiesta inviata', description: 'Conferma di invio della richiesta a Fratelli Pozzi.' },
    en: { title: 'Request sent', description: 'Confirmation that your request to Fratelli Pozzi has been sent.' },
    fr: { title: 'Demande envoyée', description: 'Confirmation de l’envoi de votre demande à Fratelli Pozzi.' },
  },
};

/**
 * Metadati completi di una pagina: titolo, descrizione, canonical, hreflang,
 * Open Graph e Twitter. `path` è il percorso italiano (es. '/prodotti').
 */
export function buildMetadata(
  text: MetaText,
  path: string,
  lang: Lang,
  opts: { image?: string; noindex?: boolean } = {}
): Metadata {
  const image = opts.image ?? DEFAULT_OG_IMAGE;
  const fullTitle = `${text.title} | ${SITE_NAME}`;
  return {
    title: text.title,
    description: text.description,
    alternates: languageAlternates(path, lang),
    openGraph: {
      title: fullTitle,
      description: text.description,
      url: localizePath(path, lang),
      siteName: SITE_NAME,
      images: [image],
      type: 'website',
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: text.description,
      images: [image],
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function pageMetadata(key: keyof typeof PAGE_META, path: string, lang: Lang, opts?: { noindex?: boolean }) {
  return buildMetadata(PAGE_META[key][lang], path, lang, opts);
}
