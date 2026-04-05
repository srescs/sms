"use client";

import { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageShell from '@/components/PageShell';
import Table from '@/components/Table';
import { getAttendance, updateAttendance } from '@/lib/api';
import type { AttendanceRecord } from '@/lib/types';

const statusOptions: AttendanceRecord['status'][] = ['Present', 'Absent', 'Late'];

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    getAttendance().then(setRecords).catch(() => null);
  }, []);

  const handleChange = async (id: string, status: AttendanceRecord['status']) => {
    const updated = await updateAttendance({ id, status });
    setRecords((current) => current.map((record) => (record.id === id ? updated : record)));
  };

  return (
    <ProtectedLayout>
      <PageShell>
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Attendance</p>
            <h2 className="text-3xl font-semibold text-slate-900">Attendance Management</h2>
            <p className="mt-2 text-sm text-slate-600">Review and update attendance status for each student.</p>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Table
              data={records}
              columns={[
                { header: 'Student', accessor: 'studentName' },
                { header: 'Date', accessor: 'date' },
                {
                  header: 'Status',
                  accessor: 'status',
                  render: (record) => (
                    <select
                      value={record.status}
                      onChange={(event) => handleChange(record.id, event.target.value as AttendanceRecord['status'])}
                      className="rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ),
                },
              ]}
            />
          </section>
        </div>
      </PageShell>
    </ProtectedLayout>
  );
}
