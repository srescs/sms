export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'PARENT' | 'STUDENT' | 'TEACHER' | 'STAFF';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  lastLogin?: string | null;
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
  sectionId?: string | null;
  classId?: string | null;
};

export type Parent = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
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
};

export type Exam = {
  id: string;
  title: string;
  subject: string;
  description?: string | null;
  totalMarks: number;
  passingMarks: number;
  duration: number;
  examDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  subjectId?: string | null;
  classId?: string | null;
};

export type ExamQuestion = {
  id: string;
  examId: string;
  question: string;
  options: string[];
  answer: string;
};

export type ExamResult = {
  id: string;
  studentId: string;
  examId: string;
  obtained: number;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
};

// Admin Types

export type Institution = {
  id: string;
  name: string;
  logo?: string | null;
  address: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  board?: string | null;
  affiliation?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Campus = {
  id: string;
  name: string;
  address: string;
  institutionId: string;
  createdAt: string;
  updatedAt: string;
};

export type Department = {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  institutionId?: string | null;
  campusId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  departmentId: string;
  duration: number;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type Class = {
  id: string;
  name: string;
  level: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
};

export type Section = {
  id: string;
  name: string;
  classId: string;
  capacity?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type Subject = {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SubjectClass = {
  id: string;
  subjectId: string;
  classId: string;
  createdAt: string;
};

export type Role = {
  id: string;
  name: string;
  description?: string | null;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Permission = {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserRole = {
  id: string;
  userId: string;
  roleId: string;
};

export type RolePermission = {
  id: string;
  roleId: string;
  permissionId: string;
};

export type AcademicYear = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Term = {
  id: string;
  name: string;
  academicYearId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type Holiday = {
  id: string;
  name: string;
  date: string;
  type: string;
  description?: string | null;
  academicYearId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Event = {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  type: string;
  academicYearId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuditLog = {
  id: string;
  userId?: string | null;
  action: string;
  resource: string;
  resourceId?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
};

export type SystemConfig = {
  id: string;
  key: string;
  value: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};
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
