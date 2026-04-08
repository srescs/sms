import { NextResponse } from 'next/server';

interface Params {
  params: { userId: string; roleId: string };
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'Remove role from user not implemented', userId: params.userId, roleId: params.roleId });
}
