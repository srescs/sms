import type { AttendanceRecord, ExamQuestion, Result, Student, User, Parent, StudentParent } from '@/lib/types';

const now = new Date().toISOString();

export const users: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'ADMIN',
    createdAt: now,
    updatedAt: now,
  },
];

export const students: Student[] = [
  {
    id: 's1',
    name: 'Emma Johnson',
    roll: 'A102',
    grade: '10',
    email: 'emma.johnson@example.com',
    password: 'Student@123',
    createdBy: 'u1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 's2',
    name: 'Noah Williams',
    roll: 'B204',
    grade: '11',
    email: 'noah.williams@example.com',
    password: 'Student@123',
    createdBy: 'u1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 's3',
    name: 'Olivia Brown',
    roll: 'C308',
    grade: '12',
    email: 'olivia.brown@example.com',
    password: 'Student@123',
    createdBy: 'u1',
    createdAt: now,
    updatedAt: now,
  },
];

export const parents: Parent[] = [
  {
    id: 'p1',
    name: 'John Johnson',
    email: 'john.johnson@example.com',
    password: '$2a$10$hashedpassword',
    createdAt: now,
    updatedAt: now,
  },
];

export const studentParents: StudentParent[] = [
  {
    id: 'sp1',
    studentId: 's1',
    parentId: 'p1',
    status: 'approved',
    requestedAt: now,
    approvedAt: now,
    approvedBy: 'u1',
  },
];

export const attendance: AttendanceRecord[] = [
  {
    id: 'a1',
    studentId: 's1',
    studentName: 'Emma Johnson',
    date: '2026-04-01',
    status: 'Present',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'a2',
    studentId: 's2',
    studentName: 'Noah Williams',
    date: '2026-04-01',
    status: 'Absent',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'a3',
    studentId: 's3',
    studentName: 'Olivia Brown',
    date: '2026-04-01',
    status: 'Late',
    createdAt: now,
    updatedAt: now,
  },
];

export const examQuestions: ExamQuestion[] = [
  {
    id: 'q1',
    examId: 'e1',
    question: 'What is the capital of France?',
    options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
    answer: 'Paris',
  },
  {
    id: 'q2',
    examId: 'e1',
    question: 'Which equation represents the area of a circle?',
    options: ['πr²', '2πr', 'πd', 'r²'],
    answer: 'πr²',
  },
  {
    id: 'q3',
    examId: 'e1',
    question: 'What is the smallest prime number?',
    options: ['1', '2', '3', '5'],
    answer: '2',
  },
];

export const results: Result[] = [
  {
    id: 'r1',
    studentId: 's1',
    examId: 'e1',
    examTitle: 'General knowledge test',
    score: 3,
    total: 3,
    status: 'passed',
    date: '2026-04-01',
  },
  {
    id: 'r2',
    studentId: 's2',
    examId: 'e1',
    examTitle: 'General knowledge test',
    score: 2,
    total: 3,
    status: 'failed',
    date: '2026-04-01',
  },
];
