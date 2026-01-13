# Miglioramenti SEO per Flli Pozzi

## 🔴 Priorità Alta

### 1. Metadata per ogni pagina
- **Problema**: Solo metadata globale nel layout.tsx
- **Soluzione**: Aggiungere metadata specifiche per ogni pagina (title, description, keywords)
- **File da modificare**: 
  - `app/page.tsx` (Home)
  - `app/prodotti/page.tsx`
  - `app/azienda/page.tsx`
  - `app/contatti/page.tsx`
  - `app/eventi/page.tsx`

### 2. Open Graph e Twitter Cards
- **Problema**: Mancano completamente
- **Soluzione**: Aggiungere Open Graph tags per condivisione social
- **Beneficio**: Migliora l'aspetto quando si condivide su Facebook, LinkedIn, Twitter

### 3. Structured Data (JSON-LD)
- **Problema**: Nessuno schema markup
- **Soluzione**: Aggiungere:
  - Organization schema (azienda)
  - Product schema (per ogni prodotto)
  - BreadcrumbList schema
  - LocalBusiness schema (per contatti)
- **Beneficio**: Migliora la visibilità nei risultati di ricerca con rich snippets

### 4. Sitemap.xml
- **Problema**: Non esiste
- **Soluzione**: Creare sitemap dinamica con Next.js
- **File**: `app/sitemap.ts`

### 5. Robots.txt
- **Problema**: Non esiste
- **Soluzione**: Creare robots.txt
- **File**: `app/robots.ts` o `public/robots.txt`

## 🟡 Priorità Media

### 6. Alt text delle immagini
- **Problema**: Alt text generici o mancanti
- **Soluzione**: Alt text descrittivi e specifici per ogni immagine
- **Esempio**: 
  - ❌ `alt="Reggia"`
  - ✅ `alt="Reggia in poliestere verde per imballaggio industriale Flli Pozzi"`

### 7. Heading structure (H1-H6)
- **Problema**: Verificare gerarchia corretta
- **Soluzione**: 
  - Un solo H1 per pagina
  - H2 per sezioni principali
  - H3 per sottosezioni
  - Evitare di saltare livelli

### 8. Canonical URLs
- **Problema**: Potrebbero esserci URL duplicati
- **Soluzione**: Aggiungere canonical tags a ogni pagina

### 9. Internal linking
- **Problema**: Verificare che ci siano link interni strategici
- **Soluzione**: Aggiungere link contestuali tra pagine correlate

### 10. Performance
- **Problema**: Immagini non ottimizzate (unoptimized)
- **Soluzione**: 
  - Usare Next.js Image optimization
  - Implementare lazy loading
  - Ottimizzare dimensioni immagini

## 🟢 Priorità Bassa

### 11. Meta keywords
- **Nota**: Non più importante per Google, ma può aiutare per altri motori

### 12. hreflang tags
- **Se necessario**: Se si prevede versione multilingua

### 13. Analytics e Search Console
- **Soluzione**: 
  - Google Analytics 4
  - Google Search Console
  - Verificare proprietà

### 14. Schema FAQ
- **Se applicabile**: Se ci sono domande frequenti

### 15. Schema Review/Rating
- **Se applicabile**: Se ci sono recensioni clienti

## 📝 Esempio di implementazione

### Metadata per pagina prodotti:
```typescript
export const metadata: Metadata = {
  title: "Prodotti Imballaggio Industriale | Reggiatrici e Sigilli | Flli Pozzi",
  description: "Scopri la nostra gamma completa di reggiatrici manuali, sigilli, reggia e carrelli per imballaggio industriale. Made in Italy dal 1947.",
  keywords: "reggiatrici, sigilli, reggia, imballaggio industriale, tendireggia, Flli Pozzi",
  openGraph: {
    title: "Prodotti Imballaggio Industriale | Flli Pozzi",
    description: "Reggiatrici, sigilli e reggia Made in Italy dal 1947",
    images: ['/Immagini/Logo Flli Pozzi 75.png'],
  },
};
```

### Structured Data Organization:
```json
{
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
    "email": "fllipozzi@fllipozzi.it"
  }
}
```

## 🚀 Prossimi Passi

1. Implementare metadata per ogni pagina
2. Aggiungere Open Graph tags
3. Creare sitemap.xml
4. Creare robots.txt
5. Aggiungere structured data
6. Migliorare alt text immagini
7. Verificare heading structure
