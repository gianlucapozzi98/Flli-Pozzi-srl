'use client';

import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

function getProductCategories(t: (key: string) => string) {
  return [
  {
    id: 'reggiatrici',
      title: t('prodotti.categories.reggiatrici'),
      description: t('prodotti.categories.reggiatrici.desc'),
  },
  {
    id: 'carrelli',
      title: t('prodotti.categories.carrelli'),
      description: t('prodotti.categories.carrelli.desc'),
  },
  {
    id: 'reggia',
      title: t('prodotti.categories.reggia'),
      description: t('prodotti.categories.reggia.desc'),
  },
  {
    id: 'sigilli',
      title: t('prodotti.categories.sigilli'),
      description: t('prodotti.categories.sigilli.desc'),
    },
    {
      id: 'accessori',
      title: t('prodotti.categories.accessori'),
      description: t('prodotti.categories.accessori.desc'),
  },
];
}

const reggiatrici = {
  manuali: [
    { name: 'CP2000', description: 'Tendireggia manuale per reggia in polipropilene da mm 9 a 19 con sigillo serie A.' },
    { name: 'BEST', description: 'Tendireggia manuale per reggia in polipropilene da mm 9 a 19 con tensionamento speciale, per sigillo serie A.' },
    { name: 'PLR/G', description: 'Tendireggia manuale per reggia in polipropilene da mm 9 a 19 con tensionamento veloce, per sigillo serie A.' },
  ],
  batteria: [
    { name: 'GT SMART+', description: 'Reggiatrice a batteria per reggia tipo PP/PET mm 13/16 saldatura a vibrazione colli piani e tondi . Tensione regolabile fino a 3000 N. Per spessori della reggia fino a mm 1,0. La batteria 14V / 3.0 AH LI-ION si ricarica in soli 15 minuti.' },
    { name: 'GT-ONE', description: 'Reggiatrice a batteria per reggia in PP/PET mm 13/16/19 saldatura a vibrazione colli piani e tondi. Tensione regolabile fino a 3000 N. Per spessori della reggia da 0,8 a 1,2. La batteria 14V / 3.0 AH LI-ION si ricarica in soli 15 minuti.' },
    { name: 'GTXTREME', description: 'Reggiatrice a batteria per reggia tipo PET mm 19/25 saldatura a vibrazione colli piani e tondi . Tensione regolabile fino a 5000 N. Per spessori della reggia fino a mm 1,3. La batteria 14V / 3.0 AH LI-ION si ricarica in soli 15 minuti.' },
    { name: 'CP 007', description: 'Reggiatrice a batteria per reggia tipo PP/PET mm 13/16 con tensionamento manuale e saldatura a vibrazione, colli piani e tondi. Tensione regolabile fino a 2000 N. Per spessori della reggia fino a mm 1,0. La batteria 14V / 3.0 AH LI-ION si ricarica in soli 15 minuti.' },
    { name: 'GT MAX', description: 'Reggiatrice a batteria per reggia tipo PET mm 19/25 saldatura a vibrazione colli piani e tondi. Tensione regolabile fino a 5000 N. Per spessori della reggia fino a mm 1,3. La batteria 14V / 3.0 AH LI-ION si ricarica in soli 15 minuti.' },
    { name: 'VIPER', description: 'Reggiatrice a batteria per reggia tipo PET mm 9/12/16/19 saldatura a vibrazione colli piani e tondi . La forza di tensionamento è programmabile in Newton, Kg e libbre. Costituita da un\'innovativa interfaccia touchscreen. Batteria da 18V / 3.0 AH LI-ION.' },
  ],
  pneumaticheVibrazione: [
    { name: 'FAST/PN L T', description: 'Reggiatrice pneumatica per reggia in PP/PET mm 13/16/19 saldatura a vibrazione colli piani e tondi tensione regolabile fino a 2000 N – per spessori della reggia fino a mm 1.' },
    { name: 'FAST/PN HIGH TENSION', description: 'Reggiatrice pneumatica per reggia in Poliestere mm 19/25/32 saldatura a vibrazione colli piani e tondi tensione regolabile fino a 6000 N – per spessori della reggia fino a mm 1,3.' },
  ],
  pneumaticheAcciaioConSigillo: [
    { name: 'FP 13-16-19', description: 'Reggiatrice pneumatica per reggia in acciaio da mm 13, 16 e 19, con sigillo serie F (Overlap). Ottima per la reggiatura di colli tondi. Spessore da 0,5 a 0,6 mm. Peso: 4,5 kg.' },
    { name: 'FP 19S - 25S - 32S', description: 'Reggiatrice pneumatica per reggia in acciaio da mm 19, 25 e 32, con sigillo serie F (Overlap). Pesa solo Kg. 10 ed ideale per la reggiatura di colli piani e tondi, spessore da 0,8 a 0,9 mm.' },
    { name: 'FP 32 PLUS', description: 'Reggiatrice pneumatica per reggia in acciaio da mm 19, 25 e 32, con sigillo serie F (Overlap). Spessore da 1,0 a 1,2 mm.' },
  ],
  pneumaticheAcciaioSenzaSigillo: [
    { name: 'SL3 PN', description: 'Reggiatrice pneumatica senza sigillo per reggia in acciaio da mm 13, 16 e 19. Spessore max mm 0,6. Peso: 7 Kg.' },
  ],
};

