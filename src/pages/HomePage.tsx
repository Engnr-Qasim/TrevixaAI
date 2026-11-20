import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Compass,
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Wallet,
  Star,
  ChevronDown,
  ChevronUp,
  Cpu,
  Bookmark,
  HelpCircle,
  Layers,
  Award,
  Zap,
  Hotel,
  Utensils,
  Plane,
  Clock,
  Tag,
  TrendingUp,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '../components/ui/section';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

// AI Hero Package Recommendations for the Hero Rotator Card & Full-Screen Background Slider
const HERO_RECOMMENDATIONS = [
  {
    id: 'hunza-package',
    name: 'Hunza Valley Expedition',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    badge: 'AI Top Recommendation',
    duration: '5 Days / 4 Nights',
    budget: 'PKR 45,000 / person',
    weather: '18°C Clear & Sunny',
    season: 'April to October',
    rating: 4.9,
    reviews: 1240,
    matchScore: '98% Match',
    attractions: ['Attabad Lake', 'Karimabad Fort', 'Passu Cones', 'Hussaini Bridge'],
    highlights: 'Panoramic Karakoram Highway drives, turquoise boat cruises, and ancient Karimabad fort walks.',
  },
  {
    id: 'skardu-package',
    name: 'Skardu & Deosai Explorer',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    badge: 'Alpine Adventure',
    duration: '7 Days / 6 Nights',
    budget: 'PKR 65,000 / person',
    weather: '20°C Mild Breeze',
    season: 'May to September',
    rating: 4.9,
    reviews: 980,
    matchScore: '97% Match',
    attractions: ['Shangrila Resort', 'Katpana Cold Desert', 'Deosai Plateau', 'Sheosar Lake'],
    highlights: 'Cold desert dune safaris, high-altitude brown bear sanctuaries, and luxury lake resort stays.',
  },
  {
    id: 'attabad-package',
    name: 'Attabad Lake Turquoise Cruise',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    badge: 'Luxury Resort & Lake',
    duration: '3 Days / 2 Nights',
    budget: 'PKR 35,000 / person',
    weather: '19°C Turquoise Waters',
    season: 'May to October',
    rating: 4.9,
    reviews: 890,
    matchScore: '98% Match',
    attractions: ['Jet Skiing', 'Luxury Boating', 'Borith Lake', 'Gulmit Village'],
    highlights: 'Vibrant turquoise waters framed by dramatic Karakoram rock walls and speed boat cruises.',
  },
  {
    id: 'fairy-meadows-package',
    name: 'Fairy Meadows Summit Trail',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    badge: 'Ultimate Mountain Trek',
    duration: '4 Days / 3 Nights',
    budget: 'PKR 38,000 / person',
    weather: '14°C Crisp Alpine',
    season: 'June to September',
    rating: 5.0,
    reviews: 850,
    matchScore: '99% Match',
    attractions: ['Nanga Parbat Base', 'Beyal Camp', 'Raikhot Bridge', 'Pine Forest Trails'],
    highlights: 'Direct views of the 8,126m Killer Mountain, starlit alpine camping, and pine ridge walks.',
  },
  {
    id: 'passu-cones-package',
    name: 'Passu Cones & Cathedral Spires',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600&q=80',
    badge: 'Jagged Mountain Spires',
    duration: '3 Days / 2 Nights',
    budget: 'PKR 32,000 / person',
    weather: '17°C Mountain Air',
    season: 'May to October',
    rating: 4.9,
    reviews: 760,
    matchScore: '96% Match',
    attractions: ['Passu Glacier', 'Hussaini Suspension Bridge', 'Ghulkin Village', 'Batur Glacier'],
    highlights: 'Razor-sharp mountain peaks looming above Karakoram Highway and adrenaline bridge treks.',
  },
  {
    id: 'deosai-package',
    name: 'Deosai National Park Plateau',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    badge: 'Land of Giants',
    duration: '3 Days / 2 Nights',
    budget: 'PKR 40,000 / person',
    weather: '12°C Alpine Breeze',
    season: 'July to September',
    rating: 5.0,
    reviews: 920,
    matchScore: '97% Match',
    attractions: ['Sheosar Lake', 'Bara Pani', 'Kala Pani', 'Wild Bear Reserve'],
    highlights: 'Second-highest plateau on Earth with carpeted wildflowers and pristine glacial Sheosar waters.',
  },
  {
    id: 'naran-kaghan-package',
    name: 'Naran Kaghan & Saif-ul-Malook',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
    badge: 'Fairytale Alpine Lake',
    duration: '4 Days / 3 Nights',
    budget: 'PKR 30,000 / person',
    weather: '21°C Pleasant Alpine',
    season: 'May to October',
    rating: 4.8,
    reviews: 1450,
    matchScore: '95% Match',
    attractions: ['Saif-ul-Malook Lake', 'Babusar Pass', 'Lulusar Lake', 'Kunhar River Rafting'],
    highlights: 'Mystical crystal lake reflections, snow-covered Babusar Top pass, and fresh river trout dining.',
  },
  {
    id: 'neelum-valley-package',
    name: 'Neelum Valley Kashmir Haven',
    region: 'Azad Kashmir',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    badge: 'Lush Forested Paradise',
    duration: '5 Days / 4 Nights',
    budget: 'PKR 32,000 / person',
    weather: '20°C Forest Breeze',
    season: 'April to October',
    rating: 4.9,
    reviews: 1120,
    matchScore: '96% Match',
    attractions: ['Arang Kel', 'Kutton Waterfall', 'Sharda Peeth Ruins', 'Keran Riverbank'],
    highlights: 'Clifftop cable car rides into Arang Kel, cascading waterfalls, and serene riverfront cottages.',
  },
  {
    id: 'swat-package',
    name: 'Swat Emerald Valley & Ski Resort',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80',
    badge: 'Switzerland of the East',
    duration: '4 Days / 3 Nights',
    budget: 'PKR 28,000 / person',
    weather: '22°C Pleasant',
    season: 'May to November',
    rating: 4.8,
    reviews: 1300,
    matchScore: '95% Match',
    attractions: ['Malam Jabba Ski Slopes', 'White Palace Swat', 'Fizagat Park', 'Mingora Bazaar'],
    highlights: 'Alpine chairlift rides over pine slopes, historic royal palaces, and emerald valley vistas.',
  },
  {
    id: 'kalam-package',
    name: 'Kalam River & Pine Forest Haven',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
    badge: 'Glacial Rivers & Pines',
    duration: '3 Days / 2 Nights',
    budget: 'PKR 29,000 / person',
    weather: '18°C Cool Pine Air',
    season: 'June to October',
    rating: 4.8,
    reviews: 840,
    matchScore: '96% Match',
    attractions: ['Mahodand Lake', 'Ushu Forest Trails', 'Matiltan Waterfall', 'Gabral Valley'],
    highlights: 'Jeep safaris through tall Ushu pine tree tunnels and pristine blue glacial Mahodand waters.',
  },
];

