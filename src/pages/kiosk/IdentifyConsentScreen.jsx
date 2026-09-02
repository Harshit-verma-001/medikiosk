import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { AudioPlayButton } from '../../components/common/AudioPlayButton';
import { ShieldCheck, UserCheck, CheckCircle2, AlertCircle, ArrowRight, XCircle, QrCode } from 'lucide-react';

export const IdentifyConsentScreen = () => {
  const {
    t,
    abhaNumber,
    setAbhaNumber,
    isAbhaVerified,
    setIsAbhaVerified,
    hasConsented,
    setHasConsented,
    setCurrentStep
  } = useKiosk();

  const [inputVal, setInputVal] = useState(abhaNumber || '14-1234-5678-9012');
  const [registerMode, setRegisterMode] = useState(false);

  const handleVerifyAbha = () => {
    setAbhaNumber(inputVal);
    setIsAbhaVerified(true);
  };

  const handleAcceptConsent = () => {
    setHasConsented(true);
    setCurrentStep(3); // Advance to AI History Intake
  };

  const handleDeclineConsent = () => {
    setHasConsented(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 page-transition">
      {/* ABHA Identification Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-kiosk-card">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.identityTitle}</h2>
              <p className="text-sm font-semibold text-slate-500">{t.abhaSubtitle}</p>
            </div>
          </div>

          <AudioPlayButton
            id="abha_audio"
            textToSpeak="Please enter your 14 digit ABHA Health card number or tap register without ABHA."
            label="Audio Help"
          />
        </div>

        {/* Input & Verification Row */}
        {!registerMode ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={t.abhaPlaceholder}
                  className="w-full text-xl sm:text-2xl font-bold tracking-wider font-mono px-5 py-4 rounded-2xl border-2 border-slate-300 focus:border-kiosk-primary focus:outline-none focus:ring-4 focus:ring-kiosk-primaryLight"
                />
                <button
                  type="button"
                  onClick={() => setInputVal('14-1234-5678-9012')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1"
                >
                  <QrCode className="w-4 h-4" /> Autofill
                </button>
              </div>

              <button
                onClick={handleVerifyAbha}
                className="px-6 py-4 rounded-2xl bg-kiosk-primary hover:bg-teal-700 text-white font-extrabold text-lg shadow-md touch-target flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>{t.verifyAbha}</span>
              </button>
            </div>

            {isAbhaVerified && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 font-bold flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{t.verifiedSuccess}</span>
              </div>
            )}

            <button
              onClick={() => setRegisterMode(true)}
              className="text-sm font-bold text-kiosk-accent hover:underline block pt-1"
            >
              {t.orRegister}
            </button>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <span className="font-bold text-amber-900 text-base block mb-2">
              New Patient Registration Mode (Temporary OPD Identifier)
            </span>
            <p className="text-sm font-semibold text-amber-800 mb-3">
              You will be assigned a temporary patient token. Healthcare staff will create your ABHA card after consultation.
            </p>
            <button
              onClick={() => {
                setRegisterMode(false);
                setIsAbhaVerified(true);
              }}
              className="px-5 py-2.5 bg-amber-600 text-white font-bold rounded-xl text-sm"
            >
              Proceed as New Patient
            </button>
          </div>
        )}
      </div>

      {/* Plain Language Consent Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-kiosk-card">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.consentTitle}</h2>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">ABDM Data Privacy Compliant</span>
            </div>
          </div>

          <AudioPlayButton
            id="consent_audio"
            textToSpeak={t.consentText}
            label="Listen to Consent"
            size="large"
          />
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-base font-semibold text-slate-800 leading-relaxed mb-6">
          {t.consentText}
        </div>

        {/* Decline Warning if clicked */}
        {hasConsented === false && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-2xl text-red-900 font-bold flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span>You declined automated AI pre-consultation.</span>
              <p className="text-sm font-medium text-red-700 mt-1">
                Please proceed directly to Counter 4 to fill your paper form manually with the OPD staff.
              </p>
            </div>
          </div>
        )}

        {/* Large Consent Action Buttons (No small checkboxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleAcceptConsent}
            className="py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-kiosk-emerald hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xl shadow-md touch-target flex items-center justify-center gap-3 transition-transform active:scale-95"
          >
            <CheckCircle2 className="w-7 h-7 stroke-[3]" />
            <span>{t.acceptConsent}</span>
          </button>

          <button
            onClick={handleDeclineConsent}
            className="py-5 px-6 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-slate-700 border-2 border-slate-200 font-extrabold text-xl shadow-sm touch-target flex items-center justify-center gap-3 transition-colors"
          >
            <XCircle className="w-7 h-7" />
            <span>{t.declineConsent}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
