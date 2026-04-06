"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageShell from '@/components/PageShell';

export default function StudentDashboardPage() {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('student-token');
    const user = localStorage.getItem('student-user');

    if (!token || !user) {
      router.replace('/students/login');
      return;
    }

    try {
      const parsed = JSON.parse(user);
      setStudentName(parsed.name || 'Student');
      setStudentEmail(parsed.email || '');
    } catch {
      router.replace('/students/login');
    }
  }, [router]);

  return (
    <PageShell>
      <div className="space-y-6 py-8">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Student Dashboard</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Welcome, {studentName}</h2>
          <p className="mt-2 text-sm text-slate-600">Your student dashboard is available here for attendance and exam updates.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p><strong>Name:</strong> {studentName}</p>
            <p><strong>Email:</strong> {studentEmail}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
          <p className="mt-3 text-sm text-slate-600">Student-specific results and attendance data will be available once the student dashboard is expanded. Use the student login flow to access your account.</p>
        </section>
      </div>
    </PageShell>
  );
}
