import type { AttendanceRecord, ExamQuestion, Result, Student, User, Parent, StudentParent } from '@/lib/types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin@123',
  },
];

export const students: Student[] = [
  { id: 's1', name: 'Emma Johnson', roll: 'A102', grade: '10', email: 'emma.johnson@example.com' },
  { id: 's2', name: 'Noah Williams', roll: 'B204', grade: '11', email: 'noah.williams@example.com' },
  { id: 's3', name: 'Olivia Brown', roll: 'C308', grade: '12', email: 'olivia.brown@example.com' },
];

export const parents: Parent[] = [
  {
    id: 'p1',
    name: 'John Johnson',
    email: 'john.johnson@example.com',
    password: '$2a$10$hashedpassword', // bcrypt hash for 'Parent@123'
  },
];

export const studentParents: StudentParent[] = [
  {
    id: 'sp1',
    studentId: 's1',
    parentId: 'p1',
  },
];

export const attendance: AttendanceRecord[] = [
  { id: 'a1', studentName: 'Emma Johnson', date: '2026-04-01', status: 'Present' },
  { id: 'a2', studentName: 'Noah Williams', date: '2026-04-01', status: 'Absent' },
  { id: 'a3', studentName: 'Olivia Brown', date: '2026-04-01', status: 'Late' },
];

export const examQuestions: ExamQuestion[] = [
  {
    id: 'q1',
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    answer: 'Paris',
  },
  {
    id: 'q2',
    question: 'Which equation represents the area of a circle?',
    options: ['πr²', '2πr', 'πd', 'r²'],
    answer: 'πr²',
  },
  {
    id: 'q3',
    question: 'What is the smallest prime number?',
    options: ['1', '2', '3', '5'],
    answer: '2',
  },
];

export const results: Result[] = [
  { id: 'r1', studentName: 'Emma Johnson', score: 3, total: 3, date: '2026-04-01' },
  { id: 'r2', studentName: 'Noah Williams', score: 2, total: 3, date: '2026-04-01' },
];
