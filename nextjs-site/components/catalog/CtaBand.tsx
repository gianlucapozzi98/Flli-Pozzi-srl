import Link from 'next/link';
import styles from './catalog.module.css';
import { localizePath, type Lang } from '@/lib/i18n';
import { UI } from '@/lib/catalog-ui';

/** Fascia finale con preventivo e telefono. */
export default function CtaBand({ lang, product }: { lang: Lang; product?: string }) {
  const quote = `/contatti?topic=preventivo${product ? `&prodotto=${encodeURIComponent(product)}` : ''}`;
  return (
    <section className={styles.band}>
      <div className={`${styles.wrap} ${styles.bandGrid}`}>
        <div>
          <h2 className="font-heading font-bold">{UI.ctaTitle[lang]}</h2>
          <p>{UI.ctaText[lang]}</p>
        </div>
        <div className={styles.ctaRow} style={{ marginTop: 0 }}>
          <Link href={localizePath(quote, lang)} className={`${styles.btn} ${styles.btnPrimary}`}>
            {UI.quote[lang]}
          </Link>
          <a href="tel:+390363350380" className={`${styles.btn} ${styles.bandBtnLight}`}>
            {UI.call[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
