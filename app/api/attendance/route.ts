import { NextResponse } from 'next/server';
import { attendance } from '@/lib/data';

export async function GET() {
  return NextResponse.json(attendance);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const record = attendance.find((item) => item.id === body.id);

  if (!record) {
    return NextResponse.json({ message: 'Attendance record not found' }, { status: 404 });
  }

  record.status = body.status;
  return NextResponse.json(record);
}
