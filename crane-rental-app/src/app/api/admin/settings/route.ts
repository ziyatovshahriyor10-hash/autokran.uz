import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createErrorResponse } from '@/lib/auth';

export async function GET(request: Request) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);
  
  try {
    const settings = await prisma.globalSettings.findFirst();
    return NextResponse.json(settings || {});
  } catch (error) {
    return createErrorResponse('Failed to fetch settings', 500);
  }
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);

  try {
    const data = await request.json();
    const existingSettings = await prisma.globalSettings.findFirst();

    let settings;
    if (existingSettings) {
      settings = await prisma.globalSettings.update({
        where: { id: existingSettings.id },
        data: {
          phoneNumbers: data.phoneNumbers || [],
          telegramBot: data.telegramBot,
          address: data.address,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
        }
      });
    } else {
      settings = await prisma.globalSettings.create({
        data: {
          phoneNumbers: data.phoneNumbers || [],
          telegramBot: data.telegramBot,
          address: data.address,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
        }
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    return createErrorResponse('Failed to save settings', 500);
  }
}
