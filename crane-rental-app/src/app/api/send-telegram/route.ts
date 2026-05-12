import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, location, craneModel } = await request.json();

    // Use environment variables for security
    // You should add these to your .env file
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('Telegram configuration missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in .env');
      return NextResponse.json({ error: 'Telegram configuration missing' }, { status: 500 });
    }

    const text = `
🆕 Yangi mijoz qo'shildi!
━━━━━━━━━━━━━━━━━━━━
👤 Ism: ${name}
📞 Telefon: ${phone}
📍 Manzil: ${location}
🏗️ Texnika: ${craneModel || 'Tanlanmagan'}
━━━━━━━━━━━━━━━━━━━━
#buyurtma #autokran
    `;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return NextResponse.json({ error: 'Failed to send message to Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
