import { NextResponse } from 'next/server';
import { supabaseAdmin, supabaseBrowser } from '@/lib/supabase';
import { verifyAdminToken, apiSuccess, apiError } from '@/lib/api-helpers';
import { bookingSchema } from '@/lib/validations';

export async function GET() {
  const admin = await verifyAdminToken();
  if (!admin) return apiError('Unauthorized', 401);

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*, cranes(name)')
    .order('created_at', { ascending: false });

  if (error) return apiError(error.message, 500);
  return apiSuccess(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = bookingSchema.parse(body);

    // Save to Supabase
    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .insert(validated)
      .select()
      .single();

    if (error) return apiError(error.message, 500);

    // Send Telegram
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (token && chatId) {
      const { data: crane } = await supabaseAdmin.from('cranes').select('name').eq('id', validated.crane_id).single();
      const craneName = crane?.name || validated.crane_id;

      const message = `
🚨 Yangi buyurtma (Supabase) 🚨

👤 Ism: ${validated.client_name}
📞 Tel: ${validated.client_phone}
📍 Manzil: ${validated.location || 'Kiritilmagan'}
🏗 Kran: ${craneName}
${validated.message ? `💬 Xabar: ${validated.message}` : ''}
      `;

      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
    }

    return apiSuccess(booking, 201);
  } catch (error: any) {
    return apiError(error.message, 400);
  }
}
