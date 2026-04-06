export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'PARENT' | 'STUDENT';
  createdAt: string;
  updatedAt: string;
};

export type Student = {
  id: string;
  name: string;
  roll: string;
  grade: string;
  email: string;
  password: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type Parent = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type StudentParent = {
  id: string;
  studentId: string;
  parentId: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  approvedAt?: string | null;
  approvedBy?: string | null;
};

export type LinkRequest = {
  id: string;
  studentId: string;
  studentName: string;
  parentId: string;
  parentName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  approvedAt?: string | null;
  approvedBy?: string | null;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  createdAt: string;
  updatedAt: string;
};

export type ExamQuestion = {
  id: string;
  examId: string;
  question: string;
  options: string[];
  answer: string;
};

export type Exam = {
  id: string;
  title: string;
  subject: string;
  description?: string;
  totalMarks: number;
  passingMarks: number;
  duration: number;
  examDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  questions: ExamQuestion[];
};

export type Result = {
  id: string;
  studentId: string;
  examId: string;
  examTitle: string;
  score: number;
  total: number;
  status: string;
  date: string;
};

export type DashboardStats = {
  students: number;
  attendance: number;
  pendingExam: number;
  results: number;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};
