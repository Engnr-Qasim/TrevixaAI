import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Compass,
  MapPin,
  Hotel,
  Sun,
  Wallet,
  Calendar,
  Check,
  RotateCcw,
  LayoutDashboard,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProcessingScreenProps {
  destination: string;
  durationDays: number;
  budgetAmount: number;
  onResetWizard: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  destination,
  durationDays,
  budgetAmount,
  onResetWizard,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const processingSteps = [
    { title: 'Preparing destination details...', icon: MapPin },
    { title: 'Collecting your interests...', icon: Compass },
    { title: 'Estimating 4x4 Jeep rentals & fuel budget...', icon: Wallet },
    { title: 'Preparing lodging preferences...', icon: Hotel },
    { title: 'Preparing travel dates...', icon: Sun },
    { title: 'Optimizing daily route pace & order...', icon: Calendar },
    { title: 'Preparing personalized AI recommendations...', icon: Sparkles },
  ];

  useEffect(() => {
    if (currentStepIndex < processingSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setIsCompleted(true);
    }
  }, [currentStepIndex, processingSteps.length]);

  const progressPercent = Math.min(
    100,
    Math.round(((currentStepIndex) / processingSteps.length) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-2xl rounded-[3rem] bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden my-auto"
      >
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8 text-center">
          {/* Header Icon */}
          <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 p-0.5 shadow-2xl shadow-sky-500/30">
            <div className="w-full h-full rounded-[1.4rem] bg-slate-950 flex items-center justify-center">
              {isCompleted ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              ) : (
                <Sparkles className="w-10 h-10 text-sky-400 animate-spin" />
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-sky-400">
              {isCompleted ? 'Trip Details Ready' : 'Trip Setup'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isCompleted
                ? `Your ${destination} Trip Details Are Ready!`
                : `Crafting Your Custom ${destination} Trip`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md mx-auto">
              {isCompleted
                ? `${durationDays} Days / ${durationDays - 1} Nights with a planning budget of PKR ${budgetAmount.toLocaleString()}.`
                : 'Preparing your preferences for itinerary generation.'}
            </p>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-extrabold text-slate-400">
              <span>Preparing trip details</span>
              <span className="text-sky-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step-by-Step Checklist */}
          <div className="max-w-md mx-auto space-y-2.5 text-left bg-slate-900/80 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
            {processingSteps.map((step, idx) => {
              const Icon = step.icon;
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex && !isCompleted;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-xs font-bold transition-all ${
                    isDone
                      ? 'text-emerald-400'
                      : isCurrent
                      ? 'text-sky-300 scale-102'
                      : 'text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{step.title}</span>
                  </div>

                  <div>
                    {isDone ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row on Completion */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link to="/trip-results" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-sm shadow-xl shadow-sky-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>View Complete AI Trip Results</span>
                </button>
              </Link>

              <button
                onClick={onResetWizard}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Create Another Trip</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
