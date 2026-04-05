'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getParentAttendance, getParentResults, getParentStudents } from '@/lib/api';
import type { AttendanceRecord, Result, Student } from '@/lib/types';

export default function ParentDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        router.push('/parents/login');
        return;
      }

      const userData = JSON.parse(user);

      try {
        const data = await getParentStudents(token, userData.id);
        setStudents(data);
      } catch (err) {
        setError('Failed to fetch linked students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [router]);

  const handleViewData = async (student: Student) => {
    setSelectedStudent(student);
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')!);

    try {
      const [attendanceData, resultsData] = await Promise.all([
        getParentAttendance(token!, user.id, student.id),
        getParentResults(token!, user.id, student.id),
      ]);
      setAttendance(attendanceData);
      setResults(resultsData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !selectedStudent) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Parent Dashboard</h1>

      <div className="mb-4">
        <Link href="/parents/link-student" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Link New Student
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Linked Students</h2>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium">{student.name}</h3>
                <p className="text-gray-600">Roll: {student.roll} | Grade: {student.grade}</p>
                <button
                  onClick={() => handleViewData(student)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Data
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedStudent && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data for {selectedStudent.name}</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Attendance Summary</h3>
              {loading ? (
                <div>Loading attendance...</div>
              ) : (
                <div className="space-y-2">
                  {attendance.map((record) => (
                    <div key={record.id} className="flex justify-between">
                      <span>{record.date}</span>
                      <span className={`px-2 py-1 rounded ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800' :
                        record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Results Summary</h3>
              {loading ? (
                <div>Loading results...</div>
              ) : (
                <div className="space-y-2">
                  {results.map((result) => (
                    <div key={result.id} className="flex justify-between">
                      <span>{result.date}</span>
                      <span>Score: {result.score}/{result.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}