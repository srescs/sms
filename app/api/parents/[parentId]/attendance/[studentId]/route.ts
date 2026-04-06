import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: { parentId: string; studentId: string } }
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

    const link = await prisma.studentParent.findUnique({
      where: { studentId_parentId: { studentId: params.studentId, parentId: params.parentId } },
    });
    if (!link) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    const attendance = await prisma.attendanceRecord.findMany({
      where: { studentId: params.studentId },
      include: { student: true },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(
      attendance.map((record) => ({
        id: record.id,
        studentId: record.studentId,
        studentName: record.student.name,
        date: record.date.toISOString(),
        status: record.status,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error('Fetch attendance error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
