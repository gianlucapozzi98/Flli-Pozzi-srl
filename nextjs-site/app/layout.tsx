import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/Header";
import MobileCtaBar from "@/components/MobileCtaBar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTopOnRouteChange from "@/components/ScrollToTopOnRouteChange";
import HtmlLang from "@/components/HtmlLang";
import { DEFAULT_OG_IMAGE, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TAGLINE} | Articoli per imballaggio`,
    template: `%s | ${SITE_TAGLINE}`,
  },
  description:
    "Fratelli Pozzi — Caravaggio, dal 1947. Reggiatrici, tendireggia, sigilli e reggia per imballaggio industriale. Made in Italy.",
  keywords:
    "Fratelli Pozzi, Flli Pozzi, Caravaggio, reggiatrici, tendireggia, sigilli, reggia, imballaggio industriale, Made in Italy",
  authors: [{ name: "Fratelli Pozzi S.r.l." }],
  creator: "Fratelli Pozzi S.r.l.",
  publisher: "Fratelli Pozzi S.r.l.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_TAGLINE} | Articoli per imballaggio`,
    description:
      "Dal 1947 a Caravaggio: reggiatrici, sigilli e reggia Made in Italy per l'imballaggio industriale.",
    url: "/",
    siteName: SITE_TAGLINE,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Logo Fratelli Pozzi — Caravaggio, dal 1947",
      },
    ],
    type: "website",
    locale: "it_IT",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TAGLINE} | Articoli per imballaggio`,
    description:
      "Dal 1947 a Caravaggio: attrezzature e forniture per l'imballaggio industriale. Made in Italy.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Fratelli Pozzi S.r.l.",
    alternateName: [
      "Flli Pozzi",
      "F.lli Pozzi",
      "Fratelli Pozzi — Caravaggio, dal 1947",
    ],
    description:
      "Fratelli Pozzi — Caravaggio, dal 1947. Attrezzature e forniture per l'imballaggio industriale. Made in Italy.",
    url: SITE_URL,
    logo: `${SITE_URL}/Immagini/logo-fratelli-pozzi.png`,
    foundingDate: "1947",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via L. Da Vinci 37",
      addressLocality: "Caravaggio",
      addressRegion: "BG",
      postalCode: "24043",
      addressCountry: "IT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+39-0363-350380",
      contactType: "customer service",
      email: "fllipozzi@fllipozzi.it",
      areaServed: "IT",
      availableLanguage: ["Italian", "English", "French"],
    },
    sameAs: [
      "https://www.linkedin.com/company/flli-pozzi",
      "https://www.instagram.com/flli.pozzi.srl/",
    ],
  };

  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} overflow-x-hidden`}
    >
      <body className="antialiased overflow-x-hidden max-w-full" suppressHydrationWarning>
        {/* JSON-LD renderizzato dal server: presente già nell'HTML iniziale (next/script lo inseriva solo dopo l'idratazione) */}
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
          }}
        />
        <LanguageProvider>
          <HtmlLang />
          <div className="min-h-screen w-full overflow-x-hidden">
            <ScrollToTopOnRouteChange />
            {children}
            <ScrollToTop />
            <MobileCtaBar />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
