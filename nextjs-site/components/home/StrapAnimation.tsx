import type { ReactNode } from 'react';
import styles from './strap-animation.module.css';

type Labels = {
  aria: string;
  tension: string;
  steps: [string, string, string];
};

/*
 * Apertura della home: una reggia in polipropilene attraversa tutto lo schermo,
 * entra allentata dai due lati, viene tesa e chiusa con un sigillo in acciaio zincato
 * (bordi ripiegati, bollini a rilievo, tacche di chiusura come nelle foto dei sigilli).
 *
 * Solo SVG + SMIL e CSS, nessun JavaScript. viewBox largo 2400 con "slice":
 * la reggia arriva sempre ai bordi e il sigillo resta al centro, senza deformarsi.
 * Con "riduci movimento" attivo si vede la scena finale ferma.
 *
 * Ciclo di 7 s: 0–0,9 entrata · 1,1–2,5 tensionamento · 2,6–3,0 il sigillo scende ·
 * 3,1–3,3 chiusura · 3,5–4,2 riflesso · 6,2–6,6 dissolvenza e ripartenza.
 */
const DUR_S = 7;
const DUR = `${DUR_S}s`;
const kt = (...s: number[]) => s.map((x) => (x / DUR_S).toFixed(4).replace(/\.?0+$/, '') || '0').join(';');

const EASE = '.45 0 .2 1';
const Y = 100; // asse della reggia tesa

// Capo inferiore (da sinistra) e capo superiore (da destra), allentati e tesi
const L_SAG = 'M -90 88 Q 585 142 1252 142';
const L_TIGHT = `M -90 ${Y} Q 585 ${Y} 1252 ${Y}`;
const R_SAG = 'M 1150 142 Q 1815 142 2490 88';
const R_TIGHT = `M 1096 ${Y} Q 1793 ${Y} 2490 ${Y}`;

const SEAL_X = 1195;
const SEAL_W = 150;
const SEAL_H = 62;

type Layer = { dy: number; w: number; stroke: string; op: number };

/* Strati della reggia: colore, zigrinatura, bordi e riflessi (tratti paralleli) */
const LAYERS: Layer[] = [
  { dy: 0, w: 44, stroke: '#C40E17', op: 1 },
  { dy: 0, w: 44, stroke: 'EMBOSS', op: 1 },
  { dy: -15.5, w: 7, stroke: '#FF6B71', op: 0.42 },
  { dy: -8, w: 8, stroke: '#FFFFFF', op: 0.07 },
  { dy: 13, w: 14, stroke: '#3D0105', op: 0.3 },
  { dy: -21, w: 2.2, stroke: '#5E040A', op: 0.75 },
  { dy: 21, w: 2.2, stroke: '#3D0105', op: 0.85 },
];

/* Ombre a terra: tracciate piene dentro un gruppo semitrasparente, così dove i due capi
   si sovrappongono l'ombra non raddoppia */
const SHADOWS: { op: number; layer: Layer }[] = [
  { op: 0.14, layer: { dy: 24, w: 76, stroke: '#000', op: 1 } },
  { op: 0.3, layer: { dy: 13, w: 54, stroke: '#000', op: 1 } },
];

function Strap({
  sag,
  tight,
  emboss = '',
  still,
  layers = LAYERS,
}: {
  sag: string;
  tight: string;
  emboss?: string;
  still?: boolean;
  layers?: Layer[];
}) {
  return (
    <>
      {layers.map((l, i) => (
        <path
          key={i}
          d={still ? tight : sag}
          fill="none"
          stroke={l.stroke === 'EMBOSS' ? `url(#${emboss})` : l.stroke}
          strokeWidth={l.w}
          strokeOpacity={l.op}
          strokeLinecap="butt"
          transform={l.dy ? `translate(0 ${l.dy})` : undefined}
        >
          {!still && (
            <animate
              attributeName="d"
              dur={DUR}
              repeatCount="indefinite"
              values={`${sag};${sag};${tight};${tight}`}
              keyTimes={kt(0, 1.1, 2.5, DUR_S)}
              calcMode="spline"
              keySplines={`0 0 1 1;${EASE};0 0 1 1`}
            />
          )}
        </path>
      ))}
    </>
  );
}

