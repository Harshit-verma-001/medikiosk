import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { ChatBubble } from '../../components/kiosk/ChatBubble';
import { VoiceInputButton } from '../../components/kiosk/VoiceInputButton';
import { RedFlagBanner } from '../../components/common/RedFlagBanner';
import { Sparkles, ArrowLeft, ArrowRight, Stethoscope, Leaf, CheckCircle2 } from 'lucide-react';

export const HistoryIntakeScreen = () => {
  const {
    t,
    lang,
    isAyushMode,
    setIsAyushMode,
    activeQuestions,
    currentQuestionIdx,
    setCurrentQuestionIdx,
    answers,
    recordAnswer,
    redFlag,
    setCurrentStep
  } = useKiosk();

  const activeQ = activeQuestions[currentQuestionIdx];
  const questionText = activeQ?.question[lang] || activeQ?.question.en;

  const handleAnswerCaptured = (answerText, isRedFlag) => {
    recordAnswer(activeQ.id, answerText, isRedFlag, activeQ.category);
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setCurrentStep(4); // Advance to Scan Medical Records step
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 page-transition">
      {/* Top Header Row with AYUSH Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-kiosk-card">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md ${
            isAyushMode ? 'bg-emerald-600' : 'bg-kiosk-primary'
          }`}>
            {isAyushMode ? <Leaf className="w-6 h-6" /> : <Stethoscope className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isAyushMode ? 'AYUSH Ayurvedic Intake Mode' : t.aiIntakeTitle}
            </h2>
            <span className="text-xs font-bold text-slate-500">
              Question {currentQuestionIdx + 1} of {activeQuestions.length}
            </span>
          </div>
        </div>

        {/* AYUSH Mode Toggle Switch */}
        <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200">
          <span className={`text-xs font-extrabold uppercase tracking-wide ${
            isAyushMode ? 'text-emerald-700' : 'text-slate-500'
          }`}>
            {t.ayushModeLabel}
          </span>
          <button
            onClick={() => {
              setIsAyushMode(!isAyushMode);
              setCurrentQuestionIdx(0);
            }}
            type="button"
            className={`relative w-16 h-9 rounded-full transition-colors duration-300 p-1 touch-target ${
              isAyushMode ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <div className={`w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isAyushMode ? 'translate-x-7 text-emerald-700' : 'translate-x-0 text-slate-400'
            }`}>
              {isAyushMode ? <Leaf className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
            </div>
          </button>
        </div>
      </div>

      {/* Triage Red Flag Alert Banner if triggered */}
      {redFlag.active && (
        <RedFlagBanner message={redFlag.message} />
      )}

      {/* Chat History & Active Question Bubble */}
      <div className="space-y-4">
        {/* Render Previous Recorded Answers as Chat History */}
        {activeQuestions.slice(0, currentQuestionIdx).map(q => {
          const recorded = answers[q.id];
          if (!recorded) return null;
          return (
            <React.Fragment key={q.id}>
              <ChatBubble
                type="ai"
                text={q.question[lang] || q.question.en}
                category={q.category}
                isAyush={isAyushMode}
              />
              <ChatBubble
                type="patient"
                text={recorded.value}
              />
            </React.Fragment>
          );
        })}

        {/* Active AI Question */}
        {activeQ && (
          <div className="space-y-4">
            <ChatBubble
              type="ai"
              text={questionText}
              audioId={`q_audio_${activeQ.id}`}
              audioText={activeQ.audioPrompt}
              category={activeQ.category}
              isAyush={isAyushMode}
            />

            {/* Voice Input & Quick Answer Chips Area */}
            <VoiceInputButton
              chips={activeQ.chips || []}
              onAnswerCaptured={handleAnswerCaptured}
              lang={lang}
            />
          </div>
        )}
      </div>

      {/* Navigation Footer Controls */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIdx === 0}
          className={`px-6 py-4 rounded-2xl font-extrabold text-base flex items-center gap-2 touch-target ${
            currentQuestionIdx === 0
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
              : 'bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.previousQuestion}</span>
        </button>

        <span className="text-sm font-bold text-slate-500">
          Auto advances upon response capture
        </span>

        <button
          onClick={handleNext}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-kiosk-primary to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-lg shadow-md flex items-center gap-2 touch-target"
        >
          <span>{currentQuestionIdx === activeQuestions.length - 1 ? 'Proceed to Upload Records' : t.nextQuestion}</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
