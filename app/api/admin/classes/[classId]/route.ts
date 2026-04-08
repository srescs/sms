import { NextResponse } from 'next/server';

interface Params {
  params: { classId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET class by id not implemented', classId: params.classId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH class by id not implemented', classId: params.classId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE class by id not implemented', classId: params.classId });
}
