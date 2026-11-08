'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';

const BAR_HEIGHT = 56;

/**
 * Barra fissa in basso solo su mobile: Chiama + Richiedi preventivo.
 * Sulla pagina Contatti il preventivo porta direttamente al modulo.
 */
export default function MobileCtaBar() {
  const { t, lp } = useLanguage();
  const pathname = usePathname();

  if (pathname === lp('/grazie')) return null;

  const quoteHref = pathname === lp('/contatti') ? '#modulo' : lp('/contatti?topic=preventivo');

  return (
    <>
      {/* Spazio in fondo alla pagina, dello stesso colore del footer, così la barra non copre i contenuti */}
      <div
        className="md:hidden"
        aria-hidden="true"
        style={{ height: `calc(${BAR_HEIGHT}px + env(safe-area-inset-bottom, 0px))`, background: 'rgba(0, 0, 0, 0.8)' }}
      />
      {/* flex e non grid: in globals.css `.grid { display: grid }` è fuori dai layer e annullerebbe md:hidden */}
      <nav
        aria-label={t('cta.quote')}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex"
        style={{
          background: '#1A1A1A',
          boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.25)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
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
