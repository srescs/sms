import { NextResponse } from 'next/server';
import { attendance, results, students } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    students: students.length,
    attendance: attendance.length,
    pendingExam: 1,
    results: results.length,
  });
}
