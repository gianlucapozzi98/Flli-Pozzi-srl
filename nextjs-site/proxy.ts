import { NextResponse, type NextRequest } from 'next/server';

/**
 * Lingue su URL propri:
 * - /en/... e /fr/... passano così come sono (app/[lang]/...)
 * - /it/... viene reindirizzato (301) alla versione senza prefisso, per non avere duplicati
 * - tutto il resto è italiano: riscrittura interna verso /it/...
 *
 * I redirect di next.config.mjs (vecchi URL WordPress, dominio senza www) vengono
 * eseguiti prima di questo file.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (/^\/(en|fr)(\/|$)/.test(pathname)) {
    return NextResponse.next();
  }

  if (/^\/it(\/|$)/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/it/, '') || '/';
    url.search = search;
    return NextResponse.redirect(url, 301);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/it${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Escludi asset, API e file di sistema (immagini, PDF, sitemap, robots, favicon)
  matcher: ['/((?!api|_next|Immagini|favicon|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).*)'],
};
