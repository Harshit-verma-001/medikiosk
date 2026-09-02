import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { RedFlagBanner } from '../../components/common/RedFlagBanner';
import { AudioPlayButton } from '../../components/common/AudioPlayButton';
import { ClipboardCheck, ArrowLeft, Send, CheckCircle2, ShieldAlert, Sparkles, User, FileText } from 'lucide-react';

export const SummaryReviewScreen = () => {
  const {
    t,
    patientName,
    abhaNumber,
    isAyushMode,
    answers,
    uploadedDocs,
    redFlag,
    setRedFlag,
    submitToDoctorQueue,
    resetKioskSession,
    setCurrentStep
  } = useKiosk();

  const [submittedToken, setSubmittedToken] = useState(null);

  const handleFinalSubmit = () => {
    submitToDoctorQueue();
    setSubmittedToken("104"); // Token #104
  };

  if (submittedToken) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-6 page-transition">
        <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg ring-8 ring-emerald-50">
          <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900">
          {t.submittedSuccess}
        </h2>

        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-kiosk-card max-w-lg mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
            OPD Live Token Number
          </span>
          <span className="text-6xl font-black text-kiosk-primary block font-mono">
            #{submittedToken}
          </span>
          <p className="text-base font-semibold text-slate-600 mt-4">
            Your pre-consultation summary has been transmitted directly to Dr. Sharma's dashboard at Room 12.
          </p>
        </div>

        <button
          onClick={resetKioskSession}
          className="px-8 py-4 rounded-2xl bg-kiosk-primary hover:bg-teal-700 text-white font-extrabold text-lg shadow-md"
        >
          Return to Home Screen for Next Patient
        </button>
      </div>
    );
  }

  // Construct structured fields from recorded answers or fallbacks
  const chiefComplaintVal = answers['q1_complaint']?.value || answers['ayush_prakriti']?.value || "Fever and generalized body pain";
  const durationVal = answers['q2_duration']?.value || "3 Days";
  const pastHistoryVal = answers['q3_past_history']?.value || "Hypertension";
  const medicinesVal = answers['q4_medications']?.value || "Amlodipine 5mg OD";
  const allergiesVal = answers['q5_allergies']?.value || "Penicillin allergy";

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 page-transition">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-kiosk-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.summaryTitle}</h2>
            <p className="text-sm font-semibold text-slate-500">{t.summarySubtitle}</p>
          </div>
        </div>

        <AudioPlayButton
          id="summary_audio"
          textToSpeak="Please review your recorded symptoms and medical details below before submitting to the doctor."
          label="Listen to Summary"
          size="large"
        />
      </div>

      {/* Red Flag Triage Banner */}
      {redFlag.active ? (
        <RedFlagBanner message={redFlag.message} />
      ) : (
        /* Demo Trigger Red Flag button for testing UI requirement */
        <div className="flex justify-end">
          <button
            onClick={() => setRedFlag({
              active: true,
              message: "DEMO TRIAGE ALERT: Severe retrosternal chest pain with diaphoretic symptoms detected."
            })}
            className="text-xs font-bold text-rose-700 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1 bg-rose-50"
          >
            <ShieldAlert className="w-4 h-4" /> Trigger Demo Red Flag Alert
          </button>
        </div>
      )}

      {/* Patient Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-kiosk-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300 font-bold border border-white/20">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{patientName}</h3>
            <span className="text-sm text-slate-300 font-mono">
              ABHA ID: {abhaNumber || "14-1234-5678-9012"} • Male, 45 Yrs
            </span>
          </div>
        </div>

        {isAyushMode && (
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-xs font-extrabold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> AYUSH Intake Included
          </span>
        )}
      </div>

      {/* Read-Only Structured Clinical Summary Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-kiosk-card space-y-5">
        <h4 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-kiosk-primary" />
          <span>Structured Clinical Intake Summary</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Chief Complaint
            </span>
            <p className="text-base font-bold text-slate-800">{chiefComplaintVal}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Duration of Symptoms
            </span>
            <p className="text-base font-bold text-slate-800">{durationVal}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Past Medical Conditions
            </span>
            <p className="text-base font-bold text-slate-800">{pastHistoryVal}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
              Current Daily Medicines
            </span>
            <p className="text-base font-bold text-slate-800">{medicinesVal}</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 md:col-span-2">
            <span className="text-xs font-extrabold text-rose-800 uppercase tracking-wider block mb-1">
              Allergies & Adverse Reactions
            </span>
            <p className="text-base font-bold text-rose-900">{allergiesVal}</p>
          </div>
        </div>

        {/* Uploaded Documents List Summary */}
        {uploadedDocs.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-3">
              Attached Medical Records ({uploadedDocs.length})
            </span>
            <div className="flex flex-wrap gap-3">
              {uploadedDocs.map(doc => (
                <div key={doc.id} className="p-3 bg-teal-50/60 border border-teal-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-teal-900">
                  <FileText className="w-4 h-4 text-teal-700" />
                  <span>{doc.filename}</span>
                  <span className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full text-[10px]">Extracted</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => setCurrentStep(4)}
          className="px-6 py-4 rounded-2xl bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 font-extrabold text-base flex items-center gap-2 touch-target"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Uploads</span>
        </button>

        <button
          onClick={handleFinalSubmit}
          className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-kiosk-emerald to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-2xl shadow-kiosk-active flex items-center gap-3 touch-target transform hover:scale-[1.02] transition-all"
        >
          <Send className="w-7 h-7 stroke-[2.5]" />
          <span>{t.submitToDoctor}</span>
        </button>
      </div>
    </div>
  );
};
