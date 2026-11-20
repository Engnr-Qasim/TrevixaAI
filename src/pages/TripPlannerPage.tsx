import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlannerHeader } from '../components/planner/PlannerHeader';
import { Step1Destination } from '../components/planner/Step1Destination';
import { Step2Budget } from '../components/planner/Step2Budget';
import { Step3Travelers } from '../components/planner/Step3Travelers';
import { Step4Dates } from '../components/planner/Step4Dates';
import { Step5Interests } from '../components/planner/Step5Interests';
import { Step6Preferences, PreferencesState } from '../components/planner/Step6Preferences';
import { Step7Review } from '../components/planner/Step7Review';
import { ProcessingScreen } from '../components/planner/ProcessingScreen';

export const TripPlannerPage: React.FC = () => {
  const TOTAL_STEPS = 7;
  const STEP_TITLES = [
    'Destination',
    'Budget',
    'Travelers',
    'Dates',
    'Interests',
    'Preferences',
    'Review',
  ];

  // Wizard States
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [destination, setDestination] = useState<string>('Hunza Valley');
  const [budgetTier, setBudgetTier] = useState<string>('standard');
  const [budgetAmount, setBudgetAmount] = useState<number>(70000);
  const [travelerType, setTravelerType] = useState<string>('friends');
  const [adultsCount, setAdultsCount] = useState<number>(4);
  const [kidsCount, setKidsCount] = useState<number>(0);
  const [petsCount, setPetsCount] = useState<number>(0);
  const [durationDays, setDurationDays] = useState<number>(5);

  const todayStr = new Date().toISOString().split('T')[0];
  const futureDateStr = new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(futureDateStr);
  const [isFlexible, setIsFlexible] = useState<boolean>(true);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'nature',
    'adventure',
    'lakes',
    'roadtrips',
    'food',
  ]);

  const [preferences, setPreferences] = useState<PreferencesState>({
    hotels: true,
    restaurants: true,
    transport: true,
    localGuide: false,
    weather: true,
    attractions: true,
    hiddenGems: true,
    estimatedCosts: true,
    pace: 'balanced',
  });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Step 2 Budget handlers
  const handleSelectBudgetTier = (tierId: string, amount: number) => {
    setBudgetTier(tierId);
    setBudgetAmount(amount);
  };

  // Step 3 Travelers handlers
  const handleSelectTravelerType = (typeId: string, defaultAdults: number, defaultKids: number) => {
    setTravelerType(typeId);
    setAdultsCount(defaultAdults);
    setKidsCount(defaultKids);
  };

  const handleUpdateCounts = (adults: number, kids: number, pets: number) => {
    setAdultsCount(adults);
    setKidsCount(kids);
    setPetsCount(pets);
  };

  // Step 5 Interests handlers
  const handleToggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectInterestPreset = (list: string[]) => {
    setSelectedInterests(Array.from(new Set([...selectedInterests, ...list])));
  };

  // Step 6 Preferences handlers
  const handleTogglePreference = (key: keyof Omit<PreferencesState, 'pace'>) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChangePace = (pace: 'relaxed' | 'balanced' | 'fast') => {
    setPreferences((prev) => ({
      ...prev,
      pace,
    }));
  };

  // Reset wizard
  const handleResetWizard = () => {
    setIsProcessing(false);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050b14] text-[#111827] dark:text-white pb-28 pt-4 sm:pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Wizard Header Bar */}
        <PlannerHeader
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          stepTitles={STEP_TITLES}
          onBackStep={handleBackStep}
          onJumpToStep={handleJumpToStep}
        />

        {/* Dynamic Animated Step View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full"
          >
            {currentStep === 1 && (
              <Step1Destination
                selectedDestination={destination}
                onSelectDestination={setDestination}
                onNext={handleNextStep}
              />
            )}

            {currentStep === 2 && (
              <Step2Budget
                selectedTier={budgetTier}
                customAmount={budgetAmount}
                onSelectTier={handleSelectBudgetTier}
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 3 && (
              <Step3Travelers
                selectedType={travelerType}
                adultsCount={adultsCount}
                kidsCount={kidsCount}
                petsCount={petsCount}
                onSelectType={handleSelectTravelerType}
                onUpdateCounts={handleUpdateCounts}
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 4 && (
              <Step4Dates
                selectedDuration={durationDays}
                startDate={startDate}
                endDate={endDate}
                isFlexible={isFlexible}
                onSelectDuration={setDurationDays}
                onUpdateDates={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
                onToggleFlexible={setIsFlexible}
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 5 && (
              <Step5Interests
                selectedInterests={selectedInterests}
                onToggleInterest={handleToggleInterest}
                onSelectPreset={handleSelectInterestPreset}
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 6 && (
              <Step6Preferences
                preferences={preferences}
                onTogglePreference={handleTogglePreference}
                onChangePace={handleChangePace}
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 7 && (
              <Step7Review
                destination={destination}
                budgetTier={budgetTier}
                budgetAmount={budgetAmount}
                travelerType={travelerType}
                adults={adultsCount}
                kids={kidsCount}
                pets={petsCount}
                durationDays={durationDays}
                startDate={startDate}
                endDate={endDate}
                isFlexible={isFlexible}
                interests={selectedInterests}
                preferences={preferences}
                onEditStep={handleJumpToStep}
                onGenerateTrip={() => {
                  const tripParams = {
                    destination,
                    budgetTier,
                    budgetAmount,
                    travelerType,
                    adults: adultsCount,
                    kids: kidsCount,
                    pets: petsCount,
                    durationDays,
                    startDate,
                    endDate,
                    isFlexible,
                    interests: selectedInterests,
                    preferences,
                  };
                  try {
                    sessionStorage.setItem('trevixa_current_trip_params', JSON.stringify(tripParams));
                  } catch (e) {
                    console.error('Failed to save to sessionStorage', e);
                  }
                  setIsProcessing(true);
                }}
                onBack={handleBackStep}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* AI Processing Experience Modal */}
      {isProcessing && (
        <ProcessingScreen
          destination={destination}
          durationDays={durationDays}
          budgetAmount={budgetAmount}
          onResetWizard={handleResetWizard}
        />
      )}
    </div>
  );
};
