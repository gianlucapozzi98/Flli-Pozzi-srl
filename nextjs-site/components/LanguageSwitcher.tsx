'use client';

import Link from 'next/link';
import { useLanguage, usePublicPathname } from '@/contexts/LanguageContext';
import { localizePath, splitLangFromPath, type Lang } from '@/lib/i18n';

const languages: { code: Lang; label: string; name: string }[] = [
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
];

/**
 * Link veri (non pulsanti) verso la stessa pagina nelle altre lingue:
 * gli utenti cambiano lingua e i motori di ricerca scoprono /en e /fr.
 * tone="dark": su fondo grafite (barra servizi); tone="light": su fondo bianco.
 */
export default function LanguageSwitcher({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { language } = useLanguage();
  const pathname = usePublicPathname();
  const { path } = splitLangFromPath(pathname);
  const dark = tone === 'dark';

  return (
    <div className="flex items-center" style={{ gap: dark ? 2 : 8 }}>
      {languages.map((lang) => {
        const active = language === lang.code;
        return (
          <Link
            key={lang.code}
            href={localizePath(path, lang.code)}
            hrefLang={lang.code}
            lang={lang.code}
            aria-current={active ? 'true' : undefined}
            aria-label={lang.name}
            title={lang.name}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: dark ? 12 : 14,
              letterSpacing: '0.06em',
              fontWeight: active ? 500 : 400,
              padding: dark ? '3px 6px' : '9px 14px',
              borderRadius: 2,
              border: dark ? 0 : `1.5px solid ${active ? '#1B1E22' : '#D2D7DC'}`,
              background: dark ? (active ? 'rgba(255,255,255,0.14)' : 'transparent') : active ? '#1B1E22' : '#fff',
              color: dark ? (active ? '#fff' : '#AEB6BF') : active ? '#fff' : '#1B1E22',
            }}
          >
            {lang.label}
          </Link>
        );
      })}
    </div>
  );
}
