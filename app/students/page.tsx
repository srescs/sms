"use client";

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageShell from '@/components/PageShell';
import Table from '@/components/Table';
import FormInput from '@/components/FormInput';
import { addStudent, deleteStudent, getStudents } from '@/lib/api';
import type { Student } from '@/lib/types';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ name: '', roll: '', grade: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStudents().then(setStudents).catch(() => null);
  }, []);

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.roll || !form.grade || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const added = await addStudent(form);
      setStudents((current) => [...current, added]);
      setForm({ name: '', roll: '', grade: '', email: '', password: '' });
    } catch {
      setError('Unable to add student.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteStudent(id);
    setStudents((current) => current.filter((item) => item.id !== id));
  };

  return (
    <ProtectedLayout>
      <PageShell>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Student Management</p>
              <h2 className="text-3xl font-semibold text-slate-900">Students</h2>
            </div>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Add new student</h3>
            <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleAdd}>
              <FormInput label="Name" name="name" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} placeholder="Student name" />
              <FormInput label="Roll" name="roll" value={form.roll} onChange={(value) => setForm((prev) => ({ ...prev, roll: value }))} placeholder="Roll number" />
              <FormInput label="Grade" name="grade" value={form.grade} onChange={(value) => setForm((prev) => ({ ...prev, grade: value }))} placeholder="Grade level" />
              <FormInput label="Email" name="email" type="email" value={form.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} placeholder="Contact email" />
              <FormInput label="Password" name="password" type="password" value={form.password} onChange={(value) => setForm((prev) => ({ ...prev, password: value }))} placeholder="Temporary password" />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button
                type="submit"
                disabled={loading}
                className="col-span-full w-full rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? 'Saving...' : 'Add Student'}
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Student list</h3>
                <p className="text-sm text-slate-500">Manage student records and update the roster.</p>
              </div>
            </div>
            <Table
              data={students}
              columns={[
                { header: 'Name', accessor: 'name' },
                { header: 'Roll', accessor: 'roll' },
                { header: 'Grade', accessor: 'grade' },
                { header: 'Email', accessor: 'email' },
                {
                  header: 'Actions',
                  accessor: 'actions',
                  render: (student) => (
                    <button
                      type="button"
                      onClick={() => handleDelete(student.id)}
                      className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
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
