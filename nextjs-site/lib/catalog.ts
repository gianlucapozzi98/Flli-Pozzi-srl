/**
 * Catalogo prodotti: categorie, modelli, specifiche e testi in tre lingue.
 * Fonte dei dati: le schede già pubblicate su /prodotti (descrizioni, tabelle misure).
 * Le descrizioni brevi dei modelli restano in lib/translations.ts (chiavi prodotti.descriptions.*).
 */
import type { Lang } from './i18n';

export type L = Record<Lang, string>;
export type Material = 'pp' | 'pet' | 'acc';
export type Power = 'man' | 'bat' | 'pn';

export type CategorySlug =
  | 'tendireggia-manuali'
  | 'reggiatrici-a-batteria'
  | 'reggiatrici-pneumatiche'
  | 'reggia'
  | 'sigilli'
  | 'carrelli-porta-reggia'
  | 'accessori-imballaggio';

export type Faq = { q: L; a: L };

export type Category = {
  slug: CategorySlug;
  name: L;
  /** Nome al singolare per il titolo delle schede (es. "Tendireggia manuale CP2000") */
  singular?: L;
  h1: L;
  metaTitle: L;
  metaDescription: L;
  intro: L;
  body: L;
  image: string;
  imageAlt: L;
  materials: Material[];
  faq: Faq[];
};

export type SpecRow = { label: keyof typeof SPEC_LABELS; value: string | L };

export type DataTable = {
  title?: L;
  /** Chiavi di traduzione delle intestazioni (lib/translations.ts) oppure testi */
  head: (string | L)[];
  rows: (string | L)[][];
};

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  /** Nome completo per prodotti senza nome-modello (reggia, sigilli) */
  title?: L;
  /** Chiave della descrizione breve in lib/translations.ts */
  descKey?: string;
  description?: L;
  /** Frase breve per titolo SEO e card (es. "reggia PP 9–19 mm") */
  short: L;
  image: string;
  specs: SpecRow[];
  tables?: DataTable[];
  /** Prodotto nello stabilimento di Caravaggio */
  madeInItaly?: boolean;
  related: string[];
  finder?: { materials: Material[]; power: Power; widths: number[] };
};

/* ---------- Etichette e valori ricorrenti ---------- */

export const SPEC_LABELS = {
  strap: { it: 'Tipo di reggia', en: 'Strap type', fr: 'Type de feuillard' },
  width: { it: 'Larghezza reggia', en: 'Strap width', fr: 'Largeur du feuillard' },
  thickness: { it: 'Spessore reggia', en: 'Strap thickness', fr: 'Épaisseur du feuillard' },
  tension: { it: 'Tensione massima', en: 'Maximum tension', fr: 'Tension maximale' },
  seal: { it: 'Sigillo', en: 'Seal', fr: 'Chape' },
  joint: { it: 'Chiusura', en: 'Joint', fr: 'Fermeture' },
  drive: { it: 'Azionamento', en: 'Operation', fr: 'Fonctionnement' },
  tensioning: { it: 'Tensionamento', en: 'Tensioning', fr: 'Mise en tension' },
  battery: { it: 'Batteria', en: 'Battery', fr: 'Batterie' },
  charge: { it: 'Ricarica', en: 'Charging time', fr: 'Temps de recharge' },
  control: { it: 'Comandi', en: 'Controls', fr: 'Commandes' },
  packages: { it: 'Colli', en: 'Packages', fr: 'Colis' },
  weight: { it: 'Peso', en: 'Weight', fr: 'Poids' },
  coil: { it: 'Bobine', en: 'Coils', fr: 'Bobines' },
  core: { it: 'Diametro interno bobina', en: 'Coil core diameter', fr: 'Diamètre intérieur de bobine' },
  equipment: { it: 'Dotazione', en: 'Equipment', fr: 'Équipement' },
  finish: { it: 'Finiture', en: 'Finishes', fr: 'Finitions' },
  custom: { it: 'Personalizzazione', en: 'Customisation', fr: 'Personnalisation' },
  origin: { it: 'Produzione', en: 'Made in', fr: 'Fabrication' },
  spares: { it: 'Ricambi', en: 'Spare parts', fr: 'Pièces détachées' },
} satisfies Record<string, L>;

const V = {
  pp: { it: 'Polipropilene (PP)', en: 'Polypropylene (PP)', fr: 'Polypropylène (PP)' },
  pppet: { it: 'Polipropilene e poliestere (PP / PET)', en: 'Polypropylene and polyester (PP / PET)', fr: 'Polypropylène et polyester (PP / PET)' },
  pet: { it: 'Poliestere (PET)', en: 'Polyester (PET)', fr: 'Polyester (PET)' },
  steel: { it: 'Acciaio', en: 'Steel', fr: 'Acier' },
  manual: { it: 'Manuale', en: 'Manual', fr: 'Manuel' },
  battery: { it: 'A batteria', en: 'Battery powered', fr: 'À batterie' },
  pneumatic: { it: 'Pneumatico (aria compressa)', en: 'Pneumatic (compressed air)', fr: 'Pneumatique (air comprimé)' },
  friction: { it: 'Saldatura a vibrazione, senza sigillo', en: 'Friction (vibration) weld, no seal', fr: 'Soudure par friction, sans chape' },
  sealA: { it: 'Serie A', en: 'A series', fr: 'Série A' },
  sealF: { it: 'Serie F (overlap)', en: 'F series (overlap)', fr: 'Série F (overlap)' },
  sealless: { it: 'Senza sigillo', en: 'Sealless', fr: 'Sans chape' },
  flatRound: { it: 'Piani e tondi', en: 'Flat and round', fr: 'Plats et ronds' },
  flat: { it: 'Piani', en: 'Flat', fr: 'Plats' },
  round: { it: 'Tondi (ideale)', en: 'Round (ideal)', fr: 'Ronds (idéal)' },
  caravaggio: { it: 'Caravaggio (BG), Italia', en: 'Caravaggio (BG), Italy', fr: 'Caravaggio (BG), Italie' },
  spares: { it: 'Originali, disponibili a Caravaggio', en: 'Original, available in Caravaggio', fr: "D'origine, disponibles à Caravaggio" },
  standard: { it: 'Standard', en: 'Standard', fr: 'Standard' },
  special: { it: 'Speciale', en: 'Special', fr: 'Spéciale' },
  fast: { it: 'Veloce', en: 'Fast', fr: 'Rapide' },
  manualTension: { it: 'Manuale, con saldatura a batteria', en: 'Manual, with battery-powered welding', fr: 'Manuelle, avec soudure à batterie' },
  li14: { it: '14 V / 3,0 Ah Li-ion', en: '14 V / 3.0 Ah Li-ion', fr: '14 V / 3,0 Ah Li-ion' },
  li18: { it: '18 V / 3,0 Ah Li-ion', en: '18 V / 3.0 Ah Li-ion', fr: '18 V / 3,0 Ah Li-ion' },
  min15: { it: '15 minuti', en: '15 minutes', fr: '15 minutes' },
  touch: {
    it: 'Touchscreen, tensione programmabile in N, kg e libbre',
    en: 'Touchscreen, tension programmable in N, kg and lb',
    fr: 'Écran tactile, tension programmable en N, kg et livres',
  },
  box: { it: 'Cassetta per tendireggia e sigilli', en: 'Box for tensioner and seals', fr: 'Caisson pour tendeur et chapes' },
  boxBrake: { it: 'Freno e cassetta per tendireggia e sigilli', en: 'Brake and box for tensioner and seals', fr: 'Frein et caisson pour tendeur et chapes' },
  colorBrand: { it: 'Colore e marchio del cliente su richiesta', en: 'Customer colour and logo on request', fr: 'Couleur et logo du client sur demande' },
  brandOnly: { it: 'Marchio del cliente su richiesta', en: 'Customer logo on request', fr: 'Logo du client sur demande' },
} satisfies Record<string, L>;

const spares: SpecRow = { label: 'spares', value: V.spares };

/* ---------- Categorie ---------- */

