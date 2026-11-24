'use client';

import { useEffect, useRef } from 'react';
import styles from './globe-hero.module.css';

/*
 * Apertura della home: emisfero terrestre a sinistra, in parte fuori pagina, con attorno una reggia
 * in poliestere verde chiusa da un sigillo zincato bulinato. La reggia gira attorno al globo, il globo
 * ruota piano. Three.js caricato solo nel browser, dopo il primo disegno della pagina.
 * Mappa della Terra: NASA Blue Marble (agosto 2004, topografia e batimetria), pubblico dominio.
 * All'apertura il sigillo è davanti a sinistra, vicino al bordo, e la reggia inizia subito a girare piano.
 * Quando il sigillo sparisce dall'altra parte, dopo 2 secondi rientra da sinistra.
 * Con "riduci movimento" la scena resta ferma, con il sigillo davanti.
 */

/* Stessa condizione del CSS (globe-hero.module.css e home.module.css): globo in alto e testi sotto */
export const STACKED_QUERY = '(max-width: 899.98px), (max-aspect-ratio: 23/20)';

const FOV = 20;
const RING_R = 1.13; // raggio della reggia (globo = 1)
const STRAP_W = 0.098; // larghezza della reggia
const STRAP_T = 0.0075; // spessore della reggia
const SEAL_L = STRAP_W * 2.3; // lunghezza del sigillo
const SEAL_H = STRAP_W * 1.14; // altezza del sigillo (avvolge i bordi della reggia)
const RING_SPEED = (Math.PI * 2) / 45; // un giro della reggia ogni 45 s
const RAMP_S = 0.8; // la reggia parte subito, con un avvio morbido
const HIDDEN_WAIT_S = 2; // sparito dietro al globo, il sigillo rientra da sinistra dopo 2 s
const GLOBE_SPEED = (Math.PI * 2) / 300; // un giro del globo ogni 5 minuti
const FACE_LON = 8; // longitudine rivolta verso chi guarda all'apertura (Europa e Africa)

type Layout = { r: number; cx: number; cy: number };

function layoutFor(w: number, h: number, stacked: boolean, headerH: number): Layout {
  if (!stacked) {
    const r = Math.min(h * 0.5, w * 0.29);
    return { r, cx: w * 0.45 - r, cy: h * 0.56 };
  }
  const r = Math.min(w * 0.52, h * 0.3);
  return { r, cx: w * 0.34, cy: headerH + r * 0.58 };
}

type Three = typeof import('three');
type Strip = { profile: [number, number][]; v: number[] };

