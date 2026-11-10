import type { ReactNode } from 'react';
import styles from './strap-animation.module.css';
import StrapSync from './StrapSync';

type Labels = {
  aria: string;
  tension: string;
  steps: [string, string, string];
};

/*
 * Apertura della home per gli 80 anni (1947–2027): una reggia verde in poliestere (PET)
 * attraversa tutto lo schermo. I due capi entrano dai bordi, ondeggiano allentati e vengono
 * tesi a scatti come con un tendireggia a leva, mentre l'indicatore conta gli anni dal 1947
 * al 2027; la reggia vibra, il sigillo zincato scende, le ganasce lo chiudono e imprimono "80".
 * Poi crescono la corona d'alloro e il nastro 1947 · 2027. Si riproduce una volta e resta ferma.
 *
 * Solo SVG + SMIL e CSS, nessun JavaScript. viewBox largo 2400 con "slice":
 * la reggia arriva sempre ai bordi e il sigillo resta al centro, senza deformarsi.
 * Con "riduci movimento" attivo si vede la scena finale ferma.
 *
 * Tempi (8 s, una volta): 0–0,8 entrata · 0,8–1,2 ondeggia · 1,2–2,4 quattro scatti (anni) ·
 * 2,4–2,8 vibrazione · 2,85–3,3 il sigillo scende · 3,3–3,85 ganasce, chiusura e "80" impresso ·
 * 3,55–4,3 onda · 3,75–4,8 corona d'alloro · 4,35–4,8 nastro · 4,75–5,35 riflesso sul sigillo.
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
const NOTCH_X = [-50, -30, 30, 50]; // tacche di chiusura: il centro resta libero per "80"
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
          {anim && <animate attributeName="d" dur={DUR} repeatCount="1" fill="freeze" calcMode="spline" {...anim} />}
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
      repeatCount="1" fill="freeze"
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
      {NOTCH_X.map((x) => (
        <path key={x} d={`M ${x - 7} -40 L ${x - 5} -28 H ${x + 5} L ${x + 7} -40 Z`} fill="url(#sa-tooth)" stroke="#0D1013" strokeWidth="1" />
      ))}
      {/* Punzone centrale che imprime "80" */}
      <rect x="-26" y="-44" width="52" height="10" rx="2" fill="url(#sa-tooth)" stroke="#0D1013" strokeWidth="1" />
    </g>
  );
}

/* Variazioni fisse (non casuali a ogni rendering) per bollini un po' irregolari, come quelli punzonati */
const jit = (i: number, k: number) => (((i * 37 + k * 11) % 9) - 4) * 0.22;

/*
 * Sigillo in acciaio zincato, dalle foto dei sigilli bulinati: lamiera con fiori di zincatura e grana,
 * labbri lunghi ripiegati con riflesso, spessore visibile alle estremità, bollini punzonati sui lati
 * e piastra centrale liscia dove le ganasce imprimono "80".
 */
function Seal({ crimped, children }: { crimped: ReactNode; children?: ReactNode }) {
  const x0 = -SEAL_W / 2;
  const y0 = -SEAL_H / 2;
  const step = 108 / 7;
  const dots: { x: number; y: number; r: number }[] = [];
  let i = 0;
  for (let row = 0; row < 3; row++) {
    const n = row === 1 ? 7 : 8;
    const start = row === 1 ? -54 + step / 2 : -54;
    for (let c = 0; c < n; c++, i++) {
      const x = start + step * c;
      if (Math.abs(x) < 25) continue;
      dots.push({ x: x + jit(i, 1), y: -11.5 + 11.5 * row + jit(i, 2), r: 2.55 + ((i * 13) % 5) * 0.12 });
    }
  }
  return (
    <g>
      <rect x={x0} y={y0} width={SEAL_W} height={SEAL_H} rx="5" fill="url(#sa-seal-v)" stroke="#4A535B" strokeWidth="1.2" />
      <rect x={x0} y={y0} width={SEAL_W} height={SEAL_H} rx="5" fill="url(#sa-seal-h)" />
      {/* Fiori della zincatura (macchie ampie) e grana fine */}
      <rect x={x0} y={y0} width={SEAL_W} height={SEAL_H} rx="5" fill="#fff" filter="url(#sa-spangle)" />
      <rect x={x0} y={y0} width={SEAL_W} height={SEAL_H} rx="5" fill="#fff" filter="url(#sa-grain)" />
      {/* Labbri ripiegati: riflesso sul bordo, piega, ombra */}
      <path d={`M ${x0 + 4} ${y0 + 2.6} H ${-x0 - 4}`} stroke="#fff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d={`M ${x0 + 3} ${y0 + 8.5} H ${-x0 - 3}`} stroke="#59626A" strokeWidth="1.2" opacity="0.75" />
      <path d={`M ${x0 + 3} ${y0 + 10} H ${-x0 - 3}`} stroke="#fff" strokeWidth="1.1" opacity="0.6" />
      <path d={`M ${x0 + 3} ${-y0 - 10} H ${-x0 - 3}`} stroke="#fff" strokeWidth="0.9" opacity="0.32" />
      <path d={`M ${x0 + 3} ${-y0 - 8.5} H ${-x0 - 3}`} stroke="#4F5860" strokeWidth="1.2" opacity="0.7" />
      {/* Spessore della lamiera alle estremità */}
      <path d={`M ${x0 + 1.7} ${y0 + 5} V ${-y0 - 5}`} stroke="#fff" strokeWidth="1.2" opacity="0.55" />
      <path d={`M ${-x0 - 1.7} ${y0 + 5} V ${-y0 - 5}`} stroke="#353C43" strokeWidth="1.2" opacity="0.6" />
      {/* Piastra centrale liscia */}
      <rect x="-24" y="-17" width="48" height="34" rx="3" fill="#fff" opacity="0.08" />
      {/* Bollini punzonati */}
      {dots.map((d, k) => (
        <g key={k} transform={`translate(${d.x.toFixed(2)} ${d.y.toFixed(2)})`}>
          <circle cx="0.9" cy="0.9" r={d.r + 0.5} fill="#fff" opacity="0.7" />
          <circle cx="-0.8" cy="-0.8" r={d.r + 0.5} fill="#454D55" opacity="0.55" />
          <circle r={d.r} fill="url(#sa-dimple)" />
        </g>
      ))}
      {crimped}
      {children}
    </g>
  );
}

