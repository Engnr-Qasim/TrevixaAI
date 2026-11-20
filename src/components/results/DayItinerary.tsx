import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Car,
  Hotel,
  Camera,
  Sun,
  Sunset,
  Sunrise,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag,
} from 'lucide-react';

interface ActivityItem {
  id: string;
  timeSlot: string;
  period: 'morning' | 'afternoon' | 'evening';
  title: string;
  location: string;
  duration: string;
  estCost: string;
  description: string;
  image: string;
  type: 'Attraction' | 'Food' | 'Travel' | 'Stay' | 'Activity';
}

interface DayPlan {
  dayNumber: number;
  title: string;
  dateStr: string;
  theme: string;
  activities: ActivityItem[];
}

import { DayPlan as DynamicDayPlan } from '../../types/tripResult';

interface DayItineraryProps {
  durationDays: number;
  destination: string;
  customDaysData?: DynamicDayPlan[];
}

export const DayItinerary: React.FC<DayItineraryProps> = ({ durationDays, destination, customDaysData }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  // Default fallback 5 Days of Pakistani travel itinerary data
  const defaultDaysData: DayPlan[] = [
    {
      dayNumber: 1,
      title: 'Arrival in Gilgit & Drive to Hunza Karimabad',
      dateStr: 'Day 1',
      theme: 'Scenic KKH Drive & Mountain Sunset',
      activities: [
        {
          id: '1-1',
          timeSlot: '08:00 AM - 10:30 AM',
          period: 'morning',
          title: 'Arrival at Gilgit Airport & Jeep Pickup',
          location: 'Gilgit Airport (GIL)',
          duration: '2.5 hrs',
          estCost: 'Included in Transport',
          description: 'Meet your private Prado Jeep driver at Gilgit Airport. Briefing on high-altitude road conditions.',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
          type: 'Travel',
        },
        {
          id: '1-2',
          timeSlot: '11:00 AM - 12:30 PM',
          period: 'morning',
          title: 'Rakaposhi Viewpoint & Mountain Tea',
          location: 'Ghulmet, Nagar Valley',
          duration: '1.5 hrs',
          estCost: 'PKR 800 (Tea & Snacks)',
          description: 'Stop at the Rakaposhi Viewpoint restaurant for fresh walnut cake and hot chai with snowpeak views.',
          image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=600&q=80',
          type: 'Food',
        },
        {
          id: '1-3',
          timeSlot: '01:30 PM - 03:30 PM',
          period: 'afternoon',
          title: 'Traditional Balti Lunch at Osho Maraka',
          location: 'Karimabad Bazaar',
          duration: '2.0 hrs',
          estCost: 'PKR 1,800/person',
          description: 'Savor traditional Chapshuro (meat stuffed bread) and fresh apricot juice at a local cafe.',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          type: 'Food',
        },
        {
          id: '1-4',
          timeSlot: '04:30 PM - 07:00 PM',
          period: 'evening',
          title: 'Sunset at Eagle’s Nest Viewpoint (Duikar)',
          location: 'Duikar, 2,850m elevation',
          duration: '2.5 hrs',
          estCost: 'Free / PKR 200 Entry',
          description: 'Panoramic 360-degree sunset over Ladyfinger Peak, Ultar Sar, and Golden Peak.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          type: 'Attraction',
        },
      ],
    },
    {
      dayNumber: 2,
      title: 'Historical Forts & Local Culture in Karimabad',
      dateStr: 'Day 2',
      theme: 'Baltit & Altit Heritage Exploration',
      activities: [
        {
          id: '2-1',
          timeSlot: '09:00 AM - 11:30 AM',
          period: 'morning',
          title: 'Guided Tour of 800-Year-Old Baltit Fort',
          location: 'Karimabad Hill',
          duration: '2.5 hrs',
          estCost: 'PKR 600 Ticket',
          description: 'Explore UNESCO heritage fort architecture, ancient weapon displays, and royal chambers.',
          image: 'https://images.unsplash.com/photo-1609839382283-e1897c92b95b?auto=format&fit=crop&w=600&q=80',
          type: 'Attraction',
        },
        {
          id: '2-2',
          timeSlot: '12:00 PM - 02:00 PM',
          period: 'afternoon',
          title: 'Kha Basi Cafe & Altit Fort Royal Gardens',
          location: 'Altit Village',
          duration: '2.0 hrs',
          estCost: 'PKR 1,500/person',
          description: 'Dine in royal apricot orchards prepared by local women empowerment culinary initiatives.',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
          type: 'Food',
        },
        {
          id: '2-3',
          timeSlot: '03:30 PM - 06:30 PM',
          period: 'evening',
          title: 'Handicrafts & Gemstones Market Walk',
          location: 'Karimabad Main Bazaar',
          duration: '3.0 hrs',
          estCost: 'Shopping Budget Optional',
          description: 'Shop for authentic lapis lazuli gemstones, handmade wool shawls, and dried cherries.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          type: 'Activity',
        },
      ],
    },
    {
      dayNumber: 3,
      title: 'Turquoise Attabad Lake & Hussaini Bridge Thrill',
      dateStr: 'Day 3',
      theme: 'Speedboating, Suspension Bridge & Passu Cones',
      activities: [
        {
          id: '3-1',
          timeSlot: '08:30 AM - 11:30 AM',
          period: 'morning',
          title: 'Attabad Lake Boating & Jet Skiing',
          location: 'Attabad Lake, Gojal',
          duration: '3.0 hrs',
          estCost: 'PKR 2,500 Boat Ride',
          description: 'Private motorboat cruise across the deep turquoise glacier-fed lake surrounded by sheer cliffs.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          type: 'Attraction',
        },
        {
          id: '3-2',
          timeSlot: '12:00 PM - 02:00 PM',
          period: 'afternoon',
          title: 'Cross the Iconic Hussaini Suspension Bridge',
          location: 'Hussaini Village',
          duration: '2.0 hrs',
          estCost: 'PKR 300 Entry',
          description: 'Walk across one of the most famous wooden rope bridges over the Hunza river.',
          image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80',
          type: 'Activity',
        },
        {
          id: '3-3',
          timeSlot: '02:30 PM - 04:30 PM',
          period: 'afternoon',
          title: 'Glacier Breeze Cafe Famous Apricot Cake',
          location: 'Passu Village',
          duration: '2.0 hrs',
          estCost: 'PKR 1,200/person',
          description: 'Hike 100 steps to the cliffside cafe overlooking the Passu Cathedral peaks.',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          type: 'Food',
        },
      ],
    },
    {
      dayNumber: 4,
      title: 'Khunjerab Pass - World’s Highest Border & ATM',
      dateStr: 'Day 4',
      theme: 'China Border Crossing Elevation (4,693m)',
      activities: [
        {
          id: '4-1',
          timeSlot: '07:00 AM - 12:30 PM',
          period: 'morning',
          title: 'High Altitude Jeep Drive to Khunjerab National Park',
          location: 'Pakistan-China Border, 4,693m',
          duration: '5.5 hrs roundtrip',
          estCost: 'PKR 1,000 Park Fee',
          description: 'Spot Himalayan Ibex & yaks along the Karakoram Highway up to the highest paved border gate.',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
          type: 'Travel',
        },
        {
          id: '4-2',
          timeSlot: '01:30 PM - 03:30 PM',
          period: 'afternoon',
          title: 'Organic Yak Burger Lunch in Sost',
          location: 'Sost Dry Port Town',
          duration: '2.0 hrs',
          estCost: 'PKR 1,600/person',
          description: 'Taste authentic organic yak burgers and local herbal mountain tea.',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
          type: 'Food',
        },
      ],
    },
    {
      dayNumber: 5,
      title: 'Passu Glacier Trek & Farewell Gilgit Departure',
      dateStr: 'Day 5',
      theme: 'Borith Lake Walk & Return Flight',
      activities: [
        {
          id: '5-1',
          timeSlot: '08:30 AM - 11:00 AM',
          period: 'morning',
          title: 'Morning Serenity Walk at Borith Lake',
          location: 'Upper Gojal',
          duration: '2.5 hrs',
          estCost: 'Free',
          description: 'Quiet morning walk around the saline lake observing migratory wild birds.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          type: 'Attraction',
        },
        {
          id: '5-2',
          timeSlot: '12:00 PM - 03:00 PM',
          period: 'afternoon',
          title: 'Return Jeep Drive to Gilgit Airport',
          location: 'Gilgit Airport (GIL)',
          duration: '3.0 hrs',
          estCost: 'Included in Transport',
          description: 'Scenic return journey along the Hunza River with souvenir stops.',
          image: 'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=600&q=80',
          type: 'Travel',
        },
      ],
    },
  ];

  const daysData = (customDaysData && customDaysData.length > 0) ? customDaysData : defaultDaysData;

  const currentDayPlan = daysData.find((d) => d.dayNumber === activeDay) || daysData[0];

  const periodIcon = (p: ActivityItem['period']) => {
    switch (p) {
      case 'morning':
        return <Sunrise className="w-4 h-4 text-amber-500" />;
      case 'afternoon':
        return <Sun className="w-4 h-4 text-sky-500" />;
      case 'evening':
        return <Sunset className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Day-by-Day AI Itinerary
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Optimized route timeline featuring morning, afternoon, and evening activities.
          </p>
        </div>

        {/* Day Tabs Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {daysData.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => setActiveDay(d.dayNumber)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border ${
                activeDay === d.dayNumber
                  ? 'bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20 scale-105'
                  : 'bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-500'
              }`}
            >
              Day {d.dayNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Active Day Banner */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">
            Day {currentDayPlan.dayNumber} Theme & Focus
          </span>
          <h3 className="text-lg font-black text-white">{currentDayPlan.title}</h3>
          <p className="text-xs text-slate-300 font-medium">{currentDayPlan.theme}</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-sky-300 border border-white/10 shrink-0 self-start sm:self-center">
          {currentDayPlan.activities.length} Scheduled Spots
        </div>
      </div>

      {/* Timeline Activities List */}
      <div className="space-y-4 relative before:absolute before:left-5 sm:before:left-7 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {currentDayPlan.activities.map((act, idx) => (
          <motion.div
            key={act.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="relative pl-12 sm:pl-16 group"
          >
            {/* Timeline Node Badge */}
            <div className="absolute left-1.5 sm:left-3 top-4 w-7 h-7 rounded-full bg-white dark:bg-[#0b1120] border-2 border-sky-500 flex items-center justify-center shadow-md z-10">
              {periodIcon(act.period)}
            </div>

            {/* Activity Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-5">
              {/* Thumbnail Image */}
              <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details Content */}
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-sky-50 text-sky-700 dark:bg-blue-950 dark:text-sky-300 border border-sky-200 dark:border-blue-800">
                    {act.type}
                  </span>

                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      {act.timeSlot}
                    </span>
                    <span>•</span>
                    <span>{act.duration}</span>
                  </div>
                </div>

                <h4 className="text-base font-black text-[#111827] dark:text-white">
                  {act.title}
                </h4>

                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed">
                  {act.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                    {act.location}
                  </span>

                  <span className="text-emerald-600 dark:text-emerald-400 font-black">
                    Est: {act.estCost}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
