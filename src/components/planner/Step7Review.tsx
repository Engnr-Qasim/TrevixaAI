import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  MapPin,
  Wallet,
  Users,
  Calendar,
  Heart,
  Sliders,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PreferencesState } from './Step6Preferences';

interface Step7ReviewProps {
  destination: string;
  budgetTier: string;
  budgetAmount: number;
  travelerType: string;
  adults: number;
  kids: number;
  pets: number;
  durationDays: number;
  startDate: string;
  endDate: string;
  isFlexible: boolean;
  interests: string[];
  preferences: PreferencesState;
  onEditStep: (stepNumber: number) => void;
  onGenerateTrip: () => void;
  onBack: () => void;
}

export const Step7Review: React.FC<Step7ReviewProps> = ({
  destination,
  budgetTier,
  budgetAmount,
  travelerType,
  adults,
  kids,
  pets,
  durationDays,
  startDate,
  endDate,
  isFlexible,
  interests,
  preferences,
  onEditStep,
  onGenerateTrip,
  onBack,
}) => {
  // Format total travelers string
  const totalPeople = adults + kids;
  const partyText = `${travelerType.toUpperCase()} • ${adults} Adults${
    kids > 0 ? `, ${kids} Kids` : ''
  }${pets > 0 ? `, ${pets} Pets` : ''}`;

  // Count active inclusions
  const activeInclusionsCount = Object.entries(preferences).filter(
    ([k, v]) => k !== 'pace' && v === true
  ).length;

  return (
    <div className="space-y-6">
      {/* Step Heading */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Configuration Ready</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#111827] dark:text-white tracking-tight">
          Review Your Trip Parameters
        </h2>
        <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Check your selections below. You can edit any parameter before generating your custom AI itinerary.
        </p>
      </div>

      {/* Main Review Summary Card */}
      <div className="rounded-[2.5rem] bg-white dark:bg-[#0b1120] border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Destination Header Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">
              Target Destination
            </span>
            <h3 className="text-2xl font-black text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-sky-400 shrink-0" />
              <span>{destination || 'Hunza Valley'}</span>
            </h3>
          </div>

          <button
            onClick={() => onEditStep(1)}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-extrabold text-white flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Destination</span>
          </button>
        </div>

        {/* 2x2 Grid of Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Item 1: Budget */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Budget Plan
                </span>
                <span className="text-base font-black text-[#111827] dark:text-white block">
                  PKR {budgetAmount.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold capitalize">
                  Tier: {budgetTier}
                </span>
              </div>
            </div>

            <button
              onClick={() => onEditStep(2)}
              className="text-xs font-bold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          {/* Item 2: Travelers */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Travelers & Group
                </span>
                <span className="text-base font-black text-[#111827] dark:text-white block">
                  {totalPeople} Traveler{totalPeople > 1 ? 's' : ''}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate block max-w-[180px]">
                  {partyText}
                </span>
              </div>
            </div>

            <button
              onClick={() => onEditStep(3)}
              className="text-xs font-bold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          {/* Item 3: Dates & Duration */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Duration & Schedule
                </span>
                <span className="text-base font-black text-[#111827] dark:text-white block">
                  {durationDays} Days / {durationDays - 1} Nights
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {startDate && endDate ? `${startDate} to ${endDate}` : 'Flexible Season Dates'}
                  {isFlexible && ' (±3 Days)'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onEditStep(4)}
              className="text-xs font-bold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          {/* Item 4: Interests & Pace */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Interests & Inclusions
                </span>
                <span className="text-base font-black text-[#111827] dark:text-white block">
                  {interests.length} Interests • {activeInclusionsCount} Modules
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold capitalize">
                  Pace: {preferences.pace}
                </span>
              </div>
            </div>

            <button
              onClick={() => onEditStep(5)}
              className="text-xs font-bold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Selected Interests Chips Tags */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Selected Activity Tags:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {interests.map((intId) => (
              <span
                key={intId}
                className="px-3 py-1 rounded-full bg-sky-50 dark:bg-blue-950/60 text-sky-700 dark:text-sky-300 text-xs font-extrabold capitalize border border-sky-200 dark:border-blue-800"
              >
                #{intId}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Primary CTA: Generate AI Trip */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 transition-colors"
        >
          Back to Preferences
        </button>

        <button
          onClick={onGenerateTrip}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-black text-base shadow-2xl shadow-sky-500/40 hover:shadow-sky-500/60 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span>Generate AI Itinerary Now</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
