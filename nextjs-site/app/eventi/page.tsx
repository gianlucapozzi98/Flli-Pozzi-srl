'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
  {
    title: 'MACFRUT',
    date: '8-10 MAGGIO 2024',
    image: 'macfrut_2024',
  },
  {
    title: 'IPACK-IMA',
    date: '19-23 MAGGIO 2015',
    image: 'ipackima_2015',
  },
  {
    title: 'FABEX SAUDI',
    date: '07-10 APRILE 2015',
    image: 'fabex',
  },
  {
    title: 'STEEL FAB',
    date: '20-23 GENNAIO 2015',
    image: 'steelfab',
  },
  {
    title: 'PROPACK CHINA',
    date: '17-21 LUGLIO 2013',
    image: 'propack',
  },
  {
    title: 'METAL & STEEL',
    date: '18-21 MAGGIO 2013',
    image: 'metalsteel2',
  },
  {
    title: 'BLECH CHINA',
    date: '14-16 MAGGIO 2013',
    image: 'blechchina2',
  },
  {
    title: 'GULF PRINT & PACK',
    date: '08-11 APRILE 2013',
    image: 'gulf',
  },
  {
    title: 'SINOPACK',
    date: '04-06 MARZO 2013',
    image: 'sinopack',
  },
  {
    title: 'MACFRUT',
    date: '26 SETTEMBRE 2012',
    image: 'mac-frut',
  },
  {
    title: 'IPACK-IMA',
    date: '28 FEBBRAIO 2012',
    image: 'ipackima-05',
  },
];

// Funzione helper per mappare i nomi degli eventi ai file immagine
function getEventImage(eventTitle: string, imageKey: string, eventDate: string): string | null {
  // Per eventi con lo stesso titolo, usiamo la data per distinguerli
  const imageMap: { [key: string]: { [key: string]: string } } = {
    'IPACK-IMA': {
      '19-23 MAGGIO 2015': '/Immagini/ipackima_2015.jpg',
      '28 FEBBRAIO 2012': '/Immagini/ipackima 2012.jpg',
    },
    'FABEX SAUDI': {
      'default': '/Immagini/fabex saudi.jpg',
    },
    'BLECH CHINA': {
      'default': '/Immagini/BLECH CHINA.jpg',
    },
    'MACFRUT': {
      '8-10 MAGGIO 2024': '/Immagini/macfrut-2024.gif',
      'default': '/Immagini/mac-frut 2012.jpg',
    },
    'PROPACK CHINA': {
      'default': '/Immagini/propack.jpg',
    },
    'GULF PRINT & PACK': {
      'default': '/Immagini/GULF PRINT & PACK.jpg',
    },
    'SINOPACK': {
      'default': '/Immagini/SINOPACK.jpg',
    },
    'METAL & STEEL': {
      'default': '/Immagini/METAL e steel.jpg',
    },
    'STEEL FAB': {
      'default': '/Immagini/steelfab.jpg',
    },
    'IPACK-IMA 2025': {
      'default': '/Immagini/IPACK-IMA 2025.jpeg',
    },
  };
  
  const eventMap = imageMap[eventTitle];
  if (!eventMap) return null;
  
  // Se c'è una mappatura specifica per la data, usala, altrimenti usa 'default'
  return eventMap[eventDate] || eventMap['default'] || null;
}

export default function Eventi() {
  const { t } = useLanguage();
  
  // Funzione helper per tradurre le date
  const translateDate = (dateString: string): string => {
    const monthMap: { [key: string]: string } = {
      'GENNAIO': t('eventi.months.gennaio'),
      'FEBBRAIO': t('eventi.months.febbraio'),
      'MARZO': t('eventi.months.marzo'),
      'APRILE': t('eventi.months.aprile'),
      'MAGGIO': t('eventi.months.maggio'),
      'GIUGNO': t('eventi.months.giugno'),
      'LUGLIO': t('eventi.months.luglio'),
      'AGOSTO': t('eventi.months.agosto'),
      'SETTEMBRE': t('eventi.months.settembre'),
      'OTTOBRE': t('eventi.months.ottobre'),
      'NOVEMBRE': t('eventi.months.novembre'),
      'DICEMBRE': t('eventi.months.dicembre'),
    };
    
    // Sostituisce il mese italiano con quello tradotto
    let translatedDate = dateString;
    Object.keys(monthMap).forEach(month => {
      translatedDate = translatedDate.replace(month, monthMap[month]);
    });
    
    return translatedDate;
  };
  
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* IPACK-IMA 2025 Featured Event */}
        <section className="py-20" style={{ paddingTop: '120px' }}>
          <div className="px-4 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-[1189/714] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative"
              >
                <Image
                  src="/Immagini/IPACK-IMA 2025.jpeg"
                  alt="Stand Flli Pozzi - IPACK-IMA 2025"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
                style={{ maxHeight: '714px', overflow: 'hidden' }}
              >
                <div className="space-y-4">
                <h2 className="text-3xl font-bold font-heading">
                    {t('eventi.ipack2025.title')}
                </h2>
                <p className="text-text-light leading-relaxed">
                    {t('eventi.ipack2025.text1')}
                  </p>
                  <p className="text-text-light leading-relaxed">
                    {t('eventi.ipack2025.text2')}
                </p>
                <p className="text-text-light leading-relaxed">
                    {t('eventi.ipack2025.text3')}
                </p>
                <p className="text-text-light leading-relaxed">
                    {t('eventi.ipack2025.moreInfo')}
                  </p>
                </div>
                <a
                  href="/Immagini/Poster A3 - FESR 21-27.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ marginTop: '62px' }}
                >
                  <Image
                    src="/Immagini/Coesione Italia Lombardia - Colore.jpg"
                    alt="Coesione Italia Lombardia"
                    width={1189}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div style={{ height: '60px' }}></div>

        {/* IPACK-IMA 2022 Featured Event */}
        <section className="py-20">
          <div className="px-4 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="aspect-[1189/714] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative"
                >
                  <Image
                    src="/Immagini/IPACK-IMA 2022 - Stand Flli Pozzi.jpg"
                    alt="Stand Flli Pozzi - IPACK-IMA 2022"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div style={{ height: '60px' }}></div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
                style={{ maxHeight: '714px', overflow: 'hidden' }}
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold font-heading">
                    {t('eventi.ipack2022.title')}
                  </h2>
                  <p className="text-text-light leading-relaxed">
                    {t('eventi.ipack2022.text1')}
                  </p>
                  <p className="text-text-light leading-relaxed">
                    {t('eventi.ipack2022.text2')}
                  </p>
                  <p className="text-text-light leading-relaxed">
                    {t('eventi.ipack2022.text3')}
                  </p>
                </div>
                <div className="w-full rounded-lg overflow-hidden" style={{ marginTop: '16px' }}>
                  <Image
                    src="/Immagini/loghi bando ipackima 2022.jpg"
                    alt="Loghi bando IPACK-IMA 2022"
                    width={1189}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20" style={{ paddingBottom: '80px' }}>
          <div className="px-4 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => {
                const eventImage = getEventImage(event.title, event.image, event.date);
                return (
                <motion.div
                    key={`${event.title}-${event.date}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {eventImage ? (
                        <Image
                          src={eventImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-text-light font-semibold text-center px-4">
                          {event.title}
                        </span>
                      )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-text-light font-medium">{translateDate(event.date)}</p>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

