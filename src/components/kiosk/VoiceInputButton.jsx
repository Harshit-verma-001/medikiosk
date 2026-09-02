import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles, Check, Radio } from 'lucide-react';
import { useKiosk } from '../../context/KioskContext';

export const VoiceInputButton = ({ chips = [], onAnswerCaptured, lang = 'en' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedChipIndex, setSelectedChipIndex] = useState(null);

  // Mock live streaming text transcription when mic is active
  useEffect(() => {
    let timer;
    if (isListening) {
      setTranscript('Listening... "');
      const phrases = [
        'Listening...',
        'Listening... "I have had fever',
        'Listening... "I have had fever for 3 days',
        'Listening... "I have had fever for 3 days and severe body ache."'
      ];

      let step = 0;
      timer = setInterval(() => {
        if (step < phrases.length) {
          setTranscript(phrases[step]);
          step++;
        } else {
          // Auto stop listening and capture answer
          setIsListening(false);
          onAnswerCaptured("I have had fever for 3 days and severe body ache.", false);
        }
      }, 900);
    }
    return () => clearInterval(timer);
  }, [isListening, onAnswerCaptured]);

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
      setTranscript('');
    } else {
      setSelectedChipIndex(null);
      setIsListening(true);
    }
  };

  const handleChipClick = (chip, idx) => {
    setSelectedChipIndex(idx);
    setIsListening(false);
    setTranscript('');
    const chipText = chip.val || (typeof chip.label === 'object' ? chip.label[lang] || chip.label.en : chip.label);
    onAnswerCaptured(chipText, chip.isRedFlag || false);
  };

  return (
    <div className="w-full bg-white p-6 rounded-3xl border border-slate-200 shadow-kiosk-card my-4">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Large Mic Button */}
        <div className="relative group my-2">
          {isListening && (
            <div className="absolute -inset-4 rounded-full bg-red-400/30 animate-ping pointer-events-none" />
          )}
          <button
            onClick={toggleMic}
            type="button"
            className={`relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-all duration-300 shadow-xl touch-target ${
              isListening
                ? 'bg-gradient-to-tr from-red-500 to-rose-600 text-white ring-8 ring-red-100 scale-105'
                : 'bg-gradient-to-tr from-kiosk-primary to-teal-500 text-white hover:from-teal-600 hover:to-teal-700 hover:scale-105 ring-8 ring-kiosk-primaryLight'
            }`}
          >
            {isListening ? (
              <MicOff className="w-12 h-12 animate-pulse" />
            ) : (
              <Mic className="w-12 h-12" />
            )}
          </button>
        </div>

        <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mt-2 flex items-center gap-1.5">
          {isListening ? (
            <span className="text-red-600 font-extrabold flex items-center gap-1">
              <Radio className="w-4 h-4 animate-pulse" /> Recording Audio...
            </span>
          ) : (
            'Tap Microphone to Speak'
          )}
        </span>

        {/* Live Streaming Speech Transcript */}
        {isListening && (
          <div className="mt-4 w-full max-w-lg p-3 bg-red-50 border border-red-200 rounded-2xl text-red-900 text-base font-semibold animate-fadeIn">
            {transcript}
          </div>
        )}
      </div>

      {/* Quick Answer Chips Divider */}
      {chips.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3 text-slate-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-kiosk-primary" />
            <span>Or Tap a Quick-Answer Option Below:</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {chips.map((chip, idx) => {
              const labelText = typeof chip.label === 'object' ? chip.label[lang] || chip.label.en : chip.label;
              const isSelected = selectedChipIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip, idx)}
                  type="button"
                  className={`px-4 sm:px-5 py-3 rounded-2xl text-base font-bold transition-all duration-200 touch-target flex items-center gap-2 ${
                    isSelected
                      ? 'bg-kiosk-primary text-white ring-4 ring-kiosk-primaryLight shadow-md scale-105'
                      : chip.isRedFlag
                      ? 'bg-rose-50 text-rose-700 border-2 border-rose-200 hover:bg-rose-100'
                      : 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-kiosk-primaryLight hover:border-kiosk-primary hover:text-kiosk-primaryDark'
                  }`}
                >
                  {isSelected && <Check className="w-5 h-5 stroke-[3]" />}
                  <span>{labelText}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