// 20 Rich & Verified Pakistan Destination Cards
const DESTINATIONS = [
  {
    id: 'hunza',
    name: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 35,000 - 75,000',
    season: 'Apr to Oct',
    duration: '5 - 7 Days',
    rating: 4.9,
    category: 'Nature & Mountains',
    description: 'Majestic Karakoram peaks, ancient Karimabad forts, and serene turquoise Attabad Lake.',
  },
  {
    id: 'skardu',
    name: 'Skardu Valley',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 45,000 - 90,000',
    season: 'May to Sep',
    duration: '6 - 8 Days',
    rating: 4.9,
    category: 'Alpine Deserts',
    description: 'Cold desert dunes, Shangrila resort waters, and gateways to K2 mountain base.',
  },
  {
    id: 'fairy-meadows',
    name: 'Fairy Meadows',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 30,000 - 60,000',
    season: 'Jun to Sep',
    duration: '4 - 5 Days',
    rating: 5.0,
    category: 'Trekking & Adventure',
    description: 'Lush alpine meadows directly confronting the breathtaking 8,126m Nanga Parbat peak.',
  },
  {
    id: 'naran-kaghan',
    name: 'Naran & Kaghan',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 25,000 - 50,000',
    season: 'May to Oct',
    duration: '3 - 5 Days',
    rating: 4.8,
    category: 'Lakes & Rivers',
    description: 'Crystal waters of Lake Saif-ul-Malook, Babusar Pass views, and trout fishing in Kunhar River.',
  },
  {
    id: 'swat-valley',
    name: 'Swat Valley',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 25,000 - 55,000',
    season: 'May to Nov',
    duration: '4 - 6 Days',
    rating: 4.8,
    category: 'Valleys & Forests',
    description: 'Known as the Switzerland of Pakistan, offering emerald pine forests and Malam Jabba ski slopes.',
  },
  {
    id: 'kalam',
    name: 'Kalam Valley',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 28,000 - 55,000',
    season: 'Jun to Oct',
    duration: '3 - 5 Days',
    rating: 4.8,
    category: 'Rivers & Glaciers',
    description: 'Charming riverbanks in Ushu Forest, Mahodand Lake jeep safaris, and glacial waterfalls.',
  },
  {
    id: 'murree-patriata',
    name: 'Murree & Patriata',
    region: 'Punjab',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 18,000 - 38,000',
    season: 'All Year',
    duration: '2 - 3 Days',
    rating: 4.6,
    category: 'Hill Station',
    description: 'Popular pine hill station featuring Mall Road, chairlifts at Patriata, and cool mountain breezes.',
  },
  {
    id: 'neelum-valley',
    name: 'Neelum Valley',
    region: 'Azad Kashmir',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 25,000 - 55,000',
    season: 'Apr to Oct',
    duration: '4 - 6 Days',
    rating: 4.9,
    category: 'Cascading Waterfalls',
    description: 'A 200km arc of lush forested mountains, pristine rivers, and wooden Kashmiri hamlets.',
  },
  {
    id: 'arang-kel',
    name: 'Arang Kel',
    region: 'Azad Kashmir',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 22,000 - 48,000',
    season: 'May to Oct',
    duration: '3 - 4 Days',
    rating: 4.9,
    category: 'Clifftop Village',
    description: 'The Pearl of Neelum Valley, perched on a 2,000m cliff accessible via cable car and scenic trail trek.',
  },
  {
    id: 'shogran-siri-paye',
    name: 'Shogran & Siri Paye',
    region: 'Khyber Pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 22,000 - 45,000',
    season: 'May to Oct',
    duration: '2 - 3 Days',
    rating: 4.7,
    category: 'High Plateaus',
    description: 'Green mountain plateau with grazing horses, cloud-kissed Siri Paye lake meadows, and jeep rides.',
  },
  {
    id: 'gilgit',
    name: 'Gilgit Valley',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 35,000 - 70,000',
    season: 'Apr to Nov',
    duration: '3 - 5 Days',
    rating: 4.7,
    category: 'Hub & Rivers',
    description: 'Historical Silk Route junction, confluence of Gilgit and Hunza rivers, and Kargah Buddha carvings.',
  },
  {
    id: 'khunjerab-pass',
    name: 'Khunjerab Pass',
    region: 'Pak-China Border',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 40,000 - 80,000',
    season: 'May to Oct',
    duration: '1 - 2 Days',
    rating: 4.9,
    category: 'High Altitude Pass',
    description: 'The world highest paved international border crossing at 4,693 meters amidst snow-capped peaks.',
  },
  {
    id: 'deosai-park',
    name: 'Deosai National Park',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 40,000 - 75,000',
    season: 'Jul to Sep',
    duration: '2 - 3 Days',
    rating: 5.0,
    category: 'Land of Giants',
    description: 'Second-highest plateau on Earth, home to Himalayan Brown Bears, wild flowers, and Sheosar Lake.',
  },
  {
    id: 'attabad-lake',
    name: 'Attabad Lake',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 30,000 - 65,000',
    season: 'May to Oct',
    duration: '2 - 3 Days',
    rating: 4.9,
    category: 'Turquoise Waters',
    description: 'Vibrant turquoise mountain lake offering jet skiing, luxury resort stays, and boat cruises.',
  },
  {
    id: 'passu-cones',
    name: 'Passu Cones & Cathedral',
    region: 'Gilgit-Baltistan',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 32,000 - 70,000',
    season: 'May to Oct',
    duration: '2 - 3 Days',
    rating: 4.9,
    category: 'Jagged Spires',
    description: 'Iconic razor-sharp mountain spires, Passu Glacier treks, and suspension bridge crossings.',
  },
  {
    id: 'lahore',
    name: 'Lahore Cultural Heart',
    region: 'Punjab',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 15,000 - 35,000',
    season: 'Oct to Mar',
    duration: '3 - 4 Days',
    rating: 4.9,
    category: 'Heritage & Food',
    description: 'Mughal architectural masterpieces, vibrant Haveli dining, and rich centuries-old bazaars.',
  },
  {
    id: 'islamabad',
    name: 'Islamabad Capital',
    region: 'Capital Territory',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 18,000 - 40,000',
    season: 'Oct to Apr',
    duration: '2 - 3 Days',
    rating: 4.8,
    category: 'Modern & Green',
    description: 'Serene Margalla Hills hiking trails, iconic Faisal Mosque architecture, and gourmet dining.',
  },
  {
    id: 'karachi',
    name: 'Karachi Coastal Metropolis',
    region: 'Sindh',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 20,000 - 45,000',
    season: 'Nov to Feb',
    duration: '3 - 4 Days',
    rating: 4.6,
    category: 'Arabian Sea & Eats',
    description: 'Clifton Beach sunsets, Do Darya waterfront dining, and bustling urban coastal energy.',
  },
  {
    id: 'mohenjo-daro',
    name: 'Mohenjo-daro Ruins',
    region: 'Sindh',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 20,000 - 40,000',
    season: 'Nov to Feb',
    duration: '2 Days',
    rating: 4.7,
    category: 'Ancient Civilization',
    description: 'UNESCO World Heritage Indus Valley civilization site dating back to 2500 BCE.',
  },
  {
    id: 'hingol-national-park',
    name: 'Hingol & Kund Malir',
    region: 'Balochistan',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    budget: 'PKR 22,000 - 45,000',
    season: 'Nov to Mar',
    duration: '2 - 3 Days',
    rating: 4.8,
    category: 'Coastal Desert Canyons',
    description: 'Dramatic rock formations like Princess of Hope, active mud volcanoes, and golden coastal beaches.',
  },
];

