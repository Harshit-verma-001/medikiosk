import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { LanguageSelector } from '../../components/common/LanguageSelector';
import { AudioPlayButton } from '../../components/common/AudioPlayButton';
import { Sparkles, ShieldCheck, HeartPulse, ArrowRight, Stethoscope } from 'lucide-react';

export const WelcomeScreen = () => {
  const { t, setCurrentStep } = useKiosk();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] text-center page-transition">
      {/* NHA / ABDM Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100/80 text-teal-900 border border-teal-200 text-xs sm:text-sm font-extrabold mb-6 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-kiosk-primary" />
        <span>{t.governmentTitle}</span>
      </div>

      {/* Main Branding */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-kiosk-primary via-teal-500 to-kiosk-emerald text-white flex items-center justify-center shadow-lg ring-8 ring-kiosk-primaryLight">
          <HeartPulse className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
        </div>
        <div className="text-left">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none">
            {t.appTitle}
          </h1>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-kiosk-primary block mt-1">
            OPD Pre-Consultation Assistant
          </span>
        </div>
      </div>

      <p className="text-lg sm:text-2xl font-bold text-slate-700 max-w-2xl mt-2 leading-relaxed">
        {t.tagline}
      </p>

      {/* Audio Guidance Button */}
      <div className="mt-4 mb-8">
        <AudioPlayButton
          id="welcome_audio"
          textToSpeak="Welcome to government hospital OPD pre-consultation kiosk. Please select your language and tap start to begin."
          label="Tap to Hear Audio Instructions"
          size="large"
        />
      </div>

      {/* Language Selection Grid */}
      <div className="w-full my-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-kiosk-card">
        <LanguageSelector variant="grid" />
      </div>

      {/* Big Start Button */}
      <button
        onClick={() => setCurrentStep(2)}
        className="w-full max-w-md py-5 px-8 rounded-3xl bg-gradient-to-r from-kiosk-primary to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-2xl shadow-kiosk-active flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] touch-target"
      >
        <span>{t.startIntake}</span>
        <ArrowRight className="w-8 h-8 stroke-[3]" />
      </button>

      <span className="text-xs font-semibold text-slate-400 mt-4">
        Designed for Touchscreen Kiosks • High-Contrast Large Format
      </span>
    </div>
  );
};
