import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ScrollToTop } from "@/components/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
  title: "Flli Pozzi srl - Leader nell'imballaggio",
  description: "Flli Pozzi - Dal 1947, leader nell'imballaggio. Reggiatrici, carrelli, sigilli e reggia per imballaggio industriale. Made in Italy.",
  keywords: "reggiatrici, sigilli, reggia, imballaggio industriale, tendireggia, Flli Pozzi, Made in Italy",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Flli Pozzi srl - Leader nell'imballaggio",
    description: "Dal 1947, leader nell'imballaggio industriale. Reggiatrici, sigilli e reggia Made in Italy.",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flli Pozzi srl - Leader nell'imballaggio",
    description: "Dal 1947, leader nell'imballaggio industriale. Made in Italy.",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
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
    "name": "Flli Pozzi srl",
    "url": "https://www.fllipozzi.it",
    "logo": "https://www.fllipozzi.it/Immagini/Logo Flli Pozzi Italia.png",
    "foundingDate": "1947",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via L. Da Vinci 37",
      "addressLocality": "Caravaggio",
      "addressRegion": "BG",
      "postalCode": "24043",
      "addressCountry": "IT"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-0363-350380",
      "contactType": "customer service",
      "email": "fllipozzi@fllipozzi.it",
      "areaServed": "IT",
      "availableLanguage": "Italian"
    },
    "sameAs": [
      "https://www.linkedin.com/company/flli-pozzi",
      "https://www.instagram.com/flli.pozzi.srl/"
    ]
  };

  return (
    <html lang="it" className={`${inter.variable} ${montserrat.variable} overflow-x-hidden`}>
      <body className="antialiased overflow-x-hidden max-w-full" suppressHydrationWarning>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <LanguageProvider>
          <div className="min-h-screen w-full overflow-x-hidden">
            {children}
            <ScrollToTop />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
