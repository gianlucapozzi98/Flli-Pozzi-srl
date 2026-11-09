'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ArrowUpIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './header.module.css';

const navLinks = [
  { href: '/azienda', labelKey: 'nav.company' },
  { href: '/prodotti', labelKey: 'nav.products' },
  { href: '/assistenza-ricambi', labelKey: 'nav.service' },
  { href: '/eventi', labelKey: 'nav.events' },
  { href: '/contatti', labelKey: 'nav.contacts' },
];

const ISO_PDF = '/FRATELLI POZZI 9001 2015_Certificato di registrazione.pdf';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';
  const { t, lp } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobile aperto: blocca lo scorrimento della pagina sotto e chiudi con Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    const target = lp(href);
    return pathname === target || pathname.startsWith(`${target}/`);
  };
  const quoteHref = lp('/contatti?topic=preventivo');

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.util}>
          <div className={styles.wrap}>
            <a href="tel:+390363350380" className={styles.utilPhone}>
              <PhoneIcon className={styles.utilIcon} aria-hidden="true" />
              <b>+39 0363 350380</b>
            </a>
            <a href="mailto:fllipozzi@fllipozzi.it" className={styles.utilPhone}>
              <EnvelopeIcon className={styles.utilIcon} aria-hidden="true" />
              fllipozzi@fllipozzi.it
            </a>
            <div className={styles.utilPush}>
              <a href={ISO_PDF} target="_blank" rel="noopener noreferrer" className={styles.iso}>
                ISO 9001:2015
              </a>
              <LanguageSwitcher tone="dark" />
            </div>
          </div>
        </div>

        <div className={styles.bar}>
          <div className={styles.wrap}>
            <Link href={lp('/')} className={styles.logo} onClick={() => setOpen(false)}>
              <Image
                src="/Immagini/flli-pozzi-80-anni-logo.png"
                alt="Fratelli Pozzi — 80 anni, 1947–2027"
                width={949}
                height={384}
                sizes="140px"
                loading="eager"
              />
            </Link>

            <nav className={styles.nav} aria-label="Menu principale">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={lp(link.href)}
                  className={styles.navLink}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className={styles.ctas}>
              <a href="tel:+390363350380" className={`${styles.btn} ${styles.btnLine} ${styles.hideMd}`}>
                {t('cta.call')}
              </a>
              <Link href={quoteHref} className={`${styles.btn} ${styles.btnRed}`}>
                {t('cta.quote')}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={styles.burger}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label="Menu"
            >
              {open ? <XMarkIcon aria-hidden="true" /> : <Bars3Icon aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div id="menu-mobile" className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={lp(link.href)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {t(link.labelKey)}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={lp('/ordine-rapido')} onClick={() => setOpen(false)}>
                {t('nav.quickOrder')}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
          <div className={styles.panelBody}>
            <Link href={quoteHref} className={`${styles.btn} ${styles.btnRed}`} onClick={() => setOpen(false)}>
              {t('cta.quote')}
            </Link>
            <a href="tel:+390363350380" className={`${styles.btn} ${styles.btnLine}`}>
              <PhoneIcon className={styles.utilIcon} aria-hidden="true" />
              +39 0363 350380
            </a>
            <LanguageSwitcher tone="light" />
            <p className={styles.panelMeta}>fllipozzi@fllipozzi.it · ISO 9001:2015</p>
          </div>
        </div>
      </header>
    </>
  );
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={styles.toTop}
      aria-label="Torna in cima"
    >
      <ArrowUpIcon aria-hidden="true" />
    </button>
  );
}
