import Link from 'next/link';
import JsonLd from './JsonLd';
import styles from './catalog.module.css';
import { SITE_URL } from '@/lib/seo';

export type Crumb = { name: string; href?: string };

/** Percorso visibile + BreadcrumbList per Google. L'ultimo elemento è la pagina corrente. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={styles.crumbs}>
      <ol className={styles.wrap}>
        {items.map((item, i) => (
          <li key={i}>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={data} />
    </nav>
  );
}
