/** @type {import('next').NextConfig} */

const SITE_HOST = 'www.fllipozzi.it';

/**
 * Indirizzi del vecchio sito WordPress (export 2022) che oggi darebbero 404.
 * I redirect 301 recuperano il valore dei link esterni che puntano ancora lì.
 *
 * ATTENZIONE: quando verranno create le pagine categoria /prodotti/reggia e
 * /prodotti/sigilli, togliere le relative regole: i redirect hanno la
 * precedenza sulle pagine.
 */
const legacyRedirects = [
  // Pagine
  { source: '/lazienda/:path*', destination: '/azienda' },
  { source: '/home/:path*', destination: '/' },
  { source: '/prodotti/reggiatrici/:path*', destination: '/prodotti#reggiatrici' },
  { source: '/prodotti/reggiatrici-2', destination: '/prodotti#reggiatrici' },
  { source: '/prodotti/carrelli/:path*', destination: '/prodotti#carrelli' },
  { source: '/prodotti/reggia/:path*', destination: '/prodotti#reggia' },
  { source: '/prodotti/reggia-in-plastica', destination: '/prodotti#reggia' },
  { source: '/prodotti/sigilli/:path*', destination: '/prodotti#sigilli' },
  { source: '/prodotti/sigilliacciaio', destination: '/prodotti#sigilli' },
  { source: '/eventi/:path+', destination: '/eventi' },
  // Pagine allegato (immagini) di WordPress
  { source: '/f-lli-pozzi-best-ridim_compressed', destination: '/prodotti#reggiatrici' },
  { source: '/f-lli-pozzi-cp2000-ridim_compressed', destination: '/prodotti#reggiatrici' },
  { source: '/f-lli-pozzi-plr-ridim_compressed', destination: '/prodotti#reggiatrici' },
  { source: '/logo-flli-pozzi-75', destination: '/' },
  { source: '/logo-flli-pozzi-75-2', destination: '/' },
  { source: '/logo-flli-pozzi-italia', destination: '/' },
  { source: '/logo-ridim', destination: '/' },
  { source: '/sequenza-01', destination: '/' },
  { source: '/feed', destination: '/' },
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
