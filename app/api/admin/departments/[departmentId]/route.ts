import { NextResponse } from 'next/server';

interface Params {
  params: { departmentId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET department by id not implemented', departmentId: params.departmentId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH department by id not implemented', departmentId: params.departmentId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE department by id not implemented', departmentId: params.departmentId });
}
