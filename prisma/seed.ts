import 'dotenv/config'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const hashedAdminPassword = await bcrypt.hash('Admin@123', 10)
  const hashedStudentPassword = await bcrypt.hash('Student@123', 10)
  const hashedParentPassword = await bcrypt.hash('Parent@123', 10)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  })

  const student1 = await prisma.student.create({
    data: {
      name: 'John Doe',
      roll: '001',
      grade: '10th',
      email: 'john@example.com',
      password: hashedStudentPassword,
      createdBy: admin.id,
    },
  })

  const student2 = await prisma.student.create({
    data: {
      name: 'Jane Smith',
      roll: '002',
      grade: '10th',
      email: 'jane@example.com',
      password: hashedStudentPassword,
      createdBy: admin.id,
    },
  })

  const parent1 = await prisma.parent.create({
    data: {
      name: 'Bob Doe',
      email: 'bob@example.com',
      password: hashedParentPassword,
    },
  })

  const parent2 = await prisma.parent.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: hashedParentPassword,
    },
  })

  await prisma.studentParent.create({
    data: {
      studentId: student1.id,
      parentId: parent1.id,
      status: 'approved',
      approvedAt: new Date(),
      approvedBy: admin.id,
    },
  })

  await prisma.studentParent.create({
    data: {
      studentId: student2.id,
      parentId: parent2.id,
      status: 'approved',
      approvedAt: new Date(),
      approvedBy: admin.id,
    },
  })

  await prisma.attendanceRecord.createMany({
    data: [
      {
        studentId: student1.id,
        date: new Date('2024-04-01'),
        status: 'Present',
      },
      {
        studentId: student1.id,
        date: new Date('2024-04-02'),
        status: 'Absent',
      },
      {
        studentId: student2.id,
        date: new Date('2024-04-01'),
        status: 'Present',
      },
      {
        studentId: student2.id,
        date: new Date('2024-04-02'),
        status: 'Present',
      },
    ],
  })

  const exam = await prisma.exam.create({
    data: {
      title: 'General Knowledge Test',
      subject: 'General Knowledge',
      description: 'A sample exam for the student management system.',
      totalMarks: 3,
      passingMarks: 2,
      duration: 30,
      examDate: new Date('2024-05-01T09:00:00Z'),
      createdBy: admin.id,
      questions: {
        create: [
          {
            question: 'What is the capital of France?',
            options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
            answer: 'Paris',
          },
          {
            question: 'Which equation represents the area of a circle?',
            options: ['πr²', '2πr', 'πd', 'r²'],
            answer: 'πr²',
          },
          {
            question: 'What is the smallest prime number?',
            options: ['1', '2', '3', '5'],
            answer: '2',
          },
        ],
      },
    },
  })

  await prisma.examResult.create({
    data: {
      studentId: student1.id,
      examId: exam.id,
      obtained: 3,
      total: 3,
      status: 'passed',
    },
  })

  await prisma.examResult.create({
    data: {
      studentId: student2.id,
      examId: exam.id,
      obtained: 2,
      total: 3,
      status: 'failed',
    },
  })

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
