import { NextResponse } from 'next/server';

interface Params {
  params: { roleId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET role by id not implemented', roleId: params.roleId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH role by id not implemented', roleId: params.roleId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE role by id not implemented', roleId: params.roleId });
}
