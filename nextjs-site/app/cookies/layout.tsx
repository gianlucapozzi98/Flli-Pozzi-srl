import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_TAGLINE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    `Cookie Policy di ${SITE_TAGLINE}. Informazioni sui cookie e sulle tecnologie di memorizzazione utilizzate sul sito.`,
  keywords: 'cookie policy, informativa cookie, cookie tecnici, Fratelli Pozzi',
  alternates: {
    canonical: '/cookies',
  },
  openGraph: {
    title: `Cookie Policy | ${SITE_TAGLINE}`,
    description:
      `Informativa sui cookie di ${SITE_TAGLINE}: tipologie utilizzate e gestione delle preferenze.`,
    url: '/cookies',
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary',
    title: `Cookie Policy | ${SITE_TAGLINE}`,
    description: `Cookie Policy di ${SITE_TAGLINE}.`,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
