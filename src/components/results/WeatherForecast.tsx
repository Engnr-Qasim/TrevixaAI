import React from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  CloudSun,
  Wind,
  Thermometer,
  Sunrise,
  Sunset,
  Clock,
  AlertTriangle,
  Sparkles,
  Info,
} from 'lucide-react';

import { WeatherForecastDay, WeatherOverview } from '../../types/tripResult';

interface WeatherForecastProps {
  customForecast?: WeatherForecastDay[];
  overview?: WeatherOverview;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ customForecast, overview }) => {
  const defaultForecastDays: WeatherForecastDay[] = [
    {
      day: 'Day 1 (Arrival)',
      tempHigh: 24,
      tempLow: 12,
      condition: 'Sunny & Crisp Air',
      rainChance: '10%',
    },
    {
      day: 'Day 2 (Forts & Culture)',
      tempHigh: 22,
      tempLow: 10,
      condition: 'Clear Blue Sky',
      rainChance: '5%',
    },
    {
      day: 'Day 3 (Attabad Lake)',
      tempHigh: 20,
      tempLow: 9,
      condition: 'Partly Cloudy',
      rainChance: '15%',
    },
    {
      day: 'Day 4 (Khunjerab Pass)',
      tempHigh: 8,
      tempLow: -2,
      condition: 'Cold High Altitude Wind',
      rainChance: '20%',
    },
    {
      day: 'Day 5 (Return Drive)',
      tempHigh: 23,
      tempLow: 11,
      condition: 'Mild & Sunny',
      rainChance: '10%',
    },
  ];

  const defaultOverview: WeatherOverview = {
    sunrise: '05:22 AM',
    sunset: '07:18 PM',
    bestVisitingHours: '07:30 AM - 11:30 AM & 04:00 PM - 06:45 PM',
    recommendation: 'Pack thermal base layers for chilly mountain evenings and high UV sunscreen.',
    warning: 'High elevation UV index. Cold mountain winds expected above 3,000m altitude.',
    isAiEstimated: true,
  };

  const weatherOverview = overview || defaultOverview;

  const forecastDays = customForecast && customForecast.length > 0
    ? customForecast
    : defaultForecastDays;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Weather Intelligence & Climate Outlook
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Seasonal temperature projections, golden hours, sunrise/sunset, and travel advisories.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3.5 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {weatherOverview.isAiEstimated ? 'AI Climate Projections' : 'Live Altitude Stream'}
          </span>
        </div>
      </div>

      {/* Weather Highlights Banner Panel */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sunrise className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Sunrise</span>
              <span className="text-sm font-black text-white">{weatherOverview.sunrise}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Sunset className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Sunset</span>
              <span className="text-sm font-black text-white">{weatherOverview.sunset}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-1 sm:col-span-2">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Best Visiting Hours</span>
              <span className="text-xs font-black text-sky-300">{weatherOverview.bestVisitingHours}</span>
            </div>
          </div>
        </div>

        {/* Advisory & Recommendation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-sky-300 block mb-0.5">Travel Recommendation</span>
              <p className="font-medium text-slate-300">{weatherOverview.recommendation}</p>
            </div>
          </div>

          {weatherOverview.warning && (
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/80 text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-amber-300 block mb-0.5">Weather Advisory</span>
                <p className="font-medium text-amber-200">{weatherOverview.warning}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Day-by-Day Forecast Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {forecastDays.map((fc, idx) => (
          <motion.div
            key={fc.day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.04 }}
            className="p-4 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3"
          >
            <span className="text-xs font-black text-[#111827] dark:text-white block">
              {fc.day}
            </span>

            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center">
              {idx % 2 === 0 ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <CloudSun className="w-5 h-5 text-sky-500" />
              )}
            </div>

            <div>
              <span className="text-base font-black text-[#111827] dark:text-white">
                {fc.tempHigh}°C
              </span>
              <span className="text-xs text-slate-400 font-bold ml-1">
                / {fc.tempLow}°C
              </span>
            </div>

            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block truncate">
              {fc.condition}
            </span>

            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-extrabold block">
              🌧️ {fc.rainChance} Precip
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
