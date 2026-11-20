import { GeneratedTripData, TripPlannerParams } from '../types/tripResult';

/**
 * Utility mapper to ensure raw Gemini response data is validated,
 * sanitized, and transformed with safe defaults before being passed to UI components.
 */
export function mapRawGeminiToTripData(raw: any, params?: TripPlannerParams): GeneratedTripData {
  const fallbackDestination = params?.destination || 'Hunza Valley';
  const fallbackDuration = params?.durationDays || 5;
  const fallbackBudget = params?.budgetAmount || 75000;

  const defaultImages = [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  ];

  const budgetAmount = typeof raw?.budgetAmount === 'number' && raw.budgetAmount > 0 ? raw.budgetAmount : fallbackBudget;

  // Fallback budget breakdown if empty
  const defaultBudgetBreakdown = [
    {
      category: 'Hotels & Lodging',
      amount: Math.round(budgetAmount * 0.38),
      percentage: 38,
      description: '3-4 Star hotel rooms & resort stays with breakfast',
    },
    {
      category: 'Transport & Jeep Safari',
      amount: Math.round(budgetAmount * 0.28),
      percentage: 28,
      description: 'Private vehicle + 4x4 Jeep rentals for local mountain transfers',
    },
    {
      category: 'Food & Dining',
      amount: Math.round(budgetAmount * 0.16),
      percentage: 16,
      description: 'Local authentic meals, trout dinners & tea stops',
    },
    {
      category: 'Attractions & Permits',
      amount: Math.round(budgetAmount * 0.08),
      percentage: 8,
      description: 'Heritage fort entries, boat rides & national park fees',
    },
    {
      category: 'Shopping & Souvenirs',
      amount: Math.round(budgetAmount * 0.05),
      percentage: 5,
      description: 'Dry fruits, handwoven rugs & local gemstones',
    },
    {
      category: 'Emergency Buffer',
      amount: Math.round(budgetAmount * 0.05),
      percentage: 5,
      description: 'Unforeseen road delays or emergency buffer fund',
    },
  ];

  const budgetBreakdown = Array.isArray(raw?.budgetBreakdown) && raw.budgetBreakdown.length > 0
    ? raw.budgetBreakdown
    : defaultBudgetBreakdown;

  const defaultDifficultyBadges = {
    difficulty: raw?.destination?.toLowerCase().includes('skardu') || raw?.destination?.toLowerCase().includes('hunza') ? 'Moderate Altitude' : 'Easy to Moderate',
    roadQuality: '85% Paved KKH / 15% Mountain Track',
    walkingLevel: 'Light Walking & Scenic Viewpoints',
    familyFriendly: 'Highly Family & Kids Suitable',
    soloFriendly: 'Safe & Welcoming Atmosphere',
    wheelchairAccessibility: 'Partial (Fort steps, lake docks accessible)',
  };

  const defaultWeatherOverview = {
    sunrise: '05:22 AM',
    sunset: '07:18 PM',
    bestVisitingHours: '07:30 AM - 11:30 AM & 04:00 PM - 06:45 PM',
    recommendation: 'Pack thermal base layers for chilly mountain evenings and high UV sunscreen.',
    warning: 'High elevation UV index. Cold winds expected above 3,000m.',
    isAiEstimated: true,
  };

  const defaultGallery = [
    {
      id: 'gal-1',
      title: 'Majestic Peaks & Valley Floor',
      category: 'Landscape' as const,
      location: raw?.destination || fallbackDestination,
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      caption: 'Breathtaking high-altitude mountain vistas catching the golden morning light.',
    },
    {
      id: 'gal-2',
      title: 'Historical Heritage Fort',
      category: 'Culture' as const,
      location: 'Karimabad Heritage Zone',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      caption: 'Centuries-old wooden architecture carved by ancient Karakoram artisans.',
    },
    {
      id: 'gal-3',
      title: 'Fresh Local Trout & Delicacies',
      category: 'Food' as const,
      location: 'Local Mountain Cafe',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      caption: 'Authentic local cuisine prepared with mountain organic herbs and fresh trout.',
    },
    {
      id: 'gal-4',
      title: 'Suspension Bridge Crossing',
      category: 'Adventure' as const,
      location: 'Passu Cones Viewpoint',
      imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      caption: 'Thrilling wooden plank bridge over rushing glacial river currents.',
    },
    {
      id: 'gal-5',
      title: 'Turquoise Alpine Lake Waters',
      category: 'Nature' as const,
      location: 'Attabad Lake Shoreline',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      caption: 'Crystalline turquoise glacier melt waters framed by steep granite cliffs.',
    },
  ];

  return {
    destination: raw?.destination || fallbackDestination,
    region: raw?.region || 'Gilgit-Baltistan, Pakistan',
    matchScore: typeof raw?.matchScore === 'number' ? raw.matchScore : 98,
    durationDays: typeof raw?.durationDays === 'number' ? raw.durationDays : fallbackDuration,
    budgetAmount: budgetAmount,
    bestSeason: raw?.bestSeason || 'July - October',
    weather: raw?.weather || '22°C Clear & Sunny',
    travelStyle: raw?.travelStyle || (params?.travelerType ? `${params.travelerType} Journey` : 'Friends & Family Trip'),
    heroImage: raw?.heroImage && raw.heroImage.startsWith('http') ? raw.heroImage : defaultImages[0],
    executiveSummary: raw?.executiveSummary || `This itinerary for ${raw?.destination || fallbackDestination} is optimized for high scenic value, cultural depth, and balanced daily driving times under 3.5 hours.`,
    feasibilityScore: typeof raw?.feasibilityScore === 'number' ? raw.feasibilityScore : 98.5,
    budgetBreakdown: budgetBreakdown,
    dayItinerary: Array.isArray(raw?.dayItinerary) ? raw.dayItinerary : [],
    hotels: Array.isArray(raw?.hotels) ? raw.hotels : [],
    restaurants: Array.isArray(raw?.restaurants) ? raw.restaurants : [],
    attractions: Array.isArray(raw?.attractions) ? raw.attractions : [],
    packingChecklist: Array.isArray(raw?.packingChecklist) ? raw.packingChecklist : [],
    weatherForecast: Array.isArray(raw?.weatherForecast) ? raw.weatherForecast : [],
    localTips: Array.isArray(raw?.localTips) ? raw.localTips : [],
    transportOptions: Array.isArray(raw?.transportOptions) && raw.transportOptions.length > 0 ? raw.transportOptions : undefined,
    weatherOverview: raw?.weatherOverview || defaultWeatherOverview,
    difficultyBadges: raw?.difficultyBadges || defaultDifficultyBadges,
    galleryImages: Array.isArray(raw?.galleryImages) && raw.galleryImages.length > 0 ? raw.galleryImages : defaultGallery,
  };
}

