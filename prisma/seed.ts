import 'dotenv/config'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10)
  const user1 = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Create students
  const student1 = await prisma.student.create({
    data: {
      name: 'John Doe',
      roll: '001',
      grade: '10th',
      email: 'john@example.com',
    },
  })

  const student2 = await prisma.student.create({
    data: {
      name: 'Jane Smith',
      roll: '002',
      grade: '10th',
      email: 'jane@example.com',
    },
  })

  // Create parents
  const parent1 = await prisma.parent.create({
    data: {
      name: 'Bob Doe',
      email: 'bob@example.com',
      password: hashedPassword,
    },
  })

  const parent2 = await prisma.parent.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: hashedPassword,
    },
  })

  // Link students to parents
  await prisma.studentParent.create({
    data: {
      studentId: student1.id,
      parentId: parent1.id,
    },
  })

  await prisma.studentParent.create({
    data: {
      studentId: student2.id,
      parentId: parent2.id,
    },
  })

  // Create attendance records
  await prisma.attendanceRecord.createMany({
    data: [
      {
        studentName: 'John Doe',
        date: new Date('2024-04-01'),
        status: 'Present',
      },
      {
        studentName: 'John Doe',
        date: new Date('2024-04-02'),
        status: 'Absent',
      },
      {
        studentName: 'Jane Smith',
        date: new Date('2024-04-01'),
        status: 'Present',
      },
      {
        studentName: 'Jane Smith',
        date: new Date('2024-04-02'),
        status: 'Present',
      },
    ],
  })

  // Create results
  await prisma.result.createMany({
    data: [
      {
        studentName: 'John Doe',
        score: 85,
        total: 100,
        date: new Date('2024-03-31'),
      },
      {
        studentName: 'Jane Smith',
        score: 92,
        total: 100,
        date: new Date('2024-03-31'),
      },
    ],
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })