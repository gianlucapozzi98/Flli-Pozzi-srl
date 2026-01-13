'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/prodotti', labelKey: 'nav.products' },
  { href: '/azienda', labelKey: 'nav.company' },
  { href: '/eventi', labelKey: 'nav.events' },
  { href: '/contatti', labelKey: 'nav.contacts' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Su tutte le pagine tranne Home, l'header è sempre nero con opacità 80%
  const isHome = pathname === '/';
  const shouldShowBackground = !isHome || scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      shouldShowBackground ? 'bg-black/80 backdrop-blur-md shadow-lg' : ''
    }`}>
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center" style={{ marginTop: '18.5px', marginLeft: '20px', marginBottom: '18.5px' }}>
            <Image
              src="/Immagini/Logo Flli Pozzi 75.png"
              alt="Flli Pozzi"
              width={210}
              height={84}
              className="w-auto object-contain"
              style={{ height: '60.56px', maxHeight: '69.22px' }}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                title=""
                prefetch={true}
                className={`relative font-medium transition-colors px-3 py-2 rounded ${
                  pathname === link.href
                    ? 'text-white bg-primary'
                    : shouldShowBackground
                      ? 'text-white hover:text-primary hover:bg-white/10'
                      : 'text-white hover:text-primary hover:bg-white/20'
                }`}
              >
                {t(link.labelKey)}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    title=""
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-medium transition-colors px-4 ${
                      pathname === link.href
                        ? 'text-white bg-primary'
                        : 'text-white hover:text-primary hover:bg-white/10'
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
                <div className="px-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 shadow-lg hover:bg-secondary transition-colors z-50"
          style={{ borderRadius: '4px' }}
          aria-label="Torna in cima"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

