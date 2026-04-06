-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentParent" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "StudentParent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_roll_key" ON "Student"("roll");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentParent_studentId_parentId_key" ON "StudentParent"("studentId", "parentId");

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentParent" ADD CONSTRAINT "StudentParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- Seed data for SMS database

-- Insert Users
INSERT INTO "User" ("id", "name", "email", "password", "role") VALUES
('user1', 'Admin User', 'admin@example.com', '$2b$10$gysTQqTB.FBaA0SZMEn77OjA3/skHCWCQpQtDHqXSdTsNCKkwrb6a', 'ADMIN');

-- Insert Students
INSERT INTO "Student" ("id", "name", "roll", "grade", "email") VALUES
('student1', 'John Doe', '001', '10th', 'john@example.com'),
('student2', 'Jane Smith', '002', '10th', 'jane@example.com');

-- Insert Parents
INSERT INTO "Parent" ("id", "name", "email", "password") VALUES
('parent1', 'Bob Doe', 'bob@example.com', '$2b$10$gysTQqTB.FBaA0SZMEn77OjA3/skHCWCQpQtDHqXSdTsNCKkwrb6a'),
('parent2', 'Alice Smith', 'alice@example.com', '$2b$10$gysTQqTB.FBaA0SZMEn77OjA3/skHCWCQpQtDHqXSdTsNCKkwrb6a');

-- Insert StudentParent links
INSERT INTO "StudentParent" ("id", "studentId", "parentId") VALUES
('sp1', 'student1', 'parent1'),
('sp2', 'student2', 'parent2');

-- Insert Attendance Records
INSERT INTO "AttendanceRecord" ("id", "studentName", "date", "status") VALUES
('att1', 'John Doe', '2024-04-01T00:00:00.000Z', 'Present'),
('att2', 'John Doe', '2024-04-02T00:00:00.000Z', 'Absent'),
('att3', 'Jane Smith', '2024-04-01T00:00:00.000Z', 'Present'),
('att4', 'Jane Smith', '2024-04-02T00:00:00.000Z', 'Present');

-- Insert Results
INSERT INTO "Result" ("id", "studentName", "score", "total", "date") VALUES
('res1', 'John Doe', 85, 100, '2024-03-31T00:00:00.000Z'),
('res2', 'Jane Smith', 92, 100, '2024-03-31T00:00:00.000Z');