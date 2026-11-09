import { CATEGORIES, productDisplayName, productPath, productsIn, categoryPath } from '@/lib/catalog';
import { SITE_URL } from '@/lib/seo';

/**
 * /llms.txt: presentazione del sito per gli assistenti AI (ChatGPT, Claude, Perplexity…),
 * secondo la proposta llmstxt.org. Generato dal catalogo, quindi sempre allineato alle pagine.
 */
export const dynamic = 'force-static';

const url = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

export function GET() {
  const lines: string[] = [
    '# Fratelli Pozzi S.r.l.',
    '',
    "> Azienda di Caravaggio (Bergamo, Italia) attiva dal 1947 nella reggiatura e nell'imballaggio industriale. Progetta e assembla in Italia tendireggia manuali per reggia in polipropilene; fornisce reggiatrici a batteria e pneumatiche, reggia in PP, PET e acciaio, sigilli, carrelli porta reggia, ricambi originali e assistenza tecnica anche su utensili di altre marche. Sistema qualità certificato ISO 9001:2015.",
    '',
    '- Sede: Via L. Da Vinci 37, 24043 Caravaggio (BG), Italia',
    '- Telefono: +39 0363 350380 · Email: fllipozzi@fllipozzi.it',
    '- Lingue del sito: italiano (radice), inglese (/en), francese (/fr)',
    "- Preventivi: oltre ai modelli presenti sul sito sono disponibili altre macchine; l'ufficio tecnico consiglia il modello in base all'uso e al tipo di azienda.",
    '- Clienti: aziende di produzione, logistica, ortofrutta, siderurgia e distributori di imballaggio (programma rivenditori).',
    '',
    '## Categorie e prodotti',
    '',
  ];

  for (const c of CATEGORIES) {
    lines.push(`### [${c.name.it}](${url(categoryPath(c.slug))})`, '', c.intro.it, '');
    for (const p of productsIn(c.slug)) {
      lines.push(`- [${productDisplayName(p, 'it')}](${url(productPath(p))}): ${p.short.it}${p.madeInItaly ? '. Prodotto a Caravaggio.' : ''}`);
    }
    lines.push('');
  }

  lines.push(
    '## Servizi e azienda',
    '',
    `- [Assistenza e ricambi](${url('/assistenza-ricambi')}): riparazione e manutenzione di reggiatrici e tendireggia di ogni marca, ricambi originali, formazione.`,
    `- [Ordine rapido](${url('/ordine-rapido')}): riordino di reggia, sigilli e consumabili.`,
    `- [Diventa rivenditore](${url('/diventa-rivenditore')}): catalogo B2B e condizioni per distributori.`,
    `- [Chi siamo](${url('/azienda')}): storia dal 1947 e valori.`,
    `- [Contatti e preventivi](${url('/contatti')}): telefono, email, modulo di richiesta.`,
    `- [Eventi e fiere](${url('/eventi')}): IPACK-IMA, Macfrut e altre fiere di settore.`,
    '',
    '## Optional',
    '',
    `- [English version](${url('/en')})`,
    `- [Version française](${url('/fr')})`,
    `- [Sitemap](${url('/sitemap.xml')})`,
    ''
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
