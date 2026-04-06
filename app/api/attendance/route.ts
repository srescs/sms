import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const attendance = await prisma.attendanceRecord.findMany({
    orderBy: { date: 'desc' },
    include: { student: true },
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
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const record = await prisma.attendanceRecord.update({
      where: { id: body.id },
      data: { status: body.status },
      include: { student: true },
    });

    return NextResponse.json({
      id: record.id,
      studentId: record.studentId,
      studentName: record.student.name,
      date: record.date.toISOString(),
      status: record.status,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Update attendance error:', error);
    return NextResponse.json({ message: 'Attendance record not found' }, { status: 404 });
  }
}
