import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayButton = ({ id, textToSpeak, label = "Tap to Hear Audio", size = "normal" }) => {
  const { playingAudioId, triggerAudioPlayback } = useKiosk();
  const isPlaying = playingAudioId === id;

  const sizeClasses = size === "large" 
    ? "px-5 py-3 text-base gap-3 rounded-2xl" 
    : "px-3.5 py-2 text-sm gap-2 rounded-xl";

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        triggerAudioPlayback(id, textToSpeak);
      }}
      type="button"
      className={`inline-flex items-center font-semibold transition-all duration-200 border touch-target shadow-sm ${sizeClasses} ${
        isPlaying
          ? 'bg-amber-500 text-white border-amber-600 shadow-md animate-pulse ring-4 ring-amber-200'
          : 'bg-kiosk-primaryLight/80 text-kiosk-primaryDark border-kiosk-primary/30 hover:bg-kiosk-primary hover:text-white'
      }`}
      title={label}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-5 h-5 animate-bounce text-white" />
          <span>Listening...</span>
          <span className="flex gap-0.5 items-end h-4 ml-1">
            <span className="w-1 bg-white h-2 animate-wave"></span>
            <span className="w-1 bg-white h-4 animate-wave [animation-delay:0.2s]"></span>
            <span className="w-1 bg-white h-3 animate-wave [animation-delay:0.4s]"></span>
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-kiosk-primary group-hover:text-white transition-colors" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
