import { NextResponse } from 'next/server';

interface Params {
  params: { programId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET program by id not implemented', programId: params.programId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH program by id not implemented', programId: params.programId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE program by id not implemented', programId: params.programId });
}