export const CATEGORIES: Category[] = [
  {
    slug: 'tendireggia-manuali',
    name: { it: 'Tendireggia manuali', en: 'Manual strapping tensioners', fr: 'Tendeurs manuels' },
    singular: { it: 'Tendireggia manuale', en: 'Manual tensioner', fr: 'Tendeur manuel' },
    h1: {
      it: 'Tendireggia manuali per reggia in polipropilene',
      en: 'Manual tensioners for polypropylene strapping',
      fr: 'Tendeurs manuels pour feuillard polypropylène',
    },
    metaTitle: {
      it: 'Tendireggia manuali per reggia PP 9–19 mm',
      en: 'Manual strapping tensioners for PP strap 9–19 mm',
      fr: 'Tendeurs manuels pour feuillard PP 9–19 mm',
    },
    metaDescription: {
      it: 'Tendireggia manuali Made in Italy per reggia in polipropilene da 9 a 19 mm con sigillo serie A: CP2000, BEST e PLR/G. Ricambi originali e assistenza.',
      en: 'Manual strapping tensioners made in Italy for 9–19 mm polypropylene strap with A-series seals: CP2000, BEST and PLR/G. Original spare parts and service.',
      fr: "Tendeurs manuels made in Italy pour feuillard polypropylène 9–19 mm avec chapes série A : CP2000, BEST et PLR/G. Pièces d'origine et assistance.",
    },
    intro: {
      it: 'Progettati e assemblati nel nostro stabilimento di Caravaggio, i tendireggia manuali Fratelli Pozzi lavorano con reggia in polipropilene da 9 a 19 mm e sigilli serie A. Tre modelli, con tensionamento standard, speciale o veloce.',
      en: 'Designed and assembled at our Caravaggio facility, Fratelli Pozzi manual tensioners work with 9 to 19 mm polypropylene strap and A-series seals. Three models, with standard, special or fast tensioning.',
      fr: 'Conçus et assemblés dans notre site de Caravaggio, les tendeurs manuels Fratelli Pozzi fonctionnent avec du feuillard polypropylène de 9 à 19 mm et des chapes série A. Trois modèles, avec mise en tension standard, spéciale ou rapide.',
    },
    body: {
      it: 'Un tendireggia manuale non ha bisogno di batterie né di aria compressa: è il modo più semplice per reggiare colli e bancali in magazzino, in produzione o al banco spedizioni. Poiché li produciamo noi, ricambi e revisioni sono gestiti direttamente a Caravaggio, senza intermediari.',
      en: 'A manual tensioner needs no battery or compressed air: it is the simplest way to strap packages and pallets in the warehouse, on the production line or at the shipping desk. Because we make them ourselves, spare parts and overhauls are handled directly in Caravaggio, with no intermediaries.',
      fr: "Un tendeur manuel ne nécessite ni batterie ni air comprimé : c'est la façon la plus simple de cercler colis et palettes en entrepôt, en production ou au poste d'expédition. Comme nous les fabriquons, pièces et révisions sont gérées directement à Caravaggio, sans intermédiaire.",
    },
    image: '/Immagini/tendireggia-manuale-cp2000.png',
    imageAlt: { it: 'Tendireggia manuale CP2000', en: 'CP2000 manual tensioner', fr: 'Tendeur manuel CP2000' },
    materials: ['pp'],
    faq: [
      {
        q: { it: 'Quali sigilli usano i tendireggia manuali?', en: 'Which seals do the manual tensioners use?', fr: 'Quelles chapes utilisent les tendeurs manuels ?' },
        a: {
          it: 'Sigilli serie A per reggia in polipropilene, disponibili lucidi o zincati, nella larghezza della reggia che usi.',
          en: 'A-series seals for polypropylene strap, available polished or galvanised, in the width of the strap you use.',
          fr: 'Des chapes série A pour feuillard polypropylène, brillantes ou zinguées, dans la largeur du feuillard utilisé.',
        },
      },
      {
        q: { it: 'Che differenza c’è tra CP2000, BEST e PLR/G?', en: 'What is the difference between CP2000, BEST and PLR/G?', fr: 'Quelle différence entre CP2000, BEST et PLR/G ?' },
        a: {
          it: 'Tutti e tre lavorano con reggia in polipropilene da 9 a 19 mm e sigillo serie A. Cambia il tensionamento: standard sulla CP2000, speciale sulla BEST, veloce sulla PLR/G.',
          en: 'All three work with 9–19 mm polypropylene strap and A-series seals. The tensioning differs: standard on the CP2000, special on the BEST, fast on the PLR/G.',
          fr: 'Les trois fonctionnent avec du feuillard polypropylène de 9 à 19 mm et des chapes série A. Seule la mise en tension change : standard sur le CP2000, spéciale sur le BEST, rapide sur le PLR/G.',
        },
      },
      {
        q: { it: 'Fornite ricambi e revisioni?', en: 'Do you supply spare parts and overhauls?', fr: 'Fournissez-vous pièces et révisions ?' },
        a: {
          it: 'Sì. I tendireggia sono prodotti a Caravaggio: ricambi originali e revisioni sono gestiti direttamente da noi.',
          en: 'Yes. The tensioners are made in Caravaggio: original spare parts and overhauls are handled directly by us.',
          fr: 'Oui. Les tendeurs sont fabriqués à Caravaggio : pièces d’origine et révisions sont gérées directement par nous.',
        },
      },
    ],
  },
  {
    slug: 'reggiatrici-a-batteria',
    name: { it: 'Reggiatrici a batteria', en: 'Battery strapping tools', fr: 'Cercleuses à batterie' },
    singular: { it: 'Reggiatrice a batteria', en: 'Battery strapping tool', fr: 'Cercleuse à batterie' },
    h1: {
      it: 'Reggiatrici a batteria per reggia in PP e PET',
      en: 'Battery strapping tools for PP and PET strap',
      fr: 'Cercleuses à batterie pour feuillard PP et PET',
    },
    metaTitle: {
      it: 'Reggiatrici a batteria per reggia PP e PET',
      en: 'Battery strapping tools for PP and PET strap',
      fr: 'Cercleuses à batterie pour feuillard PP et PET',
    },
    metaDescription: {
      it: 'Reggiatrici a batteria per reggia PP e PET da 9 a 25 mm, saldatura a vibrazione, tensione fino a 5000 N: GT SMART+, GT-ONE, GTXTREME, GT MAX, VIPER.',
      en: 'Battery strapping tools for 9–25 mm PP and PET strap, friction welding, tension up to 5000 N: GT SMART+, GT-ONE, GTXTREME, GT MAX, VIPER.',
      fr: 'Cercleuses à batterie pour feuillard PP et PET de 9 à 25 mm, soudure par friction, tension jusqu’à 5000 N : GT SMART+, GT-ONE, GTXTREME, VIPER.',
    },
    intro: {
      it: 'Reggiatrici portatili a batteria con saldatura a vibrazione, per reggia in polipropilene e poliestere da 9 a 25 mm e tensione fino a 5000 N. Per colli piani e tondi.',
      en: 'Portable battery strapping tools with friction (vibration) welding, for 9 to 25 mm polypropylene and polyester strap and tension up to 5000 N. For flat and round packages.',
      fr: 'Cercleuses portatives à batterie avec soudure par friction, pour feuillard polypropylène et polyester de 9 à 25 mm et tension jusqu’à 5000 N. Pour colis plats et ronds.',
    },
    body: {
      it: 'Una reggiatrice a batteria tende e salda la reggia senza sigillo: si lavora più velocemente e con meno fatica rispetto a un tendireggia manuale, senza cavi né aria compressa. Il modello giusto dipende da tipo, larghezza e spessore della reggia e dalla tensione che serve al carico.',
      en: 'A battery strapping tool tensions and welds the strap without a seal: faster and less tiring than a manual tensioner, with no cables or compressed air. The right model depends on strap type, width and thickness and on the tension your load needs.',
      fr: 'Une cercleuse à batterie tend et soude le feuillard sans chape : plus rapide et moins fatigant qu’un tendeur manuel, sans câble ni air comprimé. Le bon modèle dépend du type, de la largeur et de l’épaisseur du feuillard et de la tension nécessaire.',
    },
    image: '/Immagini/reggiatrice-a-batteria-gt-one.png',
    imageAlt: { it: 'Reggiatrice a batteria GT-ONE', en: 'GT-ONE battery strapping tool', fr: 'Cercleuse à batterie GT-ONE' },
    materials: ['pp', 'pet'],
    faq: [
      {
        q: { it: 'Meglio un modello per PP o per PET?', en: 'Should I choose a PP or a PET model?', fr: 'Faut-il un modèle PP ou PET ?' },
        a: {
          it: 'GT SMART+, GT-ONE e CP 007 lavorano sia con polipropilene sia con poliestere. Per reggia in PET larga e tensioni alte ci sono GTXTREME e GT MAX (fino a 5000 N); VIPER è per PET da 9 a 19 mm.',
          en: 'GT SMART+, GT-ONE and CP 007 work with both polypropylene and polyester. For wide PET strap and high tension there are GTXTREME and GT MAX (up to 5000 N); VIPER is for 9–19 mm PET.',
          fr: 'GT SMART+, GT-ONE et CP 007 fonctionnent avec polypropylène et polyester. Pour le PET large et les tensions élevées : GTXTREME et GT MAX (jusqu’à 5000 N) ; VIPER est prévue pour le PET de 9 à 19 mm.',
        },
      },
      {
        q: { it: 'Quanto dura la ricarica della batteria?', en: 'How long does the battery take to charge?', fr: 'Combien de temps dure la recharge ?' },
        a: {
          it: 'I modelli con batteria 14 V / 3,0 Ah Li-ion si ricaricano in 15 minuti. VIPER usa una batteria 18 V / 3,0 Ah Li-ion.',
          en: 'Models with the 14 V / 3.0 Ah Li-ion battery recharge in 15 minutes. VIPER uses an 18 V / 3.0 Ah Li-ion battery.',
          fr: 'Les modèles avec batterie 14 V / 3,0 Ah Li-ion se rechargent en 15 minutes. VIPER utilise une batterie 18 V / 3,0 Ah Li-ion.',
        },
      },
      {
        q: { it: 'Fate assistenza sulle reggiatrici a batteria?', en: 'Do you service battery strapping tools?', fr: 'Assurez-vous l’entretien des cercleuses à batterie ?' },
        a: {
          it: 'Sì: assistenza tecnica, manutenzione e ricambi originali nel nostro stabilimento di Caravaggio.',
          en: 'Yes: technical service, maintenance and original spare parts at our Caravaggio facility.',
          fr: 'Oui : assistance technique, entretien et pièces d’origine dans notre site de Caravaggio.',
        },
      },
    ],
  },
  {
    slug: 'reggiatrici-pneumatiche',
    name: { it: 'Reggiatrici pneumatiche', en: 'Pneumatic strapping tools', fr: 'Cercleuses pneumatiques' },
    singular: { it: 'Reggiatrice pneumatica', en: 'Pneumatic strapping tool', fr: 'Cercleuse pneumatique' },
    h1: {
      it: 'Reggiatrici pneumatiche per reggia in plastica e acciaio',
      en: 'Pneumatic strapping tools for plastic and steel strap',
      fr: 'Cercleuses pneumatiques pour feuillard plastique et acier',
    },
    metaTitle: {
      it: 'Reggiatrici pneumatiche per reggia PP, PET e acciaio',
      en: 'Pneumatic strapping tools for PP, PET and steel strap',
      fr: 'Cercleuses pneumatiques pour feuillard PP, PET et acier',
    },
    metaDescription: {
      it: 'Reggiatrici pneumatiche per reggia PP, PET e acciaio da 13 a 32 mm: FAST/PN, FP 13-16-19, FP 19S-25S-32S, FP 32 PLUS, SL3 PN. Ricambi e assistenza.',
      en: 'Pneumatic strapping tools for 13–32 mm PP, PET and steel strap: FAST/PN, FP 13-16-19, FP 19S-25S-32S, FP 32 PLUS, SL3 PN. Spare parts and service.',
      fr: 'Cercleuses pneumatiques pour feuillard PP, PET et acier de 13 à 32 mm : FAST/PN, FP 13-16-19, FP 19S-25S-32S, FP 32 PLUS, SL3 PN. Pièces et assistance.',
    },
    intro: {
      it: 'Reggiatrici ad aria compressa per lavori intensivi: modelli a vibrazione per reggia in PP e PET fino a 32 mm e 6000 N, e modelli per reggia in acciaio da 13 a 32 mm, con o senza sigillo.',
      en: 'Compressed-air strapping tools for heavy-duty work: friction-weld models for PP and PET strap up to 32 mm and 6000 N, and models for 13 to 32 mm steel strap, with or without seal.',
      fr: 'Cercleuses à air comprimé pour un usage intensif : modèles à soudure par friction pour feuillard PP et PET jusqu’à 32 mm et 6000 N, et modèles pour feuillard acier de 13 à 32 mm, avec ou sans chape.',
    },
    body: {
      it: 'Le reggiatrici pneumatiche sono pensate per chi reggia molti colli al giorno e dispone di una linea d’aria compressa: offrono tensioni elevate e cicli rapidi. Per la reggia in acciaio proponiamo modelli con sigillo serie F (overlap) per colli piani e tondi e un modello senza sigillo per colli piani.',
      en: 'Pneumatic strapping tools are designed for those who strap many packages a day and have a compressed-air line: they deliver high tension and fast cycles. For steel strap we offer models with F-series (overlap) seals for flat and round packages and a sealless model for flat packages.',
      fr: 'Les cercleuses pneumatiques sont conçues pour qui cercle de nombreux colis par jour et dispose d’une ligne d’air comprimé : tensions élevées et cycles rapides. Pour le feuillard acier, nous proposons des modèles avec chape série F (overlap) pour colis plats et ronds et un modèle sans chape pour colis plats.',
    },
    image: '/Immagini/reggiatrice-pneumatica-acciaio-fp-19s-25s-32s.png',
    imageAlt: { it: 'Reggiatrice pneumatica FP 19S', en: 'FP 19S pneumatic strapping tool', fr: 'Cercleuse pneumatique FP 19S' },
    materials: ['pp', 'pet', 'acc'],
    faq: [
      {
        q: { it: 'Per l’acciaio meglio con o senza sigillo?', en: 'For steel strap: with or without seal?', fr: 'Pour l’acier : avec ou sans chape ?' },
        a: {
          it: 'Le FP lavorano con sigillo serie F (overlap) e vanno bene per colli piani e tondi. La SL3 PN chiude la reggia senza sigillo su colli piani, con spessore massimo di 0,6 mm.',
          en: 'The FP models use F-series (overlap) seals and suit flat and round packages. The SL3 PN joins the strap without a seal on flat packages, up to 0.6 mm thick.',
          fr: 'Les FP utilisent des chapes série F (overlap) et conviennent aux colis plats et ronds. La SL3 PN ferme le feuillard sans chape sur colis plats, jusqu’à 0,6 mm d’épaisseur.',
        },
      },
      {
        q: { it: 'Serve un compressore?', en: 'Do I need a compressor?', fr: 'Faut-il un compresseur ?' },
        a: {
          it: 'Sì, funzionano ad aria compressa. Se non hai una linea d’aria in reparto, valuta le reggiatrici a batteria.',
          en: 'Yes, they run on compressed air. If you have no air line in the work area, consider the battery strapping tools.',
          fr: 'Oui, elles fonctionnent à l’air comprimé. Sans ligne d’air dans l’atelier, envisagez les cercleuses à batterie.',
        },
      },
      {
        q: { it: 'Fornite ricambi per le reggiatrici pneumatiche?', en: 'Do you supply spare parts for pneumatic tools?', fr: 'Fournissez-vous des pièces pour les cercleuses pneumatiques ?' },
        a: {
          it: 'Sì, ricambi originali e assistenza tecnica nel nostro stabilimento di Caravaggio.',
          en: 'Yes, original spare parts and technical service at our Caravaggio facility.',
          fr: 'Oui, pièces d’origine et assistance technique dans notre site de Caravaggio.',
        },
      },
    ],
  },
  {
    slug: 'reggia',
    name: { it: 'Reggia', en: 'Strapping', fr: 'Feuillard' },
    h1: {
      it: 'Reggia in polipropilene, poliestere e acciaio',
      en: 'Polypropylene, polyester and steel strapping',
      fr: 'Feuillard polypropylène, polyester et acier',
    },
    metaTitle: {
      it: 'Reggia in polipropilene, poliestere e acciaio',
      en: 'Polypropylene, polyester and steel strapping',
      fr: 'Feuillard polypropylène, polyester et acier',
    },
    metaDescription: {
      it: 'Reggia in polipropilene, poliestere (PET) e acciaio: misure, resistenze e lunghezze delle bobine. Colore e marchio del cliente su richiesta.',
      en: 'Polypropylene, polyester (PET) and steel strapping: sizes, breaking strength and coil lengths. Customer colour and logo on request.',
      fr: 'Feuillard polypropylène, polyester (PET) et acier : dimensions, résistances et longueurs de bobine. Couleur et logo du client sur demande.',
    },
    intro: {
      it: 'Reggia in polipropilene (PP) 100% riciclabile, in poliestere (PET) e in acciaio per l’imballaggio industriale. La reggia in plastica è disponibile a richiesta con colore e marchio del cliente.',
      en: '100% recyclable polypropylene (PP), polyester (PET) and steel strapping for industrial packaging. Plastic strapping is available on request in the customer’s colour and with their logo.',
      fr: 'Feuillard polypropylène (PP) 100 % recyclable, polyester (PET) et acier pour l’emballage industriel. Le feuillard plastique est disponible sur demande à la couleur et au logo du client.',
    },
    body: {
      it: 'Il polipropilene è leggero ed economico, adatto a colli e carichi leggeri. Il poliestere offre resistenze molto più alte ed è spesso un’alternativa all’acciaio. L’acciaio resta la scelta per i carichi più pesanti e per i materiali con spigoli vivi.',
      en: 'Polypropylene is light and economical, suited to light packages and loads. Polyester offers much higher strength and is often an alternative to steel. Steel remains the choice for the heaviest loads and for materials with sharp edges.',
      fr: 'Le polypropylène est léger et économique, adapté aux colis et charges légères. Le polyester offre des résistances bien supérieures et remplace souvent l’acier. L’acier reste le choix pour les charges les plus lourdes et les matériaux à arêtes vives.',
    },
    image: '/Immagini/reggia-in-poliestere.png',
    imageAlt: { it: 'Bobine di reggia in poliestere', en: 'Polyester strapping coils', fr: 'Bobines de feuillard polyester' },
    materials: ['pp', 'pet', 'acc'],
    faq: [
      {
        q: { it: 'Si può avere la reggia con il nostro marchio?', en: 'Can we have strapping with our logo?', fr: 'Peut-on avoir un feuillard à notre logo ?' },
        a: {
          it: 'Sì, a richiesta la reggia in plastica è disponibile con colore e marchio del cliente.',
          en: 'Yes, plastic strapping is available on request in your colour and with your logo.',
          fr: 'Oui, le feuillard plastique est disponible sur demande à votre couleur et à votre logo.',
        },
      },
      {
        q: { it: 'Che reggia uso con un tendireggia manuale?', en: 'Which strap do I use with a manual tensioner?', fr: 'Quel feuillard avec un tendeur manuel ?' },
        a: {
          it: 'I tendireggia manuali Fratelli Pozzi lavorano con reggia in polipropilene da 9 a 19 mm e sigilli serie A.',
          en: 'Fratelli Pozzi manual tensioners work with 9–19 mm polypropylene strap and A-series seals.',
          fr: 'Les tendeurs manuels Fratelli Pozzi fonctionnent avec du feuillard polypropylène de 9 à 19 mm et des chapes série A.',
        },
      },
    ],
  },
  {
    slug: 'sigilli',
    name: { it: 'Sigilli', en: 'Seals', fr: 'Chapes' },
    h1: {
      it: 'Sigilli per reggia in plastica e acciaio',
      en: 'Seals for plastic and steel strapping',
      fr: 'Chapes pour feuillard plastique et acier',
    },
    metaTitle: {
      it: 'Sigilli per reggia in plastica e acciaio',
      en: 'Seals for plastic and steel strapping',
      fr: 'Chapes pour feuillard plastique et acier',
    },
    metaDescription: {
      it: 'Sigilli per reggia in plastica (PP, PET) e acciaio: bulinati lucidi, bulinati zincati, zincati e overlap. Misure, confezioni e marchio cliente su richiesta.',
      en: 'Seals for plastic (PP, PET) and steel strapping: embossed polished, embossed galvanised, galvanised and overlap. Sizes, pack quantities, custom logo.',
      fr: 'Chapes pour feuillard plastique (PP, PET) et acier : crantées brillantes ou zinguées, zinguées et overlap. Dimensions, conditionnements, logo client.',
    },
    intro: {
      it: 'Sigilli in acciaio lucido o zincato, con superficie liscia o bulinata, per reggia in plastica (PP e PET) e per reggia in acciaio. A richiesta con il marchio del cliente.',
      en: 'Polished or galvanised steel seals, smooth or embossed, for plastic (PP and PET) and steel strapping. Customer logo available on request.',
      fr: 'Chapes en acier brillant ou zingué, lisses ou crantées, pour feuillard plastique (PP et PET) et feuillard acier. Logo du client sur demande.',
    },
    body: {
      it: 'Il sigillo va scelto in base a tipo e larghezza della reggia e all’utensile: i sigilli per reggia in plastica sono pensati per i tendireggia manuali, i sigilli overlap serie F per le reggiatrici pneumatiche per acciaio.',
      en: 'Choose the seal according to strap type and width and to the tool: seals for plastic strap are designed for manual tensioners, F-series overlap seals for pneumatic steel strapping tools.',
      fr: 'La chape se choisit selon le type et la largeur du feuillard et l’outil : les chapes pour feuillard plastique sont prévues pour les tendeurs manuels, les chapes overlap série F pour les cercleuses pneumatiques acier.',
    },
    image: '/Immagini/sigilli-per-reggia.png',
    imageAlt: { it: 'Sigilli per reggia', en: 'Strapping seals', fr: 'Chapes de cerclage' },
    materials: ['pp', 'pet', 'acc'],
    faq: [
      {
        q: { it: 'Quali sigilli per un tendireggia manuale?', en: 'Which seals for a manual tensioner?', fr: 'Quelles chapes pour un tendeur manuel ?' },
        a: {
          it: 'I sigilli per reggia in plastica (bulinati lucidi, bulinati zincati o zincati) nella larghezza della reggia che usi.',
          en: 'Seals for plastic strap (embossed polished, embossed galvanised or galvanised) in the width of the strap you use.',
          fr: 'Les chapes pour feuillard plastique (crantées brillantes, crantées zinguées ou zinguées) dans la largeur du feuillard utilisé.',
        },
      },
      {
        q: { it: 'Quanti pezzi ci sono in una confezione?', en: 'How many pieces per pack?', fr: 'Combien de pièces par carton ?' },
        a: {
          it: 'Dipende dall’articolo: da 1.000 a 4.000 pezzi. Le quantità sono indicate nelle tabelle di ogni scheda.',
          en: 'It depends on the item: from 1,000 to 4,000 pieces. Quantities are listed in the table on each product page.',
          fr: 'Cela dépend de l’article : de 1 000 à 4 000 pièces. Les quantités figurent dans le tableau de chaque fiche.',
        },
      },
    ],
  },
  {
    slug: 'carrelli-porta-reggia',
    name: { it: 'Carrelli porta reggia', en: 'Strap dispensers', fr: 'Dérouleurs de feuillard' },
    singular: { it: 'Carrello porta reggia', en: 'Strap dispenser', fr: 'Dérouleur de feuillard' },
    h1: {
      it: 'Carrelli porta reggia per bobine in PP, PET e acciaio',
      en: 'Strap dispenser carts for PP, PET and steel coils',
      fr: 'Dérouleurs de feuillard pour bobines PP, PET et acier',
    },
    metaTitle: {
      it: 'Carrelli porta reggia (svolgitori) per bobine',
      en: 'Strap dispenser carts for strapping coils',
      fr: 'Dérouleurs de feuillard pour bobines',
    },
    metaDescription: {
      it: 'Carrelli porta reggia (svolgitori) per bobine in PP, PET, acciaio e tessile, con cassetta per tendireggia e sigilli. Diametri interni da 76 a 405 mm.',
      en: 'Strap dispenser carts for PP, PET, steel and woven strapping coils, with a box for tensioner and seals. Core diameters from 76 to 405 mm.',
      fr: 'Dérouleurs pour bobines de feuillard PP, PET, acier et textile, avec caisson pour tendeur et chapes. Diamètres intérieurs de 76 à 405 mm.',
    },
    intro: {
      it: 'Carrelli svolgitori per bobine di reggia in polipropilene, poliestere, acciaio e reggia tessile, con cassetta per tendireggia e sigilli. Per diametri interni da 76 a 405 mm.',
      en: 'Dispenser carts for polypropylene, polyester, steel and woven strapping coils, with a box for tensioner and seals. For core diameters from 76 to 405 mm.',
      fr: 'Dérouleurs pour bobines de feuillard polypropylène, polyester, acier et textile, avec caisson pour tendeur et chapes. Pour diamètres intérieurs de 76 à 405 mm.',
    },
    body: {
      it: 'Un carrello porta reggia tiene la bobina in ordine, la fa svolgere senza grovigli e porta utensile e sigilli vicino al collo da reggiare. Il modello si sceglie in base al materiale della reggia, alla larghezza e al diametro interno della bobina.',
      en: 'A strap dispenser keeps the coil tidy, lets it unwind without tangles and brings tool and seals right next to the package. Choose the model by strap material, width and coil core diameter.',
      fr: 'Un dérouleur garde la bobine en ordre, la déroule sans nœuds et place outil et chapes près du colis à cercler. Le modèle se choisit selon le matériau du feuillard, la largeur et le diamètre intérieur de la bobine.',
    },
    image: '/Immagini/carrello-porta-reggia-fp-93.png',
    imageAlt: { it: 'Carrello porta reggia FP 93', en: 'FP 93 strap dispenser', fr: 'Dérouleur FP 93' },
    materials: ['pp', 'pet', 'acc'],
    faq: [
      {
        q: { it: 'Come scelgo il carrello giusto?', en: 'How do I choose the right dispenser?', fr: 'Comment choisir le bon dérouleur ?' },
        a: {
          it: 'Verifica il materiale della reggia e il diametro interno della bobina: ogni scheda indica i diametri compatibili.',
          en: 'Check the strap material and the coil core diameter: each product page lists the compatible diameters.',
          fr: 'Vérifiez le matériau du feuillard et le diamètre intérieur de la bobine : chaque fiche indique les diamètres compatibles.',
        },
      },
      {
        q: { it: 'C’è un modello con freno?', en: 'Is there a model with a brake?', fr: 'Existe-t-il un modèle avec frein ?' },
        a: {
          it: 'Sì, l’FP15S per bobine in polipropilene con diametro interno 200–280 mm è dotato di freno.',
          en: 'Yes, the FP15S for polypropylene coils with a 200–280 mm core has a brake.',
          fr: 'Oui, le FP15S pour bobines polypropylène de diamètre intérieur 200–280 mm est équipé d’un frein.',
        },
      },
    ],
  },
  {
    slug: 'accessori-imballaggio',
    name: { it: 'Accessori per l’imballaggio', en: 'Packaging accessories', fr: 'Accessoires d’emballage' },
    h1: {
      it: 'Accessori e forniture per l’imballaggio',
      en: 'Packaging accessories and supplies',
      fr: 'Accessoires et fournitures d’emballage',
    },
    metaTitle: {
      it: 'Accessori per la reggiatura e l’imballaggio',
      en: 'Strapping and packaging accessories',
      fr: 'Accessoires de cerclage et d’emballage',
    },
    metaDescription: {
      it: 'Reggia tessile con fibbia, angolari in plastica e in cartone, film estensibile manuale: accessori per la reggiatura e l’imballaggio di colli e bancali.',
      en: 'Woven strap with buckles, plastic and cardboard edge protectors, hand stretch film: accessories for strapping and packing packages and pallets.',
      fr: 'Feuillard textile avec boucles, cornières plastique et carton, film étirable manuel : accessoires pour le cerclage et l’emballage de colis et palettes.',
    },
    intro: {
      it: 'Oltre alla nostra produzione forniamo accessori e materiali complementari per il packaging industriale. Contattaci per disponibilità, quantità e condizioni commerciali.',
      en: 'Alongside our own production we supply complementary accessories and materials for industrial packaging. Contact us for availability, quantities and trade terms.',
      fr: 'En complément de notre production, nous fournissons accessoires et matériaux pour l’emballage industriel. Contactez-nous pour disponibilité, quantités et conditions.',
    },
    body: {
      it: 'Per distributori e aziende utilizzatrici prepariamo offerte su misura: niente prezzi online, ogni proposta tiene conto di quantità e frequenza degli ordini.',
      en: 'For distributors and end users we prepare tailored offers: no online prices, every proposal reflects order quantities and frequency.',
      fr: 'Pour les distributeurs et les utilisateurs, nous préparons des offres sur mesure : pas de prix en ligne, chaque proposition tient compte des quantités et de la fréquence.',
    },
    image: '/Immagini/angolari-in-plastica-per-reggia.png',
    imageAlt: { it: 'Angolari in plastica per reggia', en: 'Plastic edge protectors for strapping', fr: 'Cornières plastique pour feuillard' },
    materials: ['pp', 'pet', 'acc'],
    faq: [],
  },
];

