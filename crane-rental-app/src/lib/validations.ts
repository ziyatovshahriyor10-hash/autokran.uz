import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const craneSchema = z.object({
  name: z.string().min(2),
  capacity_tons: z.number().positive(),
  boom_length_m: z.number().positive().optional().nullable(),
  price_per_day: z.number().positive().optional().nullable(),
  status: z.enum(['available', 'rented', 'maintenance']).default('available'),
  description: z.string().optional().nullable(),
  image_url: z.string().url().optional().nullable(),
});

export const bookingSchema = z.object({
  crane_id: z.string().uuid(),
  client_name: z.string().min(2),
  client_phone: z.string().min(5),
  client_email: z.string().email().optional().or(z.literal('')),
  location: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  message: z.string().optional(),
});
