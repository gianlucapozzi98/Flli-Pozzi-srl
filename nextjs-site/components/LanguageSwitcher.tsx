'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath, splitLangFromPath, type Lang } from '@/lib/i18n';

const languages: { code: Lang; flag: string; label: string; name: string }[] = [
  { code: 'it', flag: '🇮🇹', label: 'IT', name: 'Italiano' },
  { code: 'en', flag: '🇬🇧', label: 'EN', name: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'FR', name: 'Français' },
];

/**
 * Link veri (non pulsanti) verso la stessa pagina nelle altre lingue:
 * gli utenti cambiano lingua e i motori di ricerca scoprono /en e /fr.
 */
export default function LanguageSwitcher() {
  const { language } = useLanguage();
  const pathname = usePathname() || '/';
  const { path } = splitLangFromPath(pathname);

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={localizePath(path, lang.code)}
          hrefLang={lang.code}
          lang={lang.code}
          aria-current={language === lang.code ? 'true' : undefined}
          className={`flex items-center gap-1 px-2 py-1.5 rounded transition-colors text-white ${
            language === lang.code ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
          aria-label={lang.name}
          title={lang.name}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="text-xs font-medium">{lang.label}</span>
        </Link>
      ))}
    </div>
  );
}
