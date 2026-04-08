import { NextResponse } from 'next/server';

interface Params {
  params: { subjectId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET subject by id not implemented', subjectId: params.subjectId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH subject by id not implemented', subjectId: params.subjectId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE subject by id not implemented', subjectId: params.subjectId });
}
