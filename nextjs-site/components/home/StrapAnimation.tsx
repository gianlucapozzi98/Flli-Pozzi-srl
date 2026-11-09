import type { ReactNode } from 'react';
import styles from './strap-animation.module.css';

type Labels = {
  aria: string;
  tension: string;
  steps: [string, string, string];
};

/*
 * Apertura della home: una reggia verde in poliestere (PET) attraversa tutto lo schermo.
 * I due capi entrano veloci dai bordi, ondeggiano allentati, vengono tesi a scatti come con
 * un tendireggia a leva (l'indicatore conta la tensione), la reggia vibra quando è tesa,
 * il sigillo zincato scende e le ganasce lo chiudono (tacche, onda luminosa, riflesso).
 *
 * Solo SVG + SMIL e CSS, nessun JavaScript. viewBox largo 2400 con "slice":
 * la reggia arriva sempre ai bordi e il sigillo resta al centro, senza deformarsi.
 * Con "riduci movimento" attivo si vede la scena finale ferma.
 *
 * Ciclo di 8 s: 0–0,8 entrata · 0,8–1,2 ondeggia · 1,2–2,4 quattro scatti di tensione ·
 * 2,4–2,8 vibrazione · 2,85–3,3 il sigillo scende · 3,3–3,85 ganasce e chiusura ·
 * 3,55–4,3 onda · 3,95–4,55 riflesso · 7,0–7,4 dissolvenza e ripartenza.
 * I tempi dell'indicatore in strap-animation.module.css seguono questo ciclo.
 */
const DUR_S = 8;
const DUR = `${DUR_S}s`;
const kt = (...s: number[]) => s.map((x) => (x / DUR_S).toFixed(4).replace(/\.?0+$/, '') || '0').join(';');
const r1 = (n: number) => Math.round(n * 10) / 10;

const Y = 100; // asse della reggia tesa
const SAG0 = 42; // abbassamento al centro della reggia allentata

const HOLD = '0 0 1 1';
const PULL = '.15 .85 .35 1'; // scatto della leva: veloce, poi frena
const WOB = '.45 0 .55 1';

/* Forma della reggia nel tempo: [secondo, abbassamento al centro, curva del tratto] */
const FRAMES: [number, number, string][] = [
  [0, SAG0, ''],
  [0.8, SAG0, HOLD],
  [0.95, 50, WOB],
  [1.08, 37, WOB],
  [1.2, SAG0, WOB],
  [1.35, 30, PULL],
  [1.55, 30, HOLD],
  [1.7, 19, PULL],
  [1.9, 19, HOLD],
  [2.05, 9, PULL],
  [2.25, 9, HOLD],
  [2.4, 0, PULL],
  [2.48, -7, WOB],
  [2.56, 5, WOB],
  [2.64, -3, WOB],
  [2.72, 1.5, WOB],
  [2.8, 0, WOB],
  [DUR_S, 0, HOLD],
];

// Il capo superiore scorre a ogni scatto: la sovrapposizione cresce di 54 unità
const tailX = (s: number) => 1150 - 54 * (1 - Math.min(Math.max(s, 0), SAG0) / SAG0);
const edgeY = (s: number) => Y - Math.max(s, 0) * (12 / SAG0);
const leftPath = (s: number) => `M -90 ${r1(edgeY(s))} Q 581 ${r1(Y + s)} 1252 ${r1(Y + s)}`;
const rightPath = (s: number) => {
  const x = tailX(s);
  return `M ${r1(x)} ${r1(Y + s)} Q ${r1((x + 2490) / 2)} ${r1(Y + s)} 2490 ${r1(edgeY(s))}`;
};

type Anim = { values: string; keyTimes: string; keySplines: string };
const track = (fn: (s: number) => string): Anim => ({
  values: FRAMES.map((f) => fn(f[1])).join(';'),
  keyTimes: kt(...FRAMES.map((f) => f[0])),
  keySplines: FRAMES.slice(1).map((f) => f[2]).join(';'),
});
const L_ANIM = track(leftPath);
const R_ANIM = track(rightPath);
const TEX_ANIM = track((s) => `${r1(tailX(s) - 1150)} 0`);
const L_TIGHT = leftPath(0);
const R_TIGHT = rightPath(0);

const SEAL_X = 1195;
const SEAL_W = 150;
const SEAL_H = 62;

type Layer = { dy: number; w: number; stroke: string; op: number };

