import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { parents } from '@/lib/data';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (parents.find((item) => item.email === email)) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newParent = {
      id: `p${parents.length + 1}`,
      name,
      email,
      password: hashedPassword,
    };

    parents.push(newParent);

    return NextResponse.json({ message: 'Registration successful', parentId: newParent.id });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}