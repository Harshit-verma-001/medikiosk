import React from 'react';
import { User, ShieldAlert, Sparkles, Clock, ChevronRight } from 'lucide-react';

export const PatientQueueRow = ({ patient, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer touch-target ${
        isSelected
          ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-kiosk-primary ring-2 ring-kiosk-primary/30 shadow-md'
          : patient.hasRedFlag
          ? 'bg-rose-50/70 border-rose-300 hover:bg-rose-100'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Token # & Patient Avatar */}
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl font-extrabold flex flex-col items-center justify-center text-xs shadow-sm shrink-0 ${
            patient.hasRedFlag 
              ? 'bg-rose-600 text-white animate-pulse' 
              : isSelected 
              ? 'bg-kiosk-primary text-white' 
              : 'bg-slate-100 text-slate-800 border border-slate-200'
          }`}>
            <span className="text-[10px] uppercase tracking-tighter opacity-80">Token</span>
            <span className="text-base font-black leading-none">#{patient.tokenNo}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-base leading-tight">{patient.name}</h4>
              <span className="text-xs font-semibold text-slate-500">
                ({patient.gender[0]}, {patient.age}y)
              </span>
            </div>
            
            <span className="text-xs font-mono text-slate-400 block mt-0.5">
              ABHA: {patient.abhaId}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {patient.waitTime}
          </span>

          {patient.ayushModeActive && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AYUSH
            </span>
          )}
        </div>
      </div>

      {/* Red Flag Alert Badge */}
      {patient.hasRedFlag && (
        <div className="mt-2.5 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span className="truncate">Triage Red Flag Alert</span>
        </div>
      )}

      {/* Chief Complaint Preview */}
      <p className="text-xs font-semibold text-slate-600 line-clamp-1 mt-2">
        <span className="font-bold text-slate-700">Complaint:</span> {patient.chiefComplaintPreview}
      </p>
    </div>
  );
};
