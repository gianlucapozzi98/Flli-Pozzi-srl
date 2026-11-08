import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './page-head.module.css';

type Crumb = { label: string; href?: string };

/**
 * Intestazione comune delle pagine interne (stile anteprima):
 * percorso, occhiello in monospazio, titolo condensato in maiuscolo e testo introduttivo.
 */
export default function PageHead({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={styles.head}>
      <div className={styles.wrap}>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className={styles.crumbs}>
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`}>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </section>
  );
}
