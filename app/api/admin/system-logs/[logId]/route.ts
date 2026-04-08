import { NextResponse } from 'next/server';

interface Params {
  params: { systemLogId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET systemLog by id not implemented', systemLogId: params.systemLogId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH systemLog by id not implemented', systemLogId: params.systemLogId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE systemLog by id not implemented', systemLogId: params.systemLogId });
}
