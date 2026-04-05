"use client";

import { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageShell from '@/components/PageShell';
import Table from '@/components/Table';
import { getResults } from '@/lib/api';
import type { Result } from '@/lib/types';

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    getResults().then(setResults).catch(() => null);
  }, []);

  return (
    <ProtectedLayout>
      <PageShell>
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Results</p>
            <h2 className="text-3xl font-semibold text-slate-900">Exam Reports</h2>
            <p className="mt-2 text-sm text-slate-600">Review exam outcomes for recent student progress.</p>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Table
              data={results}
              columns={[
                { header: 'Student', accessor: 'studentName' },
                { header: 'Score', accessor: 'score' },
                { header: 'Total', accessor: 'total' },
                { header: 'Date', accessor: 'date' },
              ]}
            />
          </section>
        </div>
      </PageShell>
    </ProtectedLayout>
  );
}
