/** @type {import('next').NextConfig} */

const SITE_HOST = 'www.fllipozzi.it';

/**
 * Indirizzi del vecchio sito WordPress (export 2022) che oggi darebbero 404.
 * I redirect 301 recuperano il valore dei link esterni che puntano ancora lì,
 * mandando ogni vecchia pagina alla scheda o categoria equivalente.
 *
 * Nota: i redirect hanno la precedenza sulle pagine, quindi qui non vanno mai
 * indirizzi che oggi esistono (es. /prodotti/reggia, /prodotti/sigilli).
 */
const legacyRedirects = [
  // Pagine
  { source: '/lazienda/:path*', destination: '/azienda' },
  { source: '/home/:path*', destination: '/' },
  { source: '/eventi/:path+', destination: '/eventi' },
  { source: '/feed', destination: '/' },

  // Reggiatrici: vecchie pagine modello → nuove schede
  { source: '/prodotti/reggiatrici/cp2000', destination: '/prodotti/tendireggia-manuali/cp2000' },
  { source: '/prodotti/reggiatrici/cp2000-2', destination: '/prodotti/tendireggia-manuali/cp2000' },
  { source: '/prodotti/reggiatrici/best', destination: '/prodotti/tendireggia-manuali/best' },
  { source: '/prodotti/reggiatrici/plrg', destination: '/prodotti/tendireggia-manuali/plr-g' },
  { source: '/prodotti/reggiatrici/gtsmart', destination: '/prodotti/reggiatrici-a-batteria/gt-smart-plus' },
  { source: '/prodotti/reggiatrici/gtone-2', destination: '/prodotti/reggiatrici-a-batteria/gt-one' },
  { source: '/prodotti/reggiatrici/gtxtreme', destination: '/prodotti/reggiatrici-a-batteria/gtxtreme' },
  { source: '/prodotti/reggiatrici/gtmax', destination: '/prodotti/reggiatrici-a-batteria/gt-max' },
  { source: '/prodotti/reggiatrici/cp-007', destination: '/prodotti/reggiatrici-a-batteria/cp-007' },
  { source: '/prodotti/reggiatrici/fast-ht', destination: '/prodotti/reggiatrici-pneumatiche/fast-pn-high-tension' },
  { source: '/prodotti/reggiatrici/fp-13-16-19', destination: '/prodotti/reggiatrici-pneumatiche/fp-13-16-19' },
  { source: '/prodotti/reggiatrici/fp-19s-25s-32s', destination: '/prodotti/reggiatrici-pneumatiche/fp-19s-25s-32s' },
  { source: '/prodotti/reggiatrici/fp-32-plus', destination: '/prodotti/reggiatrici-pneumatiche/fp-32-plus' },
  { source: '/prodotti/reggiatrici/sl3-pn', destination: '/prodotti/reggiatrici-pneumatiche/sl3-pn' },
  { source: '/prodotti/reggiatrici/:path*', destination: '/prodotti' },
  { source: '/prodotti/reggiatrici-2', destination: '/prodotti' },

  // Carrelli
  { source: '/prodotti/carrelli/gm-15', destination: '/prodotti/carrelli-porta-reggia/gm-15' },
  { source: '/prodotti/carrelli/fp-15', destination: '/prodotti/carrelli-porta-reggia/fp-15' },
  { source: '/prodotti/carrelli/fp-92', destination: '/prodotti/carrelli-porta-reggia/fp-92' },
  { source: '/prodotti/carrelli/:path*', destination: '/prodotti/carrelli-porta-reggia' },

  // Reggia (la categoria /prodotti/reggia oggi esiste: solo i vecchi allegati)
  { source: '/prodotti/reggia/reggia-in-polipropilene', destination: '/prodotti/reggia/reggia-polipropilene' },
  { source: '/prodotti/reggia/reggia-in-poliestere', destination: '/prodotti/reggia/reggia-poliestere' },
  { source: '/prodotti/reggia/reggia-acciaio-bobina', destination: '/prodotti/reggia/reggia-acciaio' },
  { source: '/prodotti/reggia-in-plastica', destination: '/prodotti/reggia/reggia-polipropilene' },

  // Sigilli (la categoria /prodotti/sigilli oggi esiste: solo i vecchi allegati)
  { source: '/prodotti/sigilli/sigillo-overlap', destination: '/prodotti/sigilli/sigilli-reggia-acciaio' },
  { source: '/prodotti/sigilli/:old(sigillo-grip|sigillo-k5a|sigillo-k5d|sigillo-k8a|sigillo-k8d|sigillo-tipo-a)', destination: '/prodotti/sigilli/sigilli-reggia-plastica' },
  { source: '/prodotti/sigilli/attachment/:path*', destination: '/prodotti/sigilli' },
  { source: '/prodotti/sigilliacciaio', destination: '/prodotti/sigilli/sigilli-reggia-acciaio' },

  // Pagine allegato (immagini) di WordPress
  { source: '/f-lli-pozzi-best-ridim_compressed', destination: '/prodotti/tendireggia-manuali/best' },
  { source: '/f-lli-pozzi-cp2000-ridim_compressed', destination: '/prodotti/tendireggia-manuali/cp2000' },
  { source: '/f-lli-pozzi-plr-ridim_compressed', destination: '/prodotti/tendireggia-manuali/plr-g' },
  { source: '/logo-flli-pozzi-75', destination: '/' },
  { source: '/logo-flli-pozzi-75-2', destination: '/' },
  { source: '/logo-flli-pozzi-italia', destination: '/' },
  { source: '/logo-ridim', destination: '/' },
  { source: '/sequenza-01', destination: '/' },
];

const nextConfig = {
  async redirects() {
    return [
      // Dominio senza www → www (stesso contenuto su due host = duplicato)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'fllipozzi.it' }],
        destination: `https://${SITE_HOST}/:path*`,
        statusCode: 301,
      },
      ...legacyRedirects.map((r) => ({ ...r, statusCode: 301 })),
    ];
  },
};

export default nextConfig;
