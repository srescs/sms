import { NextResponse } from 'next/server';
import { parents, students, studentParents } from '@/lib/data';
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

    const student = students.find(s => s.id === studentId);
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    const existingLink = studentParents.find(sp => sp.studentId === studentId && sp.parentId === payload.id);
    if (existingLink) {
      return NextResponse.json({ message: 'Student already linked' }, { status: 409 });
    }

    studentParents.push({
      id: `sp${studentParents.length + 1}`,
      studentId,
      parentId: payload.id,
    });

    return NextResponse.json({ message: 'Student linked successfully' });
  } catch (error) {
    console.error('Link student error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}