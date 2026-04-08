import { NextResponse } from 'next/server';

interface Params {
  params: { academicYearId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET academicYear by id not implemented', academicYearId: params.academicYearId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH academicYear by id not implemented', academicYearId: params.academicYearId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE academicYear by id not implemented', academicYearId: params.academicYearId });
}
