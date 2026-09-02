import React from 'react';
import { Calendar, FileText, Stethoscope, TestTube, AlertCircle } from 'lucide-react';

export const TimelineItem = ({ date, event, type = 'prescription', isLast = false }) => {
  const getIcon = () => {
    switch (type) {
      case 'lab':
        return <TestTube className="w-4 h-4 text-purple-600" />;
      case 'hospital':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'current':
        return <Stethoscope className="w-4 h-4 text-kiosk-primary" />;
      default:
        return <FileText className="w-4 h-4 text-teal-600" />;
    }
  };

  const getBadgeStyle = () => {
    switch (type) {
      case 'lab':
        return 'bg-purple-100 border-purple-200 text-purple-900';
      case 'hospital':
        return 'bg-rose-100 border-rose-200 text-rose-900';
      case 'current':
        return 'bg-teal-100 border-teal-300 text-teal-900 font-bold';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-800';
    }
  };

  return (
    <div className="relative flex gap-4 items-start">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-slate-200 -ml-px" />
      )}

      {/* Timeline Icon Node */}
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-white ${
        type === 'current' ? 'border-kiosk-primary ring-4 ring-kiosk-primaryLight' : 'border-slate-300'
      }`}>
        {getIcon()}
      </div>

      {/* Content Box */}
      <div className={`flex-1 p-3.5 rounded-2xl border mb-4 ${getBadgeStyle()}`}>
        <div className="flex items-center justify-between text-xs font-semibold opacity-75 mb-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
          <span className="uppercase text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/60">
            {type}
          </span>
        </div>
        <p className="text-xs sm:text-sm font-bold">{event}</p>
      </div>
    </div>
  );
};
