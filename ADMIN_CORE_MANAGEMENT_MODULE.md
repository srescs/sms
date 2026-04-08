# Admin & Core Management Module

This document continues the Admin & Core Management module definition with:
- UI screen flows for each section
- Database schema design
- API definition per sub-module

---

## 1. UI Screen Flows

### 1.1 Admin & Core Management Home

**Goal:** Provide a single entry point for all core setup and governance actions.

Flow:
1. Admin lands on `Admin Core Dashboard`
2. Dashboard shows cards for:
   - Organization Setup
   - Academic Structure Setup
   - User & Role Management
   - Access Control & Permissions
   - System Configuration
   - Academic Year & Calendar
   - Audit & Activity Logs
3. Each card includes:
   - summary metrics
   - quick links
   - status indicators

---

### 1.2 Organization Setup

#### Institution Profile

Flow:
1. Click `Organization Setup`
2. Open `Institution Profile`
3. Display form sections for:
   - Name, Code, Short Name
   - Logo upload and branding colors
   - Address, phone, email, website
   - Board / Affiliation, accreditation details
   - Contact person and emergency contact
4. Save changes and show confirmation toast.

#### Campus Management

Flow:
1. From Organization Setup, click `Campus Management`
2. Show list of campus cards:
   - campus name
   - location
   - active status
3. Actions:
   - Add campus
   - Edit campus
   - Deactivate campus
4. Add campus modal includes:
   - name, campus code
   - address, city, state, country
   - campus type and operating hours

#### Departments / Streams

Flow:
1. From Organization Setup, click `Departments / Streams`
2. Show department list grouped by category
3. Actions:
   - Add department/stream
   - Edit or archive department
4. Add form includes:
   - department name
   - category (Science / Commerce / Arts / Custom)
   - description and head of department

---

### 1.3 Academic Structure Setup

#### Programs / Courses

Flow:
1. Click `Academic Structure Setup`
2. View `Programs / Courses`
3. Show table of programs with:
   - name
   - program type
   - duration
   - assigned departments
4. Actions:
   - Add program
   - Assign courses to program

#### Classes / Grades

Flow:
1. Click `Classes / Grades`
2. Show class list and grade levels
3. Actions:
   - Create new class or grade
   - Map class to program
   - Set capacity and academic year

#### Sections / Batches

Flow:
1. Click `Sections / Batches`
2. Show sections for selected class
3. Actions:
   - Add section/batch
   - Set student capacity, teacher in charge, room
   - Assign section to timetable

#### Subject Configuration

Flow:
1. Click `Subject Configuration`
2. Show subject catalog and class mapping
3. Actions:
   - Create subject
   - Assign subject code
   - Map subjects to classes, programs, or streams

---

### 1.4 User & Role Management

#### User Directory

Flow:
1. Click `User & Role Management`
2. Display a searchable directory of users
3. Filters:
   - role
   - department
   - class
   - status
4. Actions:
   - view profile
   - edit user
   - deactivate user

#### Add / Edit User

Flow:
1. Click `Add User`
2. Show form fields:
   - name, email, phone
   - role selection
   - department / class / campus assignment
   - login credentials or invitation
3. Save and optionally send welcome email.

#### Role Assignment

Flow:
1. From user profile or bulk action, open `Role Assignment`
2. Show assigned and available roles
3. Allow multi-role selection
4. Save and confirm access update

#### User Groups

Flow:
1. Click `User Groups`
2. Show groups by:
   - department
   - class
   - custom tags
3. Actions:
   - create group
   - assign members
   - use group for notifications and access

---

### 1.5 Access Control & Permissions

#### Role-Based Permissions

Flow:
1. Click `Access Control & Permissions`
2. Show roles list with permission counts
3. Click a role to edit permissions
4. Display permission matrix with modules and actions
5. Actions:
   - toggle View/Edit/Delete rights
   - save role permissions

#### Module-Level Access

Flow:
1. Show modules and submodules
2. For each role, show toggles for access type
3. Provide global module status indicators

#### Custom Permissions

Flow:
1. Click `Custom Permissions`
2. Create or edit fine-grained permission rules
3. Example rules:
   - allow teacher to mark attendance only for assigned classes
   - restrict finance access to bursar role
