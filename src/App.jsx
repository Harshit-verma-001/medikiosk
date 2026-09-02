import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { KioskProvider, useKiosk } from './context/KioskContext';
import { LanguageSelector } from './components/common/LanguageSelector';
import { KioskContainer } from './pages/kiosk/KioskContainer';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { HeartPulse, Stethoscope, User, Volume2, Globe } from 'lucide-react';

const TopNavBar = () => {
  const { activeAppMode, setActiveAppMode, audioToast, lang } = useKiosk();
  const location = useLocation();

  const isDoctorRoute = location.pathname.startsWith('/doctor');

  return (
    <>
      <header className="bg-slate-900 text-white py-3 px-4 sm:px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-400 text-slate-900 flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-none">
                MediKiosk
              </span>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block mt-0.5">
                AI Hospital OPD Assistant
              </span>
            </div>
          </Link>

          {/* Compact Language Selector */}
          <div className="hidden sm:block">
            <LanguageSelector variant="compact" />
          </div>

          {/* Dual Mode Navigation Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
            <Link
              to="/kiosk"
              onClick={() => setActiveAppMode('kiosk')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all touch-target ${
                !isDoctorRoute
                  ? 'bg-kiosk-primary text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Patient Kiosk Mode</span>
            </Link>

            <Link
              to="/doctor"
              onClick={() => setActiveAppMode('doctor')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all touch-target ${
                isDoctorRoute
                  ? 'bg-kiosk-accent text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctor Dashboard Mode</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Simulated Audio TTS Toast Popup */}
      {audioToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-amber-300 flex items-center gap-3 animate-bounce font-bold text-sm max-w-md">
          <Volume2 className="w-6 h-6 shrink-0 animate-pulse" />
          <span>{audioToast}</span>
        </div>
      )}
    </>
  );
};

export function AppContent() {
  return (
    <div className="min-h-screen bg-kiosk-bg text-kiosk-text font-sans">
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/kiosk" replace />} />
        <Route path="/kiosk/*" element={<KioskContainer />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="*" element={<Navigate to="/kiosk" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <KioskProvider>
      <Router>
        <AppContent />
      </Router>
    </KioskProvider>
  );
}
