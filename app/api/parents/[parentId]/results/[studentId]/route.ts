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

    const results = await prisma.examResult.findMany({
      where: { studentId: params.studentId },
      include: { exam: true },
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
  } catch (error) {
    console.error('Fetch results error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
