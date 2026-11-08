'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { HOME } from '@/lib/home-content';
import type { Material, Power } from '@/lib/catalog';
import styles from './home.module.css';

type WidthBand = '9-13' | '16' | '19' | '25-32';
const BAND_LABEL: Record<WidthBand, string> = {
  '9-13': '9–13 mm',
  '16': '16 mm',
  '19': '19 mm',
  '25-32': '25–32 mm',
};
// Ordine esplicito: Object.keys metterebbe prima le chiavi numeriche ('16', '19')
const BANDS: WidthBand[] = ['9-13', '16', '19', '25-32'];

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

/**
 * Selettore guidato: materiale, larghezza e modo di lavorare.
 * Non propone modelli (sul sito non ci sono tutte le macchine): riassume le risposte
 * e porta al preventivo già compilato, così l'ufficio tecnico consiglia la macchina giusta.
 */
export default function Finder() {
  const { language, lp } = useLanguage();
  const L = (v: Record<string, string>) => v[language];
  const [mat, setMat] = useState<Material>('pp');
  const [band, setBand] = useState<WidthBand>('16');
  const [power, setPower] = useState<Power>('man');

  const matLabel = { pp: HOME.matPP, pet: HOME.matPET, acc: HOME.matSteel }[mat];
  const pwLabel = { man: HOME.pwMan, bat: HOME.pwBat, pn: HOME.pwPn }[power];
  const pwLower = { man: HOME.pwManLower, bat: HOME.pwBatLower, pn: HOME.pwPnLower }[power];

  const request = L(HOME.finderPrefill)
    .replace('{mat}', L(HOME.matLower[mat]))
    .replace('{w}', BAND_LABEL[band])
    .replace('{pw}', L(pwLower));

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
            options={BANDS.map((v) => ({ v, label: BAND_LABEL[v] }))}
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
          <p className={styles.resLabel}>{L(HOME.finderResLabel)}</p>
          <dl className={styles.resSum}>
            <dt>{L(HOME.sumMat)}</dt>
            <dd>{L(matLabel)}</dd>
            <dt>{L(HOME.sumWidth)}</dt>
            <dd>{BAND_LABEL[band]}</dd>
            <dt>{L(HOME.sumPower)}</dt>
            <dd>{L(pwLabel)}</dd>
          </dl>
          <p className={styles.resMsg}>{L(HOME.finderAdvice)}</p>
          <Link
            href={lp(`/contatti?topic=preventivo&prodotto=${encodeURIComponent(request)}`)}
            className={`${styles.btn} ${styles.btnRed}`}
          >
            {L(HOME.finderQuote)}
          </Link>
        </div>
      </div>
    </section>
  );
}
