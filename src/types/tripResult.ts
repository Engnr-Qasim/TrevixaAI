export interface BudgetCategoryItem {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

export interface ActivityItem {
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

export interface DayPlan {
  dayNumber: number;
  title: string;
  dateStr: string;
  theme: string;
  activities: ActivityItem[];
}

export interface HotelOption {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  pricePerNight: number;
  totalEstCost: number;
  image: string;
  badge: string;
  amenities: string[];
  description: string;
}

export interface RestaurantOption {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  estCostPerPerson: number;
  bestDish: string;
  distance: string;
  image: string;
  badge: string;
}

export interface AttractionOption {
  id: string;
  name: string;
  category: string;
  openingHours: string;
  recommendedDuration: string;
  ticketFee: string;
  description: string;
  image: string;
  photoSpotTip: string;
}

export interface PackingChecklistItem {
  id: string;
  category: 'Clothing' | 'Footwear' | 'Medicines' | 'Electronics' | 'Documents' | 'Essentials';
  label: string;
}

export interface WeatherForecastDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  rainChance: string;
}

export interface LocalTipCategory {
  title: string;
  items: string[];
}

export interface TransportOption {
  id: string;
  title: string;
  recommended: boolean;
  price: string;
  suitability: string;
  travelTime: string;
  roadCondition: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  features: string[];
  tag: string;
}

export interface WeatherOverview {
  sunrise: string;
  sunset: string;
  bestVisitingHours: string;
  recommendation: string;
  warning?: string;
  isAiEstimated: boolean;
}

export interface TravelDifficultyBadgesData {
  difficulty: string;
  roadQuality: string;
  walkingLevel: string;
  familyFriendly: string;
  soloFriendly: string;
  wheelchairAccessibility: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Landscape' | 'Culture' | 'Food' | 'Adventure' | 'Nature';
  location: string;
  imageUrl: string;
  caption: string;
}

export interface GeneratedTripData {
  sources?: { title: string; url: string }[];
  destination: string;
  region: string;
  matchScore: number;
  durationDays: number;
  budgetAmount: number;
  bestSeason: string;
  weather: string;
  travelStyle: string;
  heroImage?: string;
  executiveSummary: string;
  feasibilityScore: number;
  budgetBreakdown: BudgetCategoryItem[];
  dayItinerary: DayPlan[];
  hotels: HotelOption[];
  restaurants: RestaurantOption[];
  attractions: AttractionOption[];
  packingChecklist: PackingChecklistItem[];
  weatherForecast: WeatherForecastDay[];
  localTips: LocalTipCategory[];
  transportOptions?: TransportOption[];
  weatherOverview?: WeatherOverview;
  difficultyBadges?: TravelDifficultyBadgesData;
  galleryImages?: GalleryItem[];
}

export interface TripPlannerParams {
  destination: string;
  budgetTier?: string;
  budgetAmount?: number;
  travelerType?: string;
  adults?: number;
  kids?: number;
  pets?: number;
  durationDays?: number;
  startDate?: string;
  endDate?: string;
  isFlexible?: boolean;
  interests?: string[];
  preferences?: Record<string, any>;
}
