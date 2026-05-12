import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createErrorResponse } from '@/lib/auth';

export async function GET(request: Request) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);
  
  try {
    const cranes = await prisma.crane.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(cranes);
  } catch (error) {
    return createErrorResponse('Failed to fetch cranes', 500);
  }
}

export async function POST(request: Request) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);

  try {
    const data = await request.json();
    const crane = await prisma.crane.create({
      data: {
        modelName: data.modelName,
        capacity: parseFloat(data.capacity),
        boomLength: parseFloat(data.boomLength),
        price: data.price,
        description: data.description,
        images: data.images || [],
      }
    });
    return NextResponse.json(crane, { status: 201 });
  } catch (error) {
    return createErrorResponse('Failed to create crane', 500);
  }
}
