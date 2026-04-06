'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { linkStudent, getStudents } from '@/lib/api';
import type { Student } from '@/lib/types';

export default function LinkStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  const handleLink = async () => {
    if (!selectedStudentId) return;

    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/parents/login');
      return;
    }

    try {
      await linkStudent(token, selectedStudentId);
      setSuccess('Link request submitted. Waiting for admin approval.');
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to link student');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Link Student</h1>

      <div className="max-w-md">
        <select
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.roll})
            </option>
          ))}
        </select>

        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}

        <button
          onClick={handleLink}
          disabled={loading || !selectedStudentId}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Linking...' : 'Link Student'}
        </button>
      </div>
    </div>
  );
}