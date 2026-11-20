import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, CheckCircle2, Clock, Plus, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export const ContinuePlanning: React.FC = () => {
  const [hasActiveTrip, setHasActiveTrip] = useState(true);

  // Realistic Dummy Active Trip
  const activeTrip = {
    id: 'trip-skardu-2026',
    destination: 'Skardu & Deosai Plains Expedition',
    region: 'Gilgit-Baltistan, Pakistan',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    progress: 68, // percentage
    updatedAt: '2 hours ago',
    duration: '6 Days / 5 Nights',
    estimatedBudget: 'PKR 85,000',
    steps: [
      { name: 'Route & Itinerary Generated', completed: true },
      { name: 'Hotel Preference Selected', completed: true },
      { name: '4x4 Prado/Jeep Estimate Calculated', completed: true },
      { name: 'Restaurant & Food Checklist', completed: false },
      { name: 'Final Confirmation & Export', completed: false },
    ],
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Continue Planning
          </h2>
          <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
            Pick up right where you left off on your latest draft
          </p>
        </div>

        {/* Demo State Toggle Button */}
        <button
          onClick={() => setHasActiveTrip(!hasActiveTrip)}
          className="text-xs font-semibold text-sky-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>{hasActiveTrip ? 'View Empty State' : 'View Draft Trip'}</span>
        </button>
      </div>

      {hasActiveTrip ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[2.5rem] bg-white dark:bg-[#0b1120] border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden p-5 sm:p-7 flex flex-col lg:flex-row gap-6 items-stretch"
        >
          {/* Left Large Destination Preview */}
          <div className="relative w-full lg:w-96 rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[240px] shrink-0 group">
            <img
              src={activeTrip.image}
              alt={activeTrip.destination}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
            
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-extrabold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{activeTrip.region}</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-300">
                Draft Saved • {activeTrip.updatedAt}
              </span>
              <h3 className="text-xl font-extrabold leading-tight text-white drop-shadow">
                {activeTrip.destination}
              </h3>
            </div>
          </div>

          {/* Right Progress & Details Panel */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-blue-400">
                    Active Trip Plan
                  </span>
                  <h4 className="text-lg font-extrabold text-[#111827] dark:text-white">
                    {activeTrip.destination}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-sky-600 dark:text-blue-400">
                    {activeTrip.progress}%
                  </span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">
                    Completed
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200/60 dark:border-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeTrip.progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-400 rounded-full"
                />
              </div>

              {/* Steps Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {activeTrip.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-semibold text-[#374151] dark:text-[#cbd5e1]"
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className={step.completed ? 'line-through opacity-75' : 'font-extrabold text-[#111827] dark:text-white'}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs font-bold text-[#4b5563] dark:text-[#cbd5e1]">
                <span>Duration: <strong className="text-[#111827] dark:text-white">{activeTrip.duration}</strong></span>
                <span>Est. Budget: <strong className="text-emerald-600 dark:text-emerald-400">{activeTrip.estimatedBudget}</strong></span>
              </div>

              <Link to={`/plan-trip?destination=${encodeURIComponent('Skardu')}`}>
                <Button variant="neon" size="sm" className="gap-2 rounded-xl font-extrabold px-5 py-2.5">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Continue Planning</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Empty State: Create Your First Trip */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-sky-50/50 dark:from-[#0b1120] dark:to-[#050b14] border-2 border-dashed border-sky-200 dark:border-blue-900/60 p-8 sm:p-12 text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Plus className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-[#111827] dark:text-white">
              Create Your First Trip
            </h3>
            <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium leading-relaxed">
              You haven't saved any active drafts yet. Use our AI Generator to build a complete itinerary in less than 60 seconds.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/plan-trip">
              <Button variant="neon" size="lg" className="gap-2 font-extrabold rounded-2xl shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span>Start AI Trip Generator</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </section>
  );
};