/* Strati della reggia: colore, zigrinatura, bordi e riflessi (tratti paralleli) */
const LAYERS: Layer[] = [
  { dy: 0, w: 44, stroke: '#17805A', op: 1 },
  { dy: 0, w: 44, stroke: 'EMBOSS', op: 1 },
  { dy: -15.5, w: 7, stroke: '#7DDAC4', op: 0.5 },
  { dy: -8, w: 8, stroke: '#FFFFFF', op: 0.12 },
  { dy: 13, w: 14, stroke: '#022A1B', op: 0.32 },
  { dy: -21, w: 2.2, stroke: '#0A4A33', op: 0.8 },
  { dy: 21, w: 2.2, stroke: '#03301F', op: 0.85 },
];

/* Ombre a terra: tracciate piene dentro un gruppo semitrasparente, così dove i due capi
   si sovrappongono l'ombra non raddoppia */
const SHADOWS: { op: number; layer: Layer }[] = [
  { op: 0.14, layer: { dy: 24, w: 76, stroke: '#000', op: 1 } },
  { op: 0.3, layer: { dy: 13, w: 54, stroke: '#000', op: 1 } },
];

function Strap({
  d,
  anim,
  emboss = '',
  layers = LAYERS,
}: {
  d: string;
  anim?: Anim;
  emboss?: string;
  layers?: Layer[];
}) {
  return (
    <>
      {layers.map((l, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={l.stroke === 'EMBOSS' ? `url(#${emboss})` : l.stroke}
          strokeWidth={l.w}
          strokeOpacity={l.op}
          strokeLinecap="butt"
          transform={l.dy ? `translate(0 ${l.dy})` : undefined}
        >
          {anim && <animate attributeName="d" dur={DUR} repeatCount="indefinite" calcMode="spline" {...anim} />}
        </path>
      ))}
    </>
  );
}

/* Entrata veloce dai bordi, supera di poco il punto d'arrivo e torna indietro */
function SlideIn({ from }: { from: number }) {
  const over = from < 0 ? 26 : -26;
  return (
    <animateTransform
      attributeName="transform"
      type="translate"
      dur={DUR}
      repeatCount="indefinite"
      values={`${from} 0;${over} 0;0 0;0 0`}
      keyTimes={kt(0, 0.62, 0.8, DUR_S)}
      calcMode="spline"
      keySplines=".22 .75 .3 1;.4 0 .6 1;0 0 1 1"
    />
  );
}

/* Ganascia della pinza che chiude il sigillo (quella inferiore è la stessa, specchiata) */
function Jaw() {
  return (
    <g>
      <path d="M -64 -160 H 64 V -47 Q 64 -40 57 -40 H -57 Q -64 -40 -64 -47 Z" fill="url(#sa-jaw)" stroke="#0D1013" strokeWidth="1.5" />
      <path d="M -59 -45 H 59" stroke="#fff" strokeOpacity="0.2" strokeWidth="1.2" />
      {[-44, 0, 44].map((x) => (
        <path key={x} d={`M ${x - 8} -40 L ${x - 6} -28 H ${x + 6} L ${x + 8} -40 Z`} fill="url(#sa-tooth)" stroke="#0D1013" strokeWidth="1" />
      ))}
    </g>
  );
}

/* Sigillo in acciaio zincato: bordi lunghi ripiegati, bollini a rilievo, tacche di chiusura */
function Seal({ crimped, children }: { crimped: ReactNode; children?: ReactNode }) {
  const x0 = -SEAL_W / 2;
  const y0 = -SEAL_H / 2;
  // Bollini su tre file sfalsate, come nei sigilli bulinati
  const step = 108 / 7;
  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < 3; r++) {
    const n = r === 1 ? 7 : 8;
    const start = r === 1 ? -54 + step / 2 : -54;
    for (let c = 0; c < n; c++) dots.push({ x: start + step * c, y: -11.5 + 11.5 * r });
  }
  return (
    <g>
      <rect x={x0} y={y0} width={SEAL_W} height={SEAL_H} rx="5" fill="url(#sa-seal-v)" stroke="#545D66" strokeWidth="1.2" />
      <rect x={x0} y={y0} width={SEAL_W} height={SEAL_H} rx="5" fill="url(#sa-seal-h)" />
      <rect x={x0} y={y0} width={SEAL_W} height={SEAL_H} rx="5" fill="#fff" filter="url(#sa-grain)" />
      {/* Pieghe dei bordi */}
      <path d={`M ${x0 + 3} ${y0 + 8.5} H ${-x0 - 3} M ${x0 + 3} ${-y0 - 8.5} H ${-x0 - 3}`} stroke="#6D7680" strokeWidth="1.1" opacity="0.7" />
      <path d={`M ${x0 + 3} ${y0 + 10} H ${-x0 - 3}`} stroke="#fff" strokeWidth="1" opacity="0.55" />
      {/* Bollini a rilievo */}
      {dots.map((d, i) => (
        <g key={i} transform={`translate(${d.x} ${d.y})`}>
          <circle cx="0.9" cy="0.9" r="3.4" fill="#fff" opacity="0.75" />
          <circle cx="-0.8" cy="-0.8" r="3.4" fill="#4E565F" opacity="0.55" />
          <circle r="2.8" fill="url(#sa-dimple)" />
        </g>
      ))}
      {crimped}
      {children}
    </g>
  );
}

