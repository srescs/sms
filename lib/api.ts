import axios from 'axios';
import type {
  AttendanceRecord,
  DashboardStats,
  Exam,
  ExamQuestion,
  Result,
  Student,
  AuthResponse,
  Parent,
  LinkRequest,
} from '@/lib/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post('/auth', { action: 'login', email, password });
  return response.data;
}

export async function register(name: string, email: string, password: string): Promise<void> {
  await api.post('/auth', { action: 'register', name, email, password });
}

export async function studentLogin(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post('/students/login', { email, password });
  return response.data;
}

export async function parentRegister(name: string, email: string, password: string): Promise<{ parentId: string }> {
  const response = await api.post('/parents/register', { name, email, password });
  return response.data;
}

export async function parentLogin(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post('/parents/login', { email, password });
  return response.data;
}

export async function linkStudent(token: string, studentId: string): Promise<void> {
  await api.post('/parents/link-student', { studentId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getParentAttendance(token: string, parentId: string, studentId: string): Promise<AttendanceRecord[]> {
  const response = await api.get(`/parents/${parentId}/attendance/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getParentResults(token: string, parentId: string, studentId: string): Promise<Result[]> {
  const response = await api.get(`/parents/${parentId}/results/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getParentStudents(token: string, parentId: string): Promise<Student[]> {
  const response = await api.get(`/parents/${parentId}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getPendingLinkRequests(token: string): Promise<LinkRequest[]> {
  const response = await api.get('/parents/link-requests', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function approveLinkRequest(token: string, requestId: string): Promise<void> {
  await api.patch('/parents/link-requests', { requestId, action: 'approve' }, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getStudentAttendance(token: string, studentId: string): Promise<AttendanceRecord[]> {
  const response = await api.get(`/students/${studentId}/attendance`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getStudentResults(token: string, studentId: string): Promise<Result[]> {
  const response = await api.get(`/students/${studentId}/results`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getDashboard(): Promise<DashboardStats> {
  const response = await api.get('/dashboard');
  return response.data;
}

export async function getStudents(): Promise<Student[]> {
  const response = await api.get('/students');
  return response.data;
}

export async function addStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<Student> {
  const response = await api.post('/students', student);
  return response.data;
}

export async function deleteStudent(id: string): Promise<void> {
  await api.delete(`/students?id=${id}`);
}

export async function getAttendance(): Promise<AttendanceRecord[]> {
  const response = await api.get('/attendance');
  return response.data;
}

export async function updateAttendance(record: { id: string; status: AttendanceRecord['status'] }): Promise<AttendanceRecord> {
  const response = await api.patch('/attendance', record);
  return response.data;
}

export async function getExams(): Promise<Exam[]> {
  const response = await api.get('/exam');
  return response.data;
}

export async function getExam(): Promise<Exam | null> {
  const exams = await getExams();
  return exams.length > 0 ? exams[0] : null;
}

export async function createExam(exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'questions'> & {
  questions: Array<Omit<ExamQuestion, 'id' | 'examId' | 'answer' | 'createdAt' | 'updatedAt'>>;
}): Promise<Exam> {
  const response = await api.post('/exam', { action: 'create', exam });
  return response.data;
}

export async function submitExam(examId: string, studentId: string, answers: Record<string, string>): Promise<{ score: number; total: number }> {
  const response = await api.post('/exam', { action: 'submit', examId, studentId, answers });
  return response.data;
}

export async function getResults(): Promise<Result[]> {
  const response = await api.get('/results');
  return response.data;
}
