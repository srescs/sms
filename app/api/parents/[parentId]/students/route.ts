import { NextResponse } from 'next/server';
import { students, studentParents } from '@/lib/data';
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

    const links = studentParents.filter(sp => sp.parentId === params.parentId);
    const linkedStudents = links.map(link => students.find(s => s.id === link.studentId)).filter(Boolean);

    return NextResponse.json(linkedStudents);
  } catch (error) {
    console.error('Fetch students error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}