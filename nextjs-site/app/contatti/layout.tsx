import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti | Flli Pozzi - Richiedi Informazioni",
  description: "Contatta Flli Pozzi per informazioni su reggiatrici, sigilli e forniture per l'imballaggio. Siamo a Caravaggio (BG). Telefono, email e form di contatto.",
  keywords: "contatti Flli Pozzi, informazioni imballaggio, Caravaggio, assistenza tecnica, preventivi",
  openGraph: {
    title: "Contatti | Flli Pozzi",
    description: "Contattaci per informazioni su reggiatrici, sigilli e forniture per l'imballaggio industriale.",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
    type: 'website',
    locale: 'it_IT',
  },
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
