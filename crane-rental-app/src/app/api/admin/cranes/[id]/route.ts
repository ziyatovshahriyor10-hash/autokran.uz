import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createErrorResponse } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);

  try {
    const data = await request.json();
    const crane = await prisma.crane.update({
      where: { id: params.id },
      data: {
        modelName: data.modelName,
        capacity: data.capacity ? parseFloat(data.capacity) : undefined,
        boomLength: data.boomLength ? parseFloat(data.boomLength) : undefined,
        price: data.price,
        description: data.description,
        images: data.images,
      }
    });
    return NextResponse.json(crane);
  } catch (error) {
    return createErrorResponse('Failed to update crane', 500);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);

  try {
    await prisma.crane.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return createErrorResponse('Failed to delete crane', 500);
  }
}
