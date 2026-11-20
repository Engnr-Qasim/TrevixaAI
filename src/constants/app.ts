import { NavItem } from '../types';

export const APP_CONFIG = {
  name: 'Trevixa',
  tagline: 'Plan Smart. Travel Better.',
  brandOwner: 'A Nexora Product',
  parentCompany: 'Nexora',
  description:
    'AI-powered premium travel planning platform designed for seamless exploration across Pakistan.',
  contactEmail: 'support@nexora.app',
  supportedRegions: [
    'Gilgit-Baltistan',
    'Khyber Pakhtunkhwa',
    'Azad Jammu & Kashmir',
    'Punjab',
    'Sindh',
    'Balochistan',
    'Islamabad Capital Territory',
  ],
};

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: 'Explore Destinations',
    href: '/destinations',
    description: 'Discover breathtaking valleys, peaks, and historical gems',
  },
  {
    title: 'AI Trip Planner',
    href: '/plan-trip',
    badge: 'AI Powered',
    description: 'Custom day-by-day itineraries tailored to your style',
  },
  {
    title: 'Budget Estimator',
    href: '/budget-estimator',
    badge: 'Smart Cost',
    description: 'Predict travel costs for transport, stay, & food in PKR',
  },
  {
    title: 'Hotels & Stay',
    href: '/hotels',
    description: 'Handpicked luxury resorts, boutique stays, & guest houses',
  },
  {
    title: 'Restaurants',
    href: '/restaurants',
    description: 'Authentic local eateries, street food, and fine dining',
  },
  {
    title: 'Attractions',
    href: '/attractions',
    description: 'Historical sites, mountain trails, and natural wonders',
  },
];

export const USER_NAV_ITEMS: NavItem[] = [
  {
    title: 'Saved Trips',
    href: '/saved-trips',
    description: 'Bookmarked and saved itineraries',
  },
  {
    title: 'Travel History',
    href: '/history',
    description: 'Past travels and completed journeys',
  },
  {
    title: 'About Trevixa',
    href: '/about',
    description: 'Learn about Trevixa & Nexora vision',
  },
];

export const FOOTER_LINKS = {
  platform: [
    { title: 'Destinations', href: '/destinations' },
    { title: 'AI Trip Planner', href: '/plan-trip' },
    { title: 'Budget Estimator', href: '/budget-estimator' },
    { title: 'Saved Trips', href: '/saved-trips' },
  ],
  explore: [
    { title: 'Hotels & Stays', href: '/hotels' },
    { title: 'Restaurants & Food', href: '/restaurants' },
    { title: 'Attractions & Spots', href: '/attractions' },
    { title: 'Travel History', href: '/history' },
  ],
  company: [
    { title: 'About Trevixa', href: '/about' },
    { title: 'Nexora Ecosystem', href: 'https://nexora.app', external: true },
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
  ],
};
