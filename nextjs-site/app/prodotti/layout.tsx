import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reggiatrici e forniture per l'imballaggio",
  description:
    "Gamma Fratelli Pozzi: tendireggia manuali Made in Italy, reggiatrici a batteria e pneumatiche, sigilli, reggia e accessori per imballaggio industriale.",
  keywords:
    "reggiatrici, tendireggia, sigilli, reggia, carrelli porta reggia, imballaggio industriale, Fratelli Pozzi, Made in Italy",
  alternates: {
    canonical: "/prodotti",
  },
  openGraph: {
    title: `Reggiatrici e forniture per l'imballaggio | ${SITE_TAGLINE}`,
    description:
      "Tendireggia manuali, reggiatrici, sigilli, reggia e accessori per imballaggio industriale. Made in Italy dal 1947.",
    url: "/prodotti",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: `Reggiatrici e forniture | ${SITE_TAGLINE}`,
    description:
      "Tendireggia, reggiatrici, sigilli e reggia per imballaggio industriale. Made in Italy.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ProdottiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
