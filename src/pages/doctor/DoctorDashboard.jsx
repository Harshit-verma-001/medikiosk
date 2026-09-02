import React, { useState } from 'react';
import { useKiosk } from '../../context/KioskContext';
import { PatientQueueRow } from '../../components/dashboard/PatientQueueRow';
import { SummarySection } from '../../components/dashboard/SummarySection';
import { TimelineItem } from '../../components/dashboard/TimelineItem';
import {
  Stethoscope,
  Users,
  ShieldAlert,
  CheckCheck,
  PlayCircle,
  Sparkles,
  FileText,
  Clock,
  User,
  HeartPulse,
  Activity,
  Leaf
} from 'lucide-react';

export const DoctorDashboard = () => {
  const {
    queue,
    selectedDoctorPatientId,
    setSelectedDoctorPatientId,
    updateDoctorSummarySection
  } = useKiosk();

  const [consultationStarted, setConsultationStarted] = useState(false);
  const [globalAccept, setGlobalAccept] = useState(false);

  const activePatient = queue.find(p => p.id === selectedDoctorPatientId) || queue[0];

  const handleAcceptAll = () => {
    setGlobalAccept(true);
  };

  const handleStartConsultation = () => {
    setConsultationStarted(true);
    setTimeout(() => {
      setConsultationStarted(false);
    }, 4000);
  };

  if (!activePatient) {
    return <div className="p-8 text-center text-slate-500 font-bold">No patients in queue.</div>;
  }

  const { summary, timeline } = activePatient;

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 space-y-6">
      {/* Top Doctor OPD Bar */}
      <header className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold shadow-md">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">OPD Clinical Doctor Dashboard</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Room 12 • Dr. Sharma (MD)
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              AI-Generated Patient Summaries & Medical Records Timeline Review
            </p>
          </div>
        </div>

        {/* Global Action Header Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Accept All Sections</span>
          </button>

          <button
            onClick={handleStartConsultation}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-kiosk-primary to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-extrabold text-sm flex items-center gap-2 shadow-md"
          >
            <PlayCircle className="w-5 h-5 stroke-[2.5]" />
            <span>Confirm & Start Consultation</span>
          </button>
        </div>
      </header>

      {/* Consultation Started Toast Alert */}
      {consultationStarted && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl font-extrabold text-base flex items-center justify-center gap-2 shadow-lg animate-bounce">
          <Activity className="w-6 h-6 animate-pulse" />
          <span>Consultation Started for Token #{activePatient.tokenNo} ({activePatient.name})</span>
        </div>
      )}

      {/* Main Grid Layout: Left Queue Sidebar (1/3) + Right Detailed Summary View (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Patient Queue Column */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-kiosk-primary" />
              <span>Waiting Queue ({queue.length})</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">Live OPD Feed</span>
          </div>

          <div className="space-y-3">
            {queue.map(patient => (
              <PatientQueueRow
                key={patient.id}
                patient={patient}
                isSelected={patient.id === selectedDoctorPatientId}
                onClick={() => setSelectedDoctorPatientId(patient.id)}
              />
            ))}
          </div>
        </div>

        {/* Detailed Patient Review Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Patient Overview Banner */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xl shadow-sm border border-teal-200">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-slate-900">{activePatient.name}</h2>
                    <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold">
                      Token #{activePatient.tokenNo}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                    <span>{activePatient.gender}, {activePatient.age} Yrs</span>
                    <span>•</span>
                    <span className="font-mono text-slate-700">ABHA: {activePatient.abhaId}</span>
                    <span>•</span>
                    <span className="text-slate-400">Wait: {activePatient.waitTime}</span>
                  </div>
                </div>
              </div>

              {activePatient.ayushModeActive && (
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>AYUSH Mode Active</span>
                </div>
              )}
            </div>

            {/* Red Flag Alert inside Banner */}
            {activePatient.hasRedFlag && (
              <div className="p-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-bold flex items-center gap-3 shadow-md animate-pulse">
                <ShieldAlert className="w-7 h-7 shrink-0 text-white" />
                <div>
                  <span className="text-xs uppercase tracking-wider block text-red-200">Urgent Triage Red Flag Alert</span>
                  <span className="text-sm sm:text-base">{activePatient.redFlagReason || "Critical condition flagged."}</span>
                </div>
              </div>
            )}
          </div>

          {/* Structured Clinical Sections (Inline Editable + AI Tags) */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-kiosk-primary" />
              <span>AI-Summarized Clinical Sections (Review & Edit Inline)</span>
            </h3>

            <SummarySection
              title="Chief Complaint"
              sectionKey="chiefComplaint"
              content={summary.chiefComplaint}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            <SummarySection
              title="History of Present Illness (HPI)"
              sectionKey="hpi"
              content={summary.hpi}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            <SummarySection
              title="Past Medical History"
              sectionKey="pastHistory"
              content={summary.pastHistory}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            <SummarySection
              title="Current Daily Medications"
              sectionKey="medications"
              content={summary.medications}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            <SummarySection
              title="Allergies & Drug Reactions"
              sectionKey="allergies"
              content={summary.allergies}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            <SummarySection
              title="Family History"
              sectionKey="familyHistory"
              content={summary.familyHistory}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            <SummarySection
              title="Personal & Lifestyle History"
              sectionKey="personalHistory"
              content={summary.personalHistory}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            <SummarySection
              title="Review of Systems (ROS)"
              sectionKey="reviewOfSystems"
              content={summary.reviewOfSystems}
              status={globalAccept ? 'accepted' : 'ai-generated'}
              onSave={(k, val) => updateDoctorSummarySection(activePatient.id, k, val)}
            />

            {/* AYUSH Ayurvedic Parameters Section if applicable */}
            {summary.ayushParameters && (
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base">
                  <Leaf className="w-5 h-5 text-emerald-700" />
                  <span>AYUSH Ayurvedic Diagnostic Parameters</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-emerald-100">
                    <span className="font-bold text-slate-400 block mb-0.5">Prakriti</span>
                    <span className="font-bold text-slate-800">{summary.ayushParameters.prakriti}</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-emerald-100">
                    <span className="font-bold text-slate-400 block mb-0.5">Vikriti Imbalance</span>
                    <span className="font-bold text-slate-800">{summary.ayushParameters.vikriti}</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-emerald-100">
                    <span className="font-bold text-slate-400 block mb-0.5">Agni Status</span>
                    <span className="font-bold text-slate-800">{summary.ayushParameters.agni}</span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-emerald-100">
                    <span className="font-bold text-slate-400 block mb-0.5">Koshtha & Bowel</span>
                    <span className="font-bold text-slate-800">{summary.ayushParameters.koshtha}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visual Vertical Medical Timeline Component */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-kiosk-primary" />
              <span>Patient Medical History Timeline</span>
            </h3>

            <div className="pt-2">
              {timeline.map((item, idx) => (
                <TimelineItem
                  key={idx}
                  date={item.date}
                  event={item.event}
                  type={item.type}
                  isLast={idx === timeline.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleStartConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-kiosk-emerald to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xl shadow-lg flex items-center justify-center gap-3 touch-target"
            >
              <CheckCheck className="w-7 h-7 stroke-[3]" />
              <span>Confirm All & Start Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
