# SMS Application API Documentation

## Overview
This document describes the main API endpoints for the Student Management System, the login URLs, and default seeded user credentials for testing.

## Login URLs
- Admin login: `/login`
- Parent login: `/parents/login`

## Default Test Credentials
### Admin
- Email: `admin@example.com`
- Password: `Admin@123`

### Parents
- Email: `bob@example.com`
- Password: `Parent@123`

- Email: `alice@example.com`
- Password: `Parent@123`

### Students (API only)
- Email: `john@example.com`
- Password: `Student@123`

- Email: `jane@example.com`
- Password: `Student@123`

## API Endpoints
### Authentication
- `POST /api/auth`
  - Body for login:
    ```json
    {
      "action": "login",
      "email": "admin@example.com",
      "password": "Admin@123"
    }
    ```
  - Body for registration:
    ```json
    {
      "action": "register",
      "name": "Admin Name",
      "email": "admin@example.com",
      "password": "SecurePassword"
    }
    ```
- `POST /api/students/login`
  - Body:
    ```json
    {
      "email": "john@example.com",
      "password": "Student@123"
    }
    ```
- `POST /api/parents/register`
  - Body:
    ```json
    {
      "name": "Parent Name",
      "email": "parent@example.com",
      "password": "Parent@123"
    }
    ```
- `POST /api/parents/login`
  - Body:
    ```json
    {
      "email": "bob@example.com",
      "password": "Parent@123"
    }
    ```

### Student Management
- `GET /api/students`
  - Retrieves all students.
- `POST /api/students`
  - Body:
    ```json
    {
      "name": "New Student",
      "roll": "003",
      "grade": "10",
      "email": "new.student@example.com",
      "password": "Student@123"
    }
    ```
- `DELETE /api/students?id={studentId}`
  - Deletes a student by ID.

### Parent Management
- `POST /api/parents/link-student`
  - Requires Authorization header: `Bearer <token>`
  - Body:
    ```json
    {
      "studentId": "<student-id>"
    }
    ```
- `GET /api/parents/{parentId}/students`
  - Requires Authorization header: `Bearer <token>`
  - Retrieves students linked to the parent.
- `GET /api/parents/{parentId}/attendance/{studentId}`
  - Requires Authorization header: `Bearer <token>`
  - Retrieves attendance records for a student linked to the parent.
- `GET /api/parents/{parentId}/results/{studentId}`
  - Requires Authorization header: `Bearer <token>`
  - Retrieves exam results for a student linked to the parent.

### Attendance
- `GET /api/attendance`
  - Retrieves all attendance records.
- `PATCH /api/attendance`
  - Body:
    ```json
    {
      "id": "<attendance-id>",
      "status": "Present"
    }
    ```

### Exams
- `GET /api/exam`
  - Retrieves all exams.
- `POST /api/exam`
  - Create exam body:
    ```json
    {
      "action": "create",
      "exam": {
        "title": "Exam Title",
        "subject": "Subject Name",
        "description": "Optional description",
        "totalMarks": 10,
        "passingMarks": 5,
        "duration": 60,
        "examDate": "2026-05-01T09:00:00.000Z",
        "questions": [
          {
            "question": "Question text",
            "options": ["A", "B", "C", "D"],
            "answer": "A"
          }
        ]
      }
    }
    ```
  - Submit exam body:
    ```json
    {
      "action": "submit",
      "examId": "<exam-id>",
      "studentId": "<student-id>",
      "answers": {
        "<question-id>": "A"
      }
    }
    ```

### Results
- `GET /api/results`
  - Retrieves all exam results.

### Dashboard
- `GET /api/dashboard`
  - Returns summary metrics for students, attendance, exams, and results.

## Notes
- Protected routes require the JWT token in the `Authorization` header:
  - `Authorization: Bearer <token>`
- Admin login and registration are handled through the `/api/auth` endpoint.
- Parent and student login use separate endpoints as described above.
