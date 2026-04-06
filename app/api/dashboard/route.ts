import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const [studentsCount, attendanceCount, pendingExamCount, resultsCount] = await Promise.all([
    prisma.student.count(),
    prisma.attendanceRecord.count(),
    prisma.exam.count({ where: { examDate: { gte: new Date() } } }),
    prisma.examResult.count(),
  ]);

  return NextResponse.json({
    students: studentsCount,
    attendance: attendanceCount,
    pendingExam: pendingExamCount,
    results: resultsCount,
  });
}
