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