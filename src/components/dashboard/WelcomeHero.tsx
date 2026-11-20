import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Sun, Flame, MapPin, ArrowRight, Compass } from 'lucide-react';
import { Button } from '../ui/button';

export const WelcomeHero: React.FC = () => {
  // Format today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
      {/* Abstract Animated Travel Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Vector Compass Grid Overlay */}
      <div className="absolute inset-0 bg-radial-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Welcome Copy & Streak */}
        <div className="space-y-4 max-w-2xl">
          {/* Status Badges & Weather/Date Row */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            {/* Date Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-white/10 backdrop-blur-md text-slate-200 font-semibold shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>{today}</span>
            </div>

            {/* Weather Chip (Dummy) */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-white/10 backdrop-blur-md text-amber-300 font-semibold shadow-sm">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>22°C Clear • Hunza</span>
            </div>

            {/* Travel Streak (Dummy) */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 font-extrabold shadow-sm animate-bounce">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>🔥 5-Day Planning Streak</span>
            </div>
          </div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Good Morning, Traveler 👋
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium mt-2 leading-relaxed max-w-xl">
              Ready for your next adventure? Explore curated northern escapes, generate custom itineraries, or budget your next roadtrip.
            </p>
          </motion.div>

          {/* Quick CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/plan-trip">
              <Button variant="neon" size="lg" className="gap-2.5 rounded-2xl font-extrabold shadow-lg shadow-sky-500/25">
                <Sparkles className="w-5 h-5" />
                <span>Start Planning</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/destinations">
              <Button variant="outline" size="lg" className="gap-2 rounded-2xl font-bold bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Browse All Spots</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Artwork / Quick Stats Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full lg:w-80 p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col justify-between gap-4"
        >
          {/* Header of Card */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Live AI Travel Engine</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-extrabold border border-sky-400/30">
              v1.0
            </span>
          </div>

          {/* Next Recommended Trip Feature */}
          <div className="relative rounded-2xl overflow-hidden h-32 group border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Skardu Valley"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <div className="flex items-center gap-1 text-[11px] text-sky-300 font-extrabold uppercase">
                <MapPin className="w-3 h-3 text-sky-400" />
                <span>Featured Destination</span>
              </div>
              <p className="text-sm font-black text-white drop-shadow">Skardu & Shangrila Lake</p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Best Season</span>
              <span className="font-extrabold text-amber-300">June - Oct</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Avg. Budget</span>
              <span className="font-extrabold text-emerald-300">PKR 75k</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
