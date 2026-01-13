import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'Azienda | Storia e Valori | Flli Pozzi",
  description: "Scopri la storia di Flli Pozzi, leader nell'imballaggio dal 1947. Made in Italy, qualità e affidabilità per oltre 75 anni di esperienza nel settore dell'imballaggio industriale.",
  keywords: "Flli Pozzi storia, azienda imballaggio, Made in Italy, storia azienda, valori aziendali, Caravaggio",
  openGraph: {
    title: "L'Azienda | Storia e Valori | Flli Pozzi",
    description: "Dal 1947, leader nell'imballaggio industriale. Storia, valori e tradizione Made in Italy.",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
    type: 'website',
    locale: 'it_IT',
  },
};

export default function AziendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