/* Tacche di chiusura: la lamiera schiacciata dalle ganasce, con lato in luce, lato in ombra e pieghe */
function Notches() {
  const t = -SEAL_H / 2;
  return (
    <g>
      {NOTCH_X.map((x) => (
        <g key={x}>
          <path d={`M ${x - 9} ${t} L ${x - 4.5} ${t + 10} L ${x + 4.5} ${t + 10} L ${x + 9} ${t} Z`} fill="url(#sa-notch)" />
          <path d={`M ${x - 9} ${t} L ${x - 4.5} ${t + 10}`} stroke="#fff" strokeWidth="1.1" opacity="0.7" />
          <path d={`M ${x + 4.5} ${t + 10} L ${x + 9} ${t}`} stroke="#1E2429" strokeWidth="1" opacity="0.55" />
          <path d={`M ${x - 4.5} ${t + 10.5} H ${x + 4.5}`} stroke="#fff" strokeWidth="1" opacity="0.5" />
          <path d={`M ${x - 2.5} ${t + 11} L ${x - 1.8} ${t + 17} M ${x + 2.5} ${t + 11} L ${x + 1.8} ${t + 17}`} stroke="#353D45" strokeWidth="0.8" opacity="0.35" />
          <path d={`M ${x - 9} ${-t} L ${x - 4.5} ${-t - 10} L ${x + 4.5} ${-t - 10} L ${x + 9} ${-t} Z`} fill="url(#sa-notch-b)" />
          <path d={`M ${x - 4.5} ${-t - 10} H ${x + 4.5}`} stroke="#1E2429" strokeWidth="1" opacity="0.5" />
          <path d={`M ${x + 4.5} ${-t - 10} L ${x + 9} ${-t}`} stroke="#fff" strokeWidth="1" opacity="0.45" />
          <path d={`M ${x - 2.5} ${-t - 11} L ${x - 1.8} ${-t - 17} M ${x + 2.5} ${-t - 11} L ${x + 1.8} ${-t - 17}`} stroke="#353D45" strokeWidth="0.8" opacity="0.3" />
        </g>
      ))}
    </g>
  );
}

/* "80" impresso in rilievo sulla piastra centrale: ombra, luce e lamiera */
const STAMP_FONT = { fontFamily: 'var(--font-barlow-condensed), "Arial Narrow", Arial, sans-serif', letterSpacing: '0.5px' };
function Stamp80() {
  const t = { x: 0, y: 10.5, textAnchor: 'middle' as const, fontSize: 30, fontWeight: 700, style: STAMP_FONT };
  return (
    <g>
      <text {...t} transform="translate(1.1 1.2)" fill="#2B3238" opacity="0.6">80</text>
      <text {...t} transform="translate(-0.8 -0.8)" fill="#fff" opacity="0.8">80</text>
      <text {...t} fill="url(#sa-stamp)">80</text>
    </g>
  );
}

