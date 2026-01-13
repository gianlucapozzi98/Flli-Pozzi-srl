'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const cycleLanguage = () => {
    if (language === 'it') {
      setLanguage('en');
    } else if (language === 'en') {
      setLanguage('fr');
    } else {
      setLanguage('it');
    }
  };

  const getLanguageInfo = () => {
    switch (language) {
      case 'it':
        return { flag: '🇬🇧', code: 'EN', title: 'Switch to English' };
      case 'en':
        return { flag: '🇫🇷', code: 'FR', title: 'Switch to French' };
      case 'fr':
        return { flag: '🇮🇹', code: 'IT', title: 'Passer à l\'italien' };
      default:
        return { flag: '🇬🇧', code: 'EN', title: 'Switch language' };
    }
  };

  const { flag, code, title } = getLanguageInfo();

  return (
    <button
      onClick={cycleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded transition-colors hover:bg-white/10 text-white"
      aria-label="Switch language"
      title={title}
    >
      <span className="text-xl">{flag}</span>
      <span className="text-sm font-medium">{code}</span>
    </button>
  );
}
