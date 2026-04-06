"use client";

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageShell from '@/components/PageShell';
import { getExam, submitExam } from '@/lib/api';
import type { Exam, ExamQuestion } from '@/lib/types';

export default function ExamPage() {
  const [exam, setExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.role === 'STUDENT') {
          setStudentId(user.id);
        }
      } catch {
        // ignore malformed user data
      }
    }

    getExam().then((data) => {
      if (data) {
        setExam(data);
      }
    }).catch(() => null);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!exam) {
      setError('No exam loaded');
      return;
    }

    if (!studentId) {
      setError('Please log in as a student before submitting the exam.');
      return;
    }

    if (exam.questions.some((item) => !answers[item.id])) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const data = await submitExam(exam.id, studentId, answers);
      setResult(data);
    } catch {
      setError('Unable to submit the exam.');
    } finally {
      setLoading(false);
    }
  };

  if (!exam) {
    return (
      <ProtectedLayout>
        <PageShell>
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Online Exam</p>
              <h2 className="text-3xl font-semibold text-slate-900">Exam Interface</h2>
              <p className="mt-2 text-sm text-slate-600">Loading exam details...</p>
            </div>
          </div>
        </PageShell>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <PageShell>
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Online Exam</p>
            <h2 className="text-3xl font-semibold text-slate-900">{exam.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{exam.description || 'Answer the exam questions below.'}</p>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {exam.questions.map((question: ExamQuestion) => (
                <div key={question.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-800">{question.question}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => (
                      <label key={option} className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-brand hover:bg-slate-100">
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                          className="mr-3 inline-block h-4 w-4 cursor-pointer align-middle text-brand"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={loading || !studentId}
                className="w-full rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? 'Submitting...' : 'Submit Exam'}
              </button>
            </form>
          </section>

          {!studentId ? (
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm text-slate-600">Please sign in as a student to submit this exam.</p>
            </section>
          ) : null}

          {result ? (
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Result</h3>
              <p className="mt-3 text-sm text-slate-600">You scored {result.score} out of {result.total}.</p>
            </section>
          ) : null}
        </div>
      </PageShell>
    </ProtectedLayout>
  );
}