// Feature Cards Data
const FEATURES = [
  {
    icon: Cpu,
    title: 'AI Trip Planner',
    description:
      'Generate precision day-by-day itineraries tailored to your group pacing, seasonal roads, and mountain weather windows.',
  },
  {
    icon: Wallet,
    title: 'Budget Estimator',
    description:
      'Accurate PKR forecasts for fuel, 4x4 jeep hires, hotel stays, food, and emergency reserves with zero hidden fees.',
  },
  {
    icon: Hotel,
    title: 'Hotel Recommendations',
    description:
      'Discover handpicked boutique resorts, alpine cottages, and budget eco-lodges verified by real travel telemetry.',
  },
  {
    icon: Utensils,
    title: 'Restaurant Discovery',
    description:
      'Explore authentic regional dining spots including Hunza trout cafes and historic Lahore Haveli rooftops.',
  },
  {
    icon: Calendar,
    title: 'Personalized Itinerary',
    description:
      'Customize route stops, adjust daily travel hours, and organize daily activities according to your preference.',
  },
  {
    icon: Bookmark,
    title: 'Save & Export Trips',
    description:
      'Save itineraries to your account, download offline-accessible travel summaries, and share trip links effortlessly.',
  },
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Travel Blogger & Digital Nomad',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    quote:
      'Trevixa made my 10-day Skardu and Hunza expedition completely stress-free. The budget estimator was within 4% of my actual on-ground expenses!',
    rating: 5,
  },
  {
    name: 'Hamza Chaudhry',
    role: 'Group Expedition Lead',
    location: 'Lahore, Pakistan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote:
      'Organizing a trip for 8 friends used to take weeks of spreadsheets. Trevixa generated an optimized day-by-day plan with 4x4 jeep hires in 3 seconds.',
    rating: 5,
  },
  {
    name: 'Ayesha Rahman',
    role: 'Landscape Photographer',
    location: 'Karachi, Pakistan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote:
      'The seasonal recommendations for Fairy Meadows and Babusar Top were spot-on. Hands down the most refined AI travel tool built for Pakistan.',
    rating: 5,
  },
];

