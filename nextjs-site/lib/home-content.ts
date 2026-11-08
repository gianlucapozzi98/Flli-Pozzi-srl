/** Testi della homepage in tre lingue. */
import type { L } from './catalog';

export const HOME = {
  heroFinder: { it: 'Trova la reggiatrice giusta', en: 'Find the right tool', fr: 'Trouver la bonne cercleuse' },
  heroPhone: { it: 'Preferisci parlarne? Chiama il', en: 'Prefer to talk? Call', fr: 'Vous préférez en parler ? Appelez le' },
  animAria: {
    it: 'Animazione: una reggia viene tesa attorno a un collo e chiusa con un sigillo in acciaio',
    en: 'Animation: a strap is tensioned around a package and closed with a steel seal',
    fr: 'Animation : un feuillard est tendu autour d’un colis et fermé par une chape en acier',
  },
  animTension: { it: 'Tensione', en: 'Tension', fr: 'Tension' },
  animStep1: { it: 'Tensionamento…', en: 'Tensioning…', fr: 'Mise en tension…' },
  animStep2: { it: 'Sigillatura…', en: 'Sealing…', fr: 'Pose de la chape…' },
  animStep3: { it: 'Reggiatura completata ✓', en: 'Strapping complete ✓', fr: 'Cerclage terminé ✓' },
  proof: [
    { big: { it: '1947', en: '1947', fr: '1947' }, label: { it: 'anno di fondazione', en: 'year founded', fr: 'année de fondation' } },
    {
      big: { it: '2.200 m²', en: '2,200 m²', fr: '2 200 m²' },
      label: { it: 'produzione, magazzino e assistenza', en: 'production, warehouse and service', fr: 'production, stock et assistance' },
    },
    { big: { it: 'ISO 9001', en: 'ISO 9001', fr: 'ISO 9001' }, label: { it: 'sistema qualità certificato', en: 'certified quality system', fr: 'système qualité certifié' } },
    {
      big: { it: 'Made in Italy', en: 'Made in Italy', fr: 'Made in Italy' },
      label: { it: 'tendireggia prodotti a Caravaggio', en: 'tensioners made in Caravaggio', fr: 'tendeurs fabriqués à Caravaggio' },
    },
  ],
  catTitle: { it: 'Scegli per tipo di reggia', en: 'Choose by strap type', fr: 'Choisir par type de feuillard' },
  catText: {
    it: 'Polipropilene, poliestere o acciaio: parti dal materiale che usi ogni giorno.',
    en: 'Polypropylene, polyester or steel: start from the material you use every day.',
    fr: 'Polypropylène, polyester ou acier : partez du matériau que vous utilisez tous les jours.',
  },
  filterLabel: { it: 'Filtra per materiale', en: 'Filter by material', fr: 'Filtrer par matériau' },
  chipAll: { it: 'Tutti', en: 'All', fr: 'Tous' },
  chipSteel: { it: 'Acciaio', en: 'Steel', fr: 'Acier' },
  catalogLink: { it: 'Tutto il catalogo →', en: 'Full catalogue →', fr: 'Tout le catalogue →' },
  accessoriesLink: { it: 'Accessori per l’imballaggio →', en: 'Packaging accessories →', fr: 'Accessoires d’emballage →' },
  models: { it: 'modelli', en: 'models', fr: 'modèles' },
  items: { it: 'articoli', en: 'items', fr: 'articles' },
  view: { it: 'Vedi i modelli →', en: 'View models →', fr: 'Voir les modèles →' },

  finderTitle: { it: 'Trova la reggiatrice giusta', en: 'Find the right strapping tool', fr: 'Trouvez la bonne cercleuse' },
  finderText: {
    it: 'Tre domande, poi ti proponiamo i modelli adatti dal nostro catalogo.',
    en: 'Three questions, then we suggest the right models from our catalogue.',
    fr: 'Trois questions, puis nous vous proposons les modèles adaptés de notre catalogue.',
  },
  q1: { it: '1 · Materiale della reggia', en: '1 · Strap material', fr: '1 · Matériau du feuillard' },
  q2: { it: '2 · Larghezza della reggia', en: '2 · Strap width', fr: '2 · Largeur du feuillard' },
  q3: { it: '3 · Come preferisci lavorare', en: '3 · How do you prefer to work', fr: '3 · Comment préférez-vous travailler' },
  matPP: { it: 'Polipropilene (PP)', en: 'Polypropylene (PP)', fr: 'Polypropylène (PP)' },
  matPET: { it: 'Poliestere (PET)', en: 'Polyester (PET)', fr: 'Polyester (PET)' },
  matSteel: { it: 'Acciaio', en: 'Steel', fr: 'Acier' },
  pwMan: { it: 'Manuale', en: 'Manual', fr: 'Manuel' },
  pwBat: { it: 'A batteria', en: 'Battery', fr: 'À batterie' },
  pwPn: { it: 'Pneumatica', en: 'Pneumatic', fr: 'Pneumatique' },
  pwManLower: { it: 'manuale', en: 'manual', fr: 'manuelle' },
  pwBatLower: { it: 'a batteria', en: 'battery', fr: 'à batterie' },
  pwPnLower: { it: 'pneumatica', en: 'pneumatic', fr: 'pneumatique' },
  matchOne: { it: 'modello adatto', en: 'matching model', fr: 'modèle adapté' },
  matchMany: { it: 'modelli adatti', en: 'matching models', fr: 'modèles adaptés' },
  alternatives: { it: 'Alternative consigliate', en: 'Suggested alternatives', fr: 'Alternatives conseillées' },
  noPower: {
    it: 'Per reggia in {mat} di questa larghezza non abbiamo una versione {pw}. Ecco le alternative:',
    en: 'For {mat} strap of this width we have no {pw} version. Here are the alternatives:',
    fr: 'Pour un feuillard {mat} de cette largeur, nous n’avons pas de version {pw}. Voici les alternatives :',
  },
  noWidth: {
    it: 'Nessun modello copre esattamente questa larghezza: ecco i più vicini. Il nostro ufficio tecnico ti consiglia la soluzione giusta.',
    en: 'No model covers exactly this width: here are the closest. Our technical team will recommend the right solution.',
    fr: 'Aucun modèle ne couvre exactement cette largeur : voici les plus proches. Notre service technique vous conseillera.',
  },
  matLower: {
    pp: { it: 'polipropilene', en: 'polypropylene', fr: 'polypropylène' },
    pet: { it: 'poliestere', en: 'polyester', fr: 'polyester' },
    acc: { it: 'acciaio', en: 'steel', fr: 'acier' },
  },
  quoteThese: { it: 'Richiedi preventivo per questi modelli', en: 'Request a quote for these models', fr: 'Demander un devis pour ces modèles' },
  quoteFor: { it: 'Richiedi preventivo per', en: 'Request a quote for', fr: 'Demander un devis pour' },

  madeTitle: { it: 'Progettati e assemblati a Caravaggio', en: 'Designed and assembled in Caravaggio', fr: 'Conçus et assemblés à Caravaggio' },
  madeText: {
    it: 'I nostri tendireggia manuali per reggia in polipropilene, con sigillo serie A.',
    en: 'Our manual tensioners for polypropylene strap, with A-series seals.',
    fr: 'Nos tendeurs manuels pour feuillard polypropylène, avec chapes série A.',
  },
  madeBadge: { it: 'Prodotto in Italia', en: 'Made in Italy', fr: 'Fabriqué en Italie' },
  details: { it: 'Scheda e preventivo →', en: 'Details and quote →', fr: 'Fiche et devis →' },

  compareTitle: { it: 'Perché un produttore italiano', en: 'Why an Italian manufacturer', fr: 'Pourquoi un fabricant italien' },
  compareText: {
    it: 'Il prezzo d’acquisto è solo una parte del costo: conta quanto resta ferma la linea quando qualcosa si rompe.',
    en: 'The purchase price is only part of the cost: what matters is how long the line stops when something breaks.',
    fr: 'Le prix d’achat n’est qu’une partie du coût : ce qui compte, c’est la durée d’arrêt de la ligne en cas de panne.',
  },
  compareThem: { it: 'Utensile d’importazione generico', en: 'Generic imported tool', fr: 'Outil d’importation générique' },
  compareRows: [
    {
      k: { it: 'Ricambi', en: 'Spare parts', fr: 'Pièces détachées' },
      us: { it: 'Originali, forniti direttamente da noi', en: 'Original, supplied directly by us', fr: 'D’origine, fournies directement par nous' },
      them: { it: 'Da verificare modello per modello', en: 'To be checked model by model', fr: 'À vérifier modèle par modèle' },
    },
    {
      k: { it: 'Assistenza tecnica', en: 'Technical service', fr: 'Assistance technique' },
      us: { it: 'In sede, per reggiatrici di ogni marca', en: 'In-house, for strapping tools of any brand', fr: 'Sur site, pour cercleuses de toutes marques' },
      them: { it: 'Non sempre disponibile in Italia', en: 'Not always available locally', fr: 'Pas toujours disponible localement' },
    },
    {
      k: { it: 'Documentazione', en: 'Documentation', fr: 'Documentation' },
      us: { it: 'Manuali, lista ricambi e certificazioni', en: 'Manuals, spare parts lists and certifications', fr: 'Manuels, listes de pièces et certifications' },
      them: { it: 'Variabile', en: 'Variable', fr: 'Variable' },
    },
    {
      k: { it: 'Formazione', en: 'Training', fr: 'Formation' },
      us: { it: 'Per il vostro personale di manutenzione', en: 'For your maintenance staff', fr: 'Pour votre personnel de maintenance' },
      them: { it: 'Rara', en: 'Rare', fr: 'Rare' },
    },
    {
      k: { it: 'Personalizzazione', en: 'Customisation', fr: 'Personnalisation' },
      us: { it: 'Reggia e sigilli con colore e marchio del cliente', en: 'Strap and seals in customer colour and logo', fr: 'Feuillard et chapes à la couleur et au logo du client' },
      them: { it: 'Su grandi volumi', en: 'On large volumes', fr: 'Sur gros volumes' },
    },
  ],

  serviceTitle: { it: 'La reggiatrice si è fermata?', en: 'Has your strapping tool stopped?', fr: 'Votre cercleuse est en panne ?' },
  serviceText: {
    it: 'Ripariamo e manuteniamo reggiatrici di ogni marca nel nostro stabilimento di Caravaggio. Ricambi originali, documentazione tecnica e formazione per il vostro personale.',
    en: 'We repair and maintain strapping tools of any brand at our Caravaggio facility. Original spare parts, technical documentation and training for your staff.',
    fr: 'Nous réparons et entretenons des cercleuses de toutes marques dans notre site de Caravaggio. Pièces d’origine, documentation technique et formation de votre personnel.',
  },
  serviceBtn: { it: 'Assistenza e ricambi', en: 'Service and spare parts', fr: 'Assistance et pièces' },
  serviceItems: [
    {
      t: { it: 'Riparazione e manutenzione', en: 'Repair and maintenance', fr: 'Réparation et entretien' },
      d: { it: 'Interventi rapidi e manutenzione programmata', en: 'Fast response and scheduled maintenance', fr: 'Interventions rapides et maintenance programmée' },
    },
    {
      t: { it: 'Ricambi originali', en: 'Original spare parts', fr: 'Pièces d’origine' },
      d: { it: 'Per tendireggia, reggiatrici a batteria e pneumatiche', en: 'For manual tensioners, battery and pneumatic tools', fr: 'Pour tendeurs, cercleuses à batterie et pneumatiques' },
    },
    {
      t: { it: 'Documentazione e formazione', en: 'Documentation and training', fr: 'Documentation et formation' },
      d: { it: 'Manuali, lista ricambi, certificazioni', en: 'Manuals, spare parts lists, certifications', fr: 'Manuels, listes de pièces, certifications' },
    },
  ],

  sectorsTitle: { it: 'Settori che serviamo', en: 'Industries we serve', fr: 'Secteurs que nous servons' },
  sectors: [
    {
      t: { it: 'Ortofrutticolo', en: 'Fruit and vegetables', fr: 'Fruits et légumes' },
      d: { it: 'Reggiatura di casse, cassette e pallet', en: 'Strapping crates, boxes and pallets', fr: 'Cerclage de caisses, cagettes et palettes' },
    },
    {
      t: { it: 'Siderurgia e metalli', en: 'Steel and metals', fr: 'Sidérurgie et métaux' },
      d: { it: 'Reggia e sigilli in acciaio per fasci e coils', en: 'Steel strap and seals for bundles and coils', fr: 'Feuillard et chapes acier pour fardeaux et bobines' },
    },
    {
      t: { it: 'Logistica e magazzino', en: 'Logistics and warehousing', fr: 'Logistique et entrepôt' },
      d: { it: 'Chiusura di colli e bancali in uscita', en: 'Securing outgoing packages and pallets', fr: 'Fermeture des colis et palettes en sortie' },
    },
    {
      t: { it: 'Distributori di imballaggio', en: 'Packaging distributors', fr: 'Distributeurs d’emballage' },
      d: { it: 'Forniture continuative e listino B2B', en: 'Ongoing supply and B2B price list', fr: 'Approvisionnement continu et liste de prix B2B' },
    },
  ],

  heritageTitle: { it: 'Ottant’anni di reggiatura', en: 'Eighty years of strapping', fr: 'Quatre-vingts ans de cerclage' },
  heritageText: {
    it: 'Dalla prima officina meccanica nella Bergamasca allo stabilimento di 2.200 m² di Caravaggio: produzione, magazzino e assistenza sotto lo stesso tetto. Nel 2027 compiamo 80 anni.',
    en: 'From the first machine shop near Bergamo to the 2,200 m² facility in Caravaggio: production, warehouse and service under one roof. In 2027 we turn 80.',
    fr: 'Du premier atelier mécanique de la région de Bergame au site de 2 200 m² de Caravaggio : production, stock et assistance sous le même toit. En 2027, nous fêtons nos 80 ans.',
  },
  heritageCaption: {
    it: 'Lo stand Fratelli Pozzi alla 4ª Mostra Internazionale delle Conserve, Parma, settembre 1949.',
    en: 'The Fratelli Pozzi stand at the 4th International Canned Food Exhibition, Parma, September 1949.',
    fr: 'Le stand Fratelli Pozzi à la 4e Exposition internationale des conserves, Parme, septembre 1949.',
  },
  heritageLink: { it: 'La nostra storia →', en: 'Our history →', fr: 'Notre histoire →' },

  finalTitle: { it: 'Richiedi un preventivo', en: 'Request a quote', fr: 'Demander un devis' },
  finalText: {
    it: 'Indica prodotto e quantità: ti rispondiamo con disponibilità, tempi di consegna e condizioni.',
    en: 'Tell us product and quantity: we reply with availability, delivery times and terms.',
    fr: 'Indiquez produit et quantité : nous répondons avec disponibilité, délais et conditions.',
  },
  finalQuote: { it: 'Richiedi un preventivo', en: 'Request a quote', fr: 'Demander un devis' },
  finalReorder: { it: 'Ordine rapido reggia e sigilli', en: 'Quick reorder: strap and seals', fr: 'Commande rapide feuillard et chapes' },
} as const;

