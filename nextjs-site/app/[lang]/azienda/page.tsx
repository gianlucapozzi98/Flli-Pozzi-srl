'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHead from '@/components/PageHead';

export default function Azienda() {
  const { t, lp } = useLanguage();
  return (
    <>
      <Header />
      <main>
        <PageHead
          crumbs={[{ label: t('nav.home'), href: lp('/') }, { label: t('nav.company') }]}
          eyebrow={t('pagehead.azienda')}
          title={t('azienda.h1')}
        />
        <div className="text-content-area">
        {/* Company Content */}
        <section style={{ paddingTop: '64px', paddingBottom: '80px' }}>
          <div className="px-8 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-[550/709] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative shadow-xl mx-auto lg:mx-0 max-w-[calc(100%-32px)] lg:max-w-none w-full lg:w-full"
              >
                <Image
                  src="/Immagini/fratelli-pozzi-foto-storica-1949.jpg"
                  alt="Foto Storica Flli Pozzi"
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
                className="text-lg text-text-light leading-relaxed mx-auto lg:mx-0 max-w-[calc(100%-32px)] lg:max-w-none text-justify lg:text-left"
                style={{ fontSize: '1.125rem', lineHeight: '1.875rem', width: '100%' }}
              >
                <p className="text-justify lg:text-left" style={{ marginBottom: '2.5rem', fontWeight: '400' }}>
                  {t('azienda.paragraph1')}
                </p>
                <p className="text-justify lg:text-left" style={{ marginBottom: '2.5rem', fontWeight: '400' }}>
                  {t('azienda.paragraph2')}
                </p>
                <p className="text-justify lg:text-left" style={{ marginBottom: '40px', fontWeight: '400' }}>
                  {t('azienda.paragraph3')}
                </p>
                <div className="flex flex-col items-center">
                  <div className="relative scale-[0.85] lg:scale-100" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' }}>
                    <Image
                      src="/Immagini/logo-fratelli-pozzi.png"
                      alt="Flli Pozzi Logo"
                      width={230}
                      height={92}
                      className="w-auto h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-bg-light" style={{ paddingTop: '65px', paddingBottom: '65px' }}>
          <div className="px-8 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="text-4xl font-bold mb-6 text-center font-heading" style={{ letterSpacing: '-0.02em' }}>
              {t('azienda.values.title')}
            </h2>
            <div style={{ marginBottom: '30px' }} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto lg:mx-0 max-w-[calc(100%-32px)] lg:max-w-none w-full">
              {[
                {
                  title: t('azienda.values.madeInItaly'),
                  description: t('azienda.values.madeInItaly.desc'),
                },
                {
                  title: t('azienda.values.excellence'),
                  description: t('azienda.values.excellence.desc'),
                },
                {
                  title: t('azienda.values.assistance'),
                  description: t('azienda.values.assistance.desc'),
                },
              ].map((value, index) => {
                const colors = ['#009246', '#FFFFFF', '#E30613']; // Verde (primo), Bianco (secondo), Rosso (terzo)
                return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl relative overflow-hidden"
                    style={{ border: '1px solid #D2D7DC', padding: '30px 26px 26px' }}
                >
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{ backgroundColor: colors[index], borderBottom: index === 1 ? '1px solid #D2D7DC' : undefined }}
                    />
                    <div style={{ marginTop: '0.5rem' }}>
                      <h3 className="text-2xl font-bold text-primary uppercase" style={{ marginBottom: '10px' }}>
                    {value.title}
                  </h3>
                      <p className="text-text-light leading-relaxed" style={{ fontSize: '1rem' }}>
                    {value.description}
                  </p>
                    </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quadri Section */}
        <section className="py-20" style={{ paddingTop: '30px', paddingBottom: '80px' }}>
          <div className="px-8 lg:px-8" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-xl overflow-hidden shadow-2xl mx-auto lg:mx-0 max-w-[calc(100%-32px)] lg:max-w-none w-full"
            >
              <Image
                src="/Immagini/quadri-fratelli-pozzi.webp"
                alt="Quadri Flli Pozzi"
                width={1400}
                height={800}
                className="w-full h-auto object-cover"
                sizes="100vw"
                priority={false}
              />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-bg-light" style={{ paddingTop: '40.75px', paddingBottom: '40.75px', display: 'flex', alignItems: 'center', minHeight: '200px' }}>
          <div className="px-8 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mx-auto lg:mx-0 max-w-[calc(100%-32px)] lg:max-w-none w-full"
            >
              <p className="text-xl text-text-light" style={{ fontSize: '1.25rem', lineHeight: '1.75rem', marginBottom: '47px' }}>
                {t('azienda.cta.text')}
              </p>
              <Link
                href={lp('/contatti')}
                className="btn-ui btn-red"
              >
                {t('azienda.cta.button')}
              </Link>
            </motion.div>
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

