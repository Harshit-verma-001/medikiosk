import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Check, UserCheck, Stethoscope, FileText, ClipboardCheck, Sparkles } from 'lucide-react';

export const ProgressBar = () => {
  const { currentStep, setCurrentStep } = useKiosk();

  const steps = [
    { num: 1, label: 'Start & Language', icon: Sparkles },
    { num: 2, label: 'Identify & Consent', icon: UserCheck },
    { num: 3, label: 'AI Health Intake', icon: Stethoscope },
    { num: 4, label: 'Scan Medical Records', icon: FileText },
    { num: 5, label: 'Review & Handoff', icon: ClipboardCheck }
  ];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.num;
          const isActive = currentStep === step.num;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.num}>
              {/* Step indicator */}
              <div 
                onClick={() => isCompleted && setCurrentStep(step.num)}
                className={`flex items-center gap-2.5 transition-all ${
                  isCompleted ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? 'bg-kiosk-emerald text-white ring-2 ring-kiosk-emerald/30'
                      : isActive
                      ? 'bg-kiosk-primary text-white ring-4 ring-kiosk-primary/20 scale-105'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
                </div>

                <div className="hidden md:flex flex-col">
                  <span className={`text-xs font-bold uppercase tracking-wide ${
                    isActive ? 'text-kiosk-primary' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    Step {step.num}
                  </span>
                  <span className={`text-xs font-semibold ${
                    isActive ? 'text-slate-900 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 rounded-full overflow-hidden bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-kiosk-primary to-kiosk-emerald transition-all duration-500 ease-out"
                    style={{
                      width: isCompleted ? '100%' : isActive ? '50%' : '0%'
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
