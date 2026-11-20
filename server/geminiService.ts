import { GoogleGenAI, Type } from '@google/genai';
import { GeneratedTripData, TripPlannerParams } from '../src/types/tripResult.js';

export async function generateTripWithGemini(params: TripPlannerParams): Promise<GeneratedTripData> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const destination = params.destination || 'Hunza Valley';
  const duration = params.durationDays || 5;
  const budget = params.budgetAmount || 75000;
  const travelerType = params.travelerType || 'Friends & Family';
  const adults = params.adults || 2;
  const kids = params.kids || 0;
  const interests = params.interests?.join(', ') || 'nature, adventure, local culture, food';

  const prompt = `You are Trevixa's expert AI travel planner specialized in Pakistan and global travel destinations.
Generate a comprehensive, realistic, high-quality, structured travel plan for:
- Destination: ${destination}
- Duration: ${duration} Days
- Estimated Budget: PKR ${budget.toLocaleString()}
- Traveler Type: ${travelerType} (${adults} adults, ${kids} kids)
- Interests & Preferences: ${interests}

Provide realistic locations, realistic costs in PKR, authentic food recommendations, high quality real unsplash image URLs (using relevant high resolution unsplash photo IDs related to nature/mountains/travel/hotels/food), accurate hotel names, and detailed day-by-day itineraries.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: prompt,
    config: {
      temperature: 0.7,
      systemInstruction: 'You are Trevixa, an award-winning AI travel planning engine. Always output structured, validated JSON matching the requested schema. Provide authentic, highly specific Pakistani or global travel details, costs in PKR, and well-rounded itineraries.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          destination: { type: Type.STRING },
          region: { type: Type.STRING },
          matchScore: { type: Type.NUMBER },
          durationDays: { type: Type.NUMBER },
          budgetAmount: { type: Type.NUMBER },
          bestSeason: { type: Type.STRING },
          weather: { type: Type.STRING },
          travelStyle: { type: Type.STRING },
          executiveSummary: { type: Type.STRING },
          feasibilityScore: { type: Type.NUMBER },
          budgetBreakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                amount: { type: Type.NUMBER },
                percentage: { type: Type.NUMBER },
                description: { type: Type.STRING },
              },
              required: ['category', 'amount', 'percentage', 'description'],
            },
          },
          dayItinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayNumber: { type: Type.NUMBER },
                title: { type: Type.STRING },
                dateStr: { type: Type.STRING },
                theme: { type: Type.STRING },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      timeSlot: { type: Type.STRING },
                      period: { type: Type.STRING },
                      title: { type: Type.STRING },
                      location: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      estCost: { type: Type.STRING },
                      description: { type: Type.STRING },
                      image: { type: Type.STRING },
                      type: { type: Type.STRING },
                    },
                    required: ['id', 'timeSlot', 'period', 'title', 'location', 'duration', 'estCost', 'description', 'type'],
                  },
                },
              },
              required: ['dayNumber', 'title', 'dateStr', 'theme', 'activities'],
            },
          },
          hotels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                reviewsCount: { type: Type.NUMBER },
                location: { type: Type.STRING },
                pricePerNight: { type: Type.NUMBER },
                totalEstCost: { type: Type.NUMBER },
                image: { type: Type.STRING },
                badge: { type: Type.STRING },
                amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
                description: { type: Type.STRING },
              },
              required: ['id', 'name', 'rating', 'reviewsCount', 'location', 'pricePerNight', 'totalEstCost', 'badge', 'description'],
            },
          },
          restaurants: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                cuisine: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                estCostPerPerson: { type: Type.NUMBER },
                bestDish: { type: Type.STRING },
                distance: { type: Type.STRING },
                image: { type: Type.STRING },
                badge: { type: Type.STRING },
              },
              required: ['id', 'name', 'cuisine', 'rating', 'estCostPerPerson', 'bestDish', 'distance', 'badge'],
            },
          },
          attractions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                openingHours: { type: Type.STRING },
                recommendedDuration: { type: Type.STRING },
                ticketFee: { type: Type.STRING },
                description: { type: Type.STRING },
                image: { type: Type.STRING },
                photoSpotTip: { type: Type.STRING },
              },
              required: ['id', 'name', 'category', 'openingHours', 'recommendedDuration', 'ticketFee', 'description', 'photoSpotTip'],
            },
          },
          packingChecklist: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                category: { type: Type.STRING },
                label: { type: Type.STRING },
              },
              required: ['id', 'category', 'label'],
            },
          },
          weatherForecast: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                tempHigh: { type: Type.NUMBER },
                tempLow: { type: Type.NUMBER },
                condition: { type: Type.STRING },
                rainChance: { type: Type.STRING },
              },
              required: ['day', 'tempHigh', 'tempLow', 'condition', 'rainChance'],
            },
          },
          localTips: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['title', 'items'],
            },
          },
        },
        required: [
          'destination',
          'region',
          'matchScore',
          'durationDays',
          'budgetAmount',
          'bestSeason',
          'weather',
          'travelStyle',
          'executiveSummary',
          'feasibilityScore',
          'budgetBreakdown',
          'dayItinerary',
          'hotels',
          'restaurants',
          'attractions',
          'packingChecklist',
          'weatherForecast',
          'localTips',
        ],
      },
    },
  });

  console.log("========== GEMINI RESPONSE ==========");
console.log(response);
console.log("=====================================");

 const responseText = response.text;

  if (!responseText) {
    throw new Error('Gemini API returned empty response.');
  }

  let parsedData: GeneratedTripData;

try {
  parsedData =
    typeof responseText === "string"
      ? JSON.parse(responseText)
      : (responseText as GeneratedTripData);
} catch (err) {
  console.error("Gemini Raw Response:", responseText);
  throw new Error("Gemini returned invalid JSON.");
}


  // Provide fallback default high-res Unsplash images if Gemini returned blank/generic placeholders
  const defaultImages = [
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589553460730-57f970634629?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
  ];

  parsedData.heroImage = parsedData.heroImage || defaultImages[0];

  parsedData.dayItinerary = parsedData.dayItinerary.map((day, dIdx) => ({
    ...day,
    activities: day.activities.map((act, aIdx) => ({
      ...act,
      image: act.image && act.image.startsWith('http') ? act.image : defaultImages[(dIdx + aIdx) % defaultImages.length],
      period: (['morning', 'afternoon', 'evening'].includes(act.period) ? act.period : 'morning') as 'morning' | 'afternoon' | 'evening',
      type: (['Attraction', 'Food', 'Travel', 'Stay', 'Activity'].includes(act.type) ? act.type : 'Activity') as any,
    })),
  }));

  parsedData.hotels = parsedData.hotels.map((h, i) => ({
    ...h,
    image: h.image && h.image.startsWith('http') ? h.image : defaultImages[i % defaultImages.length],
    amenities: h.amenities && h.amenities.length > 0 ? h.amenities : ['Wi-Fi', 'Breakfast', 'Hot Water', 'Mountain View'],
  }));

  parsedData.restaurants = parsedData.restaurants.map((r, i) => ({
    ...r,
    image: r.image && r.image.startsWith('http') ? r.image : defaultImages[(i + 2) % defaultImages.length],
  }));

  parsedData.attractions = parsedData.attractions.map((a, i) => ({
    ...a,
    image: a.image && a.image.startsWith('http') ? a.image : defaultImages[(i + 4) % defaultImages.length],
  }));

  parsedData.packingChecklist = parsedData.packingChecklist.map((item, i) => ({
    ...item,
    id: item.id || `p-${i}`,
    category: (['Clothing', 'Footwear', 'Medicines', 'Electronics', 'Documents', 'Essentials'].includes(item.category)
      ? item.category
      : 'Essentials') as any,
  }));

  return parsedData;
}
