import React from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Camera,
  Sunrise,
  Sunset,
  Utensils,
  HeartHandshake,
  ShieldAlert,
  PiggyBank,
  Sparkles,
} from 'lucide-react';

import { LocalTipCategory } from '../../types/tripResult';

interface LocalTipsSectionProps {
  customTips?: LocalTipCategory[];
}

export const LocalTipsSection: React.FC<LocalTipsSectionProps> = ({ customTips }) => {
  const defaultTips = [
    {
      title: 'Hidden Gems',
      icon: Compass,
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800',
      items: [
        'Borith Lake pink sunset reflections away from busy tour groups.',
        'Hoper Glacier valley viewpoint & suspension bridges in Nagar.',
        'Sacred Rocks of Hunza featuring ancient Sogdian rock carvings.',
      ],
    },
    {
      title: 'Photography Hotspots',
      icon: Camera,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
      items: [
        'Passu Cathedral Cones at 06:15 AM golden morning light.',
        'Attabad Lake emerald speedboats framed by Karakoram cliffs.',
        'Wooden carved royal balconies at 800-year-old Baltit Fort.',
      ],
    },
    {
      title: 'Best Sunrise Point',
      icon: Sunrise,
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800',
      items: [
        'Duikar Village Viewpoint (2,850m) catching golden peak light on Rakaposhi & Ladyfinger peak.',
        'Arrive by 05:10 AM for optimal crisp morning clarity.',
      ],
    },
    {
      title: 'Best Sunset Point',
      icon: Sunset,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
      items: [
        'Eagle’s Nest Rock or Altit Fort Queen’s Garden overlooks.',
        '360-degree views across the entire Hunza River valley as mountain shadows lengthen.',
      ],
    },
    {
      title: 'Must-Try Local Foods',
      icon: Utensils,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      items: [
        'Chapshuro: Savory minced beef & local herb flatbread baked on hot griddles.',
        'Diram Fitti & Sea Buckthorn Juice: Nutrient-rich berry drink & walnut flour cake.',
        'Fresh Mountain Rainbow Trout served hot with mint dip at Gojal.',
      ],
    },
    {
      title: 'Local Etiquette & Culture',
      icon: HeartHandshake,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
      items: [
        'Always ask polite permission before taking portraits of village residents.',
        'Remove shoes when invited into traditional Wakhi or Hunzai carpeted homes.',
        'Dress modestly and respect local community customs when walking.',
      ],
    },
    {
      title: 'Safety & Altitude Advice',
      icon: ShieldAlert,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
      items: [
        'Drink 3L+ water daily to prevent altitude dehydration headaches above 2,500m.',
        'Avoid driving mountain passes after nightfall due to fog and landslide risk.',
        'Keep extra fleece layers and emergency motion sickness tablets in your daypack.',
      ],
    },
    {
      title: 'Money Saving Tips',
      icon: PiggyBank,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
      items: [
        'Withdraw PKR cash in Gilgit or Islamabad; ATMs in Upper Hunza frequently run dry.',
        'Negotiate group jeep safari rates directly with local driver associations.',
        'Purchase dried apricots, walnuts, and gemstones directly at Karimabad bazaar.',
      ],
    },
  ];

  const iconList = [Compass, Camera, Sunrise, Sunset, Utensils, HeartHandshake, ShieldAlert, PiggyBank];
  const colorList = [
    'text-sky-500 bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800',
    'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
    'text-orange-500 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800',
    'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
    'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
    'text-purple-500 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
    'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800',
    'text-blue-500 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800',
  ];

  const tips = (customTips && customTips.length > 0)
    ? customTips.map((ct, i) => ({
        title: ct.title,
        items: ct.items,
        icon: iconList[i % iconList.length],
        color: colorList[i % colorList.length],
      }))
    : defaultTips;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-sky-500" />
          <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
            Local Insights & Travel Expert Guide
          </h2>
        </div>
        <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
          Curated intelligence on photography spots, sunrise/sunset points, local food, safety & money-saving secrets.
        </p>
      </div>

      {/* Grid of 8 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="p-5 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-2xl border ${tip.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black text-[#111827] dark:text-white leading-tight">
                    {tip.title}
                  </h3>
                </div>

                <ul className="space-y-2 text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium leading-relaxed">
                  {tip.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-500 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
