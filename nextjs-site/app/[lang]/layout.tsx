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
  weight: ["600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
  // Solo etichette piccole: non serve precaricarlo, così la banda va al titolo e alla foto
  preload: false,
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

  // Organizzazione e sito in un unico grafo: dati chiari e citabili anche per gli assistenti AI
  const ORG_DESCRIPTION: Record<string, string> = {
    it: "Fratelli Pozzi è un'azienda di Caravaggio (BG) attiva dal 1947 nella reggiatura e nell'imballaggio industriale. Progetta e assembla in Italia tendireggia manuali per reggia in polipropilene e fornisce reggiatrici a batteria e pneumatiche, reggia in PP, PET e acciaio, sigilli, carrelli porta reggia, ricambi originali e assistenza tecnica. Sistema qualità certificato ISO 9001:2015.",
    en: "Fratelli Pozzi is a company based in Caravaggio (Bergamo, Italy), active since 1947 in strapping and industrial packaging. It designs and assembles manual tensioners for polypropylene strap in Italy and supplies battery and pneumatic strapping tools, PP, PET and steel strapping, seals, strap dispensers, original spare parts and technical service. ISO 9001:2015 certified quality system.",
    fr: "Fratelli Pozzi est une entreprise de Caravaggio (Bergame, Italie), active depuis 1947 dans le cerclage et l'emballage industriel. Elle conçoit et assemble en Italie des tendeurs manuels pour feuillard polypropylène et fournit des cercleuses à batterie et pneumatiques, des feuillards PP, PET et acier, des chapes, des dérouleurs, des pièces d'origine et une assistance technique. Système qualité certifié ISO 9001:2015.",
  };

  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Fratelli Pozzi S.r.l.",
        alternateName: ["Flli Pozzi", "F.lli Pozzi", "Fratelli Pozzi"],
        description: ORG_DESCRIPTION[lang],
        url: SITE_URL,
        logo: `${SITE_URL}/Immagini/logo-fratelli-pozzi.png`,
        image: `${SITE_URL}/og/fratelli-pozzi-stabilimento-caravaggio.jpg`,
        foundingDate: "1947",
        vatID: "IT00215550161",
        email: "fllipozzi@fllipozzi.it",
        telephone: "+39-0363-350380",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Via L. Da Vinci 37",
          addressLocality: "Caravaggio",
          addressRegion: "BG",
          postalCode: "24043",
          addressCountry: "IT",
        },
        areaServed: ["IT", "Europe"],
        knowsAbout: [
          "reggiatura",
          "tendireggia manuali",
          "reggiatrici a batteria",
          "reggiatrici pneumatiche",
          "reggia in polipropilene (PP)",
          "reggia in poliestere (PET)",
          "reggia in acciaio",
          "sigilli per reggia",
          "carrelli porta reggia",
          "imballaggio industriale",
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: "ISO 9001:2015",
          url: `${SITE_URL}/FRATELLI%20POZZI%209001%202015_Certificato%20di%20registrazione.pdf`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+39-0363-350380",
          contactType: "customer service",
          email: "fllipozzi@fllipozzi.it",
          areaServed: ["IT", "Europe"],
          availableLanguage: ["Italian", "English", "French"],
        },
        sameAs: [
          "https://www.linkedin.com/company/flli-pozzi",
          "https://www.instagram.com/flli.pozzi.srl/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Fratelli Pozzi",
        inLanguage: ["it-IT", "en-GB", "fr-FR"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
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
            __html: JSON.stringify(siteSchema).replace(/</g, '\\u003c'),
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