4. Save rule and assign to role or user

---

### 1.6 System Configuration

#### General Settings

Flow:
1. Click `System Configuration`
2. Show settings sections:
   - time zone
   - language
   - date format
   - currency
3. Save global settings

#### Notification Settings

Flow:
1. Show notification channels
2. Configure:
   - SMS provider
   - email SMTP settings
   - push notification app keys
3. Enable/disable notification events

#### Fee & Payment Settings

Flow:
1. Show fee settings panel
2. Configure payment modes
3. Set default currency and decimal formatting
4. Save payment rules

#### Custom Settings

Flow:
1. Provide feature toggles and policy options
2. Allow admins to turn modules on/off
3. Manage institution-specific rules

---

### 1.7 Academic Year & Calendar

#### Academic Year Setup

Flow:
1. Click `Academic Year & Calendar`
2. Add or edit academic year
3. Configure:
   - start and end dates
   - terms or semesters
   - active year status

#### Holidays Management

Flow:
1. Show holiday calendar list
2. Add public or institution-specific holidays
3. Include:
   - holiday name
   - date range
   - description

#### Event Calendar

Flow:
1. Show event planner with timeline view
2. Create events for:
   - exams
   - activities
   - deadlines
3. Provide calendar export and reminders

---

### 1.8 Audit & Activity Logs

#### User Activity Logs

Flow:
1. Click `Audit & Activity Logs`
2. Show activity feed with filters:
   - user
   - date range
   - action type
3. Display details for each entry

#### System Logs

Flow:
1. Show system events and configuration changes
2. Filter by:
   - error level
   - subsystem
   - date
3. Provide root cause or summary notes

#### Reports

Flow:
1. Provide export options
2. Generate reports for:
   - audit trails
   - compliance review
   - user actions
3. Download CSV/PDF

---

## 2. Database Schema Design

### 2.1 Core Entities

#### institutions
- id
- name
- short_name
- code
- logo_url
- address_line1
- address_line2
- city
- state
- postal_code
- country
- board_affiliation
- contact_email
- contact_phone
- website
- timezone
- locale
- currency
- created_at
- updated_at

#### campuses
- id
- institution_id
- name
- code
- address
- city
- state
- country
- timezone
- phone
- email
- status
- created_at
- updated_at

#### departments
- id
- institution_id
- name
- category
- code
- description
- head_of_department_id
- status
- created_at
- updated_at

---

### 2.2 Academic Structure

#### programs
- id
- institution_id
- name
- code
- type
- duration_months
- description
- department_id
- status
- created_at
- updated_at

#### classes
- id
- institution_id
- name
- grade_level
- program_id
- capacity
- academic_year_id
- status
- created_at
- updated_at

#### sections
- id
- class_id
- name
- batch_code
- room
- teacher_in_charge_id
- capacity
- status
- created_at
- updated_at

#### subjects
- id
- institution_id
- name
- code
- subject_type
- description
- status
- created_at
- updated_at

#### class_subjects
- id
- class_id
- subject_id
- teacher_id
- order_index
- created_at
- updated_at

---

### 2.3 Users, Roles, and Permissions

#### users
- id
- institution_id
- campus_id
- name
- email
- phone
- role_id
- status
- password_hash
- profile_photo_url
- created_at
- updated_at

#### roles
- id
- institution_id
- name
- description
- is_system_role
- created_at
- updated_at

#### permissions
- id
- key
- name
- description
- category
- created_at
- updated_at

#### role_permissions
- id
- role_id
- permission_id
- allowed
- created_at
- updated_at

#### user_roles
- id
- user_id
- role_id
- created_at
- updated_at

#### user_permissions (optional)
- id
- user_id
- permission_id
- allowed
- created_at
- updated_at

---

### 2.4 System Configuration

#### settings
- id
- institution_id
- key
- value
- description
- type
- updated_at

#### notification_settings
- id
- institution_id
- channel
- provider
- config_json
- enabled
- updated_at

#### fee_settings
- id
- institution_id
- payment_modes
- currency
- tax_settings_json
- default_terms
- updated_at

---

### 2.5 Academic Year & Calendar

#### academic_years
- id
- institution_id
- name
- start_date
- end_date
- status
- created_at
- updated_at