/** Accessori (solo pagina categoria): chiavi di traduzione già esistenti */
export const ACCESSORIES = [
  { image: '/Immagini/reggia-tessile-con-fibbia.png', key: 'reggiaTessile' },
  { image: '/Immagini/angolari-in-plastica-per-reggia.png', key: 'angolariPlastica' },
  { image: '/Immagini/bancali-reggiati-angolari-cartone.png', key: 'angolariCartone' },
  { image: '/Immagini/film-estensibile-manuale-trasparente.png', key: 'filmEstensibile' },
] as const;

/* ---------- Prodotti ---------- */

const manualSpecs = (tension: L): SpecRow[] => [
  { label: 'strap', value: V.pp },
  { label: 'width', value: '9 – 19 mm' },
  { label: 'seal', value: V.sealA },
  { label: 'drive', value: V.manual },
  { label: 'tensioning', value: tension },
  { label: 'origin', value: V.caravaggio },
  spares,
];

export const PRODUCTS: Product[] = [
  // Tendireggia manuali
  {
    slug: 'cp2000',
    category: 'tendireggia-manuali',
    name: 'CP2000',
    descKey: 'CP2000',
    short: { it: 'reggia PP 9–19 mm', en: 'PP strap 9–19 mm', fr: 'feuillard PP 9–19 mm' },
    image: '/Immagini/tendireggia-manuale-cp2000.png',
    specs: manualSpecs(V.standard),
    madeInItaly: true,
    related: ['sigilli/sigilli-reggia-plastica', 'reggia/reggia-polipropilene', 'carrelli-porta-reggia/gm-15'],
    finder: { materials: ['pp'], power: 'man', widths: [9, 12, 13, 15, 16, 19] },
  },
  {
    slug: 'best',
    category: 'tendireggia-manuali',
    name: 'BEST',
    descKey: 'BEST',
    short: { it: 'reggia PP 9–19 mm, tensionamento speciale', en: 'PP strap 9–19 mm, special tensioning', fr: 'feuillard PP 9–19 mm, tension spéciale' },
    image: '/Immagini/tendireggia-manuale-best.png',
    specs: manualSpecs(V.special),
    madeInItaly: true,
    related: ['sigilli/sigilli-reggia-plastica', 'reggia/reggia-polipropilene', 'carrelli-porta-reggia/fp-15'],
    finder: { materials: ['pp'], power: 'man', widths: [9, 12, 13, 15, 16, 19] },
  },
  {
    slug: 'plr-g',
    category: 'tendireggia-manuali',
    name: 'PLR/G',
    descKey: 'PLRG',
    short: { it: 'reggia PP 9–19 mm, tensionamento veloce', en: 'PP strap 9–19 mm, fast tensioning', fr: 'feuillard PP 9–19 mm, tension rapide' },
    image: '/Immagini/tendireggia-manuale-plr-g.png',
    specs: manualSpecs(V.fast),
    madeInItaly: true,
    related: ['sigilli/sigilli-reggia-plastica', 'reggia/reggia-polipropilene', 'carrelli-porta-reggia/fp-15s'],
    finder: { materials: ['pp'], power: 'man', widths: [9, 12, 13, 15, 16, 19] },
  },
  // Reggiatrici a batteria
  {
    slug: 'gt-smart-plus',
    category: 'reggiatrici-a-batteria',
    name: 'GT SMART+',
    descKey: 'GTSMART',
    short: { it: 'reggia PP/PET 13–16 mm, 3000 N', en: 'PP/PET strap 13–16 mm, 3000 N', fr: 'feuillard PP/PET 13–16 mm, 3000 N' },
    image: '/Immagini/reggiatrice-a-batteria-gt-smart-plus.png',
    specs: [
      { label: 'strap', value: V.pppet },
      { label: 'width', value: '13 – 16 mm' },
      { label: 'thickness', value: '≤ 1,0 mm' },
      { label: 'tension', value: '3000 N' },
      { label: 'joint', value: V.friction },
      { label: 'battery', value: V.li14 },
      { label: 'charge', value: V.min15 },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-poliestere', 'reggia/reggia-polipropilene', 'carrelli-porta-reggia/fp-93'],
    finder: { materials: ['pp', 'pet'], power: 'bat', widths: [13, 16] },
  },
  {
    slug: 'gt-one',
    category: 'reggiatrici-a-batteria',
    name: 'GT-ONE',
    descKey: 'GTONE',
    short: { it: 'reggia PP/PET 13–19 mm, 3000 N', en: 'PP/PET strap 13–19 mm, 3000 N', fr: 'feuillard PP/PET 13–19 mm, 3000 N' },
    image: '/Immagini/reggiatrice-a-batteria-gt-one.png',
    specs: [
      { label: 'strap', value: V.pppet },
      { label: 'width', value: '13 – 16 – 19 mm' },
      { label: 'thickness', value: '0,8 – 1,2 mm' },
      { label: 'tension', value: '3000 N' },
      { label: 'joint', value: V.friction },
      { label: 'battery', value: V.li14 },
      { label: 'charge', value: V.min15 },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-poliestere', 'reggia/reggia-polipropilene', 'carrelli-porta-reggia/fp-93'],
    finder: { materials: ['pp', 'pet'], power: 'bat', widths: [13, 16, 19] },
  },
  {
    slug: 'gtxtreme',
    category: 'reggiatrici-a-batteria',
    name: 'GTXTREME',
    descKey: 'GTXTREME',
    short: { it: 'reggia PET 19–25 mm, 5000 N', en: 'PET strap 19–25 mm, 5000 N', fr: 'feuillard PET 19–25 mm, 5000 N' },
    image: '/Immagini/reggiatrice-a-batteria-gtxtreme.png',
    specs: [
      { label: 'strap', value: V.pet },
      { label: 'width', value: '19 – 25 mm' },
      { label: 'thickness', value: '≤ 1,3 mm' },
      { label: 'tension', value: '5000 N' },
      { label: 'joint', value: V.friction },
      { label: 'battery', value: V.li14 },
      { label: 'charge', value: V.min15 },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-poliestere', 'carrelli-porta-reggia/fp-93', 'reggiatrici-a-batteria/gt-max'],
    finder: { materials: ['pet'], power: 'bat', widths: [19, 25] },
  },
  {
    slug: 'cp-007',
    category: 'reggiatrici-a-batteria',
    name: 'CP 007',
    descKey: 'CP007',
    short: { it: 'reggia PP/PET 13–16 mm, 2000 N', en: 'PP/PET strap 13–16 mm, 2000 N', fr: 'feuillard PP/PET 13–16 mm, 2000 N' },
    image: '/Immagini/reggiatrice-a-batteria-cp-007.gif',
    specs: [
      { label: 'strap', value: V.pppet },
      { label: 'width', value: '13 – 16 mm' },
      { label: 'thickness', value: '≤ 1,0 mm' },
      { label: 'tension', value: '2000 N' },
      { label: 'tensioning', value: V.manualTension },
      { label: 'joint', value: V.friction },
      { label: 'battery', value: V.li14 },
      { label: 'charge', value: V.min15 },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-polipropilene', 'reggia/reggia-poliestere', 'carrelli-porta-reggia/fp-93'],
    finder: { materials: ['pp', 'pet'], power: 'bat', widths: [13, 16] },
  },
  {
    slug: 'gt-max',
    category: 'reggiatrici-a-batteria',
    name: 'GT MAX',
    descKey: 'GTMAX',
    short: { it: 'reggia PET 19–25 mm, 5000 N', en: 'PET strap 19–25 mm, 5000 N', fr: 'feuillard PET 19–25 mm, 5000 N' },
    image: '/Immagini/reggiatrice-a-batteria-gt-max.gif',
    specs: [
      { label: 'strap', value: V.pet },
      { label: 'width', value: '19 – 25 mm' },
      { label: 'thickness', value: '≤ 1,3 mm' },
      { label: 'tension', value: '5000 N' },
      { label: 'joint', value: V.friction },
      { label: 'battery', value: V.li14 },
      { label: 'charge', value: V.min15 },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-poliestere', 'carrelli-porta-reggia/fp-93', 'reggiatrici-a-batteria/gtxtreme'],
    finder: { materials: ['pet'], power: 'bat', widths: [19, 25] },
  },
  {
    slug: 'viper',
    category: 'reggiatrici-a-batteria',
    name: 'VIPER',
    descKey: 'VIPER',
    short: { it: 'reggia PET 9–19 mm, touchscreen', en: 'PET strap 9–19 mm, touchscreen', fr: 'feuillard PET 9–19 mm, écran tactile' },
    image: '/Immagini/reggiatrice-a-batteria-viper.gif',
    specs: [
      { label: 'strap', value: V.pet },
      { label: 'width', value: '9 – 12 – 16 – 19 mm' },
      { label: 'control', value: V.touch },
      { label: 'joint', value: V.friction },
      { label: 'battery', value: V.li18 },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-poliestere', 'carrelli-porta-reggia/fp-93', 'reggiatrici-a-batteria/gt-one'],
    finder: { materials: ['pet'], power: 'bat', widths: [9, 12, 16, 19] },
  },
  // Reggiatrici pneumatiche
  {
    slug: 'fast-pn-lt',
    category: 'reggiatrici-pneumatiche',
    name: 'FAST/PN L T',
    descKey: 'FASTPNLT',
    short: { it: 'reggia PP/PET 13–19 mm, 2000 N', en: 'PP/PET strap 13–19 mm, 2000 N', fr: 'feuillard PP/PET 13–19 mm, 2000 N' },
    image: '/Immagini/reggiatrice-pneumatica-fast-pn-lt.gif',
    specs: [
      { label: 'strap', value: V.pppet },
      { label: 'width', value: '13 – 16 – 19 mm' },
      { label: 'thickness', value: '≤ 1,0 mm' },
      { label: 'tension', value: '2000 N' },
      { label: 'joint', value: V.friction },
      { label: 'drive', value: V.pneumatic },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-poliestere', 'reggia/reggia-polipropilene', 'reggiatrici-pneumatiche/fast-pn-high-tension'],
    finder: { materials: ['pp', 'pet'], power: 'pn', widths: [13, 16, 19] },
  },
  {
    slug: 'fast-pn-high-tension',
    category: 'reggiatrici-pneumatiche',
    name: 'FAST/PN HIGH TENSION',
    descKey: 'FASTPNHIGHTENSION',
    short: { it: 'reggia PET 19–32 mm, 6000 N', en: 'PET strap 19–32 mm, 6000 N', fr: 'feuillard PET 19–32 mm, 6000 N' },
    image: '/Immagini/reggiatrice-pneumatica-fast-pn-lt.gif',
    specs: [
      { label: 'strap', value: V.pet },
      { label: 'width', value: '19 – 25 – 32 mm' },
      { label: 'thickness', value: '≤ 1,3 mm' },
      { label: 'tension', value: '6000 N' },
      { label: 'joint', value: V.friction },
      { label: 'drive', value: V.pneumatic },
      { label: 'packages', value: V.flatRound },
      spares,
    ],
    related: ['reggia/reggia-poliestere', 'reggiatrici-pneumatiche/fast-pn-lt', 'carrelli-porta-reggia/fp-93'],
    finder: { materials: ['pet'], power: 'pn', widths: [19, 25, 32] },
  },
  {
    slug: 'fp-13-16-19',
    category: 'reggiatrici-pneumatiche',
    name: 'FP 13-16-19',
    descKey: 'FP131619',
    short: { it: 'reggia acciaio 13–19 mm, sigillo serie F', en: 'steel strap 13–19 mm, F-series seal', fr: 'feuillard acier 13–19 mm, chape série F' },
    image: '/Immagini/reggiatrice-pneumatica-acciaio-fp-13-16-19.png',
    specs: [
      { label: 'strap', value: V.steel },
      { label: 'width', value: '13 – 16 – 19 mm' },
      { label: 'thickness', value: '0,5 – 0,6 mm' },
      { label: 'seal', value: V.sealF },
      { label: 'drive', value: V.pneumatic },
      { label: 'packages', value: V.round },
      { label: 'weight', value: '4,5 kg' },
      spares,
    ],
    related: ['sigilli/sigilli-reggia-acciaio', 'reggia/reggia-acciaio', 'carrelli-porta-reggia/fp-92'],
    finder: { materials: ['acc'], power: 'pn', widths: [13, 16, 19] },
  },
  {
    slug: 'fp-19s-25s-32s',
    category: 'reggiatrici-pneumatiche',
    name: 'FP 19S - 25S - 32S',
    descKey: 'FP19S25S32S',
    short: { it: 'reggia acciaio 19–32 mm, sigillo serie F', en: 'steel strap 19–32 mm, F-series seal', fr: 'feuillard acier 19–32 mm, chape série F' },
    image: '/Immagini/reggiatrice-pneumatica-acciaio-fp-19s-25s-32s.png',
    specs: [
      { label: 'strap', value: V.steel },
      { label: 'width', value: '19 – 25 – 32 mm' },
      { label: 'thickness', value: '0,8 – 0,9 mm' },
      { label: 'seal', value: V.sealF },
      { label: 'drive', value: V.pneumatic },
      { label: 'packages', value: V.flatRound },
      { label: 'weight', value: '10 kg' },
      spares,
    ],
    related: ['sigilli/sigilli-reggia-acciaio', 'reggia/reggia-acciaio', 'carrelli-porta-reggia/fp-92'],
    finder: { materials: ['acc'], power: 'pn', widths: [19, 25, 32] },
  },
  {
    slug: 'fp-32-plus',
    category: 'reggiatrici-pneumatiche',
    name: 'FP 32 PLUS',
    descKey: 'FP32PLUS',
    short: { it: 'reggia acciaio 19–32 mm, spessore 1,0–1,2', en: 'steel strap 19–32 mm, 1.0–1.2 mm thick', fr: 'feuillard acier 19–32 mm, épaisseur 1,0–1,2' },
    image: '/Immagini/reggiatrice-pneumatica-acciaio-fp-32-plus.gif',
    specs: [
      { label: 'strap', value: V.steel },
      { label: 'width', value: '19 – 25 – 32 mm' },
      { label: 'thickness', value: '1,0 – 1,2 mm' },
      { label: 'seal', value: V.sealF },
      { label: 'drive', value: V.pneumatic },
      spares,
    ],
    related: ['sigilli/sigilli-reggia-acciaio', 'reggia/reggia-acciaio', 'carrelli-porta-reggia/fp-92'],
    finder: { materials: ['acc'], power: 'pn', widths: [19, 25, 32] },
  },
  {
    slug: 'sl3-pn',
    category: 'reggiatrici-pneumatiche',
    name: 'SL3 PN',
    descKey: 'SL3PN',
    short: { it: 'reggia acciaio 13–19 mm, senza sigillo', en: 'steel strap 13–19 mm, sealless', fr: 'feuillard acier 13–19 mm, sans chape' },
    image: '/Immagini/reggiatrice-pneumatica-acciaio-sl3-pn.png',
    specs: [
      { label: 'strap', value: V.steel },
      { label: 'width', value: '13 – 16 – 19 mm' },
      { label: 'thickness', value: '≤ 0,6 mm' },
      { label: 'joint', value: V.sealless },
      { label: 'drive', value: V.pneumatic },
      { label: 'packages', value: V.flat },
      { label: 'weight', value: '7 kg' },
      spares,
    ],
    related: ['reggia/reggia-acciaio', 'carrelli-porta-reggia/fp-92', 'reggiatrici-pneumatiche/fp-13-16-19'],
    finder: { materials: ['acc'], power: 'pn', widths: [13, 16, 19] },
  },
  // Reggia
  {
    slug: 'reggia-polipropilene',
    category: 'reggia',
    name: 'PP',
    title: { it: 'Reggia in polipropilene (PP)', en: 'Polypropylene (PP) strapping', fr: 'Feuillard polypropylène (PP)' },
    description: {
      it: 'Reggia in polipropilene 100% riciclabile, in bobine da 9 a 15 mm di larghezza con resistenza da 115 a 300 kg. A richiesta con colore e marchio del cliente.',
      en: '100% recyclable polypropylene strapping in 9 to 15 mm wide coils with 115 to 300 kg breaking strength. Customer colour and logo on request.',
      fr: 'Feuillard polypropylène 100 % recyclable, en bobines de 9 à 15 mm de large et résistance de 115 à 300 kg. Couleur et logo du client sur demande.',
    },
    short: { it: '9–15 mm, 100% riciclabile', en: '9–15 mm, 100% recyclable', fr: '9–15 mm, 100 % recyclable' },
    image: '/Immagini/bancali-reggiati-angolari-cartone.png',
    specs: [
      { label: 'strap', value: V.pp },
      { label: 'width', value: '9 – 15 mm' },
      { label: 'custom', value: V.colorBrand },
    ],
    tables: [
      {
        head: ['prodotti.table.section', 'prodotti.table.resistance', 'prodotti.table.length'],
        rows: [
          ['9 x 0,6 d 200', '115', '4000'],
          ['12 x 0,65 d 200/395', '190', '2750'],
          ['12 x 0,7 d 60', '210', '4 x 1000'],
          ['12 x 0,7 d 395', '210', '2500'],
          ['15 x 0,8', '300', '1500'],
        ],
      },
    ],
    related: ['tendireggia-manuali/cp2000', 'sigilli/sigilli-reggia-plastica', 'carrelli-porta-reggia/gm-15'],
  },
  {
    slug: 'reggia-poliestere',
    category: 'reggia',
    name: 'PET',
    title: { it: 'Reggia in poliestere (PET)', en: 'Polyester (PET) strapping', fr: 'Feuillard polyester (PET)' },
    description: {
      it: 'Reggia in poliestere da 16 a 32 mm con resistenza da 490 a 1500 kg, per carichi pesanti. A richiesta con colore e marchio del cliente.',
      en: 'Polyester strapping from 16 to 32 mm with 490 to 1500 kg breaking strength, for heavy loads. Customer colour and logo on request.',
      fr: 'Feuillard polyester de 16 à 32 mm, résistance de 490 à 1500 kg, pour charges lourdes. Couleur et logo du client sur demande.',
    },
    short: { it: '16–32 mm, fino a 1500 kg', en: '16–32 mm, up to 1500 kg', fr: '16–32 mm, jusqu’à 1500 kg' },
    image: '/Immagini/reggia-in-poliestere.png',
    specs: [
      { label: 'strap', value: V.pet },
      { label: 'width', value: '16 – 32 mm' },
      { label: 'custom', value: V.colorBrand },
    ],
    tables: [
      {
        head: ['prodotti.table.measure', 'prodotti.table.resistance', 'prodotti.table.length'],
        rows: [
          ['16 x 0,8', '490', '1500'],
          ['16 x 1', '630', '1200'],
          ['19 x 1', '740', '1000'],
          ['19 x 1,27', '850', '800'],
          ['32 x 1,27', '1500', '400'],
        ],
      },
    ],
    related: ['reggiatrici-a-batteria/gt-one', 'reggiatrici-a-batteria/gtxtreme', 'carrelli-porta-reggia/fp-93'],
  },
  {
    slug: 'reggia-acciaio',
    category: 'reggia',
    name: 'Acciaio',
    title: { it: 'Reggia in acciaio', en: 'Steel strapping', fr: 'Feuillard acier' },
    description: {
      it: 'Reggia in acciaio monospira o matassata, lucida, zincata, bluata o verniciata, da 13 a 32 mm. Versione ad alta resistenza con resistenza alla trazione fino a 100 kg.',
      en: 'Steel strapping, ribbon-wound or oscillated, polished, galvanised, blued or painted, from 13 to 32 mm. High-strength version with tensile strength up to 100 kg.',
      fr: 'Feuillard acier en spires jointives ou trancannées, brillant, zingué, bleui ou peint, de 13 à 32 mm. Version haute résistance, résistance à la traction jusqu’à 100 kg.',
    },
    short: { it: '13–32 mm, lucida, zincata, bluata, verniciata', en: '13–32 mm, polished, galvanised, blued, painted', fr: '13–32 mm, brillant, zingué, bleui, peint' },
    image: '/Immagini/reggia-in-acciaio.png',
    specs: [
      { label: 'strap', value: V.steel },
      { label: 'width', value: '13 – 32 mm' },
      {
        label: 'finish',
        value: {
          it: 'Lucida, zincata, bluata, verniciata',
          en: 'Polished, galvanised, blued, painted',
          fr: 'Brillant, zingué, bleui, peint',
        },
      },
      {
        label: 'coil',
        value: { it: 'Monospira o matassata', en: 'Ribbon-wound or oscillated', fr: 'Spires jointives ou trancannées' },
      },
    ],
    tables: [
      {
        head: ['prodotti.table.model', 'prodotti.table.tensileStrength', 'prodotti.table.measure'],
        rows: [
          ['prodotti.steel.polished', '70 kg', '13 x 0,5'],
          ['prodotti.steel.galvanized', '85 kg', '16 x 0,5'],
          ['prodotti.steel.blued', '85 kg', '16 x 0,6'],
          ['prodotti.steel.painted', '85 kg', '19 x 0,5'],
          ['prodotti.steel.highResistance', '100 kg', '19 x 0,6 · 19 x 0,8 · 25 x 0,8 · 32 x 0,8 · 32 x 1'],
        ],
      },
    ],
    related: ['reggiatrici-pneumatiche/fp-13-16-19', 'sigilli/sigilli-reggia-acciaio', 'carrelli-porta-reggia/fp-92'],
  },
  // Sigilli
  {
    slug: 'sigilli-reggia-plastica',
    category: 'sigilli',
    name: 'K5A · K8A · K5D · K8D · Grip',
    title: { it: 'Sigilli per reggia in plastica', en: 'Seals for plastic strapping', fr: 'Chapes pour feuillard plastique' },
    description: {
      it: 'Sigilli in acciaio per reggia in polipropilene e poliestere, da usare con i tendireggia manuali: bulinati lucidi, bulinati zincati e zincati Grip, da 13 e 16 mm.',
      en: 'Steel seals for polypropylene and polyester strap, for use with manual tensioners: embossed polished, embossed galvanised and galvanised Grip, 13 and 16 mm.',
      fr: 'Chapes en acier pour feuillard polypropylène et polyester, à utiliser avec les tendeurs manuels : crantées brillantes, crantées zinguées et zinguées Grip, 13 et 16 mm.',
    },
    short: { it: '13 e 16 mm, lucidi o zincati', en: '13 and 16 mm, polished or galvanised', fr: '13 et 16 mm, brillantes ou zinguées' },
    image: '/Immagini/sigilli-bulinati-lucidi.png',
    specs: [
      { label: 'strap', value: V.pppet },
      { label: 'width', value: '13 – 16 mm' },
      {
        label: 'finish',
        value: {
          it: 'Bulinati lucidi, bulinati zincati, zincati',
          en: 'Embossed polished, embossed galvanised, galvanised',
          fr: 'Crantées brillantes, crantées zinguées, zinguées',
        },
      },
      { label: 'custom', value: V.brandOnly },
    ],
    tables: [
      {
        head: ['prodotti.table.article', { it: 'Finitura', en: 'Finish', fr: 'Finition' }, 'prodotti.table.dimensions', 'prodotti.table.quantity'],
        rows: [
          ['K5A', 'prodotti.sections.sigilli.bulinatiLucidi', '13 x 28 x 0,5', '3.000'],
          ['K8A', 'prodotti.sections.sigilli.bulinatiLucidi', '16 x 28 x 0,5', '2.000'],
          ['K5D', 'prodotti.sections.sigilli.bulinatiZincati', '13 x 28 x 0,5', '3.000'],
          ['K8D', 'prodotti.sections.sigilli.bulinatiZincati', '16 x 28 x 0,5', '2.000'],
          ['Grip 13', 'prodotti.sections.sigilli.zincati', '13 x 30 x 0,9', '1.000'],
          ['Grip 16', 'prodotti.sections.sigilli.zincati', '16 x 30 x 0,9', '1.000'],
        ],
      },
    ],
    related: ['tendireggia-manuali/cp2000', 'tendireggia-manuali/best', 'reggia/reggia-polipropilene'],
  },
  {
    slug: 'sigilli-reggia-acciaio',
    category: 'sigilli',
    name: 'F16 · F19',
    title: { it: 'Sigilli overlap per reggia in acciaio', en: 'Overlap seals for steel strapping', fr: 'Chapes overlap pour feuillard acier' },
    description: {
      it: 'Sigilli overlap serie F per reggia in acciaio da 16 e 19 mm, da usare con le reggiatrici pneumatiche FP. Marchio del cliente su richiesta.',
      en: 'F-series overlap seals for 16 and 19 mm steel strap, for use with FP pneumatic strapping tools. Customer logo on request.',
      fr: 'Chapes overlap série F pour feuillard acier de 16 et 19 mm, à utiliser avec les cercleuses pneumatiques FP. Logo du client sur demande.',
    },
    short: { it: 'overlap serie F, 16 e 19 mm', en: 'F-series overlap, 16 and 19 mm', fr: 'overlap série F, 16 et 19 mm' },
    image: '/Immagini/sigillo-overlap.png',
    specs: [
      { label: 'strap', value: V.steel },
      { label: 'width', value: '16 – 19 mm' },
      { label: 'seal', value: V.sealF },
      { label: 'custom', value: V.brandOnly },
    ],
    tables: [
      {
        head: ['prodotti.table.article', 'prodotti.table.dimensions', 'prodotti.table.quantityFull'],
        rows: [
          ['F16', '16 x 24 x 0,6', '4.000'],
          ['F19', '19 x 24 x 0,6', '2.000'],
          ['F19', '19 x 45 x 0,6', '2.000'],
        ],
      },
    ],
    related: ['reggiatrici-pneumatiche/fp-13-16-19', 'reggiatrici-pneumatiche/fp-19s-25s-32s', 'reggia/reggia-acciaio'],
  },
  // Carrelli
  {
    slug: 'gm-15',
    category: 'carrelli-porta-reggia',
    name: 'GM 15',
    descKey: 'GM15',
    short: { it: 'bobine PP 9–19 mm, Ø 390/405 mm', en: 'PP coils 9–19 mm, Ø 390/405 mm', fr: 'bobines PP 9–19 mm, Ø 390/405 mm' },
    image: '/Immagini/carrello-porta-reggia-gm-15.gif',
    specs: [
      { label: 'coil', value: V.pp },
      { label: 'width', value: '9 – 19 mm' },
      { label: 'core', value: '390 / 405 mm' },
      { label: 'equipment', value: V.box },
    ],
    related: ['tendireggia-manuali/cp2000', 'reggia/reggia-polipropilene', 'sigilli/sigilli-reggia-plastica'],
  },
  {
    slug: 'fp-15',
    category: 'carrelli-porta-reggia',
    name: 'FP15',
    descKey: 'FP15',
    short: { it: 'bobine PP 9–19 mm, Ø 150–405 mm', en: 'PP coils 9–19 mm, Ø 150–405 mm', fr: 'bobines PP 9–19 mm, Ø 150–405 mm' },
    image: '/Immagini/carrello-porta-reggia-fp-15.png',
    specs: [
      { label: 'coil', value: V.pp },
      { label: 'width', value: '9 – 19 mm' },
      { label: 'core', value: '150 / 200 / 280 / 405 mm' },
      { label: 'equipment', value: V.box },
    ],
    related: ['tendireggia-manuali/best', 'reggia/reggia-polipropilene', 'sigilli/sigilli-reggia-plastica'],
  },
  {
    slug: 'fp-93',
    category: 'carrelli-porta-reggia',
    name: 'FP 93',
    descKey: 'FP93',
    short: { it: 'bobine PET e acciaio 9–32 mm, Ø 405 mm', en: 'PET and steel coils 9–32 mm, Ø 405 mm', fr: 'bobines PET et acier 9–32 mm, Ø 405 mm' },
    image: '/Immagini/carrello-porta-reggia-fp-93.png',
    specs: [
      {
        label: 'coil',
        value: {
          it: 'Poliestere 9–32 mm; acciaio matassato 13–19 mm',
          en: 'Polyester 9–32 mm; oscillated steel 13–19 mm',
          fr: 'Polyester 9–32 mm ; acier trancanné 13–19 mm',
        },
      },
      { label: 'core', value: '390 / 405 mm' },
      { label: 'equipment', value: V.box },
    ],
    related: ['reggiatrici-a-batteria/gt-one', 'reggia/reggia-poliestere', 'reggia/reggia-acciaio'],
  },
  {
    slug: 'fp-15s',
    category: 'carrelli-porta-reggia',
    name: 'FP15S',
    descKey: 'FP15S',
    short: { it: 'bobine PP, Ø 200–280 mm, con freno', en: 'PP coils, Ø 200–280 mm, with brake', fr: 'bobines PP, Ø 200–280 mm, avec frein' },
    image: '/Immagini/carrello-porta-reggia-fp-15s.gif',
    specs: [
      { label: 'coil', value: V.pp },
      { label: 'core', value: '200 – 280 mm' },
      { label: 'equipment', value: V.boxBrake },
    ],
    related: ['tendireggia-manuali/plr-g', 'reggia/reggia-polipropilene', 'sigilli/sigilli-reggia-plastica'],
  },
  {
    slug: 'fp-92',
    category: 'carrelli-porta-reggia',
    name: 'FP 92',
    descKey: 'FP92',
    short: { it: 'bobine acciaio monospira 13–32 mm', en: 'ribbon-wound steel coils 13–32 mm', fr: 'bobines acier spires jointives 13–32 mm' },
    image: '/Immagini/carrello-porta-reggia-fp-92.png',
    specs: [
      {
        label: 'coil',
        value: { it: 'Acciaio monospira', en: 'Ribbon-wound steel', fr: 'Acier en spires jointives' },
      },
      { label: 'width', value: '13 – 32 mm' },
      { label: 'equipment', value: V.box },
    ],
    related: ['reggiatrici-pneumatiche/fp-19s-25s-32s', 'reggia/reggia-acciaio', 'sigilli/sigilli-reggia-acciaio'],
  },
  {
    slug: 'fp-13',
    category: 'carrelli-porta-reggia',
    name: 'FP13',
    descKey: 'FP13',
    short: { it: 'bobine tessili, Ø 76 mm', en: 'woven strap coils, Ø 76 mm', fr: 'bobines textiles, Ø 76 mm' },
    image: '/Immagini/carrello-porta-reggia-fp-13.gif',
    specs: [
      {
        label: 'coil',
        value: { it: 'Reggia tessile in poliestere', en: 'Woven polyester strap', fr: 'Feuillard textile polyester' },
      },
      { label: 'core', value: '76 mm' },
      {
        label: 'width',
        value: { it: 'Bobine larghe 140 e 150 mm', en: 'Coils 140 and 150 mm wide', fr: 'Bobines de 140 et 150 mm de large' },
      },
    ],
    related: ['accessori-imballaggio', 'reggia/reggia-poliestere', 'carrelli-porta-reggia/fp-93'],
  },
];

/* ---------- Funzioni di accesso ---------- */

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(category: string, slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.category === category && p.slug === slug);
}

export function productsIn(category: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function productPath(p: Product): string {
  return `/prodotti/${p.category}/${p.slug}`;
}

export function categoryPath(slug: CategorySlug): string {
  return `/prodotti/${slug}`;
}

/** 'categoria/slug' oppure 'categoria' → elemento del catalogo */
export function resolveRef(ref: string): { kind: 'product'; product: Product } | { kind: 'category'; category: Category } | undefined {
  const [cat, slug] = ref.split('/');
  if (slug) {
    const product = getProduct(cat, slug);
    return product ? { kind: 'product', product } : undefined;
  }
  const category = getCategory(cat);
  return category ? { kind: 'category', category } : undefined;
}

/** Nome visualizzato: "Tendireggia manuale CP2000" oppure il titolo proprio (reggia, sigilli) */
export function productDisplayName(p: Product, lang: Lang): string {
  if (p.title) return p.title[lang];
  const cat = getCategory(p.category);
  return cat?.singular ? `${cat.singular[lang]} ${p.name}` : p.name;
}

/** Nomi usati nella vecchia pagina /prodotti → scheda prodotto */
const LEGACY_NAME_TO_PATH: Record<string, string> = {
  'Bulinati lucidi': '/prodotti/sigilli/sigilli-reggia-plastica',
  'Bulinati zincati': '/prodotti/sigilli/sigilli-reggia-plastica',
  Zincati: '/prodotti/sigilli/sigilli-reggia-plastica',
  Overlap: '/prodotti/sigilli/sigilli-reggia-acciaio',
};

export function pathForProductName(name: string): string | undefined {
  if (LEGACY_NAME_TO_PATH[name]) return LEGACY_NAME_TO_PATH[name];
  const p = PRODUCTS.find((x) => x.name === name);
  return p ? productPath(p) : undefined;
}

export function localized(value: string | L, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}
