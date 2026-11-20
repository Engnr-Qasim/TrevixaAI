import React from 'react';
import { MapPin } from 'lucide-react';
import { PlaceholderModule } from '../components/PlaceholderModule';

export const AttractionsPage: React.FC = () => {
  return (
    <PlaceholderModule
      badge="Module 07"
      title="Attractions & Wonders"
      subtitle="Discover high-altitude lakes, ancient forts, suspension bridges, glaciers, and cultural heritage sites."
      routePath="/attractions"
      icon={<MapPin className="h-8 w-8 text-sky-500" />}
      primaryCtaText="Browse Wonders"
      primaryCtaLink="/attractions"
      secondaryCtaText="Plan Trip"
      secondaryCtaLink="/plan-trip"
      features={[
        {
          title: 'Historical & Fort Sites',
          description: 'Baltit Fort, Altit Fort, Rohtas Fort, Katas Raj, and Lahore Fort.',
        },
        {
          title: 'Lakes & Alpine Passes',
          description: 'Attabad Lake, Shangrila, Saif-ul-Malook, Deosai Plains, Babusar Top, and Khunjerab Pass.',
        },
        {
          title: 'Trekking & Adventure Spots',
          description: 'Fairy Meadows, Rakaposhi Base Camp, Nanga Parbat Viewpoint, and Katpana Cold Desert.',
        },
      ]}
    />
  );
};
