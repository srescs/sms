import { NextResponse } from 'next/server';

interface Params {
  params: { groupId: string };
}

export async function POST({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'Add members to user group not implemented', groupId: params.groupId, body });
}
