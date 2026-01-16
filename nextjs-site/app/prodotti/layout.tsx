import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reggiatrici e forniture per l'Imballaggio | Flli Pozzi",
  description: "Scopri la nostra gamma completa di reggiatrici manuali e automatiche, sigilli, reggia e carrelli per imballaggio industriale.",
  keywords: "reggiatrici, tendireggia, sigilli, reggia, carrelli porta reggia, imballaggio industriale, Flli Pozzi, Made in Italy",
  openGraph: {
    title: "Reggiatrici e forniture per l'Imballaggio | Flli Pozzi",
    description: "Reggiatrici manuali e automatiche, sigilli, reggia e carrelli per imballaggio industriale.",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reggiatrici e forniture per l'Imballaggio | Flli Pozzi",
    description: "Reggiatrici manuali e automatiche, sigilli, reggia e carrelli per imballaggio industriale.",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
  },
};

export default function ProdottiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
