export type Theme = 'dark' | 'light' | 'system';

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  description?: string;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export interface RouteMeta {
  path: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
}

// Data model stubs for upcoming modules
export interface Destination {
  id: string;
  name: string;
  region: string;
  province: string;
  image: string;
  rating: number;
  tags: string[];
  description: string;
}

export interface TripPlan {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  budgetEstimatedPkr: number;
  status: 'draft' | 'saved' | 'completed';
  createdAt: string;
}
