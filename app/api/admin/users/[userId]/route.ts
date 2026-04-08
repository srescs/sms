import { NextResponse } from 'next/server';

interface Params {
  params: { userId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET user by id not implemented', userId: params.userId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH user by id not implemented', userId: params.userId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE user by id not implemented', userId: params.userId });
}