/** Specifica breve mostrata sulle card categoria in home */
export const CATEGORY_CARD_SPEC: Record<string, L> = {
  'tendireggia-manuali': { it: 'PP · 9–19 mm · sigillo serie A', en: 'PP · 9–19 mm · A-series seal', fr: 'PP · 9–19 mm · chape série A' },
  'reggiatrici-a-batteria': { it: 'PP / PET · 9–25 mm · fino a 5000 N', en: 'PP / PET · 9–25 mm · up to 5000 N', fr: 'PP / PET · 9–25 mm · jusqu’à 5000 N' },
  'reggiatrici-pneumatiche': { it: 'PP / PET / acciaio · 13–32 mm', en: 'PP / PET / steel · 13–32 mm', fr: 'PP / PET / acier · 13–32 mm' },
  reggia: { it: 'PP · PET · acciaio · colore e marchio su richiesta', en: 'PP · PET · steel · custom colour and logo', fr: 'PP · PET · acier · couleur et logo sur demande' },
  sigilli: { it: 'Per reggia in plastica e acciaio', en: 'For plastic and steel strap', fr: 'Pour feuillard plastique et acier' },
  'carrelli-porta-reggia': { it: 'Bobine PP, PET, acciaio · Ø int. 76–405 mm', en: 'PP, PET, steel coils · core Ø 76–405 mm', fr: 'Bobines PP, PET, acier · Ø int. 76–405 mm' },
};
