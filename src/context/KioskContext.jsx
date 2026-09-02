import React, { createContext, useContext, useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { STANDARD_QUESTIONS, AYUSH_QUESTIONS, MOCK_OCR_DOCUMENTS, MOCK_PATIENT_QUEUE } from '../data/mockData';

const KioskContext = createContext(null);

export const KioskProvider = ({ children }) => {
  // Navigation & Mode
  const [activeAppMode, setActiveAppMode] = useState('kiosk'); // 'kiosk' | 'doctor'
  const [lang, setLang] = useState('en'); // 'en' | 'hi' | 'mr' | 'ta'
  const [currentStep, setCurrentStep] = useState(1); // 1 to 5

  // Patient Intake State
  const [abhaNumber, setAbhaNumber] = useState('');
  const [patientName, setPatientName] = useState('Ramesh Kumar');
  const [isAbhaVerified, setIsAbhaVerified] = useState(false);
  const [hasConsented, setHasConsented] = useState(null); // null, true, false
  
  // AYUSH Toggle
  const [isAyushMode, setIsAyushMode] = useState(false);
  
  // Q&A Intake State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: { value, isRedFlag, category } }
  
  // Uploaded Documents State
  const [uploadedDocs, setUploadedDocs] = useState(MOCK_OCR_DOCUMENTS);
  
  // Audio Playback Mocking
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audioToast, setAudioToast] = useState(null);

  // Red Flag Alert
  const [redFlag, setRedFlag] = useState({
    active: false,
    message: ''
  });

  // Doctor Dashboard Queue State
  const [queue, setQueue] = useState(MOCK_PATIENT_QUEUE);
  const [selectedDoctorPatientId, setSelectedDoctorPatientId] = useState(MOCK_PATIENT_QUEUE[0].id);

  // Audio Playback simulation
  const triggerAudioPlayback = (audioId, textToSpeak) => {
    if (playingAudioId === audioId) {
      setPlayingAudioId(null);
      setAudioToast(null);
      return;
    }
    setPlayingAudioId(audioId);
    setAudioToast(`🔊 Audio playing (${lang.toUpperCase()}): "${textToSpeak}"`);

    // Auto clear simulated speech after 4 seconds
    setTimeout(() => {
      setPlayingAudioId(null);
      setAudioToast(null);
    }, 4500);
  };

  // Helper translations lookup
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Active Questions List based on AYUSH mode toggle
  const activeQuestions = isAyushMode ? AYUSH_QUESTIONS : STANDARD_QUESTIONS;

  // Record answer & auto-check for red flags
  const recordAnswer = (questionId, value, isRedFlag = false, category = "") => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { value, isRedFlag, category }
    }));

    // Trigger urgent banner if red flag detected
    if (isRedFlag) {
      setRedFlag({
        active: true,
        message: "CRITICAL SYMPTOM DETECTED: High priority alert recorded. Please inform OPD triage staff immediately."
      });
    }

    // Auto advance to next question after small delay
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
      }, 500);
    }
  };

  // Reset entire kiosk session for next patient
  const resetKioskSession = () => {
    setCurrentStep(1);
    setAbhaNumber('');
    setIsAbhaVerified(false);
    setHasConsented(null);
    setIsAyushMode(false);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setRedFlag({ active: false, message: '' });
  };

  // Submit patient kiosk summary into doctor queue
  const submitToDoctorQueue = () => {
    const newPatientToken = `10${queue.length + 1}`;
    const chiefComp = answers['q1_complaint']?.value || answers['ayush_prakriti']?.value || "General Health Checkup";
    
    // Construct HPI string from answers
    const hpiSummary = Object.entries(answers)
      .map(([qId, ans]) => `${ans.category || qId}: ${ans.value}`)
      .join("; ");

    const newPatientEntry = {
      tokenNo: newPatientToken,
      id: `pt_${newPatientToken}`,
      name: patientName || "Patient " + newPatientToken,
      age: 45,
      gender: "Male",
      abhaId: abhaNumber || "14-8899-0011-2233",
      waitTime: "Just Now",
      chiefComplaintPreview: chiefComp,
      hasRedFlag: redFlag.active,
      redFlagReason: redFlag.active ? redFlag.message : null,
      ayushModeActive: isAyushMode,
      summary: {
        chiefComplaint: chiefComp,
        hpi: hpiSummary || "Self-reported symptoms recorded at kiosk.",
        pastHistory: answers['q3_past_history']?.value || "None reported",
        medications: answers['q4_medications']?.value || "None reported",
        allergies: answers['q5_allergies']?.value || "No known drug allergies",
        familyHistory: "No significant family history",
        personalHistory: "Diet: Standard, Tobacco: No",
        reviewOfSystems: "Systemic review completed via MediKiosk assistant.",
        ayushParameters: isAyushMode ? {
          prakriti: answers['ayush_prakriti']?.value || "N/A",
          vikriti: answers['ayush_vikriti']?.value || "N/A",
          agni: answers['ayush_agni']?.value || "N/A",
          koshtha: answers['ayush_koshtha']?.value || "N/A",
          aharaVihara: answers['ayush_ahara_vihara']?.value || "N/A",
          nidana: "Self-assessed via kiosk",
          samprapti: "Under clinical review"
        } : null
      },
      timeline: [
        { date: "2026-09-02 (Today)", event: `OPD Kiosk Check-in (Token #${newPatientToken})`, type: "current" },
        ...uploadedDocs.map(doc => ({
          date: doc.extractedData?.visitDate || "Recent",
          event: `${doc.filename} - ${doc.extractedData?.diagnosis || "Document Uploaded"}`,
          type: "prescription"
        }))
      ]
    };

    setQueue(prev => [newPatientEntry, ...prev]);
    setSelectedDoctorPatientId(newPatientEntry.id);
  };

  // Update inline edited field in doctor summary
  const updateDoctorSummarySection = (patientId, sectionKey, newValue) => {
    setQueue(prevQueue => prevQueue.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          summary: {
            ...patient.summary,
            [sectionKey]: newValue
          }
        };
      }
      return patient;
    }));
  };

  return (
    <KioskContext.Provider value={{
      activeAppMode,
      setActiveAppMode,
      lang,
      setLang,
      t,
      currentStep,
      setCurrentStep,
      abhaNumber,
      setAbhaNumber,
      patientName,
      setPatientName,
      isAbhaVerified,
      setIsAbhaVerified,
      hasConsented,
      setHasConsented,
      isAyushMode,
      setIsAyushMode,
      activeQuestions,
      currentQuestionIdx,
      setCurrentQuestionIdx,
      answers,
      recordAnswer,
      uploadedDocs,
      setUploadedDocs,
      playingAudioId,
      triggerAudioPlayback,
      audioToast,
      redFlag,
      setRedFlag,
      queue,
      setQueue,
      selectedDoctorPatientId,
      setSelectedDoctorPatientId,
      resetKioskSession,
      submitToDoctorQueue,
      updateDoctorSummarySection
    }}>
      {children}
    </KioskContext.Provider>
  );
};

export const useKiosk = () => {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error('useKiosk must be used within a KioskProvider');
  }
  return context;
};
