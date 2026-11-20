import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeroSummary } from '../components/results/HeroSummary';
import { AISummaryCard } from '../components/results/AISummaryCard';
import { BudgetBreakdown } from '../components/results/BudgetBreakdown';
import { DayItinerary } from '../components/results/DayItinerary';
import { HotelsSection } from '../components/results/HotelsSection';
import { RestaurantsSection } from '../components/results/RestaurantsSection';
import { AttractionsSection } from '../components/results/AttractionsSection';
import { TransportSection } from '../components/results/TransportSection';
import { WeatherForecast } from '../components/results/WeatherForecast';
import { PackingChecklist } from '../components/results/PackingChecklist';
import { LocalTipsSection } from '../components/results/LocalTipsSection';
import { TravelDifficultyBadges } from '../components/results/TravelDifficultyBadges';
import { DestinationGallery } from '../components/results/DestinationGallery';
import { InteractiveMapSection } from '../components/results/InteractiveMapSection';
import { SimilarDestinations } from '../components/results/SimilarDestinations';
import { ActionCenterSection } from '../components/results/ActionCenterSection';
import { FeedbackSection } from '../components/results/FeedbackSection';
import { MobileStickyBar } from '../components/results/MobileStickyBar';
import { CheckCircle2, Sparkles, ChevronLeft, RefreshCw, AlertCircle, Loader2, Compass } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { GeneratedTripData, TripPlannerParams } from '../types/tripResult';
import { mapRawGeminiToTripData } from '../utils/tripDataMapper';
import { useAuthContext } from '../context/AuthContext';
import { dbService, DbTripRecord } from '../services/dbService';