#### academic_terms
- id
- academic_year_id
- name
- start_date
- end_date
- status
- created_at
- updated_at

#### holidays
- id
- institution_id
- name
- start_date
- end_date
- type
- description
- created_at
- updated_at

#### calendar_events
- id
- institution_id
- title
- type
- start_datetime
- end_datetime
- description
- related_module
- related_entity_id
- created_by
- created_at
- updated_at

---

### 2.6 Audit & Activity Logs

#### audit_logs
- id
- institution_id
- user_id
- user_name
- action
- entity
- entity_id
- details
- ip_address
- user_agent
- created_at

#### system_logs
- id
- institution_id
- level
- component
- message
- metadata
- created_at

---

### 2.7 Prisma / SQL Example

This design can be implemented using standard relational patterns. Example Prisma model:

```prisma
model Institution {
  id          String   @id @default(cuid())
  name        String
  shortName   String?
  code        String?
  logoUrl     String?
  address     String?
  city        String?
  state       String?
  country     String?
  timezone    String?
  locale      String?
  currency    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  campuses    Campus[]
  departments Department[]
  programs    Program[]
  users       User[]
}
```

---

## 3. API Definition per Sub-Module

### 3.1 Organization Setup

#### Institution Profile
- `GET /api/admin/institution`
  - Returns institution profile
- `PATCH /api/admin/institution`
  - Update profile fields

#### Campus Management
- `GET /api/admin/campuses`
- `GET /api/admin/campuses/:campusId`
- `POST /api/admin/campuses`
- `PATCH /api/admin/campuses/:campusId`
- `DELETE /api/admin/campuses/:campusId`

#### Departments / Streams
- `GET /api/admin/departments`
- `POST /api/admin/departments`
- `PATCH /api/admin/departments/:departmentId`
- `DELETE /api/admin/departments/:departmentId`

---

### 3.2 Academic Structure Setup

#### Programs / Courses
- `GET /api/admin/programs`
- `POST /api/admin/programs`
- `PATCH /api/admin/programs/:programId`
- `DELETE /api/admin/programs/:programId`

#### Classes / Grades
- `GET /api/admin/classes`
- `POST /api/admin/classes`
- `PATCH /api/admin/classes/:classId`
- `DELETE /api/admin/classes/:classId`

#### Sections / Batches
- `GET /api/admin/sections`
- `POST /api/admin/sections`
- `PATCH /api/admin/sections/:sectionId`
- `DELETE /api/admin/sections/:sectionId`

#### Subject Configuration
- `GET /api/admin/subjects`
- `POST /api/admin/subjects`
- `PATCH /api/admin/subjects/:subjectId`
- `DELETE /api/admin/subjects/:subjectId`
- `POST /api/admin/classes/:classId/subjects`
  - Map subjects to class

---

### 3.3 User & Role Management

#### Users
- `GET /api/admin/users`
- `GET /api/admin/users/:userId`
- `POST /api/admin/users`
- `PATCH /api/admin/users/:userId`
- `DELETE /api/admin/users/:userId`
- `POST /api/admin/users/bulk-import`

#### Roles
- `GET /api/admin/roles`
- `POST /api/admin/roles`
- `PATCH /api/admin/roles/:roleId`
- `DELETE /api/admin/roles/:roleId`

#### Role Assignment
- `POST /api/admin/users/:userId/roles`
- `DELETE /api/admin/users/:userId/roles/:roleId`

#### User Groups
- `GET /api/admin/user-groups`
- `POST /api/admin/user-groups`
- `PATCH /api/admin/user-groups/:groupId`
- `DELETE /api/admin/user-groups/:groupId`
- `POST /api/admin/user-groups/:groupId/members`

---

### 3.4 Access Control & Permissions

#### Permissions Catalog
- `GET /api/admin/permissions`
- `GET /api/admin/permissions/:permissionId`

#### Role Permissions
- `GET /api/admin/roles/:roleId/permissions`
- `PATCH /api/admin/roles/:roleId/permissions`

#### Custom Permissions
- `GET /api/admin/custom-permissions`
- `POST /api/admin/custom-permissions`
- `PATCH /api/admin/custom-permissions/:permissionId`
- `DELETE /api/admin/custom-permissions/:permissionId`

