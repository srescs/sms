import { NextResponse } from 'next/server';
import { students } from '@/lib/data';

export async function GET() {
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newStudent = {
    id: `s${students.length + 1}`,
    name: body.name,
    roll: body.roll,
    grade: body.grade,
    email: body.email,
  };

  students.push(newStudent);
  return NextResponse.json(newStudent);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Missing student id' }, { status: 400 });
  }

  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }

  students.splice(index, 1);
  return NextResponse.json({ success: true });
}
