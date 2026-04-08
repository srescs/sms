import { NextResponse } from 'next/server';

interface Params {
  params: { classId: string };
}

export async function POST({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'Map subjects to class not implemented', classId: params.classId, body });
}
