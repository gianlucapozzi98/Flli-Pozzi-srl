'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { useLanguage, usePublicPathname } from '@/contexts/LanguageContext';

const BAR_HEIGHT = 56;
/** Scorrimento oltre il quale la barra compare, nelle pagine senza apertura animata */
const REVEAL_AFTER = 160;

/**
 * Barra fissa in basso solo su mobile: Chiama + Richiedi preventivo.
 * Compare solo dopo che si è iniziato a scorrere. In home aspetta che l'apertura
 * (con l'animazione della reggia) sia salita sopra la barra, così non la copre.
 * Sulla pagina Contatti il preventivo porta direttamente al modulo.
 */
export default function MobileCtaBar() {
  const { t, lp } = useLanguage();
  const pathname = usePublicPathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('[data-hide-mobile-cta]');
      if (hero) {
        setVisible(hero.getBoundingClientRect().bottom <= window.innerHeight - BAR_HEIGHT);
      } else {
        setVisible(window.scrollY > REVEAL_AFTER);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  if (pathname === lp('/grazie')) return null;

  const quoteHref = pathname === lp('/contatti') ? '#modulo' : lp('/contatti?topic=preventivo');

  return (
    <>
      {/* Spazio in fondo alla pagina, dello stesso colore del footer, così la barra non copre i contenuti */}
      <div
        className="md:hidden"
        aria-hidden="true"
        style={{ height: `calc(${BAR_HEIGHT}px + env(safe-area-inset-bottom, 0px))`, background: '#22262B' }}
      />
      {/* flex e non grid: in globals.css `.grid { display: grid }` è fuori dai layer e annullerebbe md:hidden */}
      <nav
        aria-label={t('cta.quote')}
        aria-hidden={!visible || undefined}
        inert={!visible || undefined}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex"
        style={{
          background: '#22262B',
          boxShadow: visible ? '0 -2px 12px rgba(0, 0, 0, 0.25)' : 'none',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <a
          href="tel:+390363350380"
          className="flex flex-1 items-center justify-center gap-2 text-white font-semibold active:bg-white/10"
          style={{ height: BAR_HEIGHT }}
        >
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
          {t('cta.call')}
        </a>
        <Link
          href={quoteHref}
          className="flex flex-1 items-center justify-center bg-primary text-white font-semibold active:bg-primary-dark"
          style={{ height: BAR_HEIGHT }}
        >
          {t('cta.quote')}
        </Link>
      </nav>
    </>
  );
}