---

### 3.5 System Configuration

#### General Settings
- `GET /api/admin/settings`
- `PATCH /api/admin/settings`

#### Notification Settings
- `GET /api/admin/settings/notifications`
- `PATCH /api/admin/settings/notifications`

#### Fee & Payment Settings
- `GET /api/admin/settings/payments`
- `PATCH /api/admin/settings/payments`

#### Feature Toggles / Custom Settings
- `GET /api/admin/settings/custom`
- `PATCH /api/admin/settings/custom`

---

### 3.6 Academic Year & Calendar

#### Academic Year / Term
- `GET /api/admin/academic-years`
- `POST /api/admin/academic-years`
- `PATCH /api/admin/academic-years/:yearId`
- `DELETE /api/admin/academic-years/:yearId`

- `GET /api/admin/academic-terms`
- `POST /api/admin/academic-terms`
- `PATCH /api/admin/academic-terms/:termId`
- `DELETE /api/admin/academic-terms/:termId`

#### Holidays
- `GET /api/admin/holidays`
- `POST /api/admin/holidays`
- `PATCH /api/admin/holidays/:holidayId`
- `DELETE /api/admin/holidays/:holidayId`

#### Event Calendar
- `GET /api/admin/calendar-events`
- `POST /api/admin/calendar-events`
- `PATCH /api/admin/calendar-events/:eventId`
- `DELETE /api/admin/calendar-events/:eventId`

---

### 3.7 Audit & Activity Logs

#### Audit Logs
- `GET /api/admin/audit-logs`
- `GET /api/admin/audit-logs/:logId`
- `GET /api/admin/audit-logs/export`

#### System Logs
- `GET /api/admin/system-logs`
- `GET /api/admin/system-logs/:logId`

#### Reports
- `GET /api/admin/audit-reports`
- `GET /api/admin/compliance-reports`

---

## 4. Implementation Folder Structure

### 4.1 App Pages / Routes

- `app/admin/page.tsx`
- `app/admin/organization/page.tsx`
- `app/admin/organization/institution/page.tsx`
- `app/admin/organization/campuses/page.tsx`
- `app/admin/organization/departments/page.tsx`
- `app/admin/academic/page.tsx`
- `app/admin/academic/programs/page.tsx`
- `app/admin/academic/classes/page.tsx`
- `app/admin/academic/sections/page.tsx`
- `app/admin/academic/subjects/page.tsx`
- `app/admin/users/page.tsx`
- `app/admin/users/new/page.tsx`
- `app/admin/users/[userId]/page.tsx`
- `app/admin/roles/page.tsx`
- `app/admin/user-groups/page.tsx`
- `app/admin/access/page.tsx`
- `app/admin/access/permissions/page.tsx`
- `app/admin/access/custom-permissions/page.tsx`
- `app/admin/settings/page.tsx`
- `app/admin/settings/notifications/page.tsx`
- `app/admin/settings/payments/page.tsx`
- `app/admin/settings/custom/page.tsx`
- `app/admin/calendar/page.tsx`
- `app/admin/calendar/academic-years/page.tsx`
- `app/admin/calendar/terms/page.tsx`
- `app/admin/calendar/holidays/page.tsx`
- `app/admin/calendar/events/page.tsx`
- `app/admin/audit/page.tsx`
- `app/admin/audit/logs/page.tsx`
- `app/admin/audit/system/page.tsx`
- `app/admin/audit/reports/page.tsx`

### 4.2 API Routes

