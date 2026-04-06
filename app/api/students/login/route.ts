import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function createToken(payload: { id: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const student = await prisma.student.findUnique({ where: { email } });
    if (!student) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      token: createToken({ id: student.id, email: student.email, role: 'STUDENT' }),
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'STUDENT',
      },
    });
  } catch (error) {
    console.error('Student login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