function Notches() {
  const xs = [-44, 0, 44];
  const t = -SEAL_H / 2;
  return (
    <g>
      {xs.map((x) => (
        <g key={x}>
          <path d={`M ${x - 12} ${t} L ${x - 7} ${t + 10} L ${x + 7} ${t + 10} L ${x + 12} ${t} Z`} fill="url(#sa-notch)" />
          <path d={`M ${x - 7} ${t + 10} H ${x + 7}`} stroke="#fff" strokeWidth="1.2" opacity="0.6" />
          <path d={`M ${x - 12} ${-t} L ${x - 7} ${-t - 10} L ${x + 7} ${-t - 10} L ${x + 12} ${-t} Z`} fill="url(#sa-notch-b)" />
          <path d={`M ${x - 7} ${-t - 10} H ${x + 7}`} stroke="#2F353B" strokeWidth="1.2" opacity="0.5" />
        </g>
      ))}
    </g>
  );
}

export default function StrapAnimation({ labels }: { labels: Labels }) {
  return (
    <div className={styles.band} role="img" aria-label={labels.aria}>
      {/* Indicatore di tensione: il valore conta in CSS (strap-animation.module.css) */}
      <div className={styles.hud} aria-hidden="true">
        <div className={styles.hudTop}>
          <span className={styles.hudLabel}>{labels.tension.toUpperCase()}</span>
          <span className={styles.hudValue} />
        </div>
        <div className={styles.hudTrack}>
          <span className={styles.hudBar} />
        </div>
        <div className={styles.hudSteps}>
          <span className={styles.step1}>{labels.steps[0]}</span>
          <span className={styles.step2}>{labels.steps[1]}</span>
          <span className={styles.step3}>{labels.steps[2]}</span>
        </div>
      </div>

      <svg className={styles.svg} viewBox="0 0 2400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          {/* Goffratura leggera della reggia in PET */}
          <pattern id="sa-emboss-l" width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 9 L9 0" stroke="#fff" strokeOpacity="0.11" strokeWidth="1.1" />
            <path d="M0 0 L9 9" stroke="#000" strokeOpacity="0.11" strokeWidth="1.1" />
          </pattern>
          <pattern id="sa-emboss-r" width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 9 L9 0" stroke="#fff" strokeOpacity="0.11" strokeWidth="1.1" />
            <path d="M0 0 L9 9" stroke="#000" strokeOpacity="0.11" strokeWidth="1.1" />
            {/* La reggia scorre a ogni scatto del tensionamento */}
            <animateTransform attributeName="patternTransform" type="translate" dur={DUR} repeatCount="indefinite" calcMode="spline" {...TEX_ANIM} />
          </pattern>
          <pattern id="sa-emboss-still" width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 9 L9 0" stroke="#fff" strokeOpacity="0.11" strokeWidth="1.1" />
            <path d="M0 0 L9 9" stroke="#000" strokeOpacity="0.11" strokeWidth="1.1" />
          </pattern>

          {/* Acciaio zincato: bordi arrotondati scuri, faccia piana chiara */}
          <linearGradient id="sa-seal-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#59626B" />
            <stop offset="0.05" stopColor="#E3E7EA" />
            <stop offset="0.13" stopColor="#A6AFB7" />
            <stop offset="0.2" stopColor="#CBD2D7" />
            <stop offset="0.55" stopColor="#D7DCE0" />
            <stop offset="0.8" stopColor="#BCC4CB" />
            <stop offset="0.87" stopColor="#9FA8B0" />
            <stop offset="0.95" stopColor="#E4E8EB" />
            <stop offset="1" stopColor="#555E67" />
          </linearGradient>
          <linearGradient id="sa-seal-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity="0.12" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.14" />
          </linearGradient>
          <radialGradient id="sa-dimple" cx="0.5" cy="0.5" r="0.5" fx="0.62" fy="0.66">
            <stop offset="0" stopColor="#F4F6F7" />
            <stop offset="0.55" stopColor="#BEC6CC" />
            <stop offset="1" stopColor="#7C858E" />
          </radialGradient>
          <linearGradient id="sa-notch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2E343A" />
            <stop offset="1" stopColor="#8D969E" />
          </linearGradient>
          <linearGradient id="sa-notch-b" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#2E343A" />
            <stop offset="1" stopColor="#9AA3AB" />
          </linearGradient>
          <linearGradient id="sa-glint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sa-flash">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="0.4" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {/* Acciaio brunito delle ganasce */}
          <linearGradient id="sa-jaw" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#23282E" />
            <stop offset="0.35" stopColor="#4C555F" />
            <stop offset="0.6" stopColor="#353C44" />
            <stop offset="1" stopColor="#1C2025" />
          </linearGradient>
          <linearGradient id="sa-tooth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5E6771" />
            <stop offset="1" stopColor="#262B31" />
          </linearGradient>
          {/* Grana della zincatura */}
          <filter id="sa-grain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.2" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          {/* Le ganasce sfumano verso i bordi della fascia invece di essere tagliate di netto */}
          <linearGradient id="sa-jaw-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.16" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.84" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="sa-jaw-mask" maskUnits="userSpaceOnUse" x="-120" y="-100" width="240" height="200">
            <rect x="-120" y="-100" width="240" height="200" fill="url(#sa-jaw-fade)" />
          </mask>
          <clipPath id="sa-seal-clip">
            <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="5" />
          </clipPath>
        </defs>

        {/* Scena animata */}
        <g className={styles.animated}>
          <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="1;1;0;0" keyTimes={kt(0, 7.0, 7.4, DUR_S)} />
          <g>
            {/* Scossone quando le ganasce chiudono il sigillo */}
            <animateTransform
              attributeName="transform"
              type="translate"
              dur={DUR}
              repeatCount="indefinite"
              values="0 0;0 0;0 3;0 -2;0 1;0 0;0 0"
              keyTimes={kt(0, 3.5, 3.54, 3.58, 3.62, 3.68, DUR_S)}
            />

            {/* Ombre dei due capi */}
            {SHADOWS.map((sh) => (
              <g key={sh.layer.w} opacity={sh.op}>
                <g>
                  <SlideIn from={-1500} />
                  <Strap d={leftPath(SAG0)} anim={L_ANIM} layers={[sh.layer]} />
                </g>
                <g>
                  <SlideIn from={1500} />
                  <Strap d={rightPath(SAG0)} anim={R_ANIM} layers={[sh.layer]} />
                </g>
              </g>
            ))}

            {/* Capo inferiore, entra da sinistra */}
            <g>
              <SlideIn from={-1500} />
              <Strap d={leftPath(SAG0)} anim={L_ANIM} emboss="sa-emboss-l" />
            </g>

            {/* Capo superiore, entra da destra e si sovrappone */}
            <g>
              <SlideIn from={1500} />
              {/* Gradino d'ombra del capo superiore su quello inferiore */}
              <path d={rightPath(SAG0)} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="44" transform="translate(-6 0)">
                <animate attributeName="d" dur={DUR} repeatCount="indefinite" calcMode="spline" {...R_ANIM} />
              </path>
              <Strap d={rightPath(SAG0)} anim={R_ANIM} emboss="sa-emboss-r" />
            </g>

            {/* Sigillo */}
            <g transform={`translate(${SEAL_X} ${Y})`}>
              {/* Ombra sul nastro */}
              <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="6" fill="#000" opacity="0" transform="translate(6 8)">
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;0.38;0.38" keyTimes={kt(0, 2.85, 3.15, DUR_S)} />
              </rect>

              {/* Onda luminosa dopo la chiusura */}
              <rect x="-82" y="-38" width="164" height="76" rx="8" fill="none" stroke="#9BE7D2" strokeWidth="3" opacity="0">
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;0.9;0;0" keyTimes={kt(0, 3.55, 3.62, 4.3, DUR_S)} />
                <animateTransform attributeName="transform" type="scale" dur={DUR} repeatCount="indefinite" values="1;1;1.45;1.45" keyTimes={kt(0, 3.55, 4.3, DUR_S)} />
              </rect>

              <g opacity="0">
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1" keyTimes={kt(0, 2.85, 2.97, DUR_S)} />
                {/* Discesa con rimbalzo */}
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  dur={DUR}
                  repeatCount="indefinite"
                  values="0 -78;0 -78;0 3;0 -3;0 0;0 0"
                  keyTimes={kt(0, 2.85, 3.12, 3.2, 3.28, DUR_S)}
                  calcMode="spline"
                  keySplines="0 0 1 1;.55 0 .9 .55;.3 0 .7 1;.3 0 .7 1;0 0 1 1"
                />
                <g>
                  {/* Scende leggermente inclinato e si raddrizza */}
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur={DUR}
                    repeatCount="indefinite"
                    values="-14;-14;3;0;0"
                    keyTimes={kt(0, 2.85, 3.12, 3.24, DUR_S)}
                  />
                  <g>
                    {/* Chiusura: il sigillo si schiaccia sulla reggia */}
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      dur={DUR}
                      repeatCount="indefinite"
                      values="1 1;1 1;1.03 0.88;1 0.97;1 0.97"
                      keyTimes={kt(0, 3.46, 3.52, 3.64, DUR_S)}
                    />
                    <Seal
                      crimped={
                        <g opacity="0">
                          <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1" keyTimes={kt(0, 3.5, 3.53, DUR_S)} />
                          <Notches />
                        </g>
                      }
                    >
                      {/* Riflesso metallico */}
                      <g clipPath="url(#sa-seal-clip)">
                        <rect x="-16" y="-44" width="32" height="88" fill="url(#sa-glint)" transform="skewX(-22)" opacity="0">
                          <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={kt(0, 3.95, 4.05, 4.45, 4.55, DUR_S)} />
                          <animate attributeName="x" dur={DUR} repeatCount="indefinite" values="-120;-120;100;100" keyTimes={kt(0, 3.95, 4.55, DUR_S)} />
                        </rect>
                      </g>
                    </Seal>
                  </g>
                </g>
              </g>

              {/* Ganasce: arrivano dall'alto e dal basso, serrano e si ritirano */}
              <g opacity="0" mask="url(#sa-jaw-mask)">
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={kt(0, 3.3, 3.36, 3.8, 3.88, DUR_S)} />
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    dur={DUR}
                    repeatCount="indefinite"
                    values="0 -96;0 -96;0 0;0 0;0 -96;0 -96"
                    keyTimes={kt(0, 3.32, 3.5, 3.6, 3.84, DUR_S)}
                    calcMode="spline"
                    keySplines="0 0 1 1;.6 0 .9 .5;0 0 1 1;.3 0 .4 1;0 0 1 1"
                  />
                  <Jaw />
                </g>
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    dur={DUR}
                    repeatCount="indefinite"
                    values="0 96;0 96;0 0;0 0;0 96;0 96"
                    keyTimes={kt(0, 3.32, 3.5, 3.6, 3.84, DUR_S)}
                    calcMode="spline"
                    keySplines="0 0 1 1;.6 0 .9 .5;0 0 1 1;.3 0 .4 1;0 0 1 1"
                  />
                  <g transform="scale(1 -1)">
                    <Jaw />
                  </g>
                </g>
              </g>

              {/* Lampo della chiusura sulle tacche */}
              <g opacity="0">
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;0.95;0;0" keyTimes={kt(0, 3.49, 3.53, 3.8, DUR_S)} />
                {[-44, 0, 44].map((x) => (
                  <g key={x}>
                    <circle cx={x} cy={-SEAL_H / 2 + 5} r="15" fill="url(#sa-flash)" />
                    <circle cx={x} cy={SEAL_H / 2 - 5} r="15" fill="url(#sa-flash)" />
                  </g>
                ))}
              </g>
            </g>
          </g>
        </g>

        {/* Scena finale ferma, per chi preferisce ridurre il movimento */}
        <g className={styles.still}>
          {SHADOWS.map((sh) => (
            <g key={sh.layer.w} opacity={sh.op}>
              <Strap d={L_TIGHT} layers={[sh.layer]} />
              <Strap d={R_TIGHT} layers={[sh.layer]} />
            </g>
          ))}
          <Strap d={L_TIGHT} emboss="sa-emboss-still" />
          <path d={R_TIGHT} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="44" transform="translate(-6 0)" />
          <Strap d={R_TIGHT} emboss="sa-emboss-still" />
          <g transform={`translate(${SEAL_X} ${Y})`}>
            <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="6" fill="#000" opacity="0.38" transform="translate(6 8)" />
            <g transform="scale(1 0.97)">
              <Seal crimped={<Notches />} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