// FAQ Data
const FAQS = [
  {
    question: "How does Trevixa's AI create personalized travel itineraries?",
    answer:
      "Trevixa synthesizes real-time seasonal road accessibility, hotel pricing tiers, regional travel times, and local weather patterns in Pakistan. It crafts custom day-by-day itineraries tailored specifically to your chosen group size, trip duration, and budget preference.",
  },
  {
    question: 'Is Trevixa free to use for planning trips in Pakistan?',
    answer:
      'Yes, Trevixa is 100% free to start. You can create unlimited AI trip plans, estimate PKR budgets, and discover handpicked stays without any hidden fees.',
  },
  {
    question: 'How accurate are the budget estimations for transport, hotels, and food?',
    answer:
      'Our pricing database is regularly updated with actual local market rates across Pakistan, including fuel costs, 4x4 jeep rentals in mountain passes, hotel price tiers (Standard, Comfort, Luxury), and local meal averages in PKR.',
  },
  {
    question: 'Can I save, customize, or export my generated itineraries?',
    answer:
      'Absolutely. Once an AI plan is generated, you can save it to your account, bookmark favorite spots, and access your itinerary offline during remote mountain travels.',
  },
  {
    question: 'Which regions and destinations in Pakistan are supported?',
    answer:
      'Trevixa currently covers Gilgit-Baltistan, Khyber Pakhtunkhwa, Azad Jammu & Kashmir, Punjab, Sindh, Balochistan, and Islamabad Capital Territory.',
  },
];

