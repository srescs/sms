import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'PARENT') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { studentId } = await req.json();
    if (!studentId) {
      return NextResponse.json({ message: 'Student ID is required' }, { status: 400 });
    }

    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    const existingLink = await prisma.studentParent.findUnique({
      where: { studentId_parentId: { studentId, parentId: payload.id } },
    });
    if (existingLink) {
      return NextResponse.json({ message: 'Student already linked or pending approval' }, { status: 409 });
    }

    await prisma.studentParent.create({
      data: {
        studentId,
        parentId: payload.id,
        status: 'pending',
      },
    });

    return NextResponse.json({ message: 'Student linked successfully' });
  } catch (error) {
    console.error('Link student error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
