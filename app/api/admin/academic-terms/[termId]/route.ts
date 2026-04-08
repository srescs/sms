import { NextResponse } from 'next/server';

interface Params {
  params: { academicTermId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET academicTerm by id not implemented', academicTermId: params.academicTermId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH academicTerm by id not implemented', academicTermId: params.academicTermId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE academicTerm by id not implemented', academicTermId: params.academicTermId });
}
