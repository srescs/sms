import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET holiday collection not implemented' });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'POST holiday not implemented', body });
}