export const HomePage: React.FC = () => {
  // Search Form State
  const [destination, setDestination] = useState('Skardu & Hunza Valley');
  const [duration, setDuration] = useState('5 Days');
  const [travelers, setTravelers] = useState('2 Adults');
  const [budgetTier, setBudgetTier] = useState('Comfort');
  const [isGenerating, setIsGenerating] = useState(false);

  // Hero Card Rotator Index State
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  // FAQ Accordion Toggle State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Auto-rotate Hero Card recommendations every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % HERO_RECOMMENDATIONS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = HERO_RECOMMENDATIONS[activeHeroIdx];

  const handleGenerateClick = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      window.location.href = `/plan-trip?destination=${encodeURIComponent(destination)}&duration=${encodeURIComponent(
        duration
      )}&travelers=${encodeURIComponent(travelers)}&budget=${encodeURIComponent(budgetTier)}`;
    }, 700);
  };

  return (
    <div className="w-full space-y-20 pb-20">
      {/* 1. HERO SECTION WITH CLEAN MINIMAL BLUEPRINT GRID TEXTURE */}
      <section id="hero" className="relative pt-10 md:pt-14 pb-12 overflow-hidden text-center rounded-[2.5rem] my-2 sm:my-4 mx-2 sm:mx-6 border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#050b14] bg-radial-grid shadow-xl">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10 text-slate-900 dark:text-white">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-sky-50 dark:bg-[#0b1120] text-sky-700 dark:text-sky-300 rounded-full border border-sky-200/80 dark:border-blue-900/80 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500 dark:bg-blue-500"></span>
            </span>
            <span>A Nexora Product • AI Travel Engine v1.0</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] dark:text-white mb-6 leading-[1.15]"
          >
            Plan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400 font-serif italic">
              Smarter
            </span>{' '}
            Trips with AI
          </motion.h1>

          {/* Hero Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-[#374151] dark:text-[#cbd5e1] max-w-3xl mx-auto leading-relaxed mb-8 font-normal"
          >
            Discover Pakistan with AI-powered trip planning, smart budget estimation, curated hotels, local restaurants, and personalized travel itineraries in one beautiful platform.
          </motion.p>

          {/* Trust Badges Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 mb-8 text-xs sm:text-sm font-semibold text-[#4b5563] dark:text-[#cbd5e1]"
          >
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              <Cpu className="w-4 h-4 text-sky-500 dark:text-blue-400" />
              <span>AI Powered Engine</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Free to Start</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>Made for Pakistan</span>
            </div>
          </motion.div>

          {/* Airbnb-style Quick Mobile Category Filter Chips (lg:hidden) */}
          <div className="w-full lg:hidden mb-8 overflow-x-auto no-scrollbar flex items-center gap-2 px-1 py-1 snap-x">
            {[
              { label: '🌸 Hunza Valley', val: 'Skardu & Hunza Valley' },
              { label: '⛺ Fairy Meadows', val: 'Fairy Meadows' },
              { label: '🎿 Swat & Kalam', val: 'Swat & Kalam' },
              { label: '🌊 Neelum Kashmir', val: 'Neelum Valley' },
              { label: '🏰 Lahore Culture', val: 'Lahore & Culture' },
              { label: '🏜️ Hingol Coast', val: 'Hingol & Kund Malir' },
            ].map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setDestination(cat.val);
                  const searchEl = document.getElementById('search-card');
                  if (searchEl) searchEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`snap-start shrink-0 px-4 py-2.5 rounded-full text-xs font-extrabold border transition-all active:scale-95 whitespace-nowrap ${
                  destination === cat.val
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-transparent shadow-md shadow-sky-500/25'
                    : 'bg-white/80 dark:bg-[#0b1120]/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
          >
            <Link to="/plan-trip" className="w-full sm:w-auto">
              <Button variant="neon" size="lg" className="w-full sm:w-auto px-8 py-4 text-base font-bold gap-2.5 h-auto rounded-2xl shadow-lg shadow-sky-500/25">
                <Sparkles className="w-5 h-5" />
                <span>Start Planning</span>
              </Button>
            </Link>
            <a href="#destinations" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-base font-bold gap-2.5 h-auto rounded-2xl">
                <Compass className="w-5 h-5 text-sky-500 dark:text-blue-400" />
                <span>Explore Destinations</span>
              </Button>
            </a>
          </motion.div>

          {/* AI TRAVEL PREVIEW CARD WITH IMMERSIVE DESTINATION PHOTOGRAPHY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative w-full max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0b1120] shadow-2xl transition-all duration-500 flex flex-col text-left group"
          >
            {/* TOP 45-50% OF CARD: BEAUTIFUL DESTINATION PHOTOGRAPHY HEADER */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentHero.image}
                    alt={currentHero.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80';
                    }}
                  />
                  {/* Subtle Dark Vignette & Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/50" />
                </motion.div>
              </AnimatePresence>

              {/* Badges Overlaid on Top of Image */}
              <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-xs font-extrabold shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{currentHero.name} • {currentHero.region}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-sky-500/85 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-sky-200 animate-pulse" />
                    <span>{currentHero.badge}</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/85 backdrop-blur-md text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span>{currentHero.matchScore}</span>
                  </span>
                </div>
              </div>

              {/* Title & Rating Floating Over Image Bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                      {currentHero.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-medium mt-1 drop-shadow">
                      {currentHero.highlights}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-extrabold flex items-center gap-1.5 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{currentHero.rating} ({currentHero.reviews.toLocaleString()} reviews)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* BOTTOM 50-55% OF CARD: TRIP DETAILS & ROTATOR CONTROLS */}
            <div className="p-5 sm:p-7 space-y-5">
              {/* Key Package Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 text-left">
                  <span className="block text-[10px] uppercase font-extrabold tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
                    🕒 Trip Duration
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#111827] dark:text-white">{currentHero.duration}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 text-left">
                  <span className="block text-[10px] uppercase font-extrabold tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
                    💰 Est. Budget
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{currentHero.budget}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 text-left">
                  <span className="block text-[10px] uppercase font-extrabold tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
                    🌤️ Weather
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#111827] dark:text-white">{currentHero.weather}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200/80 dark:border-slate-800 text-left">
                  <span className="block text-[10px] uppercase font-extrabold tracking-wider text-sky-600 dark:text-sky-400 mb-0.5">
                    🗓️ Best Season
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#111827] dark:text-white">{currentHero.season}</span>
                </div>
              </div>

              {/* Top Attractions Strip */}
              <div className="p-3 rounded-2xl bg-slate-50/80 dark:bg-[#050b14]/80 border border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-sky-500" />
                    <span>Top Attractions:</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {currentHero.attractions.map((spot) => (
                      <span
                        key={spot}
                        className="px-2.5 py-0.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Rotator Navigation & Action CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Rotator Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                    <span>0{activeHeroIdx + 1}</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-400">0{HERO_RECOMMENDATIONS.length}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {HERO_RECOMMENDATIONS.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveHeroIdx(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === activeHeroIdx ? 'w-8 bg-sky-500 dark:bg-blue-500 shadow-sm shadow-sky-500/50' : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Instant Plan Button */}
                <Link to={`/plan-trip?destination=${encodeURIComponent(currentHero.name)}`} className="w-full sm:w-auto">
                  <Button variant="neon" size="sm" className="w-full sm:w-auto px-6 py-2.5 text-xs font-extrabold rounded-xl gap-2 shadow-lg shadow-sky-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate {currentHero.name} Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. AIRBNB-STYLE SMART SEARCH CARD SECTION */}
      <section id="search-card" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-5 sm:p-8 rounded-[2.5rem] bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-sky-500/10"
        >
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-blue-950/80 text-sky-600 dark:text-blue-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#111827] dark:text-white">Smart Travel Generator</h3>
                <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1]">Search and generate AI itineraries</p>
              </div>
            </div>
            <Badge variant="neon" className="hidden sm:inline-flex text-xs px-3 py-1">
              Instant AI Calculation
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Input 1: Destination */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-blue-500 transition-colors">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#6b7280] dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>Destination</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#111827] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="Skardu & Hunza Valley">Hunza & Skardu Valley</option>
                <option value="Fairy Meadows">Fairy Meadows</option>
                <option value="Swat & Kalam">Swat & Kalam Valley</option>
                <option value="Naran & Kaghan">Naran & Kaghan</option>
                <option value="Neelum Valley">Neelum Valley (Kashmir)</option>
                <option value="Lahore & Culture">Lahore & Culture</option>
                <option value="Islamabad & Margalla">Islamabad Capital</option>
                <option value="Hingol & Kund Malir">Hingol & Kund Malir</option>
              </select>
            </div>

            {/* Input 2: Travel Dates / Duration */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-blue-500 transition-colors">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#6b7280] dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-500" />
                <span>Travel Dates</span>
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#111827] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="3 Days">3 Days Weekend</option>
                <option value="5 Days">5 Days Classic</option>
                <option value="7 Days">7 Days Grand Tour</option>
                <option value="10 Days">10 Days Deep Expedition</option>
              </select>
            </div>

            {/* Input 3: Travelers */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-blue-500 transition-colors">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#6b7280] dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-500" />
                <span>Travelers</span>
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#111827] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="Solo Explorer">Solo Explorer</option>
                <option value="2 Adults">2 Adults (Couple)</option>
                <option value="Family (4 Person)">Family (4 Person)</option>
                <option value="Group (6+ Person)">Group (6+ Person)</option>
              </select>
            </div>

            {/* Input 4: Budget */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#050b14] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-blue-500 transition-colors">
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#6b7280] dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-sky-500" />
                <span>Budget</span>
              </label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#111827] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="Standard">Standard (Eco & Bus)</option>
                <option value="Comfort">Comfort (3-Star & 4x4 Jeep)</option>
                <option value="Luxury">Luxury (Resorts & Chauffeur)</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs text-[#4b5563] dark:text-[#cbd5e1] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Includes fuel rates, 4x4 jeep estimates, and hotel tiers in PKR</span>
            </div>
            <Button
              variant="neon"
              size="lg"
              onClick={handleGenerateClick}
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold rounded-2xl gap-2"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Plan...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Plan Trip</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 3. IMPROVED FEATURES SECTION */}
      <Section id="features" className="pt-8">
        <SectionHeader className="text-center mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 text-sky-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
            <Zap className="h-4 w-4" />
            <span>Smart Features</span>
          </div>
          <SectionTitle>Everything You Need for Perfect Travel</SectionTitle>
          <SectionDescription className="mx-auto">
            Powered by intelligent telemetry, real hotel pricing, and local Pakistani road data.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="h-full border-slate-200/80 dark:border-slate-800 hover:border-sky-500/60 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 group p-2">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-blue-950/80 text-sky-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-sky-100 dark:border-blue-800/60">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-[#4b5563] dark:text-[#cbd5e1] mt-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 4. EXPANDED POPULAR DESTINATIONS SECTION (20 DESTINATIONS, RICH CARDS) */}
      <Section id="destinations" className="pt-4">
        <SectionHeader className="text-center mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 text-sky-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
            <Compass className="h-4 w-4" />
            <span>20 Top Destinations</span>
          </div>
          <SectionTitle>Explore Breathtaking Pakistani Regions</SectionTitle>
          <SectionDescription className="mx-auto">
            Discover verified starting budgets, optimal seasons, ratings, and ideal trip durations for Pakistan top 20 destinations.
          </SectionDescription>
        </SectionHeader>

        {/* Mobile Swipe Hint Badge */}
        <div className="flex items-center justify-between lg:hidden mb-4 px-2 text-xs font-extrabold text-sky-600 dark:text-blue-400">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>20 Top Destinations</span>
          </span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <span>Swipe cards</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Responsive Layout: Swipeable Horizontal Carousel on Mobile/Tablet, Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (idx % 4) * 0.05 }}
              className="w-[84vw] max-w-[320px] shrink-0 snap-center lg:w-auto lg:shrink-1"
            >
              <Card className="h-full overflow-hidden border-slate-200/80 dark:border-slate-800 hover:border-sky-500/60 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 group flex flex-col justify-between rounded-[2rem]">
                <div>
                  {/* Hero Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800 rounded-t-[2rem]">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                    
                    {/* Region Tag */}
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white border border-white/20">
                      📍 {dest.region}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-extrabold text-amber-500 flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>{dest.rating}</span>
                    </div>

                    {/* Category Label at bottom of image */}
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-extrabold uppercase tracking-widest text-sky-300 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>{dest.category}</span>
                    </div>
                  </div>

                  {/* Rich Card Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-base font-extrabold text-[#111827] dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-[#4b5563] dark:text-[#cbd5e1] line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Detailed Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">🗓️ Best Season</span>
                        <span className="font-extrabold text-[#111827] dark:text-white">{dest.season}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">🕒 Ideal Duration</span>
                        <span className="font-extrabold text-[#111827] dark:text-white">{dest.duration}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/40">
                        <span className="text-[10px] uppercase font-bold text-slate-400">💰 Est. Budget</span>
                        <Badge variant="sky" className="text-[10px] font-bold px-2 py-0.5">
                          {dest.budget}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explore Button */}
                <div className="p-4 pt-0">
                  <Link to={`/plan-trip?destination=${encodeURIComponent(dest.name)}`}>
                    <Button variant="outline" size="sm" className="w-full py-3 text-xs font-extrabold justify-center gap-1.5 hover:bg-sky-50 dark:hover:bg-blue-950/50 rounded-xl active:scale-95 transition-transform">
                      <span>Explore Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 5. HOW IT WORKS SECTION */}
      <Section id="how-it-works" className="pt-4">
        <SectionHeader className="text-center mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 text-sky-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
            <Layers className="h-4 w-4" />
            <span>Seamless Workflow</span>
          </div>
          <SectionTitle>How Trevixa Works in 3 Simple Steps</SectionTitle>
          <SectionDescription className="mx-auto">
            Plan your next journey across Pakistan with complete confidence in three effortless steps.
          </SectionDescription>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
          {[
            {
              step: '01',
              title: 'Choose Destination & Preferences',
              description:
                'Select your target valleys or cities, duration, group size, and preferred budget tier (Standard, Comfort, or Luxury).',
            },
            {
              step: '02',
              title: 'Generate AI Itinerary',
              description:
                'Trevixa analyzes road conditions, hotel availability, 4x4 jeep requirements, and local dining spots to build a custom plan.',
            },
            {
              step: '03',
              title: 'Travel Confidently',
              description:
                'Access your itinerary offline, bookmark stops, and keep track of actual expenses with our localized PKR budget tracker.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="relative p-6 rounded-3xl bg-white/80 dark:bg-[#0b1120]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-lg text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-sky-500/20">
                {item.step}
              </div>
              <h3 className="text-lg font-extrabold text-[#111827] dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 6. ANIMATED STATISTICS SECTION */}
      <section id="stats" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-tr from-sky-600 via-blue-600 to-sky-700 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl sm:text-5xl font-black tracking-tight">15,400+</div>
              <div className="text-xs uppercase tracking-widest font-extrabold text-sky-200 mt-2">Trips Planned</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl sm:text-5xl font-black tracking-tight">120+</div>
              <div className="text-xs uppercase tracking-widest font-extrabold text-sky-200 mt-2">Destinations</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl sm:text-5xl font-black tracking-tight">99.2%</div>
              <div className="text-xs uppercase tracking-widest font-extrabold text-sky-200 mt-2">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl sm:text-5xl font-black tracking-tight">48,500+</div>
              <div className="text-xs uppercase tracking-widest font-extrabold text-sky-200 mt-2">AI Plans Generated</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <Section id="testimonials" className="pt-4">
        <SectionHeader className="text-center mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 text-sky-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
            <Award className="h-4 w-4" />
            <span>Community Feedback</span>
          </div>
          <SectionTitle>Loved by Modern Explorers</SectionTitle>
          <SectionDescription className="mx-auto">
            See what digital nomads, group leads, and solo travelers say about planning with Trevixa.
          </SectionDescription>
        </SectionHeader>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 mt-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:shrink-1"
            >
              <Card className="h-full border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 rounded-[2rem]">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-[#374151] dark:text-[#f3f4f6] italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-sky-500"
                  />
                  <div>
                    <div className="text-sm font-extrabold text-[#111827] dark:text-white">{item.name}</div>
                    <div className="text-xs text-[#6b7280] dark:text-slate-400">
                      {item.role} • {item.location}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 8. PRICING BANNER */}
      <section id="pricing" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 sm:p-10 rounded-[2.5rem] bg-white/90 dark:bg-[#0b1120]/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <Badge variant="sky" className="text-xs font-bold uppercase tracking-widest px-3 py-1">
              Pricing Tier • Free Access
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white">
              100% Free for Individual Travelers
            </h3>
            <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] max-w-xl">
              Create unlimited travel plans, forecast PKR budgets, and save itineraries. Enterprise API and travel agency team workspaces coming soon!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link to="/plan-trip" className="w-full sm:w-auto">
              <Button variant="neon" size="lg" className="w-full font-bold px-6 py-3.5">
                Start Free Today
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <Section id="faq" className="pt-4">
        <SectionHeader className="text-center mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 text-sky-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
            <HelpCircle className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionDescription className="mx-auto">
            Everything you need to know about planning trips with Trevixa across Pakistan.
          </SectionDescription>
        </SectionHeader>

        <div className="max-w-3xl mx-auto mt-10 space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="rounded-2xl bg-white/80 dark:bg-[#0b1120]/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#111827] dark:text-white hover:text-sky-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-sky-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-sm text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* 10. FINAL CTA */}
      <section id="cta" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-[3rem] bg-gradient-to-tr from-sky-600 via-cyan-600 to-blue-700 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Badge variant="sky" className="text-xs font-bold uppercase tracking-widest px-4 py-1 bg-white/20 text-white border-white/30">
              Ready to Explore?
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-base sm:text-lg text-sky-100 font-normal leading-relaxed">
              Join over 15,000 travelers exploring Pakistan with AI-powered precision budgeting and intelligent itineraries.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/plan-trip" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-base rounded-2xl shadow-xl h-auto">
                  <Sparkles className="w-5 h-5 text-sky-600 mr-2" />
                  <span>Start Planning Free</span>
                </Button>
              </Link>
              <a href="#destinations" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 border-white/40 text-white hover:bg-white/10 font-bold text-base rounded-2xl h-auto">
                  <span>Explore Destinations</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
