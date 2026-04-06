"use client";

import { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageShell from '@/components/PageShell';
import { approveLinkRequest, getDashboard, getPendingLinkRequests } from '@/lib/api';
import type { DashboardStats, LinkRequest } from '@/lib/types';

const cards = [
  { key: 'students', title: 'Students', description: 'Total registered students' },
  { key: 'attendance', title: 'Attendance', description: 'Attendance records today' },
  { key: 'pendingExam', title: 'Active exam', description: 'Exam currently available' },
  { key: 'results', title: 'Results', description: 'Completed exam reports' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ students: 0, attendance: 0, pendingExam: 0, results: 0 });
  const [requests, setRequests] = useState<LinkRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    getDashboard().then(setStats).catch(() => null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('sms-token');
    if (!token) return;

    setLoadingRequests(true);
    getPendingLinkRequests(token)
      .then(setRequests)
      .catch(() => null)
      .finally(() => setLoadingRequests(false));
  }, []);

  const handleApprove = async (requestId: string) => {
    const token = localStorage.getItem('sms-token');
    if (!token) return;

    setApprovingId(requestId);
    try {
      await approveLinkRequest(token, requestId);
      setRequests((current) => current.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error('Approval failed', error);
    } finally {
      setApprovingId(null);
    }
  };

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
              <h3 className="text-lg font-semibold text-slate-900">Pending parent link requests</h3>
              {loadingRequests ? (
                <p className="mt-3 text-sm text-slate-600">Loading requests...</p>
              ) : requests.length === 0 ? (
                <p className="mt-3 text-sm text-slate-600">No pending student link requests at the moment.</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">{request.studentName} linked by {request.parentName}</p>
                      <p className="text-sm text-slate-600">Requested on: {new Date(request.requestedAt).toLocaleDateString()}</p>
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={approvingId === request.id}
                        className="mt-3 rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
                      >
                        {approvingId === request.id ? 'Approving...' : 'Approve'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">System status</h3>
              <p className="mt-3 text-sm text-slate-600">This admin dashboard displays student counts, attendance metrics, active exam totals, and result activity. Pending parent link requests can be approved directly from this view.</p>
            </section>
          </div>
        </div>
      </PageShell>
    </ProtectedLayout>
  );
}
