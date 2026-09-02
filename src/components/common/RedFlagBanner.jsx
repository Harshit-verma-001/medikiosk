import React from 'react';
import { AlertTriangle, Bell, ShieldAlert } from 'lucide-react';

export const RedFlagBanner = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-red-300 animate-pulse-slow my-4">
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur shrink-0">
            <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-red-700 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Emergency Alert • Urgent Triage
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold mt-1 leading-tight">
              {message}
            </h4>
            <p className="text-sm text-red-100 mt-1 font-medium">
              A healthcare triage staff member has been alerted automatically. Please notify the nearest nurse immediately.
            </p>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold shrink-0"
          >
            Acknowledge
          </button>
        )}
      </div>
    </div>
  );
};
