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
    const body = await req.json();
    const { action, name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    if (action === 'login') {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }

      return NextResponse.json({
        token: createToken({ id: user.id, email: user.email, role: user.role }),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    if (action === 'register') {
      if (!name) {
        return NextResponse.json({ message: 'Name is required' }, { status: 400 });
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });

      return NextResponse.json({ message: 'Registration successful', user: { id: user.id, name: user.name, email: user.email } });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
