import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: { parentId: string } }
) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'PARENT' || payload.id !== params.parentId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const links = await prisma.studentParent.findMany({
      where: { parentId: params.parentId },
      include: { student: true },
    });

    return NextResponse.json(links.map((link) => link.student));
  } catch (error) {
    console.error('Fetch students error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
