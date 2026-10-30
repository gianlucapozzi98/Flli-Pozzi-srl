import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_TAGLINE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    `Informativa sulla privacy di ${SITE_TAGLINE}. Come trattiamo i dati personali raccolti tramite il sito e i moduli di contatto.`,
  keywords: 'privacy policy, informativa privacy, protezione dati, GDPR, Fratelli Pozzi',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_TAGLINE}`,
    description:
      `Informativa sulla privacy di ${SITE_TAGLINE}: trattamento dei dati personali e diritti degli interessati.`,
    url: '/privacy',
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary',
    title: `Privacy Policy | ${SITE_TAGLINE}`,
    description: `Informativa sulla privacy di ${SITE_TAGLINE}.`,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
