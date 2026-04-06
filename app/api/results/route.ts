import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const results = await prisma.examResult.findMany({
    include: { student: true, exam: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(
    results.map((result) => ({
      id: result.id,
      studentId: result.studentId,
      examId: result.examId,
      examTitle: result.exam.title,
      score: result.obtained,
      total: result.total,
      status: result.status,
      date: result.createdAt.toISOString(),
    }))
  );
}
