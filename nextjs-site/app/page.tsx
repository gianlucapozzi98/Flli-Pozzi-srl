'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  CheckBadgeIcon, 
  SparklesIcon, 
  WrenchScrewdriverIcon,
  ClockIcon,
  CogIcon,
  DocumentTextIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

function getFeatures(t: (key: string) => string) {
  return [
  {
    icon: CheckBadgeIcon,
      title: t('home.features.madeInItaly'),
      description: t('home.features.madeInItaly.desc'),
  },
  {
    icon: SparklesIcon,
      title: t('home.features.excellence'),
      description: t('home.features.excellence.desc'),
  },
  {
    icon: WrenchScrewdriverIcon,
      title: t('home.features.assistance'),
      description: t('home.features.assistance.desc'),
    },
  ];
}

// Componente Carosello Tendireggia Manuali
function TendireggiaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const tendireggiaImages = [
    { src: '/Immagini/tendireggia-manuale-cp2000.png', alt: 'CP2000' },
    { src: '/Immagini/tendireggia-manuale-best.png', alt: 'BEST' },
    { src: '/Immagini/tendireggia-manuale-plr-g.png', alt: 'PLR/G' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % tendireggiaImages.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging, tendireggiaImages.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-transparent">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {tendireggiaImages.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center p-6"
          >
            <div className="relative w-full h-full" style={{ maxWidth: '28rem' }}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicatori */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {tendireggiaImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-6' : 'bg-gray-400'
            }`}
            aria-label={`Vai all'immagine ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const features = getFeatures(t);
  
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.26 }}
            animate={{ scale: 1.045 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/Immagini/stabilimento-fratelli-pozzi-caravaggio.png"
              alt="Flli Pozzi esterno"
              fill
              className="object-cover"
              priority
              style={{ opacity: 0.8, objectPosition: 'left center' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 text-center text-white px-6 lg:px-4" style={{ paddingBottom: '110px', width: '100%' }}>
            {/* Margini inline: il reset globale `* { margin: 0 }` in globals.css non è in un layer e vince sulle utility Tailwind */}
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-white/85 text-balance" style={{ marginBottom: '16px' }}>
              {t('home.hero.eyebrow')}
            </p>
            {/* H1 visibile da subito (niente opacity 0): è l'elemento principale per LCP e SEO */}
            <h1
              className="text-[32px] leading-[1.08] md:text-5xl lg:text-[56px] font-black font-heading uppercase tracking-tight max-w-5xl text-balance"
              style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
            >
              {t('home.hero.title')}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-xl lg:text-2xl font-light uppercase tracking-wide"
            >
              {t('home.hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
              style={{ marginTop: '32px' }}
            >
              <Link
                href="/contatti?topic=preventivo"
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
            </motion.div>
          </div>
        </section>

        <div className="text-content-area">
        {/* Features Section */}
        <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="w-full flex justify-center px-8 lg:px-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl w-full">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-10 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center flex-1 max-w-sm"
                >
                  <feature.icon className="mb-6 text-primary" style={{ width: '68px', height: '68px' }} />
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-text-light text-base">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reggiatrici Preview */}
        <section className="bg-bg-light" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-8 lg:px-4">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ maxWidth: '1200px', width: '100%', gap: '32px' }}>
                <div className="flex justify-center md:justify-end">
                  <div className="aspect-square rounded-lg overflow-hidden" style={{ width: '100%', maxWidth: '500px' }}>
                    <TendireggiaCarousel />
                  </div>
              </div>
                <div className="flex justify-center md:justify-start">
                  <div className="text-center md:text-left px-4 lg:px-0" style={{ maxWidth: '600px', width: '100%' }}>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading lg:whitespace-nowrap" style={{ marginBottom: '20px' }}>
                      {t('home.reggiatrici.title')}
                </h2>
                    <p className="text-lg text-text-light leading-relaxed text-justify lg:text-left" style={{ marginBottom: '20px' }}>
                      {t('home.reggiatrici.text')}
                </p>
                    <div className="flex justify-center md:justify-start" style={{ marginTop: '3px' }}>
                <Link
                  href="/prodotti#reggiatrici"
                        className="inline-block bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                        style={{ paddingLeft: '27px', paddingRight: '27px', paddingTop: '13px', paddingBottom: '13px' }}
                >
                  {t('home.reggiatrici.button')}
                </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Assistenza Section */}
        <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-8 lg:px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center font-heading" style={{ marginBottom: '60px' }}>
              {t('home.assistance.title')}
            </h2>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ maxWidth: '1200px', width: '100%', paddingLeft: '3px', paddingRight: '3px' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center flex flex-col items-center px-6 lg:px-8"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-full">
                  <ClockIcon className="text-primary" style={{ width: '48px', height: '48px' }} />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  {t('home.assistance.rapid')}
                </h3>
                <p className="text-text-light leading-relaxed text-justify lg:text-left">
                  {t('home.assistance.rapid.desc')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center flex flex-col items-center px-6 lg:px-8"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-full">
                  <CogIcon className="text-primary" style={{ width: '48px', height: '48px' }} />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  {t('home.assistance.spare')}
                </h3>
                <p className="text-text-light leading-relaxed text-justify lg:text-left">
                  {t('home.assistance.spare.desc')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-8 text-center flex flex-col items-center px-6 lg:px-8"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-full">
                  <DocumentTextIcon className="text-primary" style={{ width: '48px', height: '48px' }} />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  {t('home.assistance.docs')}
                </h3>
                <p className="text-text-light leading-relaxed text-justify lg:text-left">
                  {t('home.assistance.docs.desc')}
                </p>
              </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Soluzioni Section */}
        <section className="bg-bg-light" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-8 lg:px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg px-6 lg:px-0 lg:pl-[calc(2.5rem+5px)] lg:pr-[calc(2.5rem+5px)]"
              style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center font-heading" style={{ marginBottom: '2rem' }}>
                {t('home.solutions.title')}
              </h2>
              <p className="text-lg text-text-light leading-relaxed text-justify lg:text-center px-4 lg:px-0" style={{ marginBottom: '2rem' }}>
                {t('home.solutions.text')}
              </p>
              <div className="text-center">
                <Link
                  href="/prodotti#accessori"
                  className="inline-block bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  style={{ paddingLeft: 'calc(1.5rem + 3px)', paddingRight: 'calc(1.5rem + 3px)', paddingTop: 'calc(0.625rem + 3px)', paddingBottom: 'calc(0.625rem + 3px)' }}
                >
                  {t('home.solutions.button')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reggia e Sigilli Preview Section */}
        <section className="bg-white" style={{ paddingTop: '30px', paddingBottom: '0px' }}>
          <div className="container mx-auto px-8 lg:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Reggia Riquadro */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-start items-center text-center border-r border-gray-200 lg:pl-8 lg:pr-8"
                style={{ paddingTop: '30px', paddingBottom: '30px', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
              >
                <h3 className="text-3xl md:text-4xl font-bold font-heading" style={{ marginBottom: '10px' }}>
                  {t('home.reggia.title')}
                </h3>
                <p className="text-lg text-text-light leading-relaxed max-w-md" style={{ marginBottom: '10px' }}>
                  {t('home.reggia.desc')}
                </p>
                <div style={{ marginBottom: '10px', marginTop: '3px' }}>
                  <Link
                    href="/prodotti#reggia"
                    className="inline-block border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
                    style={{ paddingLeft: '27px', paddingRight: '27px', paddingTop: '13px', paddingBottom: '13px' }}
                  >
                    {t('home.reggia.button')}
                  </Link>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3px', background: 'transparent' }}>
                  <Image
                    src="/Immagini/reggia-in-poliestere.png"
                    alt="Reggia in poliestere per imballaggio industriale Flli Pozzi"
                    width={1536}
                    height={1024}
                    sizes="(max-width: 768px) 70vw, 35vw"
                    className="object-contain"
                    style={{ maxHeight: 'none', height: 'auto', width: '68.85%', background: 'transparent' }}
                  />
                </div>
              </motion.div>

              {/* Sigilli Riquadro */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col justify-start items-center text-center lg:pl-8 lg:pr-8"
                style={{ paddingTop: '30px', paddingBottom: '30px', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
              >
                <h3 className="text-3xl md:text-4xl font-bold font-heading" style={{ marginBottom: '10px' }}>
                  {t('home.sigilli.title')}
                </h3>
                <p className="text-lg text-text-light leading-relaxed max-w-md" style={{ marginBottom: '10px' }}>
                  {t('home.sigilli.desc')}
                </p>
                <div style={{ marginBottom: '10px', marginTop: '3px' }}>
                  <Link
                    href="/prodotti#sigilli"
                    className="inline-block border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
                    style={{ paddingLeft: '27px', paddingRight: '27px', paddingTop: '13px', paddingBottom: '13px' }}
                  >
                    {t('home.sigilli.button')}
                  </Link>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '13px', background: 'transparent' }}>
                  <Image
                    src="/Immagini/sigilli-per-reggia.png"
                    alt="Sigilli per reggia in polipropilene, poliestere e acciaio Flli Pozzi"
                    width={1536}
                    height={1024}
                    sizes="(max-width: 768px) 70vw, 35vw"
                    className="object-contain"
                    style={{ maxHeight: 'none', height: 'auto', width: '68.85%', background: 'transparent' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-8 lg:px-4">
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
                style={{ maxWidth: '1200px', width: '100%' }}
              >
                <h2 className="text-3xl md:text-4xl font-bold font-heading" style={{ marginBottom: '2rem' }}>
                  {t('home.cta.title')}
                </h2>
                <div className="flex justify-center">
                  <p className="text-lg text-text-light leading-relaxed text-center" style={{ marginBottom: '2rem', maxWidth: '800px' }}>
                    {t('home.cta.text')}
                  </p>
                </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contatti"
                  className="inline-block bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all w-full sm:w-auto text-center"
                  style={{ paddingLeft: 'calc(1.5rem + 3px)', paddingRight: 'calc(1.5rem + 3px)', paddingTop: 'calc(0.625rem + 3px)', paddingBottom: 'calc(0.625rem + 3px)' }}
                >
                  {t('home.cta.button')}
                </Link>
                <Link
                  href="/diventa-rivenditore"
                  className="inline-block border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors w-full sm:w-auto text-center"
                  style={{ paddingLeft: 'calc(1.5rem + 3px)', paddingRight: 'calc(1.5rem + 3px)', paddingTop: 'calc(0.625rem + 1px)', paddingBottom: 'calc(0.625rem + 1px)' }}
                >
                  {t('nav.reseller')}
                </Link>
              </div>
              </motion.div>
            </div>
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
