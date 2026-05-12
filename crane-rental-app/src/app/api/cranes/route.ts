import { NextResponse } from 'next/server';
import { supabaseAdmin, supabaseBrowser } from '@/lib/supabase';
import { verifyAdminToken, apiSuccess, apiError } from '@/lib/api-helpers';
import { craneSchema } from '@/lib/validations';

export async function GET() {
  const { data, error } = await supabaseBrowser
    .from('cranes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return apiError(error.message, 500);
  }

  return apiSuccess(data);
}

export async function POST(request: Request) {
  const admin = await verifyAdminToken();
  if (!admin) return apiError('Unauthorized', 401);

  try {
    const body = await request.json();
    const validated = craneSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('cranes')
      .insert(validated)
      .select()
      .single();

    if (error) return apiError(error.message, 500);
    return apiSuccess(data, 201);
  } catch (error: any) {
    return apiError(error.message, 400);
  }
}
