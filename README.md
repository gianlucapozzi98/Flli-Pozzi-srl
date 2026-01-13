# Flli Pozzi srl - Sito Web

Sito web moderno per Flli Pozzi srl, sviluppato con Next.js e TypeScript.

## Struttura del Progetto

Il progetto è organizzato nella cartella `nextjs-site/` che contiene l'applicazione Next.js completa.

### Pagine Principali
- **Home** (`/`) - Homepage con hero section, features e sezioni principali
- **Prodotti** (`/prodotti`) - Catalogo prodotti (Reggiatrici, Carrelli, Reggia, Sigilli)
- **Azienda** (`/azienda`) - Storia e informazioni sull'azienda
- **Eventi** (`/eventi`) - Fiere e eventi a cui l'azienda ha partecipato
- **Contatti** (`/contatti`) - Form di contatto e informazioni
- **Privacy** (`/privacy`) - Informativa sulla privacy
- **Cookies** (`/cookies`) - Cookie policy

## Caratteristiche

### Design Moderno
- Design responsive e mobile-first
- Tipografia moderna (Inter + Montserrat)
- Colori aziendali: Rosso primario (#E30613), Grigio scuro (#3A3A3A)
- Animazioni fluide con Framer Motion
- Layout pulito e professionale

### Tecnologie Utilizzate
- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipizzazione statica
- **Tailwind CSS 4** - Styling utility-first
- **Framer Motion** - Animazioni
- **React Hook Form + Zod** - Gestione form e validazione
- **Internationalization** - Supporto italiano/inglese

### Funzionalità
- 🌐 **Multilingua**: Supporto italiano/inglese con switch lingua
- 📱 **Responsive**: Ottimizzato per tutti i dispositivi
- 🔍 **SEO**: Metadata, Open Graph, Structured Data, Sitemap, Robots.txt
- ⚡ **Performance**: Ottimizzazione immagini con Next.js Image
- 🎨 **Animazioni**: Transizioni fluide e caroselli interattivi

## Installazione e Sviluppo

```bash
cd nextjs-site
npm install
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`

## Build per Produzione

```bash
cd nextjs-site
npm run build
npm start
```

## Struttura File

```
nextjs-site/
├── app/                    # App Router di Next.js
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Layout principale
│   ├── globals.css        # Stili globali
│   ├── prodotti/          # Pagina prodotti
│   ├── azienda/           # Pagina azienda
│   ├── eventi/            # Pagina eventi
│   ├── contatti/          # Pagina contatti
│   ├── privacy/           # Privacy policy
│   └── cookies/           # Cookie policy
├── components/            # Componenti React riutilizzabili
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LanguageSwitcher.tsx
├── contexts/              # React Context
│   └── LanguageContext.tsx
├── public/                # File statici
│   └── Immagini/         # Immagini del sito
└── package.json
```

## Note

- Il sito è completamente statico e può essere ospitato su Vercel, Netlify o qualsiasi hosting che supporta Next.js
- Le immagini sono ottimizzate automaticamente da Next.js
- Il supporto multilingua è gestito tramite React Context e localStorage

## Browser Supportati

- Chrome (ultime 2 versioni)
- Firefox (ultime 2 versioni)
- Safari (ultime 2 versioni)
- Edge (ultime 2 versioni)
