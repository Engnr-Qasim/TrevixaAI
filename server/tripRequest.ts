import { z } from 'zod';

const date = z.union([z.iso.date(), z.literal('')]).optional();
const label = z.string().trim().min(1).max(100);

export const tripRequest = z.object({
  destination: label,
  durationDays: z.number().int().min(1).max(30).default(5),
  budgetAmount: z.number().min(1).max(100_000_000).default(75_000),
  budgetTier: label.optional(),
  travelerType: label.optional(),
  adults: z.number().int().min(1).max(100).optional(),
  kids: z.number().int().min(0).max(100).optional(),
  pets: z.number().int().min(0).max(20).optional(),
  startDate: date,
  endDate: date,
  isFlexible: z.boolean().optional(),
  interests: z.array(label).max(30).optional(),
  preferences: z.record(z.string().max(60), z.union([z.boolean(), label, z.number()])).optional(),
}).refine(params => !params.startDate || !params.endDate || params.endDate >= params.startDate, {
  path: ['endDate'],
  message: 'End date must be on or after the start date.',
});
