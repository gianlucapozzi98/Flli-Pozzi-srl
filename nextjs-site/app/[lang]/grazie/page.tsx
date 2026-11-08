'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';

/** Testo diverso per il modulo rivenditori (/grazie?tipo=b2b). */
function ThankYouText() {
  const { t } = useLanguage();
  const isB2B = useSearchParams().get('tipo') === 'b2b';
  return <>{isB2B ? t('grazie.text.b2b') : t('grazie.text')}</>;
}

/** Pagina mostrata dopo l'invio dei moduli contatti (/grazie) e rivenditori (/grazie?tipo=b2b). */
export default function Grazie() {
  const { t, lp } = useLanguage();

  return (
    <>
      <Header />
      <main style={{ backgroundColor: '#EDEFF2' }}>
        <section style={{ paddingTop: '80px', paddingBottom: '88px' }}>
          <div className="flex flex-col items-center text-center" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 22px' }}>
            <CheckCircleIcon className="text-primary" style={{ width: '64px', height: '64px', marginBottom: '24px' }} aria-hidden="true" />
            <h1 className="text-3xl md:text-5xl font-bold font-heading text-balance" style={{ marginBottom: '20px', lineHeight: 1.15 }}>
              {t('grazie.title')}
            </h1>
            <p className="text-lg text-text-light" style={{ marginBottom: '32px' }}>
              <Suspense fallback={t('grazie.text')}>
                <ThankYouText />
              </Suspense>
            </p>
            <p className="text-text-light" style={{ marginBottom: '8px' }}>
              {t('grazie.urgent')}
            </p>
            <a
              href="tel:+390363350380"
              className="inline-flex items-center gap-2 text-3xl font-bold font-heading text-secondary hover:text-primary transition-colors"
              style={{ marginBottom: '40px' }}
            >
              <PhoneIcon className="h-6 w-6" aria-hidden="true" />
              +39 0363 350380
            </a>
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
              <Link
                href={lp('/prodotti')}
                className="btn-ui btn-red"
              >
                {t('grazie.products')}
              </Link>
              <Link
                href={lp('/')}
                className="btn-ui btn-line"
              >
                {t('grazie.home')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
