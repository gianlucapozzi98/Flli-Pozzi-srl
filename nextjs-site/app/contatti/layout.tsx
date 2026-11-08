import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contatti",
  // Max ~155 caratteri, oltre Google tronca
  description:
    "Contatta Fratelli Pozzi a Caravaggio (BG): telefono, email e modulo per preventivi su tendireggia, reggiatrici, reggia e sigilli per imballaggio.",
  keywords:
    "contatti Fratelli Pozzi, Caravaggio BG, informazioni imballaggio, assistenza tecnica, preventivi",
  alternates: {
    canonical: "/contatti",
  },
  openGraph: {
    title: `Contatti | ${SITE_TAGLINE}`,
    description:
      "Contattaci per informazioni su reggiatrici, sigilli e forniture per l'imballaggio industriale. Sede a Caravaggio (BG).",
    url: "/contatti",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contatti | ${SITE_TAGLINE}`,
    description:
      "Telefono, email e form di contatto. Fratelli Pozzi, Caravaggio (BG).",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
