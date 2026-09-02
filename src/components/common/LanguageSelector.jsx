import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Globe, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', subtext: 'Default' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', subtext: 'हिंदी में' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', subtext: 'मराठीत' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', subtext: 'தமிழில்' }
];

export const LanguageSelector = ({ variant = 'grid' }) => {
  const { lang, setLang } = useKiosk();

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur border border-slate-200 rounded-xl p-1 shadow-sm">
        <Globe className="w-4 h-4 text-kiosk-primary ml-2" />
        <div className="flex gap-1">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all touch-target ${
                lang === l.code
                  ? 'bg-kiosk-primary text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-4 text-kiosk-primaryDark font-semibold">
        <Globe className="w-5 h-5" />
        <span>Select Preferred Language / अपनी भाषा चुनें</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {LANGUAGES.map(l => {
          const isSelected = lang === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 touch-target ${
                isSelected
                  ? 'border-kiosk-primary bg-kiosk-primaryLight/40 ring-4 ring-kiosk-primary/20 shadow-kiosk-card scale-[1.02]'
                  : 'border-slate-200 bg-white hover:border-kiosk-primary/50 hover:bg-slate-50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 bg-kiosk-primary text-white p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <span className="text-2xl font-bold text-slate-800 mb-1">{l.native}</span>
              <span className="text-sm font-medium text-slate-500">{l.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
