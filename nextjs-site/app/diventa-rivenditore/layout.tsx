import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diventa rivenditore | Fratelli Pozzi',
  description:
    'Collabora con Fratelli Pozzi come distributore o rivenditore di attrezzature e forniture per la reggiatura. Richiedi catalogo e listino B2B.',
  keywords:
    'diventa rivenditore, distributori imballaggio, listino B2B, reggiatrici, tendireggia, Fratelli Pozzi, packaging',
  openGraph: {
    title: 'Diventa rivenditore | Fratelli Pozzi',
    description:
      'Per distributori e rivenditori professionali: catalogo, condizioni commerciali e collaborazione con Fratelli Pozzi.',
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
    type: 'website',
    locale: 'it_IT',
  },
};

export default function DiventaRivenditoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