- `app/api/admin/institution/route.ts`
- `app/api/admin/campuses/route.ts`
- `app/api/admin/campuses/[campusId]/route.ts`
- `app/api/admin/departments/route.ts`
- `app/api/admin/departments/[departmentId]/route.ts`
- `app/api/admin/programs/route.ts`
- `app/api/admin/programs/[programId]/route.ts`
- `app/api/admin/classes/route.ts`
- `app/api/admin/classes/[classId]/route.ts`
- `app/api/admin/sections/route.ts`
- `app/api/admin/sections/[sectionId]/route.ts`
- `app/api/admin/subjects/route.ts`
- `app/api/admin/subjects/[subjectId]/route.ts`
- `app/api/admin/classes/[classId]/subjects/route.ts`
- `app/api/admin/users/route.ts`
- `app/api/admin/users/[userId]/route.ts`
- `app/api/admin/users/bulk-import/route.ts`
- `app/api/admin/roles/route.ts`
- `app/api/admin/roles/[roleId]/route.ts`
- `app/api/admin/users/[userId]/roles/route.ts`
- `app/api/admin/users/[userId]/roles/[roleId]/route.ts`
- `app/api/admin/user-groups/route.ts`
- `app/api/admin/user-groups/[groupId]/route.ts`
- `app/api/admin/user-groups/[groupId]/members/route.ts`
- `app/api/admin/permissions/route.ts`
- `app/api/admin/permissions/[permissionId]/route.ts`
- `app/api/admin/roles/[roleId]/permissions/route.ts`
- `app/api/admin/custom-permissions/route.ts`
- `app/api/admin/custom-permissions/[permissionId]/route.ts`
- `app/api/admin/settings/route.ts`
- `app/api/admin/settings/notifications/route.ts`
- `app/api/admin/settings/payments/route.ts`
- `app/api/admin/settings/custom/route.ts`
- `app/api/admin/academic-years/route.ts`
- `app/api/admin/academic-years/[yearId]/route.ts`
- `app/api/admin/academic-terms/route.ts`
- `app/api/admin/academic-terms/[termId]/route.ts`
- `app/api/admin/holidays/route.ts`
- `app/api/admin/holidays/[holidayId]/route.ts`
- `app/api/admin/calendar-events/route.ts`
- `app/api/admin/calendar-events/[eventId]/route.ts`
- `app/api/admin/audit-logs/route.ts`
- `app/api/admin/audit-logs/[logId]/route.ts`
- `app/api/admin/audit-logs/export/route.ts`
- `app/api/admin/system-logs/route.ts`
- `app/api/admin/system-logs/[logId]/route.ts`
- `app/api/admin/audit-reports/route.ts`
- `app/api/admin/compliance-reports/route.ts`

### 4.3 Component Structure

- `components/admin/AdminShell.tsx`
- `components/admin/AdminCard.tsx`
- `components/admin/SectionNav.tsx`
- `components/admin/filters/FilterPanel.tsx`
- `components/admin/forms/InstitutionForm.tsx`
- `components/admin/forms/CampusForm.tsx`
- `components/admin/forms/DepartmentForm.tsx`
- `components/admin/forms/ProgramForm.tsx`
- `components/admin/forms/ClassForm.tsx`
- `components/admin/forms/SectionForm.tsx`
- `components/admin/forms/SubjectForm.tsx`
- `components/admin/forms/UserForm.tsx`
- `components/admin/forms/RoleForm.tsx`
- `components/admin/forms/PermissionMatrix.tsx`
- `components/admin/forms/SettingsForm.tsx`
- `components/admin/forms/CalendarEventForm.tsx`
- `components/admin/tables/DataTable.tsx`
- `components/admin/tables/ActivityLogTable.tsx`
- `components/admin/ui/Badge.tsx`
- `components/admin/ui/Modal.tsx`

### 4.4 Lib / API Client

- `lib/adminApi.ts`
- `lib/types/admin.ts`
- `lib/validators/admin.ts`
- `lib/auth.ts` (existing auth helper reuse)
- `lib/prisma.ts` (existing database client reuse)

### 4.5 Prisma / DB Models

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `prisma/migrations/*`

### 4.6 Optional Shared Helpers

- `app/admin/layout.tsx`
- `app/admin/loading.tsx`
- `app/admin/error.tsx`
- `app/api/admin/_middleware.ts` or `middleware.ts` for admin auth
- `components/admin/CalendarView.tsx`
- `components/admin/PermissionMatrix.tsx`
- `components/admin/ConfirmationDialog.tsx`

---

## 5. Client-Facing Summary

This continuation delivers the next layer of design for the Admin & Core Management module:
- clear admin screen flows for each major section
- a scalable relational schema for institutions, academic structure, users, permissions, and logs
- a RESTful API surface aligned to future admin modules
- a concrete Next.js app/file organization for implementation

Use this as the blueprint for building the module UI, backend schema, and API implementation.
