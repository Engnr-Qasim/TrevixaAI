import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Wallet,
  Sun,
  Users,
  Bookmark,
  Download,
  Share2,
  Edit3,
  RotateCcw,
  Check,
  Zap,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSummaryProps {
  destination: string;
  region: string;
  matchScore: number;
  durationDays: number;
  budgetAmount: number;
  bestSeason: string;
  weather: string;
  travelStyle: string;
  heroImage: string;
  isSaved?: boolean;
  onSaveToggle?: () => void;
  onRegenerate?: () => void;
  onToast: (msg: string) => void;
}

export const HeroSummary: React.FC<HeroSummaryProps> = ({
  destination,
  region,
  matchScore,
  durationDays,
  budgetAmount,
  bestSeason,
  weather,
  travelStyle,
  heroImage,
  isSaved = false,
  onSaveToggle,
  onRegenerate,
  onToast,
}) => {
  const [internalSaved, setInternalSaved] = useState(isSaved);

  const handleSaveToggle = () => {
    if (onSaveToggle) {
      onSaveToggle();
    } else {
      setInternalSaved(!internalSaved);
      onToast(!internalSaved ? 'Trip saved to your Saved Trips!' : 'Trip removed from Saved');
    }
  };

  const handleDownloadPDF = () => {
    onToast('Exporting PDF Itinerary... Download starting!');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onToast('Shareable trip link copied to clipboard!');
  };

  return (
    <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800">
      {/* Background Image with Dark Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={destination}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30" />
      </div>

      {/* Top Floating Badges Bar */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-black text-sky-400 flex items-center gap-1.5 shadow-lg">
            <Zap className="w-4 h-4 text-sky-400 fill-sky-400" />
            <span>{matchScore}% AI Match</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Verified AI Route</span>
          </div>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveToggle}
            className={`p-3 rounded-2xl border backdrop-blur-md transition-all flex items-center gap-2 text-xs font-extrabold ${
              isSaved || internalSaved
                ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30'
                : 'bg-slate-900/80 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved || internalSaved ? 'fill-white' : ''}`} />
            <span className="hidden sm:inline">{isSaved || internalSaved ? 'Saved' : 'Save Trip'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="p-3 rounded-2xl bg-slate-900/80 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-xs font-extrabold"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={handleShare}
            className="p-3 rounded-2xl bg-slate-900/80 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-xs font-extrabold"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Glass Info Panel */}
      <div className="relative z-10 px-6 pb-8 sm:px-10 sm:pb-10 space-y-6 pt-12 sm:pt-20">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-extrabold uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>{region}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md">
            {destination} Itinerary
          </h1>
          <p className="text-sm sm:text-base text-slate-200 font-medium max-w-2xl leading-relaxed">
            AI-curated {durationDays}-Day adventure covering scenic mountain vistas, cultural heritage sites, boutique hotel stays, and local trout dining.
          </p>
        </div>

        {/* Key Metrics Glass Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              Duration
            </span>
            <span className="text-base font-black text-white block">
              {durationDays} Days / {durationDays - 1} Nights
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              Est. Budget
            </span>
            <span className="text-base font-black text-emerald-400 block">
              PKR {budgetAmount.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Best Season & Weather
            </span>
            <span className="text-base font-black text-white block truncate">
              {bestSeason} • {weather}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              Travel Style
            </span>
            <span className="text-base font-black text-white block capitalize truncate">
              {travelStyle}
            </span>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <Link to="/plan-trip">
              <button className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold border border-white/20 backdrop-blur-md transition-all flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit Parameters</span>
              </button>
            </Link>

            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="px-5 py-3 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-extrabold border border-sky-400/30 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Regenerate AI Options</span>
              </button>
            )}
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Generated by Trevixa AI Engine v2.4
          </span>
        </div>
      </div>
    </div>
  );
};
