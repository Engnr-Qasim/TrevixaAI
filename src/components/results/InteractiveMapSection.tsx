import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Map, MapPin, Navigation, Compass, Info, CheckCircle2, Clock, Route, Mountain } from 'lucide-react';

interface RouteWaypoint {
  id: string;
  name: string;
  elevation: string;
  distanceFromStart: string;
  roadCondition: string;
  scenicHighlights: string;
  estTravelTime: string;
  nearbyAttractions: string[];
}

export const InteractiveMapSection: React.FC = () => {
  const waypoints: RouteWaypoint[] = [
    {
      id: 'wp-1',
      name: 'Islamabad / Rawalpindi',
      elevation: '540m',
      distanceFromStart: '0 km',
      roadCondition: 'M-1 Motorway (Paved Asphalt)',
      scenicHighlights: 'Departure hub, vehicle fuel refill & emergency supplies',
      estTravelTime: '0.0 Hrs',
      nearbyAttractions: ['Faisal Mosque', 'Margalla Hills Trail 3', 'Daman-e-Koh Viewpoint'],
    },
    {
      id: 'wp-2',
      name: 'Naran & Babusar Pass',
      elevation: '4,173m',
      distanceFromStart: '280 km',
      roadCondition: 'Paved Mountain Pass (Open Jun-Nov)',
      scenicHighlights: 'Lulusar Lake reflections & high alpine meadow vistas',
      estTravelTime: '5.5 Hrs',
      nearbyAttractions: ['Lake Saiful Muluk', 'Lulusar Lake', 'Babusar Top Monument'],
    },
    {
      id: 'wp-3',
      name: 'Gilgit City & Airport',
      elevation: '1,500m',
      distanceFromStart: '450 km',
      roadCondition: 'Karakoram Highway (Paved)',
      scenicHighlights: '3 Great Mountain Ranges junction (Hindukush, Karakoram, Himalayas)',
      estTravelTime: '8.5 Hrs',
      nearbyAttractions: ['Kargah Buddha Rock', 'Gilgit Covered Bazaar', 'Danyore Suspension Bridge'],
    },
    {
      id: 'wp-4',
      name: 'Karimabad Hunza Valley',
      elevation: '2,438m',
      distanceFromStart: '540 km',
      roadCondition: 'Smooth Highway Asphalt',
      scenicHighlights: '800-year Baltit Fort, Eagle’s Nest Duikar, Rakaposhi viewpoint',
      estTravelTime: '10.5 Hrs',
      nearbyAttractions: ['Baltit Fort', 'Altit Fort & Garden', 'Duikar Eagle’s Nest', 'Karimabad Bazaar'],
    },
    {
      id: 'wp-5',
      name: 'Attabad Lake & Passu',
      elevation: '2,550m',
      distanceFromStart: '575 km',
      roadCondition: 'KKH Tunnels & Highway',
      scenicHighlights: 'Turquoise glacier lake, Hussaini Bridge, Cathedral Cones',
      estTravelTime: '11.5 Hrs',
      nearbyAttractions: ['Attabad Lake Boat Dock', 'Hussaini Suspension Bridge', 'Passu Cones', 'Borith Lake'],
    },
    {
      id: 'wp-6',
      name: 'Khunjerab Pass (China Border)',
      elevation: '4,693m',
      distanceFromStart: '670 km',
      roadCondition: 'High Altitude Mountain Pass',
      scenicHighlights: 'World’s highest paved border crossing & highest ATM',
      estTravelTime: '13.5 Hrs',
      nearbyAttractions: ['Pak-China Border Gate', 'Khunjerab National Park', 'Sost Dry Port'],
    },
  ];

  const [selectedWaypoint, setSelectedWaypoint] = useState<RouteWaypoint>(waypoints[3]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-sky-500" />
            <h2 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight">
              Interactive Route Map & Nearby Waypoints
            </h2>
          </div>
          <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] font-medium mt-0.5">
            Illustrative Karakoram route map. Check current driving conditions and routes with local sources.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-black border border-sky-200 dark:border-sky-800 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-sky-500" />
            <span>670 km Total Karakoram Route</span>
          </span>
        </div>
      </div>

      {/* Styled Route Map Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        {/* Visual Route Track */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block">
              Suggested Driving Route & Interactive Waypoints:
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Ready for Google Maps / Leaflet SDK Integration
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {waypoints.map((wp, idx) => {
              const isSelected = selectedWaypoint.id === wp.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => setSelectedWaypoint(wp)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-500/30 scale-102'
                      : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-sky-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold opacity-80 mb-1">
                    <span>Stop {idx + 1}</span>
                    <span>{wp.elevation}</span>
                  </div>
                  <h4 className="text-xs font-black truncate">{wp.name}</h4>
                  <span className="text-[10px] opacity-80 block">{wp.distanceFromStart} • {wp.estTravelTime}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Waypoint Inspector Box */}
        <motion.div
          key={selectedWaypoint.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/40 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">{selectedWaypoint.name}</h3>
                <span className="text-xs font-bold text-sky-400 flex items-center gap-2">
                  <span>Elevation: {selectedWaypoint.elevation}</span>
                  <span>•</span>
                  <span>Distance: {selectedWaypoint.distanceFromStart}</span>
                  <span>•</span>
                  <span>Drive Time: {selectedWaypoint.estTravelTime}</span>
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 self-start sm:self-center">
              {selectedWaypoint.roadCondition}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="space-y-1">
              <span className="font-extrabold text-sky-400 uppercase tracking-wider text-[10px] block">
                Scenic Highlights & Route Features
              </span>
              <p className="font-medium">{selectedWaypoint.scenicHighlights}</p>
            </div>

            <div className="space-y-1">
              <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Nearby Attractions & Points of Interest
              </span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {selectedWaypoint.nearbyAttractions.map((att) => (
                  <span
                    key={att}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-[11px] font-bold border border-slate-700"
                  >
                    📍 {att}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
