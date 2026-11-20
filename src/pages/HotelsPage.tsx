import React from 'react';
import { Hotel } from 'lucide-react';
import { PlaceholderModule } from '../components/PlaceholderModule';

export const HotelsPage: React.FC = () => {
  return (
    <PlaceholderModule
      badge="Module 05"
      title="Hotels & Stays"
      subtitle="Discover boutique resorts, luxury hotels, authentic local wooden glamping, and cozy guest houses across Pakistan."
      routePath="/hotels"
      icon={<Hotel className="h-8 w-8 text-sky-500" />}
      primaryCtaText="Browse Stays"
      primaryCtaLink="/hotels"
      secondaryCtaText="View Restaurants"
      secondaryCtaLink="/restaurants"
      features={[
        {
          title: 'Curated Hotel Categories',
          description: 'Filter by luxury resorts, riverview wooden cottages, heritage glamping, and budget guest houses.',
        },
        {
          title: 'Amenity Badges',
          description: 'Verified indicators for hot water, heating, generators, Wi-Fi, mountain view, and parking.',
        },
        {
          title: 'Location Maps & Distance',
          description: 'Key distance markers to main bazaars, airports, and major tourist attractions.',
        },
      ]}
    />
  );
};
