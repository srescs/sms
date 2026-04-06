import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const requests = await prisma.studentParent.findMany({
      where: { status: 'pending' },
      include: { student: true, parent: true },
      orderBy: { requestedAt: 'desc' },
    });

    return NextResponse.json(
      requests.map((request) => ({
        id: request.id,
        studentId: request.studentId,
        studentName: request.student.name,
        parentId: request.parentId,
        parentName: request.parent.name,
        status: request.status,
        requestedAt: request.requestedAt.toISOString(),
        approvedAt: request.approvedAt?.toISOString() ?? null,
        approvedBy: request.approvedBy ?? null,
      }))
    );
  } catch (error) {
    console.error('Fetch link requests error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { requestId, action } = await req.json();
    if (!requestId || action !== 'approve') {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const linkRequest = await prisma.studentParent.findUnique({ where: { id: requestId } });
    if (!linkRequest || linkRequest.status !== 'pending') {
      return NextResponse.json({ message: 'Link request not found or already processed' }, { status: 404 });
    }

    await prisma.studentParent.update({
      where: { id: requestId },
      data: {
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: payload.id,
      },
    });

    return NextResponse.json({ message: 'Link request approved' });
  } catch (error) {
    console.error('Approve link request error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
