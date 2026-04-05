export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Student = {
  id: string;
  name: string;
  roll: string;
  grade: string;
  email: string;
};

export type AttendanceRecord = {
  id: string;
  studentName: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
};

export type ExamQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

export type Result = {
  id: string;
  studentName: string;
  score: number;
  total: number;
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
    name: string;
    email: string;
  };
};
