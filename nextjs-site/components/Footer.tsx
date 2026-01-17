'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black/80 backdrop-blur-md text-white" style={{ marginTop: 0 }}>
      <div className="container mx-auto px-4 lg:px-8" style={{ paddingTop: '11px', paddingBottom: '15px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {/* Colonna 1: Logo e scritta */}
          <div className="flex flex-col justify-center items-center md:items-start lg:items-start">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/Immagini/Logo Flli Pozzi Italia.png"
                  alt="Flli Pozzi srl"
                  width={230}
                  height={92}
                  className="w-auto h-auto object-contain"
                  style={{ maxHeight: '92px' }}
                  priority
                />
              </Link>
            </div>
            <p className="text-gray-400 text-center md:text-left lg:text-left" style={{ marginLeft: '-0.5mm' }}>{t('footer.tagline')}</p>
          </div>
          
          {/* Colonna 2: Prodotti, Azienda, Eventi */}
          <div className="flex flex-col justify-center items-center md:items-start lg:items-start pl-4 lg:pl-0">
            <h4 className="text-lg font-semibold mb-4">{t('footer.links.title')}</h4>
            <ul className="space-y-2 text-center md:text-left lg:text-left">
              <li>
                <Link href="/prodotti" className="text-gray-400 hover:text-primary transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link href="/azienda" className="text-gray-400 hover:text-primary transition-colors">
                  {t('nav.company')}
                </Link>
              </li>
              <li>
                <Link href="/eventi" className="text-gray-400 hover:text-primary transition-colors">
                  {t('nav.events')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Colonna 3: Privacy Policy, Cookie Policy e link futuri */}
          <div className="flex flex-col justify-center items-center md:items-start lg:items-start pr-4 lg:pr-0">
            <h4 className="text-lg font-semibold mb-4">{t('footer.info.title')}</h4>
            <ul className="space-y-2 text-center md:text-left lg:text-left">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-primary transition-colors">
                  {t('footer.cookies')}
                </Link>
              </li>
              <li>
                <a 
                  href="/Politica 2024 F.lli Pozzi Srl-manuale della qualità.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {t('footer.quality')}
                </a>
              </li>
              <li>
                <a 
                  href="/FRATELLI POZZI 9001 2015_Certificato di registrazione.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {t('footer.certification')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Colonna 4: Contatti */}
          <div className="flex flex-col justify-center items-center md:items-start lg:items-start">
            <h4 className="text-lg font-semibold mb-4 lg:mt-5" style={{ marginTop: '20px' }}>{t('footer.contacts.title')}</h4>
            <ul className="space-y-2 text-gray-400 text-center md:text-left lg:text-left">
              <li>
                <span className="block">{t('footer.contacts.address')}</span>
              </li>
              <li>
                <a href="tel:+390363350380" className="hover:text-primary transition-colors">
                  {t('footer.contacts.phone')} +39 0363-350380
                </a>
              </li>
              <li>
                <a href="mailto:fllipozzi@fllipozzi.it" className="hover:text-primary transition-colors break-all lg:break-normal">
                  {t('footer.contacts.email')} fllipozzi@fllipozzi.it
                </a>
              </li>
            </ul>
            <div className="flex gap-4 justify-center md:justify-start lg:justify-start" style={{ marginTop: '0.75rem', marginBottom: '20px' }}>
              <a
                href="https://www.linkedin.com/company/flli-pozzi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/flli.pozzi.srl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