const carrelli = [
  { name: 'GM 15', description: 'Carrello porta reggia per bobine in polipropilene mm 9 -19, completo di cassetta per contenere tendireggia e sigilli. Diametro interno da mm 390 o 405.' },
  { name: 'FP15', description: 'Carrello porta reggia per bobine in polipropilene mm 9 -19, completo di cassetta per contenere tendireggia e sigilli. Diametro interno da mm 150/200/280/405.' },
  { name: 'FP 93', description: 'Carrello porta reggia per bobine in poliestere e acciaio da mm 9-32 e diametro interno 405 e acciaio con matassata mm 13-19 e diametro interno 405, completo di cassetta per contenere tendireggia e sigilli. Diametro interno da mm 390 o 405.' },
  { name: 'FP15S', description: 'Carrello porta reggia per bobine in polipropilene con diametro interno mm 200-280. Completo di freno e cassetta per contenere tendireggia e sigilli.' },
  { name: 'FP 92', description: 'Carrello porta reggia per bobine in acciaio in rotoli monospira da 13 a 32 mm, completo di cassetta per contenere tendireggia e sigilli.' },
  { name: 'FP13', description: 'Carrello porta reggia per bobine tessili in poliestere con diam. int. mm 76 larghezza mm. 140 e 150.' },
];


const sigilli = {
  plasticaPoliestere: [
    { name: 'Bulinati lucidi', description: '' },
    { name: 'Bulinati zincati', description: '' },
    { name: 'Zincati', description: '' },
  ],
  acciaio: [
    { name: 'Overlap', description: '' },
  ],
};

// Funzione helper per mappare i nomi dei prodotti ai file immagine
function getProductImage(productName: string): string | null {
  const imageMap: { [key: string]: string } = {
    'CP2000': '/Immagini/cp2000.png',
    'BEST': '/Immagini/best.png',
    'PLR/G': '/Immagini/plrg.png',
    'GT SMART+': '/Immagini/gtsmart+.png',
    'GT-ONE': '/Immagini/GTone.png',
    'GTXTREME': '/Immagini/gtxtreme.png',
    'CP 007': '/Immagini/cp007.gif',
    'GT MAX': '/Immagini/gtmax.gif',
    'VIPER': '/Immagini/reggiatrice-automatica-VIPER.gif',
    'FAST/PN L T': '/Immagini/FAST:PN L T flli pozzi.gif',
    'FAST/PN HIGH TENSION': '/Immagini/FAST:PN L T flli pozzi.gif',
    'FP 13-16-19': '/Immagini/FP 13-16-19.png',
    'FP 19S - 25S - 32S': '/Immagini/FP 19S.png',
    'FP 32 PLUS': '/Immagini/fp32 plus.gif',
    'SL3 PN': '/Immagini/sl3pn.png',
    'GM 15': '/Immagini/gm15.gif',
    'FP15': '/Immagini/FP15.png',
    'FP 93': '/Immagini/fp 93.png',
    'FP15S': '/Immagini/fp15s.gif',
    'FP 92': '/Immagini/fp 92.png',
    'FP13': '/Immagini/fp13.gif',
    'Bulinati lucidi': '/Immagini/sigilli Bulinati lucidi.png',
    'Bulinati zincati': '/Immagini/sigilli Bulinati zincati .png',
    'Zincati': '/Immagini/Sigillo Zincato.png',
    'Overlap': '/Immagini/sigillo-Overlap.png',
  };
  
  return imageMap[productName] || null;
}

