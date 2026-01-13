import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventi e Fiere | Flli Pozzi",
  description: "Scopri gli eventi e le fiere a cui partecipa Flli Pozzi. IPACK-IMA, Macfrut e altre manifestazioni del settore imballaggio.",
  keywords: "fiere imballaggio, IPACK-IMA, Macfrut, eventi settore imballaggio, Flli Pozzi eventi",
  openGraph: {
    title: "Eventi e Fiere | Flli Pozzi",
    description: "Scopri gli eventi e le fiere a cui partecipa Flli Pozzi nel settore dell'imballaggio.",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
    type: 'website',
    locale: 'it_IT',
  },
};

export default function EventiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
