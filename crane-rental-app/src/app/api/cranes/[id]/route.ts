import { NextResponse } from 'next/server';
import { supabaseAdmin, supabaseBrowser } from '@/lib/supabase';
import { verifyAdminToken, apiSuccess, apiError } from '@/lib/api-helpers';
import { craneSchema } from '@/lib/validations';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseBrowser
    .from('cranes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return apiError('Crane not found', 404);
  return apiSuccess(data);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminToken();
  if (!admin) return apiError('Unauthorized', 401);

  try {
    const { id } = await params;
    const body = await request.json();
    const validated = craneSchema.partial().parse(body);

    const { data, error } = await supabaseAdmin
      .from('cranes')
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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdminToken();
  if (!admin) return apiError('Unauthorized', 401);

  const { id } = await params;
  const { error } = await supabaseAdmin
    .from('cranes')
    .delete()
    .eq('id', id);

  if (error) return apiError(error.message, 500);
  return apiSuccess({ deleted: true });
}
