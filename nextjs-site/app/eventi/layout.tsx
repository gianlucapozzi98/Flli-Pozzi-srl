import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_TAGLINE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Eventi e fiere",
  description:
    `Fiere ed eventi di ${SITE_TAGLINE}: IPACK-IMA, Macfrut e altre manifestazioni del settore imballaggio.`,
  keywords:
    "fiere imballaggio, IPACK-IMA, Macfrut, eventi settore imballaggio, Fratelli Pozzi eventi",
  alternates: {
    canonical: "/eventi",
  },
  openGraph: {
    title: `Eventi e fiere | ${SITE_TAGLINE}`,
    description:
      "Scopri le fiere e gli eventi a cui partecipa Fratelli Pozzi nel settore dell'imballaggio.",
    url: "/eventi",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: `Eventi e fiere | ${SITE_TAGLINE}`,
    description:
      "IPACK-IMA, Macfrut e altre fiere del settore imballaggio con Fratelli Pozzi.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function EventiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
