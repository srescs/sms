import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET academicTerm collection not implemented' });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'POST academicTerm not implemented', body });
}