/* Superficie ottenuta facendo girare un profilo (sezione) lungo un arco della circonferenza della reggia */
function sweep(
  T: Three,
  r0: number,
  th0: number,
  th1: number,
  segs: number,
  strips: Strip[],
  uOf: (th: number) => number,
  deform?: (t: number, dr: number, y: number) => [number, number],
) {
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (const strip of strips) {
    const base = pos.length / 3;
    const n = strip.profile.length;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const th = th0 + (th1 - th0) * t;
      const c = Math.cos(th);
      const s = Math.sin(th);
      for (let k = 0; k < n; k++) {
        let [dr, y] = strip.profile[k];
        if (deform) [dr, y] = deform(t, dr, y);
        const r = r0 + dr;
        pos.push(r * c, y, -r * s);
        uv.push(uOf(th), strip.v[k]);
      }
    }
    for (let i = 0; i < segs; i++) {
      for (let k = 0; k < n - 1; k++) {
        const a = base + i * n + k;
        const b = a + n;
        idx.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* Sezione rettangolare della reggia: faccia esterna, interna e i due bordi */
function strapStrips(t: number, w: number): Strip[] {
  return [
    { profile: [[t / 2, -w / 2], [t / 2, w / 2]], v: [0, 1] },
    { profile: [[-t / 2, w / 2], [-t / 2, -w / 2]], v: [1, 0] },
    { profile: [[t / 2, w / 2], [-t / 2, w / 2]], v: [1, 1] },
    { profile: [[-t / 2, -w / 2], [t / 2, -w / 2]], v: [0, 0] },
  ];
}

/*
 * Sezione del sigillo chiuso sulla reggia: faccia esterna piana, pieghe smussate e due alette lunghe
 * ripiegate sotto la reggia, che la stringono quasi fino al centro.
 */
function sealStrip(): Strip {
  const dro = STRAP_T * 2.3;
  const dri = -STRAP_T * 1.05;
  const cr = STRAP_T * 0.95; // pieghe smussate
  const lip = STRAP_W * 0.4; // alette sotto la reggia: chiudendo il sigillo stringono quasi fino al centro
  const h = SEAL_H / 2;
  const arc = (cx: number, cy: number, a0: number, a1: number): [number, number][] =>
    Array.from({ length: 5 }, (_, i) => {
      const a = a0 + ((a1 - a0) * i) / 4;
      return [cx + cr * Math.cos(a), cy + cr * Math.sin(a)];
    });
  const face: [number, number][] = Array.from({ length: 7 }, (_, i) => [dro, -h + cr + ((2 * (h - cr)) * (i + 1)) / 8]);
  const p: [number, number][] = [
    [dri, -h + lip],
    ...arc(dri + cr, -h + cr, Math.PI, Math.PI * 1.5),
    ...arc(dro - cr, -h + cr, Math.PI * 1.5, Math.PI * 2),
    ...face,
    ...arc(dro - cr, h - cr, 0, Math.PI / 2),
    ...arc(dri + cr, h - cr, Math.PI / 2, Math.PI),
    [dri, h - lip],
  ];
  return { profile: p, v: p.map(([, y]) => (y + h) / SEAL_H) };
}

/* Estremità smussate: la lamiera scende un poco verso la reggia ai due capi del sigillo */
function sealEnds(t: number, dr: number, y: number): [number, number] {
  const e = Math.min(t, 1 - t) / 0.05;
  if (e >= 1 || dr <= 0) return [dr, y];
  const k = (1 - e) * (1 - e);
  return [dr - k * STRAP_T * 0.9, y * (1 - k * 0.025)];
}

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d', { willReadFrequently: true })!] as const;
}

/* Normal map da una mappa di altezze in scala di grigi */
function normalFromHeight(src: ImageData, strength: number, wrap: boolean) {
  const { width: w, height: h, data } = src;
  const [c, ctx] = canvas(w, h);
  const out = ctx.createImageData(w, h);
  const H = (x: number, y: number) => {
    if (wrap) {
      x = (x + w) % w;
      y = (y + h) % h;
    } else {
      x = Math.min(Math.max(x, 0), w - 1);
      y = Math.min(Math.max(y, 0), h - 1);
    }
    return data[(y * w + x) * 4] / 255;
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = (H(x + 1, y) - H(x - 1, y)) * strength;
      const dy = (H(x, y + 1) - H(x, y - 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * w + x) * 4;
      out.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      out.data[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      out.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      out.data[i + 3] = 255;
    }
  }
  ctx.putImageData(out, 0, 0);
  return c;
}

/* Generatore pseudo-casuale fisso: la texture è sempre la stessa */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* Goffratura a rombi della reggia in PET (tassello ripetuto) */
function strapNormalMap(T: Three) {
  const S = 64;
  const [, ctx] = canvas(S, S);
  const img = ctx.createImageData(S, S);
  const tri = (v: number) => Math.abs(((v % 16) + 16) % 16 - 8) / 8;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const h = Math.min(tri(x + y), tri(x - y));
      const v = Math.round(255 * Math.min(1, h * 1.6));
      const i = (y * S + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  const tex = new T.CanvasTexture(normalFromHeight(img, 2.2, true));
  tex.wrapS = tex.wrapT = T.RepeatWrapping;
  tex.colorSpace = T.NoColorSpace;
  return tex;
}

/* Sigillo zincato bulinato: fiori di zincatura, grana e bollini punzonati fitti */
function sealTextures(T: Three, aniso: number) {
  const W = 1024;
  const Hh = Math.round((W * SEAL_H) / SEAL_L);
  const rand = rng(7);

  // Fiori della zincatura: celle di Voronoi a bassa risoluzione, ingrandite
  const SW = 256;
  const SH = Math.round((SW * Hh) / W);
  const [sc, sctx] = canvas(SW, SH);
  const seeds = Array.from({ length: 46 }, () => ({ x: rand() * SW, y: rand() * SH, b: (rand() - 0.5) * 0.16, a: rand() * Math.PI }));
  const simg = sctx.createImageData(SW, SH);
  for (let y = 0; y < SH; y++) {
    for (let x = 0; x < SW; x++) {
      let best = 1e9;
      let s = seeds[0];
      for (const p of seeds) {
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < best) {
          best = d;
          s = p;
        }
      }
      const dir = Math.cos(s.a) * (x - s.x) + Math.sin(s.a) * (y - s.y);
      const v = 0.72 + s.b * 0.7 + dir * 0.001;
      const i = (y * SW + x) * 4;
      simg.data[i] = 255 * v * 0.97;
      simg.data[i + 1] = 255 * v * 0.99;
      simg.data[i + 2] = 255 * v;
      simg.data[i + 3] = 255;
    }
  }
  sctx.putImageData(simg, 0, 0);

  const [cc, cctx] = canvas(W, Hh);
  cctx.imageSmoothingEnabled = true;
  cctx.drawImage(sc, 0, 0, W, Hh);
  // grana fine
  const g = cctx.getImageData(0, 0, W, Hh);
  for (let i = 0; i < g.data.length; i += 4) {
    const n = (rand() - 0.5) * 18;
    g.data[i] += n;
    g.data[i + 1] += n;
    g.data[i + 2] += n;
  }
  cctx.putImageData(g, 0, 0);

  // Mappa di altezze per i bollini: file sfalsate lungo il sigillo
  const [, hctx] = canvas(W, Hh);
  hctx.fillStyle = 'rgb(140,140,140)';
  hctx.fillRect(0, 0, W, Hh);
  const dimpleR = W * 0.0125;
  const rows = [0.19, 0.35, 0.5, 0.65, 0.81];
  const cols = 12;
  rows.forEach((v, ri) => {
    const off = ri % 2 ? 0.5 : 0;
    for (let k = 0; k < cols - (off ? 1 : 0); k++) {
      const x = (0.07 + ((k + off) * 0.86) / (cols - 1)) * W + (rand() - 0.5) * 3;
      const y = (1 - v) * Hh + (rand() - 0.5) * 3;
      const r = dimpleR * (0.92 + rand() * 0.16);
      const grad = hctx.createRadialGradient(x, y, 0, x, y, r * 1.3);
      grad.addColorStop(0, 'rgb(50,50,50)');
      grad.addColorStop(0.65, 'rgb(110,110,110)');
      grad.addColorStop(0.82, 'rgb(165,165,165)');
      grad.addColorStop(1, 'rgb(140,140,140)');
      hctx.fillStyle = grad;
      hctx.beginPath();
      hctx.arc(x, y, r * 1.3, 0, Math.PI * 2);
      hctx.fill();
      const cg = cctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      cg.addColorStop(0, 'rgba(255,255,255,0.18)');
      cg.addColorStop(0.6, 'rgba(40,46,52,0.22)');
      cg.addColorStop(1, 'rgba(40,46,52,0)');
      cctx.fillStyle = cg;
      cctx.beginPath();
      cctx.arc(x, y, r, 0, Math.PI * 2);
      cctx.fill();
    }
  });
  // Fianchi: un po' più scuri della faccia
  const edge = cctx.createLinearGradient(0, 0, 0, Hh);
  edge.addColorStop(0, 'rgba(30,36,42,0.3)');
  edge.addColorStop(0.04, 'rgba(30,36,42,0)');
  edge.addColorStop(0.96, 'rgba(30,36,42,0)');
  edge.addColorStop(1, 'rgba(30,36,42,0.3)');
  cctx.fillStyle = edge;
  cctx.fillRect(0, 0, W, Hh);

  const map = new T.CanvasTexture(cc);
  map.colorSpace = T.SRGBColorSpace;
  map.anisotropy = aniso;
  const normal = new T.CanvasTexture(normalFromHeight(hctx.getImageData(0, 0, W, Hh), 6, false));
  normal.colorSpace = T.NoColorSpace;
  normal.anisotropy = aniso;
  return { map, normal };
}

/* Rugosità del globo: oceani lucidi (riflesso del sole), terre opache */
function earthRoughness(T: Three, img: CanvasImageSource) {
  const W = 1024;
  const H = 512;
  const [c, ctx] = canvas(W, H);
  ctx.drawImage(img, 0, 0, W, H);
  const d = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < d.data.length; i += 4) {
    const r = d.data[i];
    const g = d.data[i + 1];
    const b = d.data[i + 2];
    const water = b > r * 1.25 + 4 && b > g * 1.02;
    const v = water ? 120 : 245;
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
  }
  ctx.putImageData(d, 0, 0);
  const tex = new T.CanvasTexture(c);
  tex.colorSpace = T.NoColorSpace;
  return tex;
}

function starSprite(T: Three) {
  const [c, ctx] = canvas(32, 32);
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  return new T.CanvasTexture(c);
}

const ATMO_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vN = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vP = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

/* Alone esterno (faccia posteriore di una sfera più grande) */
const HALO_FRAG = /* glsl */ `
  uniform vec3 sunDir;
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vec3 v = normalize(cameraPosition - vP);
    float t = clamp(-dot(normalize(vN), v) / 0.3, 0.0, 1.0);
    float a = pow(t, 2.6);
    float lit = smoothstep(-0.35, 0.7, dot(normalize(vN), sunDir));
    gl_FragColor = vec4(vec3(0.32, 0.6, 1.0) * a * (0.12 + 1.15 * lit), 1.0);
  }
`;

/* Atmosfera sul bordo del globo, più chiara sul lato illuminato */
const RIM_FRAG = /* glsl */ `
  uniform vec3 sunDir;
  varying vec3 vN;
  varying vec3 vP;
  void main() {
    vec3 n = normalize(vN);
    vec3 v = normalize(cameraPosition - vP);
    float f = 1.0 - max(dot(n, v), 0.0);
    float lit = smoothstep(-0.25, 0.65, dot(n, sunDir));
    float rim = pow(f, 3.2);
    gl_FragColor = vec4(vec3(0.36, 0.64, 1.0) * (rim * 1.05 + 0.035) * (0.1 + lit), 1.0);
  }
`;

export default function GlobeHero() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const T = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (disposed) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return; // niente WebGL: resta lo sfondo stellato in CSS
      }
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const stackedMq = window.matchMedia(STACKED_QUERY);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      const aniso = renderer.capabilities.getMaxAnisotropy();

      const scene = new T.Scene();
      const pmrem = new T.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const env = pmrem.fromScene(room, 0.04).texture;
      room.dispose?.();
      pmrem.dispose();

      const camera = new T.PerspectiveCamera(FOV, 1, 0.1, 300);

      // Stelle
      const sprite = starSprite(T);
      [
        { n: 1400, size: 1.5, min: 0.25 },
        { n: 160, size: 2.6, min: 0.55 },
      ].forEach(({ n, size, min }, li) => {
        const r = rng(31 + li);
        const p = new Float32Array(n * 3);
        const col = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          const z = r() * 2 - 1;
          const a = r() * Math.PI * 2;
          const s = Math.sqrt(1 - z * z);
          p.set([Math.cos(a) * s * 120, Math.sin(a) * s * 120, z * 120 - 40], i * 3);
          const b = min + (1 - min) * Math.pow(r(), 3);
          const warm = r() * 0.12;
          col.set([b, b * (1 - warm * 0.4), b * (1 - warm)], i * 3);
        }
        const g = new T.BufferGeometry();
        g.setAttribute('position', new T.BufferAttribute(p, 3));
        g.setAttribute('color', new T.BufferAttribute(col, 3));
        const m = new T.PointsMaterial({ size, sizeAttenuation: false, map: sprite, vertexColors: true, transparent: true, depthWrite: false });
        scene.add(new T.Points(g, m));
      });

      // Luci: sole in alto a destra, davanti; luce ambiente debole per il lato in ombra
      const sun = new T.DirectionalLight(0xfff6ea, 3.3);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, { left: -1.5, right: 1.5, top: 1.5, bottom: -1.5, near: 0.5, far: 14 });
      sun.shadow.bias = -0.0004;
      sun.shadow.normalBias = 0.012;
      scene.add(sun, sun.target);
      scene.add(new T.AmbientLight(0x6f86a8, 0.1));
      const SUN_DIR = new T.Vector3(3.2, 2.1, 4.4).normalize();

      const earth = new T.Group();
      scene.add(earth);
      sun.target = earth;

      // Globo
      const isSmall = window.innerWidth < 1100;
      const earthMap = await new T.TextureLoader().loadAsync(isSmall ? '/Immagini/terra-nasa-2048.jpg' : '/Immagini/terra-nasa-3072.jpg');
      if (disposed) {
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }
      earthMap.colorSpace = T.SRGBColorSpace;
      earthMap.anisotropy = aniso;
      const rough = earthRoughness(T, earthMap.image as CanvasImageSource);
      const globeGeo = new T.SphereGeometry(1, 160, 120);
      const globeMat = new T.MeshStandardMaterial({ map: earthMap, roughnessMap: rough, roughness: 1, metalness: 0 });
      const globe = new T.Mesh(globeGeo, globeMat);
      globe.receiveShadow = true;
      const globeTilt = new T.Group();
      globeTilt.rotation.set(0.3, 0, 0.12);
      const globeSpin = new T.Group();
      globeSpin.rotation.y = -Math.PI / 2 - (FACE_LON * Math.PI) / 180;
      globeSpin.add(globe);
      globeTilt.add(globeSpin);
      earth.add(globeTilt);

      const sunUniform = { value: SUN_DIR.clone() };
      const rimMat = new T.ShaderMaterial({ vertexShader: ATMO_VERT, fragmentShader: RIM_FRAG, uniforms: { sunDir: sunUniform }, blending: T.AdditiveBlending, transparent: true, depthWrite: false });
      const haloMat = new T.ShaderMaterial({ vertexShader: ATMO_VERT, fragmentShader: HALO_FRAG, uniforms: { sunDir: sunUniform }, side: T.BackSide, blending: T.AdditiveBlending, transparent: true, depthWrite: false });
      const atmoGeo = new T.SphereGeometry(1, 96, 64);
      const rim = new T.Mesh(atmoGeo, rimMat);
      rim.scale.setScalar(1.003);
      const halo = new T.Mesh(atmoGeo, haloMat);
      halo.scale.setScalar(1.045);
      earth.add(rim, halo);

      // Reggia
      const strapNormal = strapNormalMap(T);
      strapNormal.repeat.set(1.6, 2.5); // rombi allungati, una decina sulla larghezza
      const strapMat = new T.MeshPhysicalMaterial({
        color: 0x2c726b, // verde petrolio, come la reggia in PET in foto
        roughness: 0.5,
        metalness: 0,
        clearcoat: 0.2,
        clearcoatRoughness: 0.35,
        normalMap: strapNormal,
        normalScale: new T.Vector2(0.55, 0.55),
        envMap: env,
        envMapIntensity: 0.4,
        side: T.DoubleSide,
      });
      const uStrap = (th: number) => (th * RING_R) / STRAP_W;
      const half = SEAL_L / 2 / RING_R;
      const bandGeo = sweep(T, RING_R, 0, Math.PI * 2, 900, strapStrips(STRAP_T, STRAP_W), uStrap);
      // Capo superiore sovrapposto: entra nel sigillo e sporge un poco da un lato
      const tailGeo = sweep(T, RING_R + STRAP_T * 1.02, -half * 0.9, half + (STRAP_W * 0.55) / RING_R, 60, strapStrips(STRAP_T, STRAP_W), uStrap);
      const band = new T.Mesh(bandGeo, strapMat);
      const tail = new T.Mesh(tailGeo, strapMat);
      band.castShadow = tail.castShadow = true;

      // Sigillo
      const sealTex = sealTextures(T, aniso);
      const sealMat = new T.MeshStandardMaterial({
        map: sealTex.map,
        normalMap: sealTex.normal,
        normalScale: new T.Vector2(0.9, 0.9),
        metalness: 0.92,
        roughness: 0.32,
        envMap: env,
        envMapIntensity: 0.9,
        side: T.DoubleSide,
      });
      const sealGeo = sweep(T, RING_R, -half, half, 80, [sealStrip()], (th) => (th + half) / (2 * half), sealEnds);
      const seal = new T.Mesh(sealGeo, sealMat);
      seal.castShadow = true;

      const ringTilt = new T.Group();
      ringTilt.rotation.order = 'ZXY';
      ringTilt.rotation.set(0.2, 0, 0.34);
      const ringSpin = new T.Group();
      ringSpin.rotation.y = -Math.PI / 2;
      let moved = false; // la reggia ha già iniziato a girare
      ringSpin.add(band, tail, seal);
      ringTilt.add(ringSpin);
      earth.add(ringTilt);

      // Impaginazione: globo a sinistra (o in alto su schermi stretti), in parte fuori pagina
      const place = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
        const L = layoutFor(w, h, stackedMq.matches, headerH);
        const u = 1 / L.r;
        const d = (h * u) / 2 / Math.tan((FOV * Math.PI) / 360);
        camera.aspect = w / h;
        camera.position.set(0, 0, d);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        earth.position.set((L.cx - w / 2) * u, (h / 2 - L.cy) * u, 0);
        sun.position.copy(earth.position).addScaledVector(SUN_DIR, 7);
        findLeftAngles(w);
      };

      /* Il sigillo si vede? Nascosto se tutti e tre i punti (capi e centro) sono fuori pagina o dietro al globo */
      const sp = new T.Vector3();
      const sealHidden = () => {
        earth.updateMatrixWorld(true);
        camera.updateMatrixWorld();
        const c = camera.position;
        const e = earth.position;
        for (const th of [-half, 0, half]) {
          seal.localToWorld(sp.set(RING_R * Math.cos(th), 0, -RING_R * Math.sin(th)));
          const dist = sp.distanceTo(c);
          const dx = (sp.x - c.x) / dist;
          const dy = (sp.y - c.y) / dist;
          const dz = (sp.z - c.z) / dist;
          const tc = (e.x - c.x) * dx + (e.y - c.y) * dy + (e.z - c.z) * dz;
          const d2 = e.distanceToSquared(c) - tc * tc;
          const behind = d2 < 1 && tc - Math.sqrt(1 - d2) < dist - 1e-3;
          const ndc = sp.clone().project(camera);
          const off = ndc.x < -1 || ndc.x > 1 || ndc.y < -1 || ndc.y > 1;
          if (!behind && !off) return false;
        }
        return true;
      };

      /*
       * Angoli della reggia a sinistra: "start" mette il sigillo davanti, appena dentro il bordo della pagina
       * (apertura); "entry" appena fuori, da dove rientra dopo essere sparito dietro al globo.
       */
      let entryAngle = -Math.PI;
      const findLeftAngles = (w: number) => {
        const target = Math.max(56, w * 0.05);
        const keep = ringSpin.rotation.y;
        let start = -Math.PI / 2;
        let found = false;
        for (let d = 0; d <= Math.PI / 2; d += 0.01) {
          ringSpin.rotation.y = -Math.PI / 2 - d;
          earth.updateMatrixWorld(true);
          camera.updateMatrixWorld();
          seal.localToWorld(sp.set(RING_R, 0, 0)).project(camera);
          if (!found && ((sp.x + 1) / 2) * w >= target) start = ringSpin.rotation.y;
          else found = true;
          if (found && sealHidden()) {
            entryAngle = ringSpin.rotation.y;
            break;
          }
        }
        ringSpin.rotation.y = moved ? keep : start;
      };
      // passo della goffratura lungo la reggia: i salti avvengono di un numero intero di rombi, così non si notano
      const embossStep = (0.25 / 1.6) * (STRAP_W / RING_R);
      let seen = true;
      let hiddenAt = -1;
      place();

      let raf = 0;
      let running = false;
      let last = performance.now();
      let t = 0;
      const render = () => renderer.render(scene, camera);
      const frame = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        // la reggia parte subito e porta il sigillo da sinistra verso destra
        moved = true;
        const k = Math.min(t / RAMP_S, 1);
        ringSpin.rotation.y += RING_SPEED * k * k * (3 - 2 * k) * dt;
        globeSpin.rotation.y += GLOBE_SPEED * dt;
        // il sigillo sparisce dall'altra parte: dopo 2 s la reggia salta e lo riporta appena fuori a sinistra
        const hidden = sealHidden();
        if (!hidden) {
          seen = true;
          hiddenAt = -1;
        } else if (seen) {
          seen = false;
          hiddenAt = t;
        } else if (hiddenAt >= 0 && t - hiddenAt >= HIDDEN_WAIT_S) {
          const a = ringSpin.rotation.y;
          const delta = entryAngle - a - Math.round((entryAngle - a) / (Math.PI * 2)) * Math.PI * 2;
          ringSpin.rotation.y = a + Math.round(delta / embossStep) * embossStep;
          hiddenAt = -1;
        }
        render();
        raf = requestAnimationFrame(frame);
      };
      const start = () => {
        if (running || reduce) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      render();
      host.dataset.ready = '';
      host.classList.add(styles.ready);

      const ro = new ResizeObserver(() => {
        place();
        if (!running) render();
      });
      ro.observe(host);
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
      io.observe(host);

      cleanup = () => {
        stop();
        ro.disconnect();
        io.disconnect();
        scene.traverse((o) => {
          const m = o as import('three').Mesh;
          m.geometry?.dispose();
          const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
          mats.forEach((mat) => mat.dispose());
        });
        [earthMap, rough, strapNormal, sealTex.map, sealTex.normal, sprite, env].forEach((x) => x.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className={styles.stage} aria-hidden="true" />;
}
