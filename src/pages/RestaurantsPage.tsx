import React from 'react';
import { Utensils } from 'lucide-react';
import { PlaceholderModule } from '../components/PlaceholderModule';

export const RestaurantsPage: React.FC = () => {
  return (
    <PlaceholderModule
      badge="Module 06"
      title="Restaurants & Dining"
      subtitle="Explore regional culinary highlights, trout farms, traditional chapshuro stalls, Karahi spots, and highway dhabas."
      routePath="/restaurants"
      icon={<Utensils className="h-8 w-8 text-sky-500" />}
      primaryCtaText="Find Dining Spots"
      primaryCtaLink="/restaurants"
      secondaryCtaText="Explore Attractions"
      secondaryCtaLink="/attractions"
      features={[
        {
          title: 'Regional Specialties',
          description: 'Hunza Chapshuro, Skardu Yak Karahi, Peshawar Shinwari, Swat Trout, and Lahore Food Street.',
        },
        {
          title: 'Hygiene & Ratings',
          description: 'Community ratings, traveler feedback, seating ambience, and family dining options.',
        },
        {
          title: 'Dietary & Price Tags',
          description: 'Clear pricing tiers, Halal verification, vegetarian choices, and opening hours.',
        },
      ]}
    />
  );
};
