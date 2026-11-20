import React from 'react';
import { Calculator } from 'lucide-react';
import { PlaceholderModule } from '../components/PlaceholderModule';

export const BudgetEstimatorPage: React.FC = () => {
  return (
    <PlaceholderModule
      badge="Module 04"
      title="Budget Estimator"
      subtitle="Accurate travel budget calculator for Pakistan trips in PKR covering transport, fuel, driver fees, hotel tiers, food, and permits."
      routePath="/budget-estimator"
      icon={<Calculator className="h-8 w-8 text-sky-500" />}
      primaryCtaText="Calculate Cost"
      primaryCtaLink="/budget-estimator"
      secondaryCtaText="Explore Stays"
      secondaryCtaLink="/hotels"
      features={[
        {
          title: 'Itemized Breakdown',
          description: 'Clear distribution between vehicle rental, fuel costs, hotel rooms, food, and entry fees.',
        },
        {
          title: 'Tier Comparison',
          description: 'Compare Budget vs Mid-Range vs Luxury total estimates side-by-side.',
        },
        {
          title: 'Emergency Buffer',
          description: 'Automatic contingency calculation for unforeseen road delays, extra fuel, or weather stops.',
        },
      ]}
    />
  );
};
