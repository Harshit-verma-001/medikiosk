import React from 'react';
import { useKiosk } from '../../context/KioskContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { WelcomeScreen } from './WelcomeScreen';
import { IdentifyConsentScreen } from './IdentifyConsentScreen';
import { HistoryIntakeScreen } from './HistoryIntakeScreen';
import { ScanRecordsScreen } from './ScanRecordsScreen';
import { SummaryReviewScreen } from './SummaryReviewScreen';

export const KioskContainer = () => {
  const { currentStep } = useKiosk();

  const renderStepScreen = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeScreen />;
      case 2:
        return <IdentifyConsentScreen />;
      case 3:
        return <HistoryIntakeScreen />;
      case 4:
        return <ScanRecordsScreen />;
      case 5:
        return <SummaryReviewScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-kiosk-bg pb-12">
      {/* Show step progress bar for steps 2 to 5 */}
      {currentStep > 1 && <ProgressBar />}
      
      <main className="container mx-auto">
        {renderStepScreen()}
      </main>
    </div>
  );
};
