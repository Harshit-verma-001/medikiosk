import React from 'react';
import { AudioPlayButton } from '../common/AudioPlayButton';
import { Bot, User, Sparkles, CheckCircle2 } from 'lucide-react';

export const ChatBubble = ({ type = 'ai', text, audioId, audioText, isAyush = false, category }) => {
  if (type === 'ai') {
    return (
      <div className="flex items-start gap-4 my-4 max-w-3xl animate-fadeIn">
        {/* AI Avatar */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
          isAyush 
            ? 'bg-gradient-to-br from-emerald-600 to-teal-700 ring-4 ring-emerald-100' 
            : 'bg-gradient-to-br from-kiosk-primary to-kiosk-accent ring-4 ring-kiosk-primaryLight'
        }`}>
          {isAyush ? <Sparkles className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </div>

        {/* AI Bubble */}
        <div className={`p-5 rounded-3xl rounded-tl-sm shadow-kiosk-card border transition-all ${
          isAyush
            ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200 text-emerald-950'
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          {category && (
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 ${
              isAyush ? 'bg-emerald-100 text-emerald-800' : 'bg-kiosk-primaryLight text-kiosk-primaryDark'
            }`}>
              {category}
            </span>
          )}

          <h3 className="text-xl sm:text-2xl font-bold leading-snug tracking-tight mb-3">
            {text}
          </h3>

          {audioText && (
            <div className="mt-2">
              <AudioPlayButton id={audioId || 'ai_question'} textToSpeak={audioText} label="Listen Question" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Patient Answer Bubble
  return (
    <div className="flex items-start justify-end gap-3 my-4 ml-auto max-w-2xl">
      <div className="p-4 sm:p-5 rounded-3xl rounded-tr-sm bg-kiosk-primary text-white shadow-md border border-kiosk-primaryDark">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-100 mb-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Patient Recorded Answer</span>
        </div>
        <p className="text-lg font-semibold">{text}</p>
      </div>

      <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm">
        <User className="w-5 h-5" />
      </div>
    </div>
  );
};
