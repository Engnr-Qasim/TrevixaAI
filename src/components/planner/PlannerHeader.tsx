import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, Check, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlannerHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onBackStep: () => void;
  onJumpToStep: (step: number) => void;
}

export const PlannerHeader: React.FC<PlannerHeaderProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  onBackStep,
  onJumpToStep,
}) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-6">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {currentStep > 1 ? (
            <button
              onClick={onBackStep}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-blue-900/40 hover:text-sky-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-blue-900/40 hover:text-sky-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600 dark:text-blue-400">
                AI Travel Co-Pilot
              </span>
              <h1 className="text-base sm:text-lg font-black text-[#111827] dark:text-white leading-tight">
                Trip Planner Wizard
              </h1>
            </div>
          </div>
        </div>

        {/* Step Indicator Pill */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 px-3.5 py-1.5 rounded-2xl">
          <span className="text-xs font-black text-sky-600 dark:text-blue-400">
            Step {currentStep}
          </span>
          <span className="text-slate-400 text-xs">/ {totalSteps}</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
            {stepTitles[currentStep - 1]}
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>Overall Progress</span>
          <span className="text-sky-600 dark:text-blue-400 font-black">{progressPercent}% Completed</span>
        </div>

        <div className="relative w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200/60 dark:border-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-400 rounded-full shadow-sm"
          />
        </div>

        {/* Step Dots Nav (Desktop) */}
        <div className="hidden md:flex items-center justify-between pt-1">
          {stepTitles.map((title, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <button
                key={title}
                onClick={() => isCompleted && onJumpToStep(stepNum)}
                disabled={!isCompleted && !isCurrent}
                className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                  isCurrent
                    ? 'text-sky-600 dark:text-blue-400 scale-105'
                    : isCompleted
                    ? 'text-emerald-600 dark:text-emerald-400 cursor-pointer hover:underline'
                    : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
                    isCurrent
                      ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/30'
                      : isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNum}
                </div>
                <span className="truncate max-w-[90px]">{title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
