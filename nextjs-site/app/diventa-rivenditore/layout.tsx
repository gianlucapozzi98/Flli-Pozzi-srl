import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_TAGLINE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Diventa rivenditore — Distributori e grossisti',
  // Max ~155 caratteri, oltre Google tronca
  description:
    'Distributori e rivenditori di imballaggio: richiedi a Fratelli Pozzi catalogo B2B, listino riservato e condizioni commerciali dedicate.',
  keywords:
    'diventa rivenditore, distributori imballaggio, grossisti packaging, listino B2B, reggiatrici, tendireggia, Fratelli Pozzi Caravaggio',
  alternates: {
    canonical: '/diventa-rivenditore',
  },
  openGraph: {
    title: `Diventa rivenditore — Distributori e grossisti | ${SITE_TAGLINE}`,
    description:
      'Collaborazione commerciale per distributori e grossisti: catalogo, listino B2B e supporto nella scelta delle attrezzature per la reggiatura.',
    url: '/diventa-rivenditore',
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Diventa rivenditore — Distributori e grossisti | ${SITE_TAGLINE}`,
    description:
      'Per distributori e grossisti: catalogo B2B e collaborazione commerciale con Fratelli Pozzi.',
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DiventaRivenditoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
