import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const examId = url.searchParams.get('id');

  const exams = await prisma.exam.findMany({
    include: { questions: true },
    orderBy: { examDate: 'asc' },
  });

  if (examId) {
    const exam = exams.find((item) => item.id === examId);
    if (!exam) {
      return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
    }
    return NextResponse.json({
      ...exam,
      examDate: exam.examDate.toISOString(),
      createdAt: exam.createdAt.toISOString(),
      updatedAt: exam.updatedAt.toISOString(),
    });
  }

  return NextResponse.json(
    exams.map((exam) => ({
      ...exam,
      examDate: exam.examDate.toISOString(),
      createdAt: exam.createdAt.toISOString(),
      updatedAt: exam.updatedAt.toISOString(),
    }))
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.action === 'create') {
      const { exam } = body;
      if (!exam?.title || !exam?.subject || !exam?.questions?.length) {
        return NextResponse.json({ message: 'Invalid exam payload' }, { status: 400 });
      }

      const createdExam = await prisma.exam.create({
        data: {
          title: exam.title,
          subject: exam.subject,
          description: exam.description || null,
          totalMarks: exam.totalMarks,
          passingMarks: exam.passingMarks,
          duration: exam.duration,
          examDate: new Date(exam.examDate),
          createdBy: 'system',
          questions: {
            create: exam.questions.map((question: any) => ({
              question: question.question,
              options: question.options,
              answer: question.answer,
            })),
          },
        },
        include: { questions: true },
      });

      return NextResponse.json({
        ...createdExam,
        examDate: createdExam.examDate.toISOString(),
        createdAt: createdExam.createdAt.toISOString(),
        updatedAt: createdExam.updatedAt.toISOString(),
      });
    }

    if (body.action === 'submit') {
      const { examId, studentId, answers } = body;
      const exam = await prisma.exam.findUnique({
        where: { id: examId },
        include: { questions: true },
      });

      if (!exam) {
        return NextResponse.json({ message: 'Exam not found' }, { status: 404 });
      }

      const student = await prisma.student.findUnique({ where: { id: studentId } });
      if (!student) {
        return NextResponse.json({ message: 'Invalid student' }, { status: 404 });
      }

      const total = exam.questions.length;
      const obtained = exam.questions.reduce((score, question) => {
        const answer = answers[question.id];
        return score + (answer === question.answer ? 1 : 0);
      }, 0);

      await prisma.examResult.upsert({
        where: { studentId_examId: { studentId, examId } },
        update: {
          obtained,
          total,
          status: obtained >= exam.passingMarks ? 'passed' : 'failed',
        },
        create: {
          studentId,
          examId,
          obtained,
          total,
          status: obtained >= exam.passingMarks ? 'passed' : 'failed',
        },
      });

      return NextResponse.json({ score: obtained, total });
    }

    return NextResponse.json({ message: 'Invalid exam action' }, { status: 400 });
  } catch (error) {
    console.error('Exam error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
