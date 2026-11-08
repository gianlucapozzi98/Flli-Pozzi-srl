import styles from './strap-animation.module.css';

type Labels = {
  aria: string;
  tension: string;
  steps: [string, string, string];
};

/*
 * Animazione dell'apertura: un collo su pallet, la reggia che si tende e il sigillo che la chiude.
 * Solo SVG + SMIL (nessun JavaScript): parte subito, funziona anche prima dell'idratazione
 * e non pesa sul caricamento. Con "riduci movimento" attivo si vede la scena finale ferma.
 *
 * Ciclo di 6 s: 0–0,8 s la reggia compare allentata · 0,8–2 s tensionamento ·
 * 2–2,5 s il sigillo scende · 2,7–2,9 s chiusura · poi pausa e ripartenza.
 */
const DUR = '6s';
const SAG = 'M120 250 Q280 292 440 250';
const TIGHT = 'M120 250 Q280 250 440 250';
const EASE = '.4 0 .2 1';

export default function StrapAnimation({ labels }: { labels: Labels }) {
  return (
    <svg className={styles.svg} viewBox="84 12 506 404" role="img" aria-label={labels.aria}>
      <defs>
        <linearGradient id="sa-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f5f7" />
          <stop offset="0.55" stopColor="#c3c9d0" />
          <stop offset="1" stopColor="#8f98a2" />
        </linearGradient>
        <linearGradient id="sa-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d2a465" />
          <stop offset="1" stopColor="#bb8a4f" />
        </linearGradient>
      </defs>

      {/* Ombra a terra */}
      <ellipse cx="305" cy="400" rx="240" ry="20" fill="#000" opacity="0.35" />

      {/* Pallet */}
      <g aria-hidden="true">
        <rect x="104" y="384" width="356" height="9" fill="#7d5a35" />
        <polygon points="460,384 500,354 500,363 460,393" fill="#664a2c" />
        {[112, 264, 416].map((x) => (
          <rect key={x} x={x} y="362" width="36" height="22" fill="#86623b" />
        ))}
        <polygon points="452,362 488,335 488,357 452,384" fill="#6e5030" />
        <rect x="104" y="350" width="356" height="12" fill="#a07848" />
        <polygon points="104,350 144,320 500,320 460,350" fill="#b38a57" />
        <polygon points="460,350 500,320 500,332 460,362" fill="#80603a" />
      </g>

      {/* Collo in cartone */}
      <g aria-hidden="true">
        <polygon points="120,150 160,120 480,120 440,150" fill="#e0b97f" />
        <polygon points="270,150 310,120 332,120 292,150" fill="#ecd3a3" opacity="0.9" />
        <polygon points="440,150 480,120 480,320 440,350" fill="#a8783f" />
        <rect x="120" y="150" width="320" height="200" fill="url(#sa-front)" />
        <rect x="270" y="150" width="22" height="58" fill="#ecd3a3" opacity="0.85" />
        <g opacity="0.95">
          <rect x="150" y="176" width="78" height="46" rx="3" fill="#f4efe6" />
          <rect x="159" y="186" width="44" height="5" rx="2" fill="#b8b1a5" />
          <rect x="159" y="197" width="58" height="4" rx="2" fill="#cfc8bc" />
          <rect x="159" y="206" width="34" height="4" rx="2" fill="#cfc8bc" />
        </g>
        <path d="M150 300 h40 M150 312 h26" stroke="#9f7240" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Scena animata */}
      <g className={styles.animated}>
        <g>
          <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="1;1;0;0" keyTimes="0;0.9;0.9667;1" />

          {/* Impronta della reggia sul cartone quando è tesa */}
          <path d="M120 259 H440" stroke="#7a5228" strokeWidth="3" opacity="0">
            <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;0.45;0.45" keyTimes="0;0.2667;0.3333;1" />
          </path>

          {/* Reggia sul fianco */}
          <path d="M440 250 L480 220" stroke="#b9050f" strokeWidth="16" strokeLinecap="butt" fill="none" strokeDasharray="60" strokeDashoffset="60">
            <animate attributeName="stroke-dashoffset" dur={DUR} repeatCount="indefinite" values="60;60;0;0" keyTimes="0;0.0667;0.1333;1" />
          </path>

          {/* Reggia sul fronte: compare allentata, poi viene tesa */}
          <path d={SAG} stroke="#e30613" strokeWidth="16" fill="none" strokeDasharray="420" strokeDashoffset="420">
            <animate attributeName="stroke-dashoffset" dur={DUR} repeatCount="indefinite" values="420;0;0" keyTimes="0;0.1333;1" />
            <animate
              attributeName="d"
              dur={DUR}
              repeatCount="indefinite"
              values={`${SAG};${SAG};${TIGHT};${TIGHT}`}
              keyTimes="0;0.1333;0.3333;1"
              calcMode="spline"
              keySplines={`0 0 1 1;${EASE};0 0 1 1`}
            />
          </path>
          <path d={SAG} stroke="#ff6970" strokeWidth="2" fill="none" opacity="0.55" strokeDasharray="420" strokeDashoffset="420" transform="translate(0 -4)">
            <animate attributeName="stroke-dashoffset" dur={DUR} repeatCount="indefinite" values="420;0;0" keyTimes="0;0.1333;1" />
            <animate
              attributeName="d"
              dur={DUR}
              repeatCount="indefinite"
              values={`${SAG};${SAG};${TIGHT};${TIGHT}`}
              keyTimes="0;0.1333;0.3333;1"
              calcMode="spline"
              keySplines={`0 0 1 1;${EASE};0 0 1 1`}
            />
          </path>

          {/* Sigillo: scende e si chiude sulla reggia */}
          <g transform="translate(280 250)">
            <g opacity="0">
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.3333;0.3667;1" />
              <animateTransform
                attributeName="transform"
                type="translate"
                dur={DUR}
                repeatCount="indefinite"
                values="0 -120;0 -120;0 0;0 0"
                keyTimes="0;0.3333;0.4167;1"
                calcMode="spline"
                keySplines="0 0 1 1;.2 .7 .3 1;0 0 1 1"
              />
              <g>
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  dur={DUR}
                  repeatCount="indefinite"
                  values="1 1;1 1;1.05 0.84;1 1;1 1"
                  keyTimes="0;0.45;0.4667;0.4833;1"
                />
                <rect x="-25" y="-15" width="50" height="30" rx="3" fill="url(#sa-steel)" stroke="#6f7883" strokeWidth="1.5" />
                <rect x="-25" y="-15" width="50" height="6" rx="3" fill="#ffffff" opacity="0.45" />
                {/* Tacche di chiusura */}
                <g opacity="0">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.4583;0.4667;1" />
                  {[-13, -6, 6, 13].map((x) => (
                    <rect key={x} x={x - 1.5} y="-15" width="3" height="30" fill="#5d6670" opacity="0.8" />
                  ))}
                </g>
              </g>
            </g>
            {/* Lampo della chiusura */}
            <g stroke="#ffd36b" strokeWidth="3" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;0;0" keyTimes="0;0.4583;0.4667;0.5333;1" />
              <path d="M-34 -24 l-12 -10 M34 -24 l12 -10 M-34 24 l-12 10 M34 24 l12 10 M0 -26 v-14" />
            </g>
          </g>

          {/* Indicatore di tensione */}
          <g className={styles.hud}>
            <rect x="370" y="22" width="210" height="76" rx="10" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.18" />
            <text x="388" y="46" className={styles.hudLabel}>
              {labels.tension.toUpperCase()}
            </text>
            <rect x="388" y="56" width="108" height="8" rx="4" fill="#3a4048" />
            <rect x="388" y="56" width="0" height="8" rx="4" fill="#e30613">
              <animate
                attributeName="width"
                dur={DUR}
                repeatCount="indefinite"
                values="0;0;108;108"
                keyTimes="0;0.1333;0.3333;1"
                calcMode="spline"
                keySplines={`0 0 1 1;${EASE};0 0 1 1`}
              />
            </rect>
            <text x="562" y="65" textAnchor="end" className={styles.hudValue} opacity="0">
              2000 N
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.3;0.3333;1" />
            </text>
            <text x="388" y="86" className={styles.hudStep} opacity="0">
              {labels.steps[0]}
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.1;0.1333;0.3333;0.3667;1" />
            </text>
            <text x="388" y="86" className={styles.hudStep} opacity="0">
              {labels.steps[1]}
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.3333;0.3667;0.4833;0.5167;1" />
            </text>
            <text x="388" y="86" className={`${styles.hudStep} ${styles.hudDone}`} opacity="0">
              {labels.steps[2]}
              <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.5;0.5333;0.9;0.9667;1" />
            </text>
          </g>
        </g>
      </g>

      {/* Scena finale ferma, per chi preferisce ridurre il movimento */}
      <g className={styles.still} aria-hidden="true">
        <path d="M120 259 H440" stroke="#7a5228" strokeWidth="3" opacity="0.45" />
        <path d="M440 250 L480 220" stroke="#b9050f" strokeWidth="16" fill="none" />
        <path d={TIGHT} stroke="#e30613" strokeWidth="16" fill="none" />
        <g transform="translate(280 250)">
          <rect x="-25" y="-15" width="50" height="30" rx="3" fill="url(#sa-steel)" stroke="#6f7883" strokeWidth="1.5" />
          {[-13, -6, 6, 13].map((x) => (
            <rect key={x} x={x - 1.5} y="-15" width="3" height="30" fill="#5d6670" opacity="0.8" />
          ))}
        </g>
        <g className={styles.hud}>
          <rect x="370" y="22" width="210" height="76" rx="10" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.18" />
          <text x="388" y="46" className={styles.hudLabel}>
            {labels.tension.toUpperCase()}
          </text>
          <rect x="388" y="56" width="108" height="8" rx="4" fill="#e30613" />
          <text x="562" y="65" textAnchor="end" className={styles.hudValue}>
            2000 N
          </text>
          <text x="388" y="86" className={`${styles.hudStep} ${styles.hudDone}`}>
            {labels.steps[2]}
          </text>
        </g>
      </g>
    </svg>
  );
}
