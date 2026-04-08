import { NextResponse } from 'next/server';

interface Params {
  params: { calendarEventId: string };
}

export async function GET({ params }: Params) {
  return NextResponse.json({ message: 'GET calendarEvent by id not implemented', calendarEventId: params.calendarEventId });
}

export async function PATCH({ params }: Params, req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'PATCH calendarEvent by id not implemented', calendarEventId: params.calendarEventId, body });
}

export async function DELETE({ params }: Params) {
  return NextResponse.json({ message: 'DELETE calendarEvent by id not implemented', calendarEventId: params.calendarEventId });
}
