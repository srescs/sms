import { NextResponse } from 'next/server';

interface Params {
  params: { sectionId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET section by id not implemented', sectionId: params.sectionId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH section by id not implemented', sectionId: params.sectionId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE section by id not implemented', sectionId: params.sectionId });
}
