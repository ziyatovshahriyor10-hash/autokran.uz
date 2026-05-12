import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth, createErrorResponse } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);

  try {
    const data = await request.json();
    const sponsor = await prisma.sponsor.update({
      where: { id: params.id },
      data: {
        name: data.name,
        logoUrl: data.logoUrl,
        websiteUrl: data.websiteUrl,
        displayOrder: data.displayOrder ? parseInt(data.displayOrder) : undefined,
      }
    });
    return NextResponse.json(sponsor);
  } catch (error) {
    return createErrorResponse('Failed to update sponsor', 500);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!verifyAuth(request)) return createErrorResponse('Unauthorized', 401);

  try {
    await prisma.sponsor.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return createErrorResponse('Failed to delete sponsor', 500);
  }
}
