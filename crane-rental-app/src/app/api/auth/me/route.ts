import { NextResponse } from 'next/server';
import { verifyAdminToken, apiSuccess, apiError } from '@/lib/api-helpers';

export async function GET() {
  const admin = await verifyAdminToken();
  if (!admin) {
    return apiError('Unauthorized', 401);
  }
  
  return apiSuccess({ user: admin });
}
