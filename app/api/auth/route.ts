import { NextResponse } from 'next/server';
import { users } from '@/lib/data';

export async function POST(req: Request) {
  const body = await req.json();
  const { action, name, email, password } = body;

  if (action === 'login') {
    const user = users.find((item) => item.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      token: `sms-token-${Buffer.from(email).toString('base64')}`,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  }

  if (action === 'register') {
    if (users.find((item) => item.email === email)) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    users.push({
      id: `u${users.length + 1}`,
      name,
      email,
      password,
    });

    return NextResponse.json({ message: 'Registration complete' });
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
}