/* Corona d'alloro attorno al sigillo, come nel logo degli 80 anni: due rami, foglie dal basso verso l'alto */
const LEAF_D = 'M0,0 C6.6,-5.6 16.5,-5.6 22,0 C16.5,5.6 6.6,5.6 0,0 Z';
const LAUREL = (() => {
  const rx = 118;
  const ry = 66;
  const stepDeg = 12;
  const P = (a: number) => [rx * Math.cos((a * Math.PI) / 180), ry * Math.sin((a * Math.PI) / 180)];
  return [
    { from: 110, to: 222, dir: 1 },
    { from: 70, to: -42, dir: -1 },
  ].map((b) => {
    const pts: number[] = [];
    for (let a = b.from; b.dir > 0 ? a <= b.to : a >= b.to; a += b.dir * stepDeg) pts.push(a);
    const stem = 'M' + pts.map((a) => P(a).map((v) => v.toFixed(1)).join(',')).join(' L');
    const leaves: { x: number; y: number; a: number; t: number }[] = [];
    pts.forEach((a, i) => {
      if (!i) return;
      const [x, y] = P(a);
      const r = (a * Math.PI) / 180;
      const ang = (Math.atan2(ry * Math.cos(r) * b.dir, -rx * Math.sin(r) * b.dir) * 180) / Math.PI;
      [-42, 42].forEach((off, k) => leaves.push({ x, y, a: ang + off, t: 3.85 + 0.06 * i + 0.03 * k }));
    });
    return { stem, leaves };
  });
})();

