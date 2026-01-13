'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'it', flag: '🇮🇹', label: 'IT' },
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'fr', flag: '🇫🇷', label: 'FR' },
  ];

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'it' | 'en' | 'fr')}
          className={`flex items-center gap-1 px-2 py-1.5 rounded transition-colors text-white ${
            language === lang.code
              ? 'bg-white/20'
              : 'hover:bg-white/10'
          }`}
          aria-label={`Switch to ${lang.label}`}
          title={`Switch to ${lang.label}`}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="text-xs font-medium">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
