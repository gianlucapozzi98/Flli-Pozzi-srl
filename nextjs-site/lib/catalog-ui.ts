/** Testi dell'interfaccia delle pagine catalogo (server component). */
import type { L } from './catalog';

export const UI = {
  home: { it: 'Home', en: 'Home', fr: 'Accueil' },
  products: { it: 'Prodotti', en: 'Products', fr: 'Produits' },
  madeIn: { it: 'Prodotto a Caravaggio', en: 'Made in Caravaggio, Italy', fr: 'Fabriqué à Caravaggio' },
  quoteFor: { it: 'Richiedi preventivo per', en: 'Request a quote for', fr: 'Demander un devis pour' },
  quote: { it: 'Richiedi un preventivo', en: 'Request a quote', fr: 'Demander un devis' },
  call: { it: 'Chiama +39 0363 350380', en: 'Call +39 0363 350380', fr: 'Appeler +39 0363 350380' },
  techQuestions: { it: 'Domande tecniche? Chiama il', en: 'Technical questions? Call', fr: 'Questions techniques ? Appelez le' },
  dealer: { it: 'Sei un rivenditore?', en: 'Are you a dealer?', fr: 'Vous êtes revendeur ?' },
  dealerLink: { it: 'Richiedi il listino B2B →', en: 'Request the B2B price list →', fr: 'Demandez la liste de prix B2B →' },
  service: { it: 'Assistenza e ricambi →', en: 'Service and spare parts →', fr: 'Assistance et pièces →' },
  specs: { it: 'Caratteristiche', en: 'Specifications', fr: 'Caractéristiques' },
  description: { it: 'Descrizione', en: 'Description', fr: 'Description' },
  faq: { it: 'Domande frequenti', en: 'Frequently asked questions', fr: 'Questions fréquentes' },
  related: { it: 'Da usare con', en: 'Use it with', fr: 'À utiliser avec' },
  models: { it: 'I modelli', en: 'Models', fr: 'Les modèles' },
  modelsCount: { it: 'modelli', en: 'models', fr: 'modèles' },
  itemsCount: { it: 'articoli', en: 'items', fr: 'articles' },
  view: { it: 'Vedi la scheda →', en: 'View details →', fr: 'Voir la fiche →' },
  viewCategory: { it: 'Vedi la categoria →', en: 'View category →', fr: 'Voir la catégorie →' },
  sizes: { it: 'Misure disponibili', en: 'Available sizes', fr: 'Dimensions disponibles' },
  otherCategories: { it: 'Altre categorie', en: 'Other categories', fr: 'Autres catégories' },
  ctaTitle: { it: 'Non sai quale modello scegliere?', en: 'Not sure which model to choose?', fr: 'Vous hésitez sur le modèle ?' },
  ctaText: {
    it: 'Raccontaci che cosa devi reggiare: ti consigliamo utensile, reggia e sigilli adatti e ti inviamo un’offerta.',
    en: 'Tell us what you need to strap: we will recommend the right tool, strap and seals and send you a quote.',
    fr: 'Dites-nous ce que vous devez cercler : nous vous conseillons l’outil, le feuillard et les chapes adaptés et vous envoyons une offre.',
  },
  accessoriesUse: { it: 'Impiego', en: 'Use', fr: 'Utilisation' },
  requestInfo: { it: 'Richiedi informazioni', en: 'Request information', fr: 'Demander des informations' },
  photoNote: {
    it: 'Immagine indicativa',
    en: 'Indicative image',
    fr: 'Image indicative',
  },
} satisfies Record<string, L>;
