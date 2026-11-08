import Image from 'next/image';
import Link from 'next/link';
import styles from './catalog.module.css';
import { productDisplayName, productPath, type Product } from '@/lib/catalog';
import { localizePath, type Lang } from '@/lib/i18n';
import { UI } from '@/lib/catalog-ui';

export default function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const name = productDisplayName(product, lang);
  return (
    <Link href={localizePath(productPath(product), lang)} className={styles.card}>
      <div className={styles.cardImg}>
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 380px"
          style={{ objectFit: 'contain', padding: '14px' }}
        />
      </div>
      <div className={styles.cardBody}>
        {product.madeInItaly && (
          <span className={styles.badge}>
            <span className={styles.flag} aria-hidden="true" />
            {UI.madeIn[lang]}
          </span>
        )}
        <h3 className={`${styles.cardTitle} font-heading font-bold`}>{name}</h3>
        <p className={styles.cardSpec}>{product.short[lang]}</p>
        <span className={styles.cardGo}>{UI.view[lang]}</span>
      </div>
    </Link>
  );
}
