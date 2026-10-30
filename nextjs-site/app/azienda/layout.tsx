import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "L'azienda — Storia e valori",
  description:
    `${SITE_TAGLINE}. Storia, valori e produzione Made in Italy di attrezzature per la reggiatura e l'imballaggio industriale.`,
  keywords:
    "Fratelli Pozzi storia, azienda imballaggio Caravaggio, Made in Italy, valori aziendali, dal 1947",
  alternates: {
    canonical: "/azienda",
  },
  openGraph: {
    title: `L'azienda | ${SITE_TAGLINE}`,
    description:
      "Dal 1947 a Caravaggio: storia, valori e tradizione Made in Italy nell'imballaggio industriale.",
    url: "/azienda",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: `L'azienda | ${SITE_TAGLINE}`,
    description:
      "Dal 1947 a Caravaggio: storia e valori Made in Italy nell'imballaggio industriale.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AziendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
