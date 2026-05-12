import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminToken, apiSuccess, apiError } from '@/lib/api-helpers';
import { z } from 'zod';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminToken();
  if (!admin) return apiError('Unauthorized', 401);

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*, cranes(*)')
    .eq('id', id)
    .single();

  if (error || !data) return apiError('Booking not found', 404);
  return apiSuccess(data);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminToken();
  if (!admin) return apiError('Unauthorized', 401);

  try {
    const { id } = await params;
    const body = await request.json();
    
    const patchSchema = z.object({
      status: z.enum(['pending', 'confirmed', 'cancelled', 'completed'])
    });
    
    const validated = patchSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .update(validated)
      .eq('id', id)
      .select()
      .single();

    if (error) return apiError(error.message, 500);
    return apiSuccess(data);
  } catch (error: any) {
    return apiError(error.message, 400);
  }
}
