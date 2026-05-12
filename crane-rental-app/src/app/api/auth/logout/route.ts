import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiSuccess } from '@/lib/api-helpers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  return apiSuccess({ message: 'Logged out successfully' });
}