/* Entrata dai bordi dello schermo */
function SlideIn({ from }: { from: number }) {
  return (
    <animateTransform
      attributeName="transform"
      type="translate"
      dur={DUR}
      repeatCount="indefinite"
      values={`${from} 0;0 0;0 0`}
      keyTimes={kt(0, 0.9, DUR_S)}
      calcMode="spline"
      keySplines=".2 .7 .2 1;0 0 1 1"
    />
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
      {/* Indicatore di tensione */}
      <div className={styles.hud} aria-hidden="true">
        <div className={styles.hudTop}>
          <span className={styles.hudLabel}>{labels.tension.toUpperCase()}</span>
          <span className={styles.hudValue}>2000 N</span>
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
          {/* Zigrinatura a rombi della reggia in PP */}
          <pattern id="sa-emboss-l" width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 9 L9 0" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.3" />
            <path d="M0 0 L9 9" stroke="#000" strokeOpacity="0.16" strokeWidth="1.3" />
          </pattern>
          <pattern id="sa-emboss-r" width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 9 L9 0" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.3" />
            <path d="M0 0 L9 9" stroke="#000" strokeOpacity="0.16" strokeWidth="1.3" />
            {/* La reggia scorre durante il tensionamento */}
            <animateTransform
              attributeName="patternTransform"
              type="translate"
              dur={DUR}
              repeatCount="indefinite"
              values="0 0;0 0;-54 0;-54 0"
              keyTimes={kt(0, 1.1, 2.5, DUR_S)}
              calcMode="spline"
              keySplines={`0 0 1 1;${EASE};0 0 1 1`}
            />
          </pattern>
          <pattern id="sa-emboss-still" width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M0 9 L9 0" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.3" />
            <path d="M0 0 L9 9" stroke="#000" strokeOpacity="0.16" strokeWidth="1.3" />
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
          {/* Grana della zincatura */}
          <filter id="sa-grain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.2" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <clipPath id="sa-seal-clip">
            <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="5" />
          </clipPath>
        </defs>

        {/* Scena animata */}
        <g className={styles.animated}>
          <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="1;1;0;0" keyTimes={kt(0, 6.2, 6.6, DUR_S)} />

          {/* Ombre dei due capi */}
          {SHADOWS.map((sh) => (
            <g key={sh.layer.w} opacity={sh.op}>
              <g>
                <SlideIn from={-1500} />
                <Strap sag={L_SAG} tight={L_TIGHT} layers={[sh.layer]} />
              </g>
              <g>
                <SlideIn from={1500} />
                <Strap sag={R_SAG} tight={R_TIGHT} layers={[sh.layer]} />
              </g>
            </g>
          ))}

          {/* Capo inferiore, entra da sinistra */}
          <g>
            <SlideIn from={-1500} />
            <Strap sag={L_SAG} tight={L_TIGHT} emboss="sa-emboss-l" />
          </g>

          {/* Capo superiore, entra da destra e si sovrappone */}
          <g>
            <SlideIn from={1500} />
            {/* Gradino d'ombra del capo superiore su quello inferiore */}
            <path d={R_SAG} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="44" transform="translate(-6 0)">
              <animate
                attributeName="d"
                dur={DUR}
                repeatCount="indefinite"
                values={`${R_SAG};${R_SAG};${R_TIGHT};${R_TIGHT}`}
                keyTimes={kt(0, 1.1, 2.5, DUR_S)}
                calcMode="spline"
                keySplines={`0 0 1 1;${EASE};0 0 1 1`}
              />
            </path>
            <Strap sag={R_SAG} tight={R_TIGHT} emboss="sa-emboss-r" />
          </g>

          {/* Sigillo */}
          <g transform={`translate(${SEAL_X} ${Y})`}>
            {/* Ombra sul nastro */}
            <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="6" fill="#000" opacity="0" transform="translate(6 8)">
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;0.38;0.38" keyTimes={kt(0, 2.6, 3.0, DUR_S)} />
            </rect>
            <g opacity="0">
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1" keyTimes={kt(0, 2.6, 2.78, DUR_S)} />
              <animateTransform
                attributeName="transform"
                type="translate"
                dur={DUR}
                repeatCount="indefinite"
                values="0 -66;0 -66;0 2;0 0;0 0"
                keyTimes={kt(0, 2.6, 2.95, 3.04, DUR_S)}
                calcMode="spline"
                keySplines="0 0 1 1;.55 0 .9 .6;.2 0 .4 1;0 0 1 1"
              />
              <g>
                {/* Chiusura: il sigillo si schiaccia sulla reggia */}
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  dur={DUR}
                  repeatCount="indefinite"
                  values="1 1;1 1;1.025 0.9;1 0.97;1 0.97"
                  keyTimes={kt(0, 3.08, 3.17, 3.3, DUR_S)}
                />
                <Seal
                  crimped={
                    <g opacity="0">
                      <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1" keyTimes={kt(0, 3.14, 3.18, DUR_S)} />
                      <Notches />
                    </g>
                  }
                >
                  {/* Riflesso metallico dopo la chiusura */}
                  <g clipPath="url(#sa-seal-clip)">
                    <rect x="-16" y="-44" width="32" height="88" fill="url(#sa-glint)" transform="skewX(-22)" opacity="0">
                      <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={kt(0, 3.5, 3.6, 4.1, 4.2, DUR_S)} />
                      <animate attributeName="x" dur={DUR} repeatCount="indefinite" values="-120;-120;100;100" keyTimes={kt(0, 3.5, 4.2, DUR_S)} />
                    </rect>
                  </g>
                </Seal>
              </g>
            </g>
            {/* Lampo della chiusura sulle tacche */}
            <g opacity="0">
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;0.9;0;0" keyTimes={kt(0, 3.13, 3.19, 3.45, DUR_S)} />
              {[-44, 0, 44].map((x) => (
                <g key={x}>
                  <circle cx={x} cy={-SEAL_H / 2 + 5} r="15" fill="url(#sa-flash)" />
                  <circle cx={x} cy={SEAL_H / 2 - 5} r="15" fill="url(#sa-flash)" />
                </g>
              ))}
            </g>
          </g>
        </g>

        {/* Scena finale ferma, per chi preferisce ridurre il movimento */}
        <g className={styles.still}>
          {SHADOWS.map((sh) => (
            <g key={sh.layer.w} opacity={sh.op}>
              <Strap sag={L_TIGHT} tight={L_TIGHT} layers={[sh.layer]} still />
              <Strap sag={R_TIGHT} tight={R_TIGHT} layers={[sh.layer]} still />
            </g>
          ))}
          <Strap sag={L_TIGHT} tight={L_TIGHT} emboss="sa-emboss-still" still />
          <path d={R_TIGHT} fill="none" stroke="#000" strokeOpacity="0.45" strokeWidth="44" transform="translate(-6 0)" />
          <Strap sag={R_TIGHT} tight={R_TIGHT} emboss="sa-emboss-still" still />
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
