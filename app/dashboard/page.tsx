"use client";

import { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageShell from '@/components/PageShell';
import { getDashboard } from '@/lib/api';
import type { DashboardStats } from '@/lib/types';

const cards = [
  { key: 'students', title: 'Students', description: 'Total registered students' },
  { key: 'attendance', title: 'Attendance', description: 'Attendance records today' },
  { key: 'pendingExam', title: 'Active exam', description: 'Exam currently available' },
  { key: 'results', title: 'Results', description: 'Completed exam reports' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ students: 0, attendance: 0, pendingExam: 0, results: 0 });

  useEffect(() => {
    getDashboard().then(setStats).catch(() => null);
  }, []);

  return (
    <ProtectedLayout>
      <PageShell>
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Dashboard</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Overview</h2>
            <p className="mt-2 text-sm text-slate-600">Quick insights for student operations and exam activity.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <div key={card.key} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{card.title}</p>
                <p className="mt-6 text-4xl font-semibold text-slate-900">{stats[card.key as keyof DashboardStats]}</p>
                <p className="mt-3 text-sm text-slate-600">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Recent activity</h3>
              <p className="mt-3 text-sm text-slate-600">View latest attendance and exam status across the system.</p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">System status</h3>
              <p className="mt-3 text-sm text-slate-600">This admin dashboard is built using a reusable component architecture and Tailwind CSS.</p>
            </section>
          </div>
        </div>
      </PageShell>
    </ProtectedLayout>
  );
}
