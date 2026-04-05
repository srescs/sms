import { NextResponse } from 'next/server';
import { examQuestions, results } from '@/lib/data';

export async function GET() {
  return NextResponse.json(examQuestions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const answers: Record<string, string> = body.answers ?? {};
  const studentName = body.studentName ?? 'Student';

  const score = examQuestions.reduce((sum, question) => {
    return sum + (answers[question.id] === question.answer ? 1 : 0);
  }, 0);

  const result = {
    id: `r${results.length + 1}`,
    studentName,
    score,
    total: examQuestions.length,
    date: new Date().toLocaleDateString('en-US'),
  };

  results.push(result);

  return NextResponse.json({ score, total: examQuestions.length });
}
