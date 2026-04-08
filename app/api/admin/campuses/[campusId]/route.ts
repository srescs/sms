import { NextResponse } from 'next/server';

interface Params {
  params: { campusId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET campus by id not implemented', campusId: params.campusId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH campus by id not implemented', campusId: params.campusId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE campus by id not implemented', campusId: params.campusId });
}
