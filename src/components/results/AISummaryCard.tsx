import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';

interface AISummaryCardProps {
  destination: string;
  summaryText?: string;
  feasibilityScore?: number;
}

export const AISummaryCard: React.FC<AISummaryCardProps> = ({
  destination,
  summaryText,
  feasibilityScore = 98.5,
}) => {
  const displaySummary =
    summaryText ||
    `This itinerary is optimized for adventure and cultural immersion with a balanced budget. Expect scenic Karakoram highway drives, comfortable 4x4 Jeep transfers, and authentic trout dining across ${destination}. All daily travel windows are kept under 3.5 hours for optimal rest.`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-xl overflow-hidden"
    >
      {/* Decorative Glow Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-sky-400">
              AI Co-Pilot Executive Summary
            </span>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
            "{displaySummary}"
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-extrabold text-sky-300 border border-white/10">
              ⚡ Moderate Altitude Pace
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-extrabold text-emerald-300 border border-white/10">
              🛡️ Safe Road Corridors
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-extrabold text-amber-300 border border-white/10">
              ⭐ Family & Friends Friendly
            </span>
          </div>
        </div>

        <div className="shrink-0 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">
            Feasibility Score
          </span>
          <span className="text-2xl font-black text-emerald-400 block">
            98.5%
          </span>
          <span className="text-[10px] text-slate-400 block">
            Optimal Road & Season
          </span>
        </div>
      </div>
    </motion.div>
  );
};
