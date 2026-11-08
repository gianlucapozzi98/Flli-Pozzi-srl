import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Richiesta inviata',
  description: 'Conferma di invio della richiesta a Fratelli Pozzi.',
  alternates: {
    canonical: '/grazie',
  },
  // Pagina di servizio dopo l'invio dei moduli: non va nei risultati di ricerca
  robots: {
    index: false,
    follow: true,
  },
};

export default function GrazieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
