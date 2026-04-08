import { NextResponse } from 'next/server';

interface Params {
  params: { auditLogId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET auditLog by id not implemented', auditLogId: params.auditLogId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH auditLog by id not implemented', auditLogId: params.auditLogId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE auditLog by id not implemented', auditLogId: params.auditLogId });
}
