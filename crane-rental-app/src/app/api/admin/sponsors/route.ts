import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createErrorResponse } from '@/lib/auth';

export async function GET(request: Request) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);
  
  try {
    const sponsors = await prisma.sponsor.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    return NextResponse.json(sponsors);
  } catch (error) {
    return createErrorResponse('Failed to fetch sponsors', 500);
  }
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);

  try {
    const data = await request.json();
    const sponsor = await prisma.sponsor.create({
      data: {
        name: data.name,
        logoUrl: data.logoUrl,
        websiteUrl: data.websiteUrl,
        displayOrder: data.displayOrder ? parseInt(data.displayOrder) : 0,
      }
    });
    return NextResponse.json(sponsor, { status: 201 });
  } catch (error) {
    return createErrorResponse('Failed to create sponsor', 500);
  }
}
