import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { DocumentUploadCard } from '../../components/kiosk/DocumentUploadCard';
import { AudioPlayButton } from '../../components/common/AudioPlayButton';
import { FileText, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ScanRecordsScreen = () => {
  const { t, setCurrentStep } = useKiosk();

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 page-transition">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-kiosk-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.scanTitle}</h2>
            <p className="text-sm font-semibold text-slate-500">{t.scanSubtitle}</p>
          </div>
        </div>

        <AudioPlayButton
          id="scan_audio"
          textToSpeak="Scan or upload old medical prescriptions or blood reports using the kiosk camera or upload button."
          label="Audio Help"
          size="large"
        />
      </div>

      {/* Upload Component */}
      <DocumentUploadCard />

      {/* Footer Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => setCurrentStep(3)}
          className="px-6 py-4 rounded-2xl bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 font-extrabold text-base flex items-center gap-2 touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Symptoms Intake</span>
        </button>

        <button
          onClick={() => setCurrentStep(5)}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-kiosk-primary to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-lg shadow-md flex items-center gap-2 touch-target"
        >
          <span>Review Summary & Submit</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
