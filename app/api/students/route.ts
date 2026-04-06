import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, roll, grade, email, password } = body;

    if (!name || !roll || !grade || !email || !password) {
      return NextResponse.json({ message: 'All student fields are required' }, { status: 400 });
    }

    const existingEmail = await prisma.student.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    const existingRoll = await prisma.student.findUnique({ where: { roll } });
    if (existingRoll) {
      return NextResponse.json({ message: 'Roll number already assigned' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await prisma.student.create({
      data: {
        name,
        roll,
        grade,
        email,
        password: hashedPassword,
        createdBy: 'system',
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Create student error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Missing student id' }, { status: 400 });
  }

  await prisma.student.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
