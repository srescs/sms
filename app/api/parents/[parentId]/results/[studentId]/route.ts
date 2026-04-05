import { NextResponse } from 'next/server';
import axios from 'axios';
import { students, studentParents } from '@/lib/data';
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

    // Check if parent is linked to student
    const link = studentParents.find(sp => sp.studentId === params.studentId && sp.parentId === params.parentId);
    if (!link) {
      return NextResponse.json({ message: 'Access denied' }, { status: 403 });
    }

    // Fetch results from Result Service
    const resultsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/results`, {
      timeout: 5000, // 5 seconds timeout
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const allResults = resultsResponse.data as { id: string; studentName: string; score: number; total: number; date: string }[];

    // Filter by student
    const student = students.find(s => s.id === params.studentId);
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    const studentResults = allResults.filter(result => result.studentName === student.name);

    return NextResponse.json(studentResults);
  } catch (error) {
    console.error('Fetch results error:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ message: 'Results service unavailable' }, { status: 503 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}