function Laurel({ still }: { still?: boolean }) {
  return (
    <g>
      {LAUREL.map((b, bi) => (
        <g key={bi}>
          <path
            d={b.stem}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.8"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray="1000"
            strokeDashoffset={still ? 0 : 1000}
          >
            {!still && (
              <animate attributeName="stroke-dashoffset" dur={DUR} repeatCount="1" fill="freeze" values="1000;1000;0;0" keyTimes={kt(0, 3.75, 4.6, DUR_S)} />
            )}
          </path>
          {b.leaves.map((l, i) => (
            <g key={i} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.a.toFixed(1)})`}>
              <path d={LEAF_D} fill="#fff" fillOpacity="0.9" transform={still ? undefined : 'scale(0)'}>
                {!still && (
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    dur={DUR}
                    repeatCount="1"
                    fill="freeze"
                    values="0;0;1.12;1;1"
                    keyTimes={kt(0, l.t, l.t + 0.22, l.t + 0.32, DUR_S)}
                  />
                )}
              </path>
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/* Nastro rosso sotto il sigillo, che si apre dal centro */
function Ribbon({ still }: { still?: boolean }) {
  return (
    <g transform={`translate(${SEAL_X} ${Y + 64})`}>
      <g transform={still ? undefined : 'scale(0 1)'}>
        {!still && (
          <animateTransform
            attributeName="transform"
            type="scale"
            dur={DUR}
            repeatCount="1"
            fill="freeze"
            values="0 1;0 1;1 1;1 1"
            keyTimes={kt(0, 4.35, 4.8, DUR_S)}
            calcMode="spline"
            keySplines="0 0 1 1;.2 .8 .2 1;0 0 1 1"
          />
        )}
        <path d="M -93 -9 L -115 -3 L -106 6 L -115 15 L -89 11 Z" fill="#9E0410" />
        <path d="M 93 -9 L 115 -3 L 106 6 L 115 15 L 89 11 Z" fill="#9E0410" />
        <path d="M -95 -13 Q 0 -19 95 -13 L 95 13 Q 0 7 -95 13 Z" fill="#E30613" />
        <text x="0" y="5.5" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" style={{ ...STAMP_FONT, letterSpacing: '2px' }}>
          1947 · 2027
        </text>
      </g>
    </g>
  );
}

export default function StrapAnimation({ labels }: { labels: Labels }) {
  return (
    <div className={styles.band} role="img" aria-label={labels.aria} data-strap-band>
      <StrapSync duration={DUR_S} />
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
            <animateTransform attributeName="patternTransform" type="translate" dur={DUR} repeatCount="1" fill="freeze" calcMode="spline" {...TEX_ANIM} />
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
          <filter id="sa-spangle" x="0" y="0" width="1" height="1">
            <feTurbulence type="turbulence" baseFrequency="0.035 0.07" numOctaves="2" seed="11" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.16" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <filter id="sa-soft" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <linearGradient id="sa-stamp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#CDD3D8" />
            <stop offset="1" stopColor="#959EA6" />
          </linearGradient>
          <clipPath id="sa-seal-clip">
            <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="5" />
          </clipPath>
        </defs>

        {/* Scena animata */}
        <g className={styles.animated}>
          <g>
            {/* Scossone quando le ganasce chiudono il sigillo */}
            <animateTransform
              attributeName="transform"
              type="translate"
              dur={DUR}
              repeatCount="1" fill="freeze"
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
                <animate attributeName="d" dur={DUR} repeatCount="1" fill="freeze" calcMode="spline" {...R_ANIM} />
              </path>
              <Strap d={rightPath(SAG0)} anim={R_ANIM} emboss="sa-emboss-r" />
            </g>

            {/* Sigillo */}
            <g transform={`translate(${SEAL_X} ${Y})`}>
              <Laurel />
              {/* Ombra sul nastro */}
              <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="6" fill="#000" opacity="0" transform="translate(6 8)" filter="url(#sa-soft)">
                <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;0.38;0.38" keyTimes={kt(0, 2.85, 3.15, DUR_S)} />
              </rect>

              {/* Onda luminosa dopo la chiusura */}
              <rect x="-82" y="-38" width="164" height="76" rx="8" fill="none" stroke="#9BE7D2" strokeWidth="3" opacity="0">
                <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;0.9;0;0" keyTimes={kt(0, 3.55, 3.62, 4.3, DUR_S)} />
                <animateTransform attributeName="transform" type="scale" dur={DUR} repeatCount="1" fill="freeze" values="1;1;1.45;1.45" keyTimes={kt(0, 3.55, 4.3, DUR_S)} />
              </rect>

              <g opacity="0">
                <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;1;1" keyTimes={kt(0, 2.85, 2.97, DUR_S)} />
                {/* Discesa con rimbalzo */}
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  dur={DUR}
                  repeatCount="1" fill="freeze"
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
                    repeatCount="1" fill="freeze"
                    values="-14;-14;3;0;0"
                    keyTimes={kt(0, 2.85, 3.12, 3.24, DUR_S)}
                  />
                  <g>
                    {/* Chiusura: il sigillo si schiaccia sulla reggia */}
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      dur={DUR}
                      repeatCount="1" fill="freeze"
                      values="1 1;1 1;1.03 0.88;1 0.97;1 0.97"
                      keyTimes={kt(0, 3.46, 3.52, 3.64, DUR_S)}
                    />
                    <Seal
                      crimped={
                        <g opacity="0">
                          <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;1;1" keyTimes={kt(0, 3.5, 3.53, DUR_S)} />
                          <Notches />
                        </g>
                      }
                    >
                      {/* "80" impresso dalle ganasce */}
                      <g opacity="0">
                        <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;1;1" keyTimes={kt(0, 3.53, 3.6, DUR_S)} />
                        <Stamp80 />
                      </g>
                      {/* Riflesso metallico */}
                      <g clipPath="url(#sa-seal-clip)">
                        <rect x="-16" y="-44" width="32" height="88" fill="url(#sa-glint)" transform="skewX(-22)" opacity="0">
                          <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;1;1;0;0" keyTimes={kt(0, 4.75, 4.85, 5.25, 5.35, DUR_S)} />
                          <animate attributeName="x" dur={DUR} repeatCount="1" fill="freeze" values="-120;-120;100;100" keyTimes={kt(0, 4.75, 5.35, DUR_S)} />
                        </rect>
                      </g>
                    </Seal>
                  </g>
                </g>
              </g>

              {/* Ganasce: arrivano dall'alto e dal basso, serrano e si ritirano */}
              <g opacity="0" mask="url(#sa-jaw-mask)">
                <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;1;1;0;0" keyTimes={kt(0, 3.3, 3.36, 3.8, 3.88, DUR_S)} />
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    dur={DUR}
                    repeatCount="1" fill="freeze"
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
                    repeatCount="1" fill="freeze"
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
                <animate attributeName="opacity" dur={DUR} repeatCount="1" fill="freeze" values="0;0;0.95;0;0" keyTimes={kt(0, 3.49, 3.53, 3.8, DUR_S)} />
                {NOTCH_X.map((x) => (
                  <g key={x}>
                    <circle cx={x} cy={-SEAL_H / 2 + 5} r="15" fill="url(#sa-flash)" />
                    <circle cx={x} cy={SEAL_H / 2 - 5} r="15" fill="url(#sa-flash)" />
                  </g>
                ))}
              </g>
            </g>
          </g>
        </g>

        <g className={styles.animated}>
          <Ribbon />
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
            <Laurel still />
            <rect x={-SEAL_W / 2} y={-SEAL_H / 2} width={SEAL_W} height={SEAL_H} rx="6" fill="#000" opacity="0.38" transform="translate(6 8)" filter="url(#sa-soft)" />
            <g transform="scale(1 0.97)">
              <Seal crimped={<Notches />}>
                <Stamp80 />
              </Seal>
            </g>
          </g>
          <Ribbon still />
        </g>
      </svg>
    </div>
  );
}
