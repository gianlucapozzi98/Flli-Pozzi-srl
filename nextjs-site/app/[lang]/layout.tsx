import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { ScrollToTop } from "@/components/Header";
import MobileCtaBar from "@/components/MobileCtaBar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTopOnRouteChange from "@/components/ScrollToTopOnRouteChange";
import { PAGE_META, SITE_NAME, SITE_URL } from "@/lib/seo";
import { DEFAULT_LANG, LANGS, isLang } from "@/lib/i18n";

// Font serviti dal sito stesso (next/font): nessuna richiesta ai server di Google dal browser
const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// Solo it/en/fr: qualsiasi altro prefisso (es. /de) restituisce 404
export const dynamicParams = false;

type LayoutParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : DEFAULT_LANG;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${PAGE_META.home[lang].title} | ${SITE_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: PAGE_META.home[lang].description,
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

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
      lang={lang}
      suppressHydrationWarning
      className={`${barlow.variable} ${barlowCondensed.variable} ${plexMono.variable} overflow-x-hidden`}
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
        <LanguageProvider language={lang}>
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
