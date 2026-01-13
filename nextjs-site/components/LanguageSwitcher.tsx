'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded transition-colors hover:bg-white/10 text-white"
      aria-label="Switch language"
      title={language === 'it' ? 'Switch to English' : 'Passa all\'italiano'}
    >
      {language === 'it' ? (
        <span className="text-xl">🇬🇧</span>
      ) : (
        <span className="text-xl">🇮🇹</span>
      )}
      <span className="text-sm font-medium">
        {language === 'it' ? 'EN' : 'IT'}
      </span>
    </button>
  );
}
