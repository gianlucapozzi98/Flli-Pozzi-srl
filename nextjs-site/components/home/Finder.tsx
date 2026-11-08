'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { HOME } from '@/lib/home-content';
import type { Material, Power } from '@/lib/catalog';
import styles from './home.module.css';

export type FinderItem = {
  name: string;
  short: string;
  image: string;
  href: string;
  materials: Material[];
  power: Power;
  widths: number[];
};

type WidthBand = '9-13' | '16' | '19' | '25-32';
const BANDS: Record<WidthBand, [number, number]> = {
  '9-13': [9, 13],
  '16': [16, 16],
  '19': [19, 19],
  '25-32': [25, 32],
};

const fits = (item: FinderItem, band: WidthBand) => {
  const [min, max] = BANDS[band];
  return item.widths.some((w) => w >= min && w <= max);
};

function Group<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { v: T; label: string }[];
}) {
  return (
    <fieldset className={styles.q}>
      <legend>{label}</legend>
      <div className={styles.opts}>
        {options.map((o) => (
          <button key={o.v} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)}>
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** Selettore guidato: materiale, larghezza e alimentazione → modelli reali del catalogo. */
export default function Finder({ items }: { items: FinderItem[] }) {
  const { language, lp } = useLanguage();
  const L = (v: Record<string, string>) => v[language];
  const [mat, setMat] = useState<Material>('pp');
  const [band, setBand] = useState<WidthBand>('16');
  const [power, setPower] = useState<Power>('man');

  const result = useMemo(() => {
    const exact = items.filter((i) => i.materials.includes(mat) && i.power === power && fits(i, band));
    if (exact.length) return { list: exact.slice(0, 3), count: exact.length, message: '' };
    const anyPower = items.filter((i) => i.materials.includes(mat) && fits(i, band));
    const pwLabel = { man: HOME.pwManLower, bat: HOME.pwBatLower, pn: HOME.pwPnLower }[power];
    if (anyPower.length) {
      return {
        list: anyPower.slice(0, 3),
        count: 0,
        message: L(HOME.noPower).replace('{mat}', L(HOME.matLower[mat])).replace('{pw}', L(pwLabel)),
      };
    }
    return { list: items.filter((i) => i.materials.includes(mat)).slice(0, 3), count: 0, message: L(HOME.noWidth) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, mat, band, power, language]);

  const quoteProduct = result.list.length === 1 ? result.list[0].name : result.list.map((i) => i.name).join(', ');

  return (
    <section className={styles.finder} id="selettore">
      <div className={`${styles.wrap} ${styles.finderGrid}`}>
        <div>
          <h2 className={`${styles.h2} font-heading font-bold`}>{L(HOME.finderTitle)}</h2>
          <p className={styles.finderText}>{L(HOME.finderText)}</p>
          <Group
            label={L(HOME.q1)}
            value={mat}
            onChange={setMat}
            options={[
              { v: 'pp', label: L(HOME.matPP) },
              { v: 'pet', label: L(HOME.matPET) },
              { v: 'acc', label: L(HOME.matSteel) },
            ]}
          />
          <Group
            label={L(HOME.q2)}
            value={band}
            onChange={setBand}
            options={[
              { v: '9-13', label: '9–13 mm' },
              { v: '16', label: '16 mm' },
              { v: '19', label: '19 mm' },
              { v: '25-32', label: '25–32 mm' },
            ]}
          />
          <Group
            label={L(HOME.q3)}
            value={power}
            onChange={setPower}
            options={[
              { v: 'man', label: L(HOME.pwMan) },
              { v: 'bat', label: L(HOME.pwBat) },
              { v: 'pn', label: L(HOME.pwPn) },
            ]}
          />
        </div>

        <div className={styles.res} aria-live="polite">
          <p className={styles.resLabel}>
            {result.count > 0
              ? `${result.count} ${result.count === 1 ? L(HOME.matchOne) : L(HOME.matchMany)}`
              : L(HOME.alternatives)}
          </p>
          {result.message && <p className={styles.resMsg}>{result.message}</p>}
          {result.list.map((i) => (
            <Link key={i.href} href={i.href} className={styles.resItem}>
              <span className={styles.resThumb}>
                <Image src={i.image} alt="" fill sizes="72px" style={{ objectFit: 'contain', padding: '4px' }} />
              </span>
              <span>
                <b className="font-heading">{i.name}</b>
                <small>{i.short}</small>
              </span>
            </Link>
          ))}
          <Link
            href={lp(`/contatti?topic=preventivo&prodotto=${encodeURIComponent(quoteProduct)}`)}
            className={`${styles.btn} ${styles.btnRed}`}
          >
            {result.list.length === 1 ? `${L(HOME.quoteFor)} ${result.list[0].name}` : L(HOME.quoteThese)}
          </Link>
        </div>
      </div>
    </section>
  );
}