export const TripResultsPage: React.FC = () => {
  const { user, getSessionToken } = useAuthContext();
  const { state } = useLocation();
  const userId = user?.id;
  const started = useRef(false);
  const savedTrip = userId && state?.savedTrip?.user_id === userId ? state.savedTrip as DbTripRecord : null;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [currentTripRecord, setCurrentTripRecord] = useState<DbTripRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [aiData, setAiData] = useState<GeneratedTripData | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleMobileSave = async () => {
    if (!aiData || !userId) return;
    if (!isSaved) {
      const saved = await dbService.saveTrip(userId, aiData);
      setCurrentTripRecord(saved);
      setIsSaved(true);
      showToast('Trip saved.');
    } else {
      if (currentTripRecord) {
        await dbService.deleteTrip(currentTripRecord.id, true);
      }
      setIsSaved(false);
      showToast('Trip removed from saved trips.');
    }
  };

  const handleMobileDownload = () => {
    showToast('Downloading high-resolution PDF itinerary...');
  };

  const handleMobileShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Trip link copied to clipboard!');
  };

  const fetchTripFromGemini = async (overrideParams?: TripPlannerParams) => {
    setIsLoading(true);
    setApiError(null);

    let params: TripPlannerParams = overrideParams || {
      destination: 'Hunza Valley',
      durationDays: 5,
      budgetAmount: 75000,
      travelerType: 'Friends & Family',
      adults: 4,
      kids: 0,
      interests: ['nature', 'adventure', 'food', 'roadtrips'],
    };

    if (!overrideParams) {
      try {
        const stored = sessionStorage.getItem('trevixa_current_trip_params');
        if (stored) {
          const parsed = JSON.parse(stored);
          params = { ...params, ...parsed };
        }
      } catch (e) {
        console.warn('Could not parse sessionStorage trip params', e);
      }
    }

    try {
      const token = await getSessionToken();
      if (!token || !userId) throw new Error('Sign in with Clerk to generate a trip.');
      const response = await fetch('/api/generate-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });

      const resData = await response.json().catch(() => null);

      if (!response.ok || !resData?.success) {
        throw new Error(resData?.error || 'Failed to generate itinerary with Gemini AI.');
      }

      const mappedData = mapRawGeminiToTripData(resData.data, params);
      setAiData(mappedData);

      // Save to Supabase DB and record activity
      const savedRecord = await dbService.saveTrip(userId, mappedData);
      setCurrentTripRecord(savedRecord);
      setIsSaved(true);

      showToast(`Generated and saved a trip for ${mappedData.destination}.`);
    } catch (err: any) {
      setApiError(err.message || 'Error connecting to Gemini API.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (savedTrip) {
      setAiData(mapRawGeminiToTripData(savedTrip.complete_itinerary_json));
      setCurrentTripRecord(savedTrip);
      setIsSaved(true);
      setIsLoading(false);
    } else {
      fetchTripFromGemini();
    }
  }, []);

  const fallbackDestinationData = {
    destination: 'Hunza Valley',
    region: 'Gilgit-Baltistan, Pakistan',
    matchScore: 98,
    durationDays: 5,
    budgetAmount: 75000,
    bestSeason: 'July - October',
    weather: '22°C Clear & Sunny',
    travelStyle: 'Friends & Family Roadtrip',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
  };

  const destinationData = aiData
    ? {
        destination: aiData.destination,
        region: aiData.region,
        matchScore: aiData.matchScore,
        durationDays: aiData.durationDays,
        budgetAmount: aiData.budgetAmount,
        bestSeason: aiData.bestSeason,
        weather: aiData.weather,
        travelStyle: aiData.travelStyle,
        heroImage: aiData.heroImage || fallbackDestinationData.heroImage,
      }
    : fallbackDestinationData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070c18] text-slate-900 dark:text-slate-100 pb-28 md:pb-16 transition-colors">
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-950/90 text-white border border-sky-500/50 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-black"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10 sm:space-y-12">
        {/* Back Link Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/plan-trip"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to AI Trip Planner</span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-extrabold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-3.5 py-1 rounded-full border border-sky-200 dark:border-sky-800">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Powered by Gemini</span>
          </div>
        </div>

        {/* AI Loading State Overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center mx-auto shadow-xl shadow-sky-500/30 animate-pulse">
              <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-black tracking-tight text-white">
                Generating Custom Itinerary with Gemini AI...
              </h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Looking for travel references and drafting your itinerary.
              </p>
            </div>

            <div className="w-full max-w-md mx-auto space-y-2">
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-sky-400 block font-bold">
                Preparing daily activities and estimated PKR budgets
              </span>
            </div>
          </motion.div>
        )}

        {/* API Error State Banner */}
        {apiError && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-rose-950/40 border border-rose-800/80 text-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white">Gemini AI Request Notice</h4>
                <p className="text-xs text-rose-300 font-medium">{apiError}</p>
                <p className="text-[11px] text-slate-400">
                  You can retry the request or return to the trip planner.
                </p>
              </div>
            </div>

            <button
              onClick={() => fetchTripFromGemini()}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-rose-600/30"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Gemini Request</span>
            </button>
          </motion.div>
        )}

        {!isLoading && aiData && (
          <>
            {/* 1. Hero Summary */}
            <HeroSummary
              destination={destinationData.destination}
              region={destinationData.region}
              matchScore={destinationData.matchScore}
              durationDays={destinationData.durationDays}
              budgetAmount={destinationData.budgetAmount}
              bestSeason={destinationData.bestSeason}
              weather={destinationData.weather}
              travelStyle={destinationData.travelStyle}
              heroImage={destinationData.heroImage}
              isSaved={isSaved}
              onSaveToggle={handleMobileSave}
              onRegenerate={() => fetchTripFromGemini(savedTrip ? { destination: aiData.destination, durationDays: aiData.durationDays, budgetAmount: aiData.budgetAmount } : undefined)}
              onToast={showToast}
            />

            <aside className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-sm space-y-2">
              <h2 className="font-bold">Travel estimates and sources</h2>
              <p>Prices and travel times are planning estimates. Hotel availability, current prices, ratings,
                road conditions, and forecasts could not be confirmed. Photos are illustrative.</p>
              {aiData.sources?.length ? (
                <ul className="list-disc space-y-1 pl-5">
                  {aiData.sources.map(source => (
                    <li key={source.url}><a className="underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>
                  ))}
                </ul>
              ) : <p>No Google Search sources were available for this itinerary.</p>}
            </aside>

            {/* 2. AI Executive Summary */}
            <AISummaryCard
              destination={destinationData.destination}
              summaryText={aiData?.executiveSummary}
              feasibilityScore={aiData?.feasibilityScore}
            />

            {/* 2b. Travel Difficulty & Feasibility Badges */}
            <TravelDifficultyBadges
              data={aiData?.difficultyBadges}
              feasibilityScore={aiData?.feasibilityScore}
            />

            {/* 3. Budget Breakdown */}
            <BudgetBreakdown
              totalBudget={destinationData.budgetAmount}
              customItems={aiData?.budgetBreakdown}
            />

            {/* 4. Day-by-Day Itinerary */}
            <DayItinerary
              durationDays={destinationData.durationDays}
              destination={destinationData.destination}
              customDaysData={aiData?.dayItinerary}
            />

            {/* 5. Destination Photo Gallery */}
            <DestinationGallery
              customImages={aiData?.galleryImages}
              destinationName={destinationData.destination}
            />

            {/* 6. Hotels & Stays */}
            <HotelsSection
              onToast={showToast}
              customHotels={aiData?.hotels}
            />

            {/* 7. Restaurants & Cafes */}
            <RestaurantsSection customRestaurants={aiData?.restaurants} />

            {/* 8. Top Attractions */}
            <AttractionsSection customAttractions={aiData?.attractions} />

            {/* 9. Transport Logistics */}
            <TransportSection customTransportOptions={aiData.transportOptions ?? []} />

            {/* 10. Weather Forecast & Climate */}
            <WeatherForecast
              customForecast={aiData?.weatherForecast}
              overview={aiData?.weatherOverview}
            />

            {/* 11. Packing Checklist */}
            <PackingChecklist customItems={aiData?.packingChecklist} />

            {/* 12. Local Tips & Insights */}
            <LocalTipsSection customTips={aiData?.localTips} />

            {/* 13. Interactive Route Map */}
            <InteractiveMapSection />

            {/* 14. Similar Destinations */}
            <SimilarDestinations />

            {/* 15. Action Center */}
            <ActionCenterSection
              onToast={showToast}
              tripSummaryText={aiData?.executiveSummary}
              destinationName={destinationData.destination}
            />

            {/* 16. Feedback */}
            <FeedbackSection />
          </>
        )}
      </main>

      {/* 16. Mobile Bottom Sticky Bar */}
      {aiData && !isLoading && <MobileStickyBar
        onSave={handleMobileSave}
        onDownload={handleMobileDownload}
        onShare={handleMobileShare}
        isSaved={isSaved}
      />}
    </div>
  );
};
