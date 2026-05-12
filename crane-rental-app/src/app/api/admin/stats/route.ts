import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminToken, apiSuccess, apiError } from '@/lib/api-helpers';

export async function GET() {
  const admin = await verifyAdminToken();
  if (!admin) return apiError('Unauthorized', 401);

  try {
    const { count: cranesCount } = await supabaseAdmin.from('cranes').select('*', { count: 'exact', head: true });
    const { count: bookingsCount } = await supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true });
    const { count: pendingBookingsCount } = await supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');
    
    return apiSuccess({
      totalCranes: cranesCount || 0,
      totalBookings: bookingsCount || 0,
      pendingBookings: pendingBookingsCount || 0
    });
  } catch (error: any) {
    return apiError(error.message, 500);
  }
}
