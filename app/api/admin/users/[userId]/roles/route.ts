import { NextResponse } from 'next/server';

interface Params {
  params: { userId: string };
}

export async function POST({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'Assign role to user not implemented', userId: params.userId, body });
}
