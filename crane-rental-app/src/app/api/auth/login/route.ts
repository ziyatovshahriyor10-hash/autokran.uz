import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';
import { loginSchema } from '@/lib/validations';
import { apiError, apiSuccess } from '@/lib/api-helpers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = loginSchema.parse(body);

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', validated.email)
      .single();

    if (error || !user) {
      return apiError('Invalid credentials', 401);
    }

    const isValid = await bcrypt.compare(validated.password, user.password_hash);
    if (!isValid) {
      return apiError('Invalid credentials', 401);
    }

    if (user.role !== 'admin') {
      return apiError('Unauthorized', 403);
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1d' }
    );

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return apiSuccess({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    return apiError(error.message, 400);
  }
}
