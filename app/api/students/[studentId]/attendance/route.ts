import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'STUDENT' || payload.id !== params.studentId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
    console.error('Student attendance error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
