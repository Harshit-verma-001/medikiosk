import React, { useState } from 'react';
import { Sparkles, Edit3, Check, X, ShieldAlert } from 'lucide-react';

export const SummarySection = ({
  title,
  content,
  sectionKey,
  onSave,
  status = 'ai-generated', // 'ai-generated' | 'accepted' | 'rejected'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content || '');
  const [sectionStatus, setSectionStatus] = useState(status);

  const handleSave = () => {
    setIsEditing(false);
    setSectionStatus('accepted');
    onSave(sectionKey, text);
  };

  const handleReject = () => {
    setSectionStatus('rejected');
    setText('[Section Rejected by Physician]');
    onSave(sectionKey, '[Section Rejected by Physician]');
  };

  return (
    <div className={`p-5 rounded-3xl border transition-all ${
      sectionStatus === 'accepted'
        ? 'bg-emerald-50/40 border-emerald-200'
        : sectionStatus === 'rejected'
        ? 'bg-rose-50/40 border-rose-200 opacity-70'
        : 'bg-white border-slate-200 shadow-sm hover:border-kiosk-primary/40'
    }`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-bold text-slate-900">{title}</h4>
          
          {/* AI Tag */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
            sectionStatus === 'accepted'
              ? 'bg-emerald-100 text-emerald-800'
              : sectionStatus === 'rejected'
              ? 'bg-rose-100 text-rose-800'
              : 'bg-amber-100 text-amber-900 border border-amber-200'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            {sectionStatus === 'accepted'
              ? 'Verified by Doctor'
              : sectionStatus === 'rejected'
              ? 'Rejected'
              : 'AI-Generated — Please Review'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm"
              >
                <Check className="w-4 h-4" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-kiosk-primaryLight hover:text-kiosk-primaryDark text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                title="Edit section"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={handleSave}
                className={`p-1.5 rounded-xl transition-colors ${
                  sectionStatus === 'accepted' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
                title="Accept section"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleReject}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Reject section"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content or Edit Textarea */}
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full text-sm font-medium text-slate-900 border-2 border-kiosk-primary/50 focus:border-kiosk-primary rounded-2xl p-3 focus:outline-none focus:ring-4 focus:ring-kiosk-primaryLight"
        />
      ) : (
        <p className="text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-line">
          {text || 'No data recorded for this section.'}
        </p>
      )}
    </div>
  );
};
