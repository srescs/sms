import { NextResponse } from 'next/server';

interface Params {
  params: { holidayId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET holiday by id not implemented', holidayId: params.holidayId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH holiday by id not implemented', holidayId: params.holidayId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE holiday by id not implemented', holidayId: params.holidayId });
}