// Componente per la card prodotto con immagine (mobile: 2 per riga, descrizione troncata con tap per espandere)
function ProductCard({ product, index }: { product: { name: string; description: string }; index: number }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const imagePath = getProductImage(product.name);
  const isSigillo = product.name.includes('Bulinati') || product.name.includes('Zincati') || product.name === 'Overlap';
  const description = getProductDescriptionTranslation(product.name, product.description, t);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full min-w-0 max-w-full cursor-pointer lg:cursor-default"
      style={{ opacity: 1 }}
      onClick={(e) => { if (typeof window !== 'undefined' && window.innerWidth < 1024) setExpanded((prev) => !prev); }}
    >
      <div className={`aspect-square relative overflow-hidden mb-3 lg:mb-6 ${isSigillo ? 'bg-transparent' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
        {imagePath ? (
          <img
            src={imagePath}
            alt={product.name}
            className="w-full h-full object-contain p-2 lg:p-4"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: isSigillo ? 'multiply' : 'normal',
            }}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-text-light font-semibold text-sm text-center px-2">
            {getProductNameTranslation(product.name, t)}
          </span>
        )}
      </div>
      <div className="p-3 lg:p-6" style={{ paddingTop: 0 }}>
        <h3 className="text-base lg:text-xl font-semibold mb-2 lg:mb-6">{getProductNameTranslation(product.name, t)}</h3>
        {description ? (
          <>
            <p
              className={`text-text-light leading-relaxed text-sm lg:text-base lg:mb-4 ${!expanded ? 'line-clamp-2 lg:line-clamp-none' : ''}`}
            >
              {description}
            </p>
            <span className="lg:hidden text-primary text-xs font-medium mt-1 block">
              {expanded ? 'Meno' : 'Leggi tutto'}
            </span>
          </>
        ) : null}
      </div>
    </motion.div>
  );
}

function getProductNameTranslation(name: string, t: (key: string) => string): string {
  const translations: Record<string, string> = {
    'Bulinati lucidi': t('prodotti.sections.sigilli.bulinatiLucidi'),
    'Bulinati zincati': t('prodotti.sections.sigilli.bulinatiZincati'),
    'Zincati': t('prodotti.sections.sigilli.zincati'),
    'Overlap': t('prodotti.sections.sigilli.overlap'),
  };
  return translations[name] || name;
}

function getProductDescriptionTranslation(name: string, description: string, t: (key: string) => string): string {
  // Se la descrizione è vuota, restituisci vuoto
  if (!description) return description;
  
  // Mappa dei nomi prodotti alle chiavi di traduzione
  const nameToKey: Record<string, string> = {
    'CP2000': 'CP2000',
    'BEST': 'BEST',
    'PLR/G': 'PLRG',
    'GT SMART+': 'GTSMART',
    'GT-ONE': 'GTONE',
    'GTXTREME': 'GTXTREME',
    'CP 007': 'CP007',
    'GT MAX': 'GTMAX',
    'VIPER': 'VIPER',
    'FAST/PN L T': 'FASTPNLT',
    'FAST/PN HIGH TENSION': 'FASTPNHIGHTENSION',
    'FP 13-16-19': 'FP131619',
    'FP 19S - 25S - 32S': 'FP19S25S32S',
    'FP 32 PLUS': 'FP32PLUS',
    'SL3 PN': 'SL3PN',
    'GM 15': 'GM15',
    'FP15': 'FP15',
    'FP 93': 'FP93',
    'FP15S': 'FP15S',
    'FP 92': 'FP92',
    'FP13': 'FP13',
  };
  
  const key = nameToKey[name];
  if (key) {
    const translationKey = `prodotti.descriptions.${key}`;
    const translated = t(translationKey);
    // Se la traduzione esiste e non è uguale alla chiave, usala
    if (translated !== translationKey) {
      return translated;
    }
  }
  
  // Altrimenti restituisci la descrizione originale
  return description;
}

export default function Prodotti() {
  const { t } = useLanguage();
  const productCategories = getProductCategories(t);
  const [isMounted, setIsMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [animationOffset, setAnimationOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll alla sezione indicata dall'hash (es. da home "Forniture per imballaggio" -> #accessori)
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (!hash) return;
    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) {
        const headerOffset = 200;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };
    scrollToHash();
    const t = setTimeout(scrollToHash, 300);
    return () => clearTimeout(t);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current || !innerCarouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    // Calcola la posizione corrente dell'animazione
    const computedStyle = window.getComputedStyle(innerCarouselRef.current);
    const matrix = new DOMMatrix(computedStyle.transform);
    setAnimationOffset(matrix.m41); // m41 è translateX
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = e.pageX - startX;
    setDragOffset(walk);
  };

  const handleMouseUp = () => {
    if (isDragging && innerCarouselRef.current) {
      const newOffset = animationOffset + dragOffset;
      // Calcola la posizione relativa per mantenere la continuità
      const totalWidth = innerCarouselRef.current.scrollWidth / 2; // Metà perché duplicato
      const relativeOffset = newOffset % totalWidth;
      setAnimationOffset(relativeOffset);
      setDragOffset(0);
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging && innerCarouselRef.current) {
      const newOffset = animationOffset + dragOffset;
      const totalWidth = innerCarouselRef.current.scrollWidth / 2;
      const relativeOffset = newOffset % totalWidth;
      setAnimationOffset(relativeOffset);
      setDragOffset(0);
    }
    setIsDragging(false);
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Quick Navigation */}
        <section className="bg-bg-light overflow-x-auto lg:overflow-visible lg:pt-8 lg:pb-8" style={{ 
          paddingTop: '16px', 
          paddingBottom: '16px',
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          zIndex: 40,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: '100%'
        }}>
          <div className="flex flex-col items-center lg:items-center" style={{ maxWidth: '1800px', margin: '0 auto', padding: '0 1rem' }}>
            <div className="flex justify-start lg:justify-center gap-4 lg:gap-6 w-full overflow-x-auto lg:overflow-visible px-4 lg:px-0" style={{ flexWrap: 'nowrap', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}>
              {productCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(category.id);
                    if (element) {
                      const headerOffset = 200;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="bg-white p-4 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border-2 border-transparent hover:border-primary cursor-pointer flex-shrink-0 lg:flex-1 lg:max-w-[280px]"
                  style={{ minWidth: '180px', maxWidth: '280px', flex: '0 0 auto' }}
                >
                  <h3 className="text-base lg:text-xl font-semibold mb-1 lg:mb-2 text-primary whitespace-nowrap">
                    {category.title}
                  </h3>
                  <p className="text-text-light text-xs lg:text-sm">{category.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Spacer per compensare lo spazio dei bottoni fixed */}
        <div style={{ height: '180px' }}></div>

        <div className="text-content-area">
        {/* Reggiatrici Section */}
        <section id="reggiatrici" style={{ paddingTop: '2.8rem', paddingBottom: '2.8rem', scrollMarginTop: '200px' }}>
          <div className="flex flex-col items-center" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.reggiatrici.manuali')}
            </h2>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 w-full" style={{ marginBottom: '2.8rem' }}>
              {reggiatrici.manuali.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>

            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.reggiatrici.batteria')}
            </h2>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 w-full" style={{ marginBottom: '2.8rem' }}>
              {reggiatrici.batteria.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
                  </div>

            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.reggiatrici.pneumaticheVibrazione')}
            </h2>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 w-full" style={{ marginBottom: '2.8rem' }}>
              {reggiatrici.pneumaticheVibrazione.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
                  </div>

            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.reggiatrici.pneumaticheAcciaioConSigillo')}
            </h2>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 w-full" style={{ marginBottom: '2.8rem' }}>
              {reggiatrici.pneumaticheAcciaioConSigillo.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>

            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.reggiatrici.pneumaticheAcciaioSenzaSigillo')}
            </h2>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 w-full" style={{ marginBottom: '2.8rem' }}>
              {reggiatrici.pneumaticheAcciaioSenzaSigillo.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Carrelli Section */}
        <section id="carrelli" className="bg-bg-light" style={{ paddingTop: '2.8rem', paddingBottom: '2.8rem', scrollMarginTop: '200px' }}>
          <div className="flex flex-col items-center" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.carrelli')}
            </h2>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 w-full" style={{ marginBottom: '2.8rem' }}>
              {carrelli.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Reggia Section */}
        <section id="reggia" style={{ paddingTop: '2.8rem', paddingBottom: '2.8rem', scrollMarginTop: '200px' }}>
          <div className="flex flex-col items-center" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.reggia.title')}
            </h2>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />

            {/* Reggia in Polipropilene */}
            <div className="w-full" style={{ maxWidth: '900px', marginBottom: '4rem' }}>
              <h3 className="font-bold text-center mb-2 font-heading" style={{ marginBottom: '1rem', fontSize: '32px' }}>{t('prodotti.sections.reggia.polipropilene')}</h3>
              <p className="text-center text-text-light mb-6" style={{ marginBottom: '2rem', fontSize: '18px' }}>{t('prodotti.sections.reggia.onRequest')}</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.section')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.resistance')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.length')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">9 x 0,6 d 200</td>
                      <td className="px-6 py-4">115</td>
                      <td className="px-6 py-4">4000</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">12 x 0,65 d 200/395</td>
                      <td className="px-6 py-4">190</td>
                      <td className="px-6 py-4">2750</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">12 x 0,7 d 60</td>
                      <td className="px-6 py-4">210</td>
                      <td className="px-6 py-4">4 x 1000</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">12 x 0,7 d 395</td>
                      <td className="px-6 py-4">210</td>
                      <td className="px-6 py-4">2500</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">15 x 0,8</td>
                      <td className="px-6 py-4">300</td>
                      <td className="px-6 py-4">1500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reggia in Poliestere */}
            <div className="w-full" style={{ maxWidth: '900px', marginBottom: '4rem' }}>
              <h3 className="font-bold text-center mb-2 font-heading" style={{ marginBottom: '1rem', fontSize: '32px' }}>{t('prodotti.sections.reggia.poliestere')}</h3>
              <p className="text-center text-text-light mb-6" style={{ marginBottom: '2rem', fontSize: '18px' }}>{t('prodotti.sections.reggia.onRequest')}</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.measure')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.resistance')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.length')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">16 x 0,8</td>
                      <td className="px-6 py-4">490</td>
                      <td className="px-6 py-4">1500</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">16 x 1</td>
                      <td className="px-6 py-4">630</td>
                      <td className="px-6 py-4">1200</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">19 x 1</td>
                      <td className="px-6 py-4">740</td>
                      <td className="px-6 py-4">1000</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">19 x 1,27</td>
                      <td className="px-6 py-4">850</td>
                      <td className="px-6 py-4">800</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">32 x 1,27</td>
                      <td className="px-6 py-4">1500</td>
                      <td className="px-6 py-4">400</td>
                    </tr>
                  </tbody>
                </table>
              </div>
                  </div>

            {/* Reggia in Acciaio */}
            <div className="w-full" style={{ maxWidth: '900px', marginBottom: '4rem' }}>
              <h3 className="font-bold text-center mb-2 font-heading" style={{ marginBottom: '1rem', fontSize: '32px' }}>{t('prodotti.sections.reggia.acciaio')}</h3>
              <p className="text-center text-text-light mb-6" style={{ marginBottom: '2rem', fontSize: '18px' }}>{t('prodotti.sections.reggia.acciaio.desc')}</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.model')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.tensileStrength')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.measure')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{t('prodotti.steel.polished')}</td>
                      <td className="px-6 py-4">70 kg</td>
                      <td className="px-6 py-4">13 x 0,5</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{t('prodotti.steel.galvanized')}</td>
                      <td className="px-6 py-4">85 kg</td>
                      <td className="px-6 py-4">16 x 0,5</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{t('prodotti.steel.blued')}</td>
                      <td className="px-6 py-4">85 kg</td>
                      <td className="px-6 py-4">16 x 0,6</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{t('prodotti.steel.painted')}</td>
                      <td className="px-6 py-4">85 kg</td>
                      <td className="px-6 py-4">19 x 0,5</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{t('prodotti.steel.highResistance')}</td>
                      <td className="px-6 py-4">{t('prodotti.steel.upTo')} 100 kg</td>
                      <td className="px-6 py-4">
                        19 x 0,6<br />
                        19 x 0,8<br />
                        25 x 0,8<br />
                        32 x 0,8<br />
                        32 x 1
                      </td>
                    </tr>
                  </tbody>
                </table>
                  </div>
            </div>
          </div>
        </section>

        {/* Sigilli Section */}
        <section id="sigilli" className="bg-bg-light" style={{ paddingTop: '2.8rem', paddingBottom: '2.8rem', scrollMarginTop: '200px' }}>
          <div className="flex flex-col items-center" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.sigilli.plastica')}
            </h2>
            <p className="text-center text-text-light mb-6" style={{ marginBottom: '2rem', fontSize: '18px' }}>
              {t('prodotti.description.plastica')}
            </p>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 w-full" style={{ marginBottom: '4rem' }}>
              {sigilli.plasticaPoliestere.map((product, index) => (
                <div key={product.name} className="flex flex-col items-center" style={{ width: '100%', maxWidth: '350px' }}>
                  <ProductCard product={product} index={index} />
                  {product.name === 'Bulinati lucidi' && (
                    <div className="w-full" style={{ maxWidth: '350px', marginTop: '1rem' }}>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.article')}</th>
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.dimensions')}</th>
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.quantity')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">K5A</td>
                              <td className="px-6 py-4">13 x 28 x 0,5</td>
                              <td className="px-6 py-4">3.000 pz</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">K8A</td>
                              <td className="px-6 py-4">16 x 28 x 0,5</td>
                              <td className="px-6 py-4">2.000 pz</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {product.name === 'Bulinati zincati' && (
                    <div className="w-full" style={{ maxWidth: '350px', marginTop: '1rem' }}>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.article')}</th>
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.dimensions')}</th>
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.quantity')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">K5D</td>
                              <td className="px-6 py-4">13 x 28 x 0,5</td>
                              <td className="px-6 py-4">3.000 pz</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">K8D</td>
                              <td className="px-6 py-4">16 x 28 x 0,5</td>
                              <td className="px-6 py-4">2.000 pz</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {product.name === 'Zincati' && (
                    <div className="w-full" style={{ maxWidth: '350px', marginTop: '1rem' }}>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                          <thead>
                            <tr className="bg-primary text-white">
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.article')}</th>
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.dimensions')}</th>
                              <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.quantity')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">Grip 13</td>
                              <td className="px-6 py-4">13 x 30 x 0,9</td>
                              <td className="px-6 py-4">1.000 pz</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                              <td className="px-6 py-4 font-medium">Grip 16</td>
                              <td className="px-6 py-4">16 x 30 x 0,9</td>
                              <td className="px-6 py-4">1.000 pz</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                  </div>
                  )}
                  </div>
              ))}
            </div>

            <h2 className="text-4xl font-bold text-center font-heading w-full" style={{ marginTop: '2.8rem', marginBottom: '2.8rem' }}>
              {t('prodotti.sections.sigilli.acciaio')}
            </h2>
            <p className="text-center text-text-light mb-6" style={{ marginBottom: '2rem', fontSize: '18px' }}>
              {t('prodotti.description.plastica')}
            </p>
            <div className="w-24 h-1 bg-primary" style={{ marginBottom: '3rem' }} />
            
            <div className="w-full" style={{ maxWidth: '1200px', marginBottom: '2.8rem' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex justify-center w-full" style={{ width: '338px', maxWidth: '100%' }}>
                  {sigilli.acciaio.map((product, index) => (
                    <ProductCard key={product.name} product={product} index={index} />
                  ))}
                </div>
                <div className="overflow-x-auto" style={{ marginTop: '115px' }}>
                  <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.article')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.dimensions')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{t('prodotti.table.quantityFull')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">F16</td>
                      <td className="px-6 py-4">16 x 24 x 0,6</td>
                      <td className="px-6 py-4">4.000 pz</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">F19</td>
                      <td className="px-6 py-4">19 x 24 x 0,6</td>
                      <td className="px-6 py-4">2.000 pz</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">F19</td>
                      <td className="px-6 py-4">19 x 45 x 0,6</td>
                      <td className="px-6 py-4">2.000 pz</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">F25</td>
                      <td className="px-6 py-4">25 x 45 x 0,9</td>
                      <td className="px-6 py-4">2.000 pz</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">F32</td>
                      <td className="px-6 py-4">32 x 45 x 0,9</td>
                      <td className="px-6 py-4">1.000 pz</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">F32 L</td>
                      <td className="px-6 py-4">32 x 57 x 0,9</td>
                      <td className="px-6 py-4">800 pz</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                  </div>
            </div>
          </div>
        </section>

        {/* Infinite Carousel Section */}
        <section className="bg-white overflow-hidden" style={{ paddingTop: '48px', paddingBottom: '68px' }}>
          <div 
            ref={carouselRef}
            className="relative"
            style={{ 
              width: '100%', 
              height: '240px',
              cursor: isDragging ? 'grabbing' : 'grab',
              overflow: 'hidden'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              ref={innerCarouselRef}
              className={`flex ${isDragging ? '' : 'infinite-carousel'}`}
              style={{
                width: 'max-content',
                userSelect: 'none',
                transform: isDragging ? `translateX(${animationOffset + dragOffset}px)` : undefined,
                '--animation-offset': `${animationOffset}px`
              } as React.CSSProperties}
            >
              {/* Duplico le immagini per l'effetto infinito */}
              {[...Array(2)].map((_, duplicateIndex) => (
                <div key={`duplicate-${duplicateIndex}`} className="flex">
                  {/* Immagini reali */}
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/Carrello porta reggia polipropilene poliestere.png"
                        alt="Carrello porta reggia polipropilene poliestere"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/reggia tessile con fibbia.png"
                        alt="Reggia tessile con fibbia"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/bancali reggiati con angolari di cartone.png"
                        alt="Bancali reggiati con angolari di cartone"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/angolari in plastica reggia.png"
                        alt="Angolari in plastica reggia"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/reggia in acciaio.png"
                        alt="Reggia in acciaio"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/Film estensibile manuale trasparente.png"
                        alt="Film estensibile manuale trasparente"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/Reggia in ferro e sigillo.png"
                        alt="Reggia in ferro e sigillo"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                    <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
                      <Image
                        src="/Immagini/reggia poliestere pet su bancale.png"
                        alt="Reggia poliestere pet su bancale"
                        width={320}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Nessun placeholder - abbiamo 8 immagini */}
                  {Array.from({ length: 0 }).map((_, index) => (
                    <div key={`placeholder-${duplicateIndex}-${index}`} className="flex-shrink-0 mx-4" style={{ width: '320px', height: '220px' }}>
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-gray-500 text-sm">Placeholder {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="accessori" className="py-20 bg-bg-light" style={{ scrollMarginTop: '200px' }}>
          <div className="px-4 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xl text-text-light" style={{ fontSize: '1.25rem', lineHeight: '1.75rem', marginBottom: '2rem' }}>
                {t('prodotti.cta.text')}
              </p>
              <Link
                href="/contatti"
                className="inline-block py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
                style={{ fontSize: '1.125rem', paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                {t('prodotti.cta.button')}
              </Link>
              <div style={{ height: '25px' }} />
            </motion.div>
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